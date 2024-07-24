---
theme: dashboard
title: Results Dashboard
------

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
    height: 450,
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
const circle = d3.geoCircle().center([1.71, 41.8]).radius(1.3).precision(1)()
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
    projection: {type: "mercator", rotate: [-9, -34], domain: circle},
    color: {range: colorRange, domain: domain, legend: true, label: "CRPS", nice: false},
    marks: [
      Plot.geo(comarques, {stroke: "#ddd", border: "none", background: "none"}),
      Plot.dot(selCrpsData, {x: "longitude", y: "latitude", fill: "value", stroke: "white", channels: {
                          id: "station_id",
                          longitude: (d) => `${d.longitude}\u00b0`,
                          latitude: (d) => `${d.latitude}\u00b0`}, tip: true, strokeWidth: 0.2})
    ],
  });
}
```


<div class="grid grid-cols-2">
  <div class="card">
    <h2>Continuous Ranked Probability Score by lead time</h2>
    <div>${checkout}</div>
    ${resize((width) => plotCRPS(crps, {width}))}
  </div>
    <div class="card">
    <h2>Continuous Ranked Probability Score on a map</h2>
    <div>${selMap}</div>
    ${resize((width) => plotMapCRPS(crpsMap, {width}))}
  </div>
</div>

<div class="grid grid-cols-2">
   <div class="card">
    <h2>Rank histogram</h2>
    ${resize((width) => rankHistAll(ranks, {width}))}
    <div>${inputLtSet}</div>
  </div>
    <div class="card">
    <h2>Rank histogram by lead time</h2>
    ${resize((width) => rankHistLt(ranksLt, {width}))}
    <div>${inputLt}</div>
  </div>
</div>

<div class="grid grid-cols-2">


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



