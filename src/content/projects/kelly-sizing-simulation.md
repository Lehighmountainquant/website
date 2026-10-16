---
title: "How Much Should You Bet? Simulating the Kelly Criterion"
summary: "We derive the Kelly fraction for a repeated binary bet and show by simulation why over-betting is far worse than under-betting."
authors: ["Sam Patel", "Jordan Lee"]
date: 2026-10-10
tags: ["probability", "position sizing", "python"]
code: "https://github.com/your-club-org/kelly-simulation"
---

> **Example write-up.** This is sample content showing how research posts look. Replace it with your members' real work, or keep it as a template.

## The setup

Suppose you repeatedly face a bet that pays $b$ to 1 and wins with probability $p$ (losing with probability $q = 1 - p$). Each round you stake a fraction $f$ of your current bankroll. After $n$ rounds with $W$ wins, wealth is

$$
X_n = X_0 \,(1 + bf)^{W}\,(1 - f)^{\,n - W}.
$$

Maximizing the expected *log* of wealth per round means maximizing the growth rate

$$
g(f) = p \ln(1 + bf) + q \ln(1 - f).
$$

Setting $g'(f) = 0$ gives the Kelly fraction:

$$
f^* = p - \frac{q}{b}.
$$

For an even-money bet ($b = 1$) with $p = 0.55$, that's $f^* = 0.10$ — stake 10% of your bankroll.

## Simulation

```python
import numpy as np

rng = np.random.default_rng(0)
p, b, n_rounds, n_paths = 0.55, 1.0, 1_000, 10_000

def simulate(f):
    wins = rng.random((n_paths, n_rounds)) < p
    growth = np.where(wins, np.log1p(b * f), np.log1p(-f))
    return growth.sum(axis=1)  # log terminal wealth, starting from 1

for f in [0.05, 0.10, 0.20, 0.30]:
    logw = simulate(f)
    print(f"f={f:.2f}  median wealth={np.exp(np.median(logw)):8.2f}  "
          f"P(lose money)={np.mean(logw < 0):.1%}")
```

## What we found

| Fraction $f$ | Relation to Kelly | Growth rate $g(f)$ |
|---|---|---|
| 0.05 | Half Kelly | 0.0038 |
| 0.10 | Full Kelly | 0.0050 |
| 0.20 | Double Kelly | −0.0001 |
| 0.30 | Triple Kelly | −0.0162 |

Half Kelly keeps about three quarters of the optimal growth rate with far less volatility. Double Kelly has a growth rate of essentially zero — the same edge on every bet, but the bankroll goes nowhere — and anything beyond that loses money almost surely over the long run, even though every single bet has positive expected value.

## Takeaways

- Positive expected value is not enough; **sizing** determines whether you survive.
- The growth curve is asymmetric: under-betting costs a little, over-betting costs a lot.
- In practice $p$ is estimated with error, which is why many practitioners bet a fraction of Kelly.
