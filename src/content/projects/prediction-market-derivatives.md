---
title: "Prediction Market Derivatives: Arbitrage, Economic Utility, and Pricing"
summary: "Options that expire at the same time as the underlying event are mathematically redundant. Options that expire before the event resolves complete the market by separating volatility risk from outcome probability. We propose a Jump Diffusion pricing model to account for the discontinuous information flow of prediction markets, and identify collateral inefficiencies that inhibit market development."
authors: ["Harrison Keen", "Christopher Byrnes"]
date: 2025-12-24
pdf: "/research/prediction-market-derivatives.pdf"
---

Prediction markets are built on the Arrow-Debreu security, a contract that pays one unit of currency if a specific state of the world occurs and zero otherwise. Platforms such as Kalshi and Polymarket have turned these binary contracts into a liquid asset class, yet the market remains incomplete. Participants can trade on the probability of an event (the first moment), but there is no mechanism to trade the uncertainty of the path (the second moment). This paper asks: what is the economic role of an option on a binary asset?

## Same-expiry options are redundant

Because the underlying contract is capped between $0$ and $1$, an option expiring at the same moment as the event has a linear payoff. A call with strike $K$ pays $1 - K$ if the event occurs and nothing if it fails, so the option payoff is a constant multiple of the underlying payoff. To prevent arbitrage, the option price must be that same multiple of the underlying price:

$$
V_t = P_t \,(1 - K)
$$

The proof builds a portfolio that is long one unit of the underlying and short $\tfrac{1}{1-K}$ units of the option. It pays \$0 in every state of the world, so it is riskless and its current cost must be zero. Options expiring with the event are therefore economically redundant: they offer no unique value or utility not already present in the underlying contract.

## Intermediate-expiry options complete the market

Options expiring before the event, which we call **Intermediate-Expiry Event Options (IEEOs)**, create a fundamentally new financial product. On the option's expiry date the underlying has not yet settled to \$0 or \$1. It settles to the market price, which is continuous, so the payoff captures convexity. An IEEO does not care who wins the election; it is a derivative on the path of the probability, whereas the underlying contract is a derivative on the outcome of the event.

This allows the decoupling of price and volatility. Two events may share an identical probability (for example $P = 0.60$) but have radically different information arrival processes, such as a pending court ruling versus a slow vote count. The paper walks through two uses:

- **The "Biden drop-out" hedge.** A trader long "Joe Biden Wins" at \$0.40 on July 15, 2024 fears he may leave the race. Rather than selling her position, she buys a put expiring July 22 with a \$0.35 strike. When the withdrawal crashes the price to \$0.01, the put pays \$0.34 and offsets the loss on the core position.
- **The mean-reversion trade.** A single low-quality outlier poll pushes a \$0.50 market down to \$0.42. A trader who sees noise rather than signal buys a one-week \$0.45 call for \$0.02. When the price reverts to \$0.50, the option returns about 200%, against 19% for simply holding the underlying.

The paper also identifies a "Gamma Trap" near $P = 0.50$, where a move from \$0.49 to \$0.51 can alter an option's delta by over 500%. Near the boundaries the option behaves almost identically to the underlying and gamma is negligible. This suggests variable tick sizes: wider near \$0.50, tighter near \$0.05 or \$0.95.

## Pricing bounded assets

Black-Scholes assumes unbounded Geometric Brownian Motion, which fails for binary contracts. It assigns non-zero probability to $S_T > 1$ and assumes constant volatility, overpricing out-of-the-money options and underpricing at-the-money ones. Because a bounded price cannot exceed 1 or fall below 0, its volatility must be state-dependent. It mirrors the variance of a Bernoulli trial, $\sigma(P) \propto \sqrt{P(1-P)}$, which creates a "volatility hump": uncertainty is maximized at $P = 0.5$ and vanishes at the boundaries.

The paper also argues that prices do not diffuse linearly with calendar time. Models should instead use event time, a clock that only ticks when new information arrives. Three alternative frameworks are compared:

| Model | Idea | Trade-off |
| --- | --- | --- |
| Log-odds diffusion | Map the price to an unbounded "shadow asset" $X_t = \ln\left(\dfrac{P_t}{1-P_t}\right)$ and model it as Brownian motion | Tractable and respects the 0/1 boundaries, but assumes information arrives continuously and likely underprices deep out-of-the-money options |
| Binomial tree | Up and down steps scaled by $\sqrt{P(1-P)}$ | Respects 0/1 and captures the volatility hump, but ignores jumps and is computationally expensive |
| Merton jump diffusion | Add a Poisson jump component to the log-odds process | Captures news risk and fat tails, but its parameters are hard to calibrate |

The log-odds integral has no closed-form solution and must be solved by numerical integration or Monte Carlo simulation. The jump-diffusion model allows gaps in the price path, which matters because prediction markets exhibit periods of low volatility punctuated by discontinuous shocks such as court rulings or election calls. The binomial model also reveals a skew: in equity markets downside puts are expensive, while in prediction markets "uncertainty calls" are expensive.

The jump model also shows why an options market is needed. In the pure Bernoulli framework volatility is a deterministic function of price, so options would be redundant. But two contracts trading at \$0.60 can differ sharply: one faces a court ruling at 4:00 PM that will send the price to \$0.90 or \$0.10, the other a slow vote count. The spot market prices the first moment, the expected outcome. The options market is required to price the second moment, the uncertainty of the path.

## Implementation constraints

The primary barrier to liquidity is capital inefficiency. Under fully funded, gross margining, a market maker hedging a delta-neutral book must post collateral for both the option and its hedge, \$0.75 in the paper's example, versus well under \$0.05 if a clearinghouse recognized the hedge under portfolio margining. Until platforms implement SPAN-like clearing engines, option spreads will remain prohibitively wide.

Splitting liquidity across many strikes dilutes the order book, so the paper recommends a Request for Quote (RFQ) system instead of a central limit order book. To mitigate manipulation of the settlement price ("banging the close"), it proposes a 60-minute TWAP with 1-minute observation intervals, following the CoinDesk Indices methodology.

On regulation, Kalshi v. CFTC (2024) established that event contracts are not gaming instruments provided they serve a valid economic purpose. Because IEEOs let participants hedge volatility distinct from the outcome, just as swaptions let institutions manage the volatility of future rates, the paper argues they should be regulated as swaps rather than gaming contracts.

## Conclusion

We prove that options expiring simultaneously with the underlying binary contract are economically redundant, and that options expiring before the event resolves are non-redundant because they trade information-flow volatility independent of the terminal event probability. Standard geometric Brownian motion models are ill-suited to the bounded domain of prediction markets. Log-odds diffusion offers a tractable solution for general pricing, but a jump diffusion framework is necessary to capture the "fat tail" risk of discrete news events. Future work should calibrate the jump intensity parameters in political markets and develop cross-margining protocols to improve capital efficiency for liquidity providers.

The full paper, with proofs, worked examples and references, is linked above.
