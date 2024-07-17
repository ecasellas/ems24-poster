---
theme: dashboard
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

## Continuous Ranked Probability


## Rank histograms

A rank histogram is used to verify ensemble forecasts by showing the distribution of the ranks
of observations relative to the ensemble predictions. It indicates whether the ensemble
forecast system is biased and whether it has the appropriate spread. A flat, uniform rank
histogram suggests that the ensemble forecasts are reliable, while deviations
from uniformity indicate biases or incorrect spread in the forecasts.

Rank histograms are analysed from two points of view:

- **Grouped by lead time range**: it includes all stations and is divided into two sets
of lead times. One group includes lead times from 0 to 48 hours, and the other from
49 to 72 hours. This distinction accounts for the different number of members available
in the ensemble at each lead time.

- **Individual lead times**: it also includes all stations but presents the rank histograms
for each lead time separately.

<div class="grid grid-cols-2">
   <div class="card">
    <h2>Rank histogram</h2>
    ${resize((width) => rankHistAll(ranks, {width}))}
    <div>${inputLtSet}</div>
    <div class="card">

The PME forecast shows clear underdispersion, indicated by a pronounced U shape in the rank histogram for both sets of lead times.

EMOS-IMPROVER mitigates the underdispersion observed in PME; however, it still exhibits some underdispersion regardless of the lead time range.

DRN-Mean and DRN-Members exhibit the best results for the 0-48 hour lead time set, with DRN-Members being less biased and fairly uniform. However, for the 49-72 hour lead time range, both show a positive bias, which is less pronounced for DRN-Members.

  </div>

  </div>


  <div class="card">
    <h2>Rank histogram by lead time</h2>
    ${resize((width) => rankHistLt(ranksLt, {width}))}
    <div>${inputLt}</div>
  <div class="card">

During all night-hour lead times, PME and EMOS-IMPROVER forecasts exhibit clear underdispersion, which is more pronounced for PME. DRN-Mean and DRN-Members show better performance, but for night lead times after 49 hours, they exhibit some positive bias.

For daylight-hour lead times, DRN-Mean and DRN-Members exhibit a fairly flat rank histogram for most lead times, obtaining the best results compared to other methods.

From lead times 6 to 12 hours, PME exhibits a clear positive bias, while a negative bias is reported from 16 to 21 hours. This behavior is mitigated by IMPROVER postprocessing and is almost fully corrected by DRN methodologies.

  </div>

  </div>
  <div class="card">
    <h1>Continuous Ranked Probability Score</h1>
    <div>${checkout}</div>
    ${resize((width) => plotCRPS(crps, {width}))}
  </div>
  <div class="card">
    <h2>Other</h2>
    <span class="big">${launches.filter((d) => d.stateId !== "US" && d.stateId !== "SU" && d.stateId !== "RU" && d.stateId !== "CN").length.toLocaleString("en-US")}</span>
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



<!-- Cards with big numbers -->

<div class="grid grid-cols-4">
   <div class="card">
    ${resize((width) => rankHistAll(ranks, {width}))}
  </div>
  <div class="card">
    <h2>Russia 🇷🇺 <span class="muted">/ Soviet Union</span></h2>
    <span class="big">${launches.filter((d) => d.stateId === "SU" || d.stateId === "RU").length.toLocaleString("en-US")}</span>
  </div>
  <div class="card">
    <h2>China 🇨🇳</h2>
    <span class="big">${launches.filter((d) => d.stateId === "CN").length.toLocaleString("en-US")}</span>
  </div>
  <div class="card">
    <h2>Other</h2>
    <span class="big">${launches.filter((d) => d.stateId !== "US" && d.stateId !== "SU" && d.stateId !== "RU" && d.stateId !== "CN").length.toLocaleString("en-US")}</span>
  </div>
</div>

---

<!-- Plot of launch history -->

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
    ],
    y: {label: "CRPS"},
    x: {label: "Lead time (hours)"},
  });
}
```

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
