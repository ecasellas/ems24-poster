---
title: Conclusions
---

# Conclusions

In this poster, we presented the postprocessing of a multi-model ensemble forecast
(Poor Man's Ensemble; [PME](/data#numerical-weather-prediction-model))
using two different approaches. One approach applies non-homogeneous Gaussian regression or
Ensemble Model Output Statistics ([EMOS](/methodologies#ensemble-model-output-statistics)),
and the other applies Distributional Regression Neural Networks ([DRN](/methodologies#distributional-regression-neural-networks)).
From the [Results](/results) shown, the following conclusions arise:

- Using any of the postprocessing methodologies implies an improvement over the PME raw forecast.
- Among the methodologies used, DRN-Members, which uses the members of the PME as input features
instead of mean and standard deviation, obtains the lowest mean CRPS and also shows the flattest
rank histogram for 0-48 h lead times and a slightly positive bias for the 49-72 h lead time range.
- IMPROVER achieves better performance compared to DRN-Mean in terms of CRPS, but the latter
exhibits better performance regarding rank histograms as it shows a slight positive bias while
IMPROVER shows clear underdispersion.

