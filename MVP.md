# Phase 2: MVP Core Feature Classification

> Kano Model evaluation of Gainr V1.0 features. Derived from the Product Opportunity Tree.

---

## MVP Feature Matrix

| # | Feature Module | User Story (≤15 words) | Kano | UI Complexity | Dev Complexity | MVP |
|---|---|---|---|---|---|---|
| S1a | Analyst Bio & Strategy | I read the strategy and analyst background before copying | Must-Have | Low | Low | ✅ |
| S1b | ROI vs Bank Metric | I see ROI clearly labeled as return vs bankroll | Must-Have | Low | Low | ✅ |
| S1c | % Margin vs Turnover | I see realistic profit margin relative to total wagered | Must-Have | Low | Low | ✅ |
| S1d | Winning Periods % | I see 9/10 winning months at a glance | Must-Have | Low | Medium | ✅ |
| S1e | Win Rate (Market-Type Indicator) | I gauge what market types this analyst plays | Must-Have | Low | Low | ✅ |
| S1f | Volatile Equity Curve | I see realistic performance swings, not smooth lines | Must-Have | Medium | Low | ✅ |
| S1g | Sport Distribution Chart | I see which sports the analyst specializes in | Expected | Low | Low | ✗ |
| S1h | AI-Powered Ranking | AI ranks analysts by risk-adjusted performance | Delight | Low | High | ✗ |
| S2a | One-Click Copy | I copy an analyst's strategy in one tap | Must-Have | Medium | Medium | ✅ |
| S2b | Copy Allocation Slider | I set what % of bankroll to allocate | Expected | Medium | Medium | ✗ |
| S3 | Real-Time Position Mirror | My bets auto-sync when analyst places a bet | Expected | Medium | High | ✗ |
| S4a | Single-Platform Market Feed | I browse sports prediction markets in one feed | Must-Have | Medium | Medium | ✅ |
| S4b | Multi-Platform Aggregation | I see Kalshi + Polymarket unified | Expected | Low | High | ✗ |
| S4c | Sport/League Filters | I filter markets by sport or league | Expected | Low | Low | ✗ |
| S5a | Yes/No Price Chart | I see price movement for Yes and No sides | Must-Have | Medium | Low | ✅ |
| S5b | Timeframe Toggle (6h/24h/7d) | I switch chart timeframes | Expected | Low | Medium | ✗ |
| S6a | Yes/No Bet Buttons | I tap YES or NO to bet instantly | Must-Have | Low | Low | ✅ |
| S6b | Inline Bet Slip + Return Calc | I see potential payout before confirming | Must-Have | Medium | Low | ✅ |
| S7a | Portfolio Balance Cards | I see balance, invested, and returns at a glance | Must-Have | Low | Low | ✅ |
| S7b | Active Copies & Bets List | I track all my open positions | Must-Have | Medium | Medium | ✅ |
| S8a | Portfolio Equity Curve | I see my overall performance over time | Expected | Medium | Medium | ✗ |
| S8b | Winning Periods Ratio (Portfolio) | I see my own winning months % | Expected | Low | Medium | ✗ |
| S9 | Risk Management Tools | I set stop-loss and max drawdown limits | Expected | High | High | ✗ |
| S10 | Verified Track Record | I trust analyst ROI is audited/on-chain | Delight | Low | High | ✗ |
| S11a | Follower & Copier Counts | I see social proof before copying | Delight | Low | Low | ✅ |
| S11b | Comments & Voting | I discuss predictions with the community | Delight | High | High | ✗ |
| S12a | Net Return After Fees | I see actual payout net of all fees | Delight | Low | Low | ✅ |
| S12b | Fee Breakdown Tooltip | I see platform vs market fee split | Expected | Low | Medium | ✗ |

---

## MVP Scope Summary

### Must-Have (13 items — non-negotiable)

| ID | Feature |
|---|---|
| S1a | Analyst bio, strategy description, syndicate leader background |
| S1b | ROI vs bank employed — clearly labeled |
| S1c | % margin vs turnover metric |
| S1d | Winning periods % (e.g. 9/10 winning months) |
| S1e | Win rate as market-type indicator |
| S1f | Volatile equity curve sparkline (realistic swings) |
| S2a | One-click copy trading |
| S4a | Single-platform market feed |
| S5a | Yes/No price movement chart |
| S6a | Yes/No bet buttons |
| S6b | Inline bet slip with return calculator |
| S7a | Portfolio balance/invested/returns cards |
| S7b | Active copies & bets tracking list |

### Delight Bonus (2 items — low cost, high impact)

| ID | Feature | Why Included |
|---|---|---|
| S11a | Follower & copier counts | Zero backend cost if denormalized; instant social proof |
| S12a | Net return after fees display | One subtraction in bet slip; builds trust on day one |

### Deferred to V1.1+

Everything marked ✗: AI ranking, copy allocation slider, real-time mirror, multi-platform aggregation, filters, timeframe toggle, portfolio analytics, risk management, on-chain verification, community features, fee breakdown.

---

## Kano Distribution

```
Must-Have  ████████████░░░░░░░░  13 features
Expected   ░░░░░░░░░░░░████████   9 features
Delight    ░░░░░░░░░░░░░░░░████   4 features (2 in MVP)
```

---

## Analyst Profile Card — MVP Fields

The analyst/syndicate profile card is the core trust surface. MVP fields:

| Field | Type | Purpose |
|---|---|---|
| **Name / Syndicate** | Text | Identity |
| **Bio** | Text (280 char max) | Strategy description + background |
| **ROI vs Bank** | % | Primary performance — clearly labeled |
| **Margin vs Turnover** | % | Realistic profitability (much lower number) |
| **Winning Months** | Ratio + % | e.g. "9/10 (90%)" — consistency signal |
| **Win Rate** | % | Market-type indicator, not primary metric |
| **Equity Curve** | Sparkline | Volatile, realistic — not smoothed |
| **Followers / Copiers** | Count | Social proof |
