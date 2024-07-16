---
title: Data
---

# Data

The temperature forecast postprocessing methodologies used in this work require temperature observations and
Numerical Weather Prediction (NWP) temperature forecasts. The available data for this study comprises 27 months,
from March 2022 to May 2024 (both included).


## Temperature observations

The Meteorological Service of Catalonia maintains a dense network of 185 automatic weather stations (AWS)
([Serra et al. 2016](https://static-m.meteo.cat/wordpressweb/wp-content/uploads/2017/07/18141912/TECO16_XEMA_SERRA_ETAL.jpg))
that meet WMO standards in location, measurements, and quality control. AWS are spread across Catalonia,
with most of them (161) located in flat and populated areas. The remaining stations are divided evenly,
with half situated between 500 and 2000 m above sea level (m a.s.l.), and the other half above 2000 m a.s.l.,
considered high mountainous areas. Data is collected every 30 minutes, but here, only hourly 2-m air temperature data was considered.

```js
const limits = FileAttachment("data/ne_10m_coastline.json").json()
const stations = FileAttachment("data/station_metadata.json").json()
```

```js
const circle = d3.geoCircle().center([1.80, 41.6]).radius(1.45).precision(1)()
```

```js
Plot.plot({
  projection: {
    type: "mercator",
    rotate: [-9, -34],
    domain: circle
  },
  width: 650,
  height: 400,
  marks: [
    Plot.geo(limits, { stroke: "#ddd" }),
    Plot.dot(stations, {x: "longitude", y: "latitude", fill: "#efb118", stroke: "white", strokeWidth: 0.8,
                        channels: {
                          id: "station_id",
                          altitude: (d) => `${d.altitude} m`,
                          longitude: (d) => `${d.longitude}\u00b0`,
                          latitude: (d) => `${d.latitude}\u00b0`}, tip: true}),
    ]
})
```


## Numerical Weather Prediction model

Numerical Weather Prediction (NWP) model data was used from 10 different models to create what is commonly known
as a Poor Man's Ensemble (PME) or multi-model ensemble. The 10 models considered in this study are presented in
[Table 1](#table1). These NWP models have different spatial resolutions, ranging from 1 to 10 km. Before selecting
the nearest grid point of each model from every AWS, an interpolation to a 1 km spatial resolution is applied using
Python library [unimodel](https://github.com/meteocat/unimodel).

This approach follows a method similar to that described by [Demaeyer et al., (2023)](#references) to account for
altitude differences between each model's orography and that of a 1 km grid. The correction is performed by applying
a dynamic lapse-rate correction based on linear regression of air temperature-altitude pairs around each grid point
of the model, as outlined by [Sheridan et al., (2010)](#references).


```js
const pme_models = FileAttachment("data/pme_models.json").json()
const splits = FileAttachment("data/splits.json").json()
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
```


<a name="table1"></a>**Table 1:** Characteristics of the NWP models used in this study, including their names, spatial resolutions (in kilometers), temporal resolutions (in hours), and available lead times (in hours).
```js
Inputs.table(pme_models, {maxWidth: 660, header: {
    model: "Model name",
    spatial_resolution: "Spatial resolution (km)",
    temporal_resolution: "Temporal resolution (h)",
    lead_times: "Lead times (h)"
  }})
```

Since the 10 models considered here have different forecast lead times of 48 and 72 hours, the postprocessing for
this study is limited to 48 hours. This ensures that all models are postprocessed with consistent lead times,
and that the applied postprocessing techniques, EMOS Improver and Distributional Regression Networks, receive the
same amount of input feature variables.


```js
Plot.plot({
  marginLeft: 95,
  x: {
    axis: "bottom",
    grid: true,
    label: "Lead times (h)"
  },
  y: {
    grid: true,
    label: "NWP model"
  },
  marks: [
    Plot.ruleX([0]),
    Plot.barX(pme_models, {x: "lead_times", y: "model", tip: true, fill: "lightgrey"}),
    Plot.ruleX([48], {stroke: "tomato"})
  ]
})
```

## Training, validation, and test datasets

One of the postprocessing techniques relies on neural networks, which are typically trained using
training and validation datasets and then evaluated on an unseen dataset called the test dataset.
In this study, from a total of 27 available months, 18 were allocated to the training set, 5 to
the validation set, and 4 to the test set. The validation and test months were chosen to encompass
various characteristics and to cover all seasons of the year. The distribution of each split and
the months assigned to them are illustrated below.

```js
Plot.plot({
  marginLeft: 55,
  padding: 0,
  x: {label: "Month", ticks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      tickFormat: d => monthNames[d - 1]},
  y: {label: "Year", tickFormat: d => d.toString()},
  color: {legend: true,
          domain: ["Training", "Validation", "Test"]},
  marks: [
    Plot.cell(splits, {x: "month", y: "year", fill: "split", tip: true, inset: 0.5}),
  ]
})
```


#### References

<span style="font-size:0.85em;">

Demaeyer, J., Bhend, J., Lerch, S., Primo, C., Van Schaeybroeck, B., Atencia, A., ... & Vannitsem, S. (2023). The EUPPBench postprocessing benchmark dataset v1. 0. Earth System Science Data, 15(6), 2635-2653.

Sheridan, P., Smith, S., Brown, A., & Vosper, S. (2010). A simple height‐based correction for temperature downscaling in complex terrain. Meteorological Applications, 17(3), 329-339.

</span>