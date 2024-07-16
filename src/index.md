---
toc: false
---

<style>

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--sans-serif);
  margin: 4rem 0 8rem;
  text-wrap: balance;
  text-align: center;
}

.hero h1 {
  margin: 2rem 0;
  max-width: none;
  font-size: 14vw;
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

</style>

<div class="hero">
  <h1>Postprocessing multi-model ensemble temperature forecasts using Distributional Regression Networks</h1>
  <h2>Enric Casellas Masana, Josep Ramon Miró Cubells, and Jordi Moré Pratdesaba</h2>
  <h2>
    Welcome to our EMS poster! This work presents a comparative analysis of postprocessing techniques for 
    multi-model weather ensemble forecasts (Poor Man's Ensemble). We explore the application of Ensemble Model
    Output Statistics (EMOS) using the IMPROVER framework and also a Distributional Regression Network (DRN) approach.
  </h2>
</div>

<div class="grid grid-cols-4" style="grid-auto-rows: 304px;">
  <div class="card">
    <h1>Introduction</h1>
    <a href="introduction"><span>Go to Introduction &#8599;</span></a>
  </div>

  <div class="card">
    <h1>Study zone</h1>
    <a href="introduction"><span>Go to Study zone &#8599;</span></a>
  </div>

  <div class="card">
    <h1>Data</h1>
    <a href="introduction"><span>Go to Data &#8599;</span></a>
  </div>

  <div class="card">
    <h1>Methodologies</h1>
    <a href="in"><span>Go to Methodologies &#8599;</span></a>
  </div>

</div>

<div class="grid grid-cols-2" style="grid-auto-rows: 504px;">
  <div class="card">
    <h1>Results</h1>
    <a href="introduction"><span>Go to Results &#8599;</span></a>
  </div>

  <div class="card">
    <h1>Conclusions</h1>
    <a href="introduction"><span>Go to Conclusions &#8599;</span></a>
  </div>
</div>

<div class="grid grid-cols-1" style="grid-auto-rows: 204px;">
  <div class="card">
    <h1>Take home messages</h1>
    <a href="introduction"><span>Go to Take home messages &#8599;</span></a>
  </div>
</div>

```js
const aapl = FileAttachment("aapl.csv").csv({typed: true});
const penguins = FileAttachment("penguins.csv").csv({typed: true});
```

---

## Next steps

Here are some ideas of things you could try…

<div class="grid grid-cols-4">
  <div class="card">
    Chart your own data using <a href="https://observablehq.com/framework/lib/plot"><code>Plot</code></a> and <a href="https://observablehq.com/framework/files"><code>FileAttachment</code></a>. Make it responsive using <a href="https://observablehq.com/framework/display#responsive-display"><code>resize</code></a>.
  </div>
  <div class="card">
    Create a <a href="https://observablehq.com/framework/project-structure">new page</a> by adding a Markdown file (<code>whatever.md</code>) to the <code>src</code> folder.
  </div>
  <div class="card">
    Add a drop-down menu using <a href="https://observablehq.com/framework/inputs/select"><code>Inputs.select</code></a> and use it to filter the data shown in a chart.
  </div>
  <div class="card">
    Write a <a href="https://observablehq.com/framework/loaders">data loader</a> that queries a local database or API, generating a data snapshot on build.
  </div>
  <div class="card">
    Import a <a href="https://observablehq.com/framework/imports">recommended library</a> from npm, such as <a href="https://observablehq.com/framework/lib/leaflet">Leaflet</a>, <a href="https://observablehq.com/framework/lib/dot">GraphViz</a>, <a href="https://observablehq.com/framework/lib/tex">TeX</a>, or <a href="https://observablehq.com/framework/lib/duckdb">DuckDB</a>.
  </div>
  <div class="card">
    Ask for help, or share your work or ideas, on the <a href="https://talk.observablehq.com/">Observable forum</a>.
  </div>
  <div class="card">
    Visit <a href="https://github.com/observablehq/framework">Framework on GitHub</a> and give us a star. Or file an issue if you’ve found a bug!
  </div>
</div>
