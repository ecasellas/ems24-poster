---
toc: false
---

<style>

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--sans-serif);
  margin: 4rem 0rem 4rem;
  text-wrap: balance;
  text-align: center;
}

.hero h1 {
  margin: 2rem 0;
  max-width: none;
  font-size: 12vw;
  font-weight: 900;
  line-height: 1.1;
  background: linear-gradient(30deg, var(--theme-foreground-focus), currentColor);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero h2 {
  margin: 0;
  max-width: 34em;
  font-size: 20px;
  font-style: initial;
  font-weight: 500;
  line-height: 1.5;
  color: var(--theme-foreground-muted);
}

@media (min-width: 640px) {
  .hero h1 {
    font-size: 50px;
  }
}


  .responsive-container {
    position: relative;
    width: 100%;
    height: 73%;
    margin-bottom: 10px;
  }
  .responsive-plot {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .link-container {
    margin-top: 10px;
  }
  .link-container a {
    display: inline-block;
    padding: 5px;
    background: white;
    border: 1px solid #ccc;
    text-decoration: none;
    color: black;
  }

</style>

<div class="hero">
  <h1>Postprocessing multi-model ensemble temperature forecasts using Distributional Regression Networks</h1>
  <h3>Enric Casellas Masana, Josep Ramon Miró Cubells, and Jordi Moré Pratdesaba</h3>
</div>

<div class="grid grid-cols-3">
  <div class="card" style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
    <h1>Introduction</h1>
    <p>This work presents a comparative analysis of postprocessing techniques for multi-model weather ensemble forecasts (Poor Man's Ensemble).</p>
    <p>We explore the application of Ensemble Model Output Statistics (EMOS) using the IMPROVER framework and also two Distributional Regression Network (DRN) approaches to postprocess hourly temperature forecasts.</p>
    <a href="introduction"><span>Go to Introduction &#8599;</span></a>
  </div>

  <div class="card" style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
    <h1>Study zone</h1>
  <div class="responsive-container">
    <div class="responsive-plot">
      ${resize((width, height) => {
        return plotMapCRPS({width, height});
      })}
    </div>
  </div>
    <a href="study_zone"><span>Go to Study Zone &#8599;</span></a>
  </div>

  <div class="card" style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
    <h1>Data</h1>

<span style="font-size: 30px; font-weight: 900;">27</span> months of air temperature hourly data

<span style="font-size: 30px; font-weight: 900">10</span> member multi-model ensemble

<span style="font-size: 30px; font-weight: 900">186</span> automatic weather stations as ground truth

  <a href="data"><span>Go to Data &#8599;</span></a>
  </div>

</div>


<div class="grid grid-cols-3">

  <div class="card">
    <h1>Methodologies</h1>
    <div class="card">
      <div style="display: flex; padding: 0px; align-items: center;">
       <img src="data/improver_logo_small.png" style="width: 20%; height: 20%; margin-right: 15px;"></img>
       <p>Ensemble Model Output Statistics (<a href="methodologies/#ensemble-model-output-statistics">EMOS</a>), implemented using <a href="https://improver.readthedocs.io/en/latest/index.html">IMPROVER</a> developed by the Met Office, is used with ensemble members.</p>
      </div>
    </div>
    <div class="card">
      <div style="display: flex; padding: 0px; align-items: center;">
       <img src="data/nn3.png" style="width: 20%; height: 20%; margin-right: 15px;"></img>
       <p>Distributional Regression Networks (<a href="methodologies/#distributional-regression-neural-networks">DRN</a>), based on Rasp and Lerch (2018), are implemented using <a href="https://www.tensorflow.org/">TensorFlow</a>. Either the mean and standard deviation of the ensemble or its individual members are utilized in the implementation.</p>
      </div>
    </div>   
  <a href="methodologies"><span>Go to Methodologies &#8599;</span></a>  
  </div>
  

  <div class="card grid-rowspan-2 grid-colspan-2" style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
  
  <h1>Results</h1>
    <div class="card">
    ${resize((width) => plotCRPS(crps, width))
    }
    </div>
    <div class="card">
    ${resize((width) => rankHistAll(ranks, {width}))}
    </div>
  <a href="results"><span>Go to Results &#8599;</span></a>
  </div>

  <div class="card" style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
    <h1>Conclusions</h1>
    <div class="card">Any postprocessing method improves upon the raw PME forecast.</div>
    <div class="card">DRN-Members, which uses PME members as input features, achieves the lowest mean CRPS and the flattest rank histogram for 0-48 hours</div>
    <div class="card">IMPROVER performs better than DRN-Mean in CRPS but has poorer rank histograms. DRN-Mean shows a slight positive bias, while IMPROVER displays some underdispersion.</div>

  <a href="conclusions"><span>Go to Conclusions &#8599;</span></a>
  </div>

</div>


```js
const aapl = FileAttachment("aapl.csv").csv({typed: true});
const penguins = FileAttachment("penguins.csv").csv({typed: true});
```

---

```js
const catalunya = FileAttachment("data/catalunya_fronteres.json.geojson").json()
const liniaCosta = FileAttachment("data/ne_10m_coastline.json").json()
const stations = FileAttachment("data/station_metadata.json").json()
```

```js
const circle = d3.geoCircle().center([1.80, 41.6]).radius(10.45).precision(1)()
```

```js
function plotMapCRPS({width, height} = {}) {

return Plot.plot({
  projection: {
    type: "mercator",
    rotate: [-9, -34],
    domain: circle
  },
  width: width,
  height: height,
  marks: [
    Plot.geo(catalunya, { stroke: "#ddd", fill: "#66c2a5" }),
    Plot.geo(liniaCosta, { stroke: "#ddd"}),
    ]
})
}
```

```js
const launches = FileAttachment("data/launches.csv").csv({typed: true});
const ranks = FileAttachment("data/rankhist_all.json").json();
const ranksLt = FileAttachment("data/rankhist_lead_times.json").json();
const crps = FileAttachment("data/ems_crps_results.json").json();
const comarques = FileAttachment("data/catalunya_fronteres.json.geojson").json();
const crpsMap = FileAttachment("data/crps_map.json").json();
```


```js
function plotCRPS(data, {width} = {}) {


return Plot.plot({
    title: "",
    width,
    height: 300,
    color: {legend: true, domain: ["PME", "IMPROVER", "DRN-Mean", "DRN-Members"]},
    marks: [
      Plot.line(data, {x: "lead_time", y: "value", stroke: "variable", tip: true}),
      Plot.gridX(),
      Plot.gridY()
    ],
    y: {label: "CRPS"},
    x: {label: "Lead time (hours)"},
  });
}
```

```js
function rankHistAll(data, {width} = {}) {

const ruleYValue = [1 / 11];

const setData = data.filter((d) => d.lead_time == "0-48 h")

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


## Acknowledgements

<div class="grid grid-cols-4">
  <div class="card" style="text-align: center;">
    <img src="data/meteocat_c_blanc.png" style="width: 60%;"></img>
  </div>
  <div class="card" style="display: grid; place-items: center;">
    <img src="data/accioclimatica_blanc_h3.png" style="max-width: 100%; max-height: 100%;"></img>
  </div>
</div>
