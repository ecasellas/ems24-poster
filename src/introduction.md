---
title: Introduction
---

# Introduction

Uncertainty in numerical weather prediction (NWP) models can arise from various sources, such as initial
conditions or model parameterizations. Ensemble forecasts, typically generated through perturbed initial
conditions or diverse model physics, help address and quantify the uncertainty inherent in raw NWP models.

However, these forecasts may still contain biases and dispersion errors, traditionally mitigated using
non-homogeneous Gaussian regression (Ensemble Model Output Statistics, EMOS) ([Gneiting et al., 2005](#references)).
Nevertheless, emerging machine learning techniques, like Distributional Regression Networks (DRN)
([Rasp and Lerch, 2018](#references)), are capable of handling nonlinear relationships between predictors and
forecast distributions often yielding similar or superior results. 

## Postprocessing Ensemble Forecasts

Currently, at the Meteorological Service of Catalonia (SMC), a Model Output Statistics (MOS) system is implemented
for postprocessing the operational Weather Research and Forecasting (WRF) model temperature forecasts,
yielding notably error reduction. However, since only one model is postprocessed, there is no uncertainty
treatment. Therefore, considering the availability of a multi-model ensemble, also known as the Poor Man's
Ensemble, which includes 10 different models, a postprocessing approach for this ensemble is proposed.

This postprocessing is approached in two different ways:

- **EMOS using IMPROVER**: The Met Office developed a Python library, IMPROVER, which makes the application 
of EMOS straightforward.
- **DRN using TensorFlow**: The postprocessing is performed using neural networks to determine the parameters of the new temperature distribution.

#### References

<span style="font-size:0.85em;">

Gneiting, T., Raftery, A. E., Westveld, A. H., & Goldman, T. (2005). Calibrated probabilistic forecasting
using ensemble model output statistics and minimum CRPS estimation. Monthly Weather Review, 133(5), 1098-1118.

Rasp, S., & Lerch, S. (2018). Neural networks for postprocessing ensemble weather forecasts.
Monthly Weather Review, 146(11), 3885-3900.

</span>

