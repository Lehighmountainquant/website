---
title: "Discovering the Memory Structure of FX Volatility: A LASSO-Based Kernel Identification Approach"
summary: "We test Guyon & Lekeufack's path-dependent volatility framework on ten years of EUR/USD data. A LASSO over 38 exponential-kernel features reaches 55.7% out-of-sample R², more than double the original two-feature model."
authors: ["Arvinder Singh", "Benjamin Andresen", "George Psarros"]
date: 2025-12-09
pdf: "/research/fx-volatility-memory.pdf"
---

Guyon and Lekeufack's *Volatility Is (Mostly) Path-Dependent* (2023) showed that a simple model built only from past returns explains most of the variation in S&P 500 implied volatility. This project asks whether the same holds for foreign exchange. FX trades around the clock, runs at much lower volatility than equities, and is driven by macro and central-bank cycles.

## Data

The data is 1-minute EUR/USD bars from Dukascopy covering 2012 through 2021. Duplicate timestamps were removed. Flat or repeated bars were masked rather than deleted, so the time grid stays intact.

## Method

The path-dependent volatility (PDV) model treats volatility as a function of two features built from past returns:

- **Trend feature:** kernel-weighted past returns, $R_{1,t} = \sum K_1(t - t_i)\, r_{t_i}$, which captures the leverage effect.
- **Volatility feature:** kernel-weighted past squared returns, $\Sigma_t = \sqrt{\sum K_2(t - t_i)\, r_{t_i}^2}$, which captures clustering.

Rather than assume a kernel shape, the team built each feature with **19 exponential kernels**, with decay rates from 0.001 to 10. That gives 38 candidate features, and LASSO picks out the memory time scales that matter. Exponential kernels update recursively, so building the features is $O(T)$ rather than $O(T^2)$. Training used a strict 70/30 time-ordered split and time-series cross-validation.

## Results

| Model | Test R² |
| --- | --- |
| Linear PDV (equity-calibrated kernels) | 22.4% |
| Random Forest PDV | 29.5% |
| LASSO | 55.1% |
| XGBoost | 54.9% |
| **LassoCV** | **55.7%** |

- **The multi-scale kernels matter.** The kernel parameters calibrated on daily S&P 500 data do not carry over to intraday FX.
- **A linear model is enough.** XGBoost does no better than LASSO and overfits slightly more, which matches Guyon & Lekeufack's finding.
- **FX remembers direction for longer.** The trend kernel decays much more slowly than in equities, consistent with macro- and carry-driven trends. The volatility kernel keeps the familiar "fast short-term plus slow long-term" shape.
- **Limits.** The model underestimates volatility in turbulent regimes. A natural next step is to add macroeconomic features and test other currency pairs.

The full paper, with the kernel plots and diagnostics, is linked above.
