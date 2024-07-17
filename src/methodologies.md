---
title: Methodologies
---

# Methodologies

Post-processing ensemble forecasts is usually approached using two main techniques: Bayesian Model Averaging
(BMA; [Raftery et al., 2005](#references)) and non-homogeneous regression (EMOS; [Gneiting et al., 2005](#references)), both of which
calibrate parametric forecast distributions. Therefore, a distribution has to be chosen in order to adjust
and calibrate its parameters.

Since this project involves working with temperature forecasts, a Gaussian or
normal distribution can be assumed, with location (${tex`\mu`}) and scale (${tex`\sigma`}) parameters derived from the mean and standard
deviation of the ensemble or from the individual ensemble members.

${tex.block`
   \mathcal{N}(x \mid \mu, \sigma^2) = \frac{1}{\sqrt{2 \pi \sigma^2}} \exp\left(-\frac{(x - \mu)^2}{2 \sigma^2}\right),
  `}

where:
- ${tex`\mu`} is the mean
- ${tex`\sigma^2`} is the variance
- ${tex`\sigma`} is the standard deviation

For this work, two different strategies were tested to post-process temperature ensemble forecasts. One is
EMOS using the implementation in IMPROVER, and the other is Distributional Regression Neural Networks proposed
by [Rasp and Lerch (2018)](#references). 

## Ensemble Model Output Statistics

IMPROVER, developed by the Met Office, includes a module that implements EMOS with different distributions, allowing
the use of either the mean and standard deviation of an ensemble or the individual realizations of the ensemble
([Roberts et al., 2023](#references)). In this study, only the latter approach was tested, as we have a multi-model
ensemble and, a priori, the members are not equally probable.

This methodology is often applied using recent data, which is also the case in this study. A rolling training period
of 45 days is used, meaning that a forecast for today is obtained with a model trained on data from the past 45 days.

```js
const pme_models = FileAttachment("data/improver_training.json").json()
```

```js
Plot.plot({
  x: {
    axis: "bottom",
    grid: true,
    label: "Days"
  },
  y: {
    grid: true,
    label: ""
  },
  marks: [
    Plot.barX(pme_models, {
      x: "value",
      y: "category",
      fill: "type",
      title: d => `${d.type}: ${d.value}`
    })
  ],
  color: {legend: true, domain: ["Training", "Forecast"]}
})
```

As mentioned in the [Data](/data) section, there are not the same number of models for all
lead times, as three of them end at 48 hours of lead time. However, since the strategy involves
calculating a calibration correction for each lead time and station, this was not a problem.
From 0 to 48 lead times, 10 models are used to calculate the EMOS coefficients, and from 49 to
72, only 7 models are used. This methodology is referred to in this project as *EMOS-IMPROVER*.

Since the values of the ensemble members are used instead of the mean and standard deviation,
the normal distribution is defined as follows:

${tex.block`
    \mathcal{N}(a + b_1X_1 + ... + b_mX_m, \sqrt{c + dS^{2}}),
    `}

where the location parameter ${tex`\mu`} is the weighted mean of the ensemble forecasts
(with weights ${tex`b_i`}). Parameters ${tex`a`}, ${tex`b_i`}, ${tex`c`} and ${tex`d`} are determined
using the training data and by minimising the Continuous Ranked Probability Score (CRPS).

To obtain a calibrated forecast, the parameters can be used to determine the location and scale parameter
of the normal distribution. More information can be found at
[EMOS - IMPROVER](https://improver.readthedocs.io/en/latest/improver.calibration.ensemble_calibration.html#ensemble-model-output-statistics-emos).

---

## Distributional Regression Neural Networks

The estimation of the calibrated distribution parameters ${tex`\mu`} and ${tex`\sigma`} can also be
performed using neural networks. [Rasp and Lerch (2018)](#references) proposed using neural networks
for distributional regression tasks. In their study, the ECMWF ensemble was postprocessed with a
fully connected neural network, achieving a 30% CRPS reduction with DRN compared to the raw ECMWF ensemble.

The network used the ensemble mean and standard deviation as input features, together with station
embeddings. The latter allowed the network to learn station-specific information ([Rasp and Lerch (2018)](#references)).
Additionally, some auxiliary input features were used, such as convective available potential energy,
cloud cover, soil moisture, altitude of the station, and station location coordinates.

```js
FileAttachment("data/drn_rasp_lerch.png").image({width: 550, style: "border: 6px solid white; border-radius: 1%;"})
```

In this study, the idea of using neural networks for distributional regression tasks is also employed,
following a similar approach to that of [Rasp and Lerch (2018)](#references). Since the Poor Man's
Ensemble ([PME](/data#numerical-weather-prediction-model)) is used, which involves different models,
some changes were implemented:

- Use of station embeddings with more than two dimensions.
- No auxiliary variables, apart from 2-m temperature forecasts, are used as input features.
- More hidden layers are considered for the architecture of the neural network.
- Ensemble members are also considered as input features, rather than just their mean and standard deviation.
- Use of a dropout layer.

The optimisation of embeddings dimensions, number of hidden layers, number of units per layer, and dropout rate was
done using [Optuna](https://optuna.org/). The DRN techniques were implemented using Python libraries
Tensorflow ([Abadi et al. 2016](#references)) and Keras ([Chollet et al. 2021](#references)). The loss function used
is the same as in [Rasp and Lerch (2018)](#references), CRPS.

The training of the DRN was done in the Kaggle environment. The Adam optimizer was used, together with an early
stopping configuration to avoid overfitting and a reduction in the learning rate when the loss reached a plateau.

### DRN approaches

As aforementioned, the use of the Poor Man's Ensemble (PME) involves different models and is not an ensemble built
from perturbations of a single model. Therefore, a DRN approach may benefit from using ensemble members rather than
just their mean and standard deviation. Additionally, as presented in the Data section, not all lead times have the
same number of models, which poses a challenge for defining a single DRN for the entire postprocessing of PME.
Therefore, two approaches were proposed:

- *DRN-Mean*: The mean and standard deviation of the ensemble are used as input features. This approach has the
advantage of being independent of how the mean and standard deviation are obtained, so a single DRN can be trained.

- *DRN-Members*: The ensemble members are used as input features. This approach requires the training of two DRNs,
one for the 0-48 lead times and another for the 49-72 lead times, since a different number of models are available
for each set of lead times.

---

#### References

<span style="font-size:0.85em;">

Abadi, M., Barham, P., Chen, J., Chen, Z., Davis, A., Dean, J., ... & Zheng, X. (2016). TensorFlow: a system for Large-Scale machine learning. In 12th USENIX symposium on operating systems design and implementation (OSDI 16) (pp. 265-283).

Chollet, F. (2021). Deep learning with Python. Simon and Schuster.

Gneiting, T., Raftery, A. E., Westveld, A. H., & Goldman, T. (2005). Calibrated probabilistic forecasting using ensemble model output statistics and minimum CRPS estimation. Monthly Weather Review, 133(5), 1098-1118.

Raftery, A. E., Gneiting, T., Balabdaoui, F., & Polakowski, M. (2005). Using Bayesian model averaging to calibrate forecast ensembles. Monthly weather review, 133(5), 1155-1174.

Rasp, S., & Lerch, S. (2018). Neural networks for postprocessing ensemble weather forecasts. Monthly Weather Review, 146(11), 3885-3900.

Roberts, N., Ayliffe, B., Evans, G., Moseley, S., Rust, F., Sandford, C., ... & Worsfold, M. (2023). IMPROVER: the new probabilistic postprocessing system at the Met Office. Bulletin of the American Meteorological Society, 104(3), E680-E697.


</span>