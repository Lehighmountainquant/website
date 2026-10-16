---
title: "Pairs Trading with an Ornstein–Uhlenbeck Spread"
summary: "Modeling the spread between two related stocks as a mean-reverting process, estimating its half-life, and turning it into a simple trading rule."
authors: ["Alex Rivera"]
date: 2026-09-28
tags: ["statistical arbitrage", "time series", "backtesting"]
---

> **Example write-up.** This is sample content showing how research posts look. Replace it with your members' real work, or keep it as a template.

## Idea

Two companies in the same business tend to move together. If their prices drift apart, we bet they come back together: buy the cheap one, short the expensive one.

## Model

Let $S_t = \ln P^{A}_t - \beta \ln P^{B}_t$ be the spread, with $\beta$ estimated by regressing $\ln P^A$ on $\ln P^B$. We model it as an Ornstein–Uhlenbeck process:

$$
dS_t = \theta(\mu - S_t)\,dt + \sigma\, dW_t .
$$

In discrete time this is an AR(1) regression, $S_{t+1} - S_t = a + c\,S_t + \varepsilon_t$, with $\theta \approx -c$ per period. The **half-life** of a deviation is

$$
t_{1/2} = \frac{\ln 2}{\theta}.
$$

A half-life of a few days to a few weeks is tradable; months usually isn't.

## Trading rule

Standardize the spread as a z-score $z_t = (S_t - \mu)/\sigma_S$, then:

- Enter short the spread when $z_t > 2$, long when $z_t < -2$
- Exit when $z_t$ crosses $0$
- Stop out if $|z_t| > 4$ — the relationship may have broken

## Caveats we ran into

- **Look-ahead bias:** $\beta$, $\mu$, and $\sigma_S$ must be estimated on past data only (rolling windows).
- **Costs matter:** two legs means double the commissions and spread; small edges vanish.
- **Regime breaks:** pairs that cointegrate for years can decouple after a merger or business change.
