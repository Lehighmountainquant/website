---
title: "Prediction Market Derivatives: Arbitrage, Economic Utility, and Pricing"
summary: "Options that expire with the event are just leveraged bets on the same outcome. Options that expire before it complete the market, letting you trade the volatility of the probability itself. Since Black-Scholes breaks at the 0–1 boundaries, we price them with a jump-diffusion model that matches how these markets actually move."
authors: ["Harrison Keen", "Christopher Byrnes"]
date: 2025-12-24
pdf: "/research/prediction-market-derivatives.pdf"
---

Prediction markets such as Kalshi and Polymarket let people trade the *probability* of an event, but not the *uncertainty of the path* that probability takes before the event resolves. This paper asks what an option on a binary contract is actually good for, and how it should be priced.

## Same-expiry options are redundant

A binary contract settles at either \$0 or \$1. A call with strike $K$ that expires at the same moment therefore pays either $1 - K$ or nothing, which is just a fixed multiple of the underlying payoff. A replication argument then pins down its price exactly:

$$
V_t = P_t \,(1 - K)
$$

Any other price is a risk-free arbitrage, so these options offer nothing beyond leverage on the underlying.

## Intermediate-expiry options complete the market

**Intermediate-Expiry Event Options (IEEOs)** expire *before* the event resolves and settle on the market price at that date. Because that price is continuous rather than 0 or 1, the payoff is genuinely convex. Two contracts can both trade at \$0.60 while one faces a court ruling this afternoon and the other a slow vote count. Only an options market can price that difference. The paper walks through two uses:

- hedging a news shock without selling the core position (for example, the July 2024 Biden drop-out)
- leveraged mean-reversion trades after a market overreacts to a single outlier poll

## Pricing bounded assets

Black-Scholes fails here because the price is capped between 0 and 1, and volatility collapses near the boundaries. The volatility "hump" scales like $\sqrt{P(1-P)}$. The paper compares three alternatives:

| Model | Idea | Trade-off |
| --- | --- | --- |
| Log-odds diffusion | Model $X_t = \ln\frac{P_t}{1-P_t}$ as Brownian motion | Respects 0/1, but ignores news jumps |
| Binomial tree | Step size scaled by $\sqrt{P(1-P)}$ | Handles early exercise; computationally heavy |
| Merton jump diffusion | Add Poisson jumps to the log-odds process | Captures news risk; hard to calibrate |

## Making it work in practice

Fully collateralized margining makes delta-hedged market making very capital-intensive, so options need portfolio margining to be viable. The authors also recommend RFQ rather than a central limit order book, to avoid splitting liquidity across many strikes. Settlement would use a 60-minute TWAP to resist manipulation near expiry. Finally, they argue that because IEEOs hedge real volatility risk, they should be regulated as swaps rather than as gaming contracts.

The full paper, with proofs, worked examples and references, is linked above.
