---
title: "The Black-Litterman Model"
date: 2026-09-30
photos:
  - /events/2026-09-30/flyer.jpg
  - /events/2026-09-30/black-litterman-bullet.png
---
Building on our Modern Portfolio Theory session, we dove into the Black-Litterman model. We started with one of the biggest weaknesses of standard MPT: the optimizer is extremely sensitive to expected return inputs, and small guesses can lead to extreme, unrealistic portfolios. Black-Litterman fixes this by starting from market equilibrium, backing out the returns the market is already pricing in based on current weights, and then blending in our own views with a level of confidence attached to each one. In Python, we set up views on how different asset classes would perform, ran the Black-Litterman adjustment to get updated expected returns, and reran our Monte Carlo simulation to compare the new efficient frontier to the naive version. Seeing the optimal portfolio shift once our views were layered on top of the market's showed how institutional investors put the theory into practice.
