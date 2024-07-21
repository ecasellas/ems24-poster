---
title: Study site
---

# Study site

Catalonia is located in the northeastern part of the Iberian Peninsula and spans approximately 32,000 km².
It is predominantly characterized by a Mediterranean climate. The region is bordered by the Pyrenees mountain
range to the north, the Mediterranean Sea to the east and south, and the Ebre Valley to the west.

```js
const catalunya = FileAttachment("data/catalunya_fronteres.json.geojson").json()
const liniaCosta = FileAttachment("data/ne_10m_coastline.json").json()
const stations = FileAttachment("data/station_metadata.json").json()
```

```js
const circle = d3.geoCircle().center([1.80, 41.6]).radius(10.45).precision(1)()
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
    Plot.geo(catalunya, { stroke: "#ddd", fill: "#66c2a5" }),
    Plot.geo(liniaCosta, { stroke: "#ddd"}),
    ]
})
```

Despite its relatively small area, Catalonia exhibits significant orographic variability. This includes
the summits of the Pyrenees, which rise above 3,000 meters above sea level (ASL), coastal ranges that reach
between 500 and 1,000 meters ASL, and extensive plains such as the Central Depression.


```js
import {fromArrayBuffer} from "npm:geotiff";

const dem = FileAttachment("data/cat_dem.tif").arrayBuffer().then(fromArrayBuffer)
```

```js
const image = await dem.getImage();
const [values] = await dem.readRasters();
```


```js
function sequence(clrs, interp = d3.interpolateRgb) {
  const interps = [];
  for (let i = 0; i < clrs.length - 1; i++) {
    interps.push(interp(clrs[i], clrs[i + 1]));
  }
  return (t) => {
    if (t < 0) {
      return "blue";
    }
    const scaledT = d3.scaleLinear().range([0, clrs.length - 1])(t);
    const intT = Math.min(clrs.length - 2, Math.floor(scaledT));
    return interps[intT](scaledT - intT);
  };
}

const terrainClrs = [
  "rgb(141,166,141)",
  "rgb(172,194,155)",
  "rgb(221,219,167)",
  "rgb(254,235,181)",
  "rgb(248,212,153)",
  "rgb(241,170,109)",
  "rgb(227,112,72)"
]
```


```js

Plot.plot({
  width: 650,
  height: 400,
  color: {
    label: "Elevation (m)",
    interpolate: sequence(terrainClrs),
    legend: true,
    domain: [0, 3000]
  },
  marks: [
    Plot.raster(values, {width: image.getWidth(), height: image.getHeight()}),
    ],
  y: {reverse: true, axis: null},
  x: {axis: null},
  inset: 10
})
```

These geographic variations result in pronounced temperature and precipitation contrasts across the
region. In the interior, mean annual temperatures range from 2.1°C to 18°C, and mean annual precipitation
varies from 320 mm to 1,560 mm, depending on the area (Barnolas et al., 2024).


#### References

<span style="font-size:0.85em;">

Barnolas, M., Prohom, M., Serra, A. & Martín-Vide, J. (2024). Atles Climàtic de Catalunya 1991-2020. Termopluviometria mitjana. Servei Meteorològic de Catalunya, Nota d'estudi 75.

</span>