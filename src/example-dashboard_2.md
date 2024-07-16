---
theme: dashboard
title: 
toc: false
---

# Ensemble Model Output Statistics 🚀

<!-- Load and transform the data -->

```js
const launches = FileAttachment("data/launches.csv").csv({typed: true});
const ranks = FileAttachment("data/prova_ems.json").json();
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

<div class="grid grid-cols-2">
   <div class="card">
    <h1>IMPROVER</h1>
    ${resize((width) => rankTest(ranks, {width}))}
  </div>
  <div class="card">
    <h2>Russia 🇷🇺 <span class="muted">/ Soviet Union</span></h2>
    <span class="big">${launches.filter((d) => d.stateId === "SU" || d.stateId === "RU").length.toLocaleString("en-US")}</span>
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



<!-- Cards with big numbers -->

<div class="grid grid-cols-4">
   <div class="card">
    ${resize((width) => rankTest(ranks, {width}))}
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

<!-- Plot of launch history -->

```js
const checkout = 
  Inputs.checkbox(["PME", "IMPROVER", "DRN-Mean", "DRN-Members", "DRN-Members-Ext"], {
    sort: true,
    unique: true,
    value: ["PME", "IMPROVER", "DRN-Mean", "DRN-Members", "DRN-Members-Ext"],
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
    color: {legend: true},
    marks: [
      Plot.line(data.filter((d) => subject.includes(d.variable)), {x: "lead_time", y: "value", stroke: "variable", tip: true}),
    ],
    y: {label: "CRPS"},
    x: {label: "Lead time (hours)"}
  });
}
```

```js
function rankTest(data, {width} = {}) {

return Plot.plot({
    title: "Rank Histogram",
    width,
    height: 300,
    marks: [
      Plot.barY(data.pme, {fill: "lightgrey", stroke: "lightgrey", opacity: 0.5}),
      Plot.barY(data.emos, {fill: "blue", stroke: "blue", opacity: 0.5}),
      Plot.ruleY([1 / 11], {stroke: "grey"}),
    ],
  });
}
```

<div class="grid grid-cols-1">
  <div class="card">
    ${resize((width) => rankTest(ranks, {width}))}
  </div>
</div>

<!-- Plot of launch vehicles -->

```js
function vehicleChart(data, {width}) {
  return Plot.plot({
    title: "Popular launch vehicles",
    width,
    height: 300,
    marginTop: 0,
    marginLeft: 50,
    x: {grid: true, label: "Launches"},
    y: {label: null},
    color: {...color, legend: true},
    marks: [
      Plot.rectX(data, Plot.groupY({x: "count"}, {y: "family", fill: "state", tip: true, sort: {y: "-x"}})),
      Plot.ruleX([0])
    ]
  });
}
```

<div class="grid grid-cols-1">
  <div class="card">
    ${resize((width) => vehicleChart(launches, {width}))}
  </div>
</div>

Data: Jonathan C. McDowell, [General Catalog of Artificial Space Objects](https://planet4589.org/space/gcat)
