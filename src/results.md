---
title: Results
toc: true
---




# Results

The verification of the different postprocessing methodologies are presented in this page. 


<!-- Load and transform the data -->

```js
const launches = FileAttachment("data/launches.csv").csv({typed: true});
const ranks = FileAttachment("data/rankhist_all.json").json();
const ranksLt = FileAttachment("data/rankhist_lead_times.json").json();
const crps = FileAttachment("data/ems_crps_results.json").json();
const comarques = FileAttachment("data/catalunya_fronteres.json.geojson").json();
const crpsMap = FileAttachment("data/crps_map.json").json();
```

<!-- A shared color scale for consistency, sorted by the number of launches -->

```js
const color = Plot.scale({
  color: {
    type: "categorical",
    domain: d3.groupSort(launches, (D) => -D.length, (d) => d.state).filter((d) => d !== "Other"),
    unknown: "var(--theme-foreground-muted)"
  }
});
```

## Continuous Ranked Probability Score

The Continuous Ranked Probability Score (CRPS) is a measure of the accuracy of probabilistic forecasts,
considering both the sharpness and the reliability of the forecast distribution. The results considering
all stations and lead times are indicated in the table below, with DRN-Members being the methodology
with the lowest CRPS, closely followed by DRN-Mean.

| Forecast        | CRPS      |
|-----------------|-----------|
| PME             | 1.082     |
| IMPROVER        | 0.789     |
| **DRN-Members** | **0.768** |
| DRN-Mean        | 0.776     |

The CRPS is also analysed from two perspectives:

- **Grouped by lead time**: This includes all stations for each lead time and reports the mean value,
similar to a time series.
- **Grouped by station**: This includes all lead times but shows stations individually on a map. This
also includes comparisons between different methodologies, allowing the user to choose which methodologies
to compare.

```js
const checkout = 
  Inputs.checkbox(["PME", "IMPROVER", "DRN-Mean", "DRN-Members"], {
    sort: false,
    unique: true,
    value: ["PME", "IMPROVER", "DRN-Mean", "DRN-Members"],
    label: "Choose forecasts:"
  });

const subject = Generators.input(checkout);
```

```js
function plotCRPS(data, {width} = {}) {


return Plot.plot({
    title: "",
    width,
    height: 300,
    color: {legend: true, domain: ["PME", "IMPROVER", "DRN-Mean", "DRN-Members"]},
    marks: [
      Plot.line(data.filter((d) => subject.includes(d.variable)), {x: "lead_time", y: "value", stroke: "variable", tip: true}),
      Plot.gridX(),
      Plot.gridY()
    ],
    y: {label: "CRPS"},
    x: {label: "Lead time (hours)"},
  });
}
```

```js
const selMap = Inputs.select(["PME", "IMPROVER", "DRN-Mean", "DRN-Members", "IMPROVER vs PME", "DRN-Mean vs PME", "DRN-Mean vs IMPROVER",
                                 "DRN-Members vs PME", "DRN-Members vs IMPROVER", "DRN-Members vs DRN-Mean"], {label: "Choose forecast or comparison:"});
const selectedMap = Generators.input(selMap);
```


```js
const circle = d3.geoCircle().center([1.80, 41.7]).radius(1.2).precision(1)()
```

```js
function plotMapCRPS(data, {width} = {}) {

let domain;
let colorRange;
if(["PME", "IMPROVER", "DRN-Mean", "DRN-Members"].includes(selectedMap)){
  domain = [0.4, 1.6]
  colorRange = ["#1a9850", "#ffffbf", "#d73027"]
} else {
  domain = [-0.5, 0.5]
  colorRange = ["#2166AC", "#FFFFFF", "#B2182B"]
}

const selCrpsData = data.filter((d) => d.variable == selectedMap)

return Plot.plot({
    title: "",
    width,
    height: 400,
    projection: {type: "mercator", domain: circle},
    color: {range: colorRange, domain: domain, legend: true, label: "CRPS", nice: false},
    marks: [
      Plot.geo(comarques, {stroke: "#ddd", border: "none", background: "none"}),
      Plot.dot(selCrpsData, {x: "longitude", y: "latitude", fill: "value", stroke: "white", tip: true, strokeWidth: 0.2})
    ],
  });
}
```


<div class="grid grid-cols-2">
  <div class="card">
    <h2>Continuous Ranked Probability Score by lead time</h2>
    <div>${checkout}</div>
    ${resize((width) => plotCRPS(crps, {width}))}
    <div class="card">

- The time series of the PME forecast exhibits a diurnal cycle with worse CRPS values during nighttime lead times and shows an increasing trend in CRPS values as the lead time increases.

- Regardless of the postprocessing methodology, all techniques improve the mean CRPS value for each lead time compared to PME. DRN-Members is the technique that exhibits the lowest CRPS during most lead times.

- There is a noticeable worsening of the CRPS from 48 hours of lead time, mainly due to the loss of 3 members in the ensemble. DRN-Mean is particularly affected.

    </div>
  </div>
</div>

<div class="grid grid-cols-2">
  <div class="card">
    <h2>Continuous Ranked Probability Score on a map</h2>
    <div>${selMap}</div>
    ${resize((width) => plotMapCRPS(crpsMap, {width}))}
    <div class="card">

- The highest CRPS values of the PME raw forecast nearly reach 3.0, with most of the highest values concentrated in the Pyrenees (north of the country). In contrast, the coastline stations show better performance regarding CRPS.

- All postprocessing methodologies exhibit a reduction in CRPS compared to the PME raw forecast. This is evident when a comparison (forecast 1 vs. forecast 2) is selected. Cool colors indicate that the CRPS of forecast 1 is lower than that of forecast 2 for a given station.

- IMPROVER and DRN-Members show similar performance in terms of CRPS reduction. Although DRN-Mean improves upon PME and outperforms IMPROVER at some stations, it generally does not surpass the performance of IMPROVER and DRN-Members methodologies.
    </div>
  </div>
</div>

## Rank histograms

A rank histogram is used to verify ensemble forecasts by showing the distribution of the ranks
of observations relative to the ensemble predictions. It indicates whether the ensemble
forecast system is biased and whether it has the appropriate spread. A flat, uniform rank
histogram suggests that the ensemble forecasts are reliable, while deviations
from uniformity indicate biases or incorrect spread in the forecasts.

Rank histograms are analysed from two points of view:

- **Grouped by lead time range**: this includes all stations and is divided into two sets
of lead times. One group includes lead times from 0 to 48 hours, and the other from
49 to 72 hours. This distinction accounts for the different number of members available
in the ensemble at each lead time.

- **Individual lead times**: this also includes all stations but presents the rank histograms
for each lead time separately.

<div class="grid grid-cols-2">
   <div class="card">
    <h2>Rank histogram</h2>
    ${resize((width) => rankHistAll(ranks, {width}))}
    <div>${inputLtSet}</div>
    <div class="card">

- The PME forecast shows clear underdispersion, indicated by a pronounced U shape in the rank histogram for both sets of lead times.

- EMOS-IMPROVER mitigates the underdispersion observed in PME; however, it still exhibits some underdispersion regardless of the lead time range.

- DRN-Mean and DRN-Members exhibit the best results for the 0-48 hour lead time set, with DRN-Members being less biased and fairly uniform. However, for the 49-72 hour lead time range, both show a positive bias, which is less pronounced for DRN-Members.

  </div>

  </div>
</div>

<div class="grid grid-cols-2">
  <div class="card">
    <h2>Rank histogram by lead time</h2>
    ${resize((width) => rankHistLt(ranksLt, {width}))}
    <div>${inputLt}</div>
  <div class="card">

- During all night-hour lead times, PME and EMOS-IMPROVER forecasts exhibit clear underdispersion, which is more pronounced for PME. DRN-Mean and DRN-Members show better performance, but for night lead times after 49 hours, they exhibit some positive bias.

- For daylight-hour lead times, DRN-Mean and DRN-Members exhibit a fairly flat rank histogram for most lead times, obtaining the best results compared to other methods.

- From lead times 6 to 12 hours, PME exhibits a clear positive bias, while a negative bias is reported from 16 to 21 hours. This behavior is mitigated by IMPROVER postprocessing and is almost fully corrected by DRN methodologies.

  </div>

  </div>

</div>

```js
const inputLt = Inputs.range([0, 72], {step: 1, label: "Lead time (h)", value: 0, width: 250});

const lt = Generators.input(inputLt)
```

```js
const inputLtSet = Inputs.select(["0-48 h", "49-72 h"], {label: "Lead time set"});

const ltSet = Generators.input(inputLtSet)
```

---

<!-- Plot of launch history -->



```js
function rankHistAll(data, {width} = {}) {

let ruleYValue;
if(ltSet == "0-48 h"){
  ruleYValue = [1 / 11];
} else {
  ruleYValue = [1 / 8];
}

const setData = data.filter((d) => d.lead_time == ltSet)

const plotData = setData.flatMap(({ forecast, rankhist }) =>
  rankhist.map((value, index) => ({
    forecast,
    bin: index + 1,
    frequency: value
  }))
);

return Plot.plot({
    width,
    height: 300,
    marks: [
      Plot.barY(plotData, {x: "bin", y: "frequency", fill: "forecast", fx:"forecast"}),
      Plot.ruleY(ruleYValue, {stroke: "grey"}),
      Plot.axisFx({anchor: "top"})
    ],
    color: {legend: true, domain: ["PME", "IMPROVER", "DRN-Mean", "DRN-Members"]},
    x: {label: "Rank of observation"},
    y: {label: "Frequency"},
    fx: {label: null, anchor: "bottom", domain: ["PME", "IMPROVER", "DRN-Mean", "DRN-Members"]},
  });
}




```

```js
function rankHistLt(data, {width} = {}) {

const ltData = data.filter((d) => d.lead_time == lt)

const plotData = ltData.flatMap(({ forecast, rankhist }) =>
  rankhist.map((value, index) => ({
    forecast,
    bin: index + 1,
    frequency: value
  }))
);

let ruleYValues;
if(lt <= 48){
  ruleYValues = [1 / 11];
} else {
  ruleYValues = [1 / 8];
}

return Plot.plot({
    width,
    height: 300,
    marks: [
      Plot.barY(plotData, {x: "bin", y: "frequency", fill: "forecast", fx:"forecast"}),
      Plot.ruleY(ruleYValues, {stroke: "grey"}),
      Plot.axisFx({anchor: "top"})
    ],
    color: {legend: true, domain: ["PME", "IMPROVER", "DRN-Mean", "DRN-Members"]},
    x: {label: "Rank of observation"},
    y: {label: "Frequency"},
    fx: {label: null, anchor: "bottom", domain: ["PME", "IMPROVER", "DRN-Mean", "DRN-Members"]}
  });
}
```
