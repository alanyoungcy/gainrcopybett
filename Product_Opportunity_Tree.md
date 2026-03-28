# Product Opportunity Tree — Gainr Copy Betting Platform

> Opportunity Solution Tree (OST) for a sports prediction market copy-betting app targeting Kalshi / Polymarket.

## Mermaid Mindmap

```mermaid
mindmap
  root((Gainr: Maximize Sports Prediction Market ROI via Copy Betting))
    **Pain 1: Retail Bettors Lack Edge**
      S1: Analyst / Syndicate Profile & Leaderboard
        UI: Bio Section — Strategy Description & Analyst Background
        UI: Syndicate Leader Profile Card w/ Credentials
        UI: ROI vs Bank Employed — Clearly Labeled Metric
        UI: % Margin vs Turnover — Realistic Profitability Gauge
        UI: Winning Periods — e.g. 9/10 Winning Months = 90%
        UI: Win Rate as Market-Type Indicator — Not Primary Metric
        UI: Volatile Equity Curve Sparkline — Realistic Swings
        UI: Sport Distribution Pie Chart per Analyst
      S2: One-Click Copy Trading Engine
        UI: Copy Amount Input Modal
        UI: Copying Status Badge on Profile Card
        UI: Active Copy List in Portfolio Tab
        UI: Copy Allocation Slider — % of Bankroll
      S3: Real-Time Position Mirror
        UI: Live Sync Indicator Pulse Dot
        UI: Push Notification on New Mirrored Bet
        UI: Per-Analyst Copy P&L Tracker
    **Pain 2: Prediction Markets Are Hard to Parse**
      S4: Unified Multi-Platform Aggregator
        UI: Kalshi + Polymarket Combined Feed
        UI: Sport / League Filter Chips
        UI: Search Bar w/ Autocomplete
      S5: Visual Price Movement Charts
        UI: Yes/No Stacked Area Chart per Market
        UI: 6h / 24h / 7d Timeframe Toggle
        UI: Volume Badge & Trend Arrow
      S6: Simplified Yes/No Betting UX
        UI: Green YES / Red NO Price Buttons
        UI: Inline Bet Slip w/ Potential Return Calc
        UI: Bet Confirmation Toast
    **Pain 3: No Portfolio Visibility**
      S7: Unified Portfolio Dashboard
        UI: Balance / Invested / Returns Stat Cards
        UI: Copied Analysts Section w/ Live Status
        UI: Active Bets Section w/ Pending Badge
      S8: Performance Analytics
        UI: Portfolio Equity Curve — Volatile & Realistic
        UI: Winning Periods Ratio — User-Defined Timeframe
        UI: Margin vs Turnover Breakdown
        UI: Profit by Sport Breakdown Bar Chart
      S9: Risk Management Tools
        UI: Max Drawdown Alert Setting
        UI: Stop-Copy Threshold Slider
        UI: Position Size Limit Input
    **Pain 4: Trust & Transparency Gap**
      S10: Verified Track Record System
        UI: On-Chain Bet History Badge
        UI: Audited ROI vs Bank Verification Icon
        UI: Time-Weighted Return Metric
      S11: Social Proof & Community
        UI: Follower Count & Copier Count
        UI: Analyst Comment Thread
        UI: Upvote / Downvote on Predictions
      S12: Fee Transparency
        UI: Fee Breakdown Tooltip on Bet Slip
        UI: Platform vs Market Fee Split Label
        UI: Net Return After Fees Display
```

## Legend

| Layer | Description |
|---|---|
| **Root** | Core business objective |
| **Pain 1–4** | Segmented user pain points (Opportunities) |
| **S1–S12** | Software feature solutions |
| **UI:** | App-level UI presentation nodes |

## Key Metric Definitions

| Metric | Meaning | Why It Matters |
|---|---|---|
| **ROI vs Bank** | Return relative to total bankroll deployed | Primary performance measure; must be clearly labeled to avoid confusion with per-bet ROI |
| **% Margin vs Turnover** | Profit ÷ total wagered amount | Much lower number than ROI vs bank; shows realistic edge — serious bettors expect this |
| **Winning Periods** | % of user-defined periods (months) in profit | e.g. "9/10 winning months = 90%" — shows consistency, not just cumulative return |
| **Win Rate** | % of individual bets won | Indicates market type played (low win rate = long-shot markets, high = favorites); not a standalone success metric |

## Current Codebase Coverage

| Solution | Status |
|---|---|
| S1 Analyst Profile & Leaderboard | Partial — static mock data, no bio/strategy, missing margin & winning periods metrics |
| S2 One-Click Copy | Partial — client-side only, no persistence |
| S4 Aggregator | Not started — hardcoded markets |
| S5 Price Charts | Done — Area chart with Yes/No |
| S6 Yes/No Betting UX | Done — buttons + inline bet slip |
| S7 Portfolio Dashboard | Partial — stat cards + lists, no real data |
| S3, S8–S12 | Not started |
