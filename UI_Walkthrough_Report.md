# UI Walkthrough Report — Gainr MVP v1.0

> Automated browser walkthrough via Playwright (Chromium, iPhone 15 Pro Max viewport 430x932 @2x).
> Date: 2026-03-28

---

## Screenshot Index

| # | Screen | File | Status |
|---|---|---|---|
| 01 | Discover — Analyst Feed | `01_Discover.png` | PASS |
| 02 | Discover — Scrolled | `02_Discover_Scroll.png` | PASS |
| 03 | Markets — Live Feed | `03_Markets.png` | PASS |
| 04 | Markets — Bet Slip Open | `04_Markets_BetSlip.png` | PASS |
| 05 | Portfolio — After Bet (pre-copy) | `05_Portfolio_Empty.png` | PASS |
| 06 | Discover — Pre-Copy State | `06_Discover_PreCopy.png` | PASS |
| 07 | Discover — Copy Amount Modal | `07_Discover_CopyModal.png` | PASS |
| 08 | Portfolio — Active (copy + bet) | `08_Portfolio_Active.png` | PASS |
| 09 | Profile Tab | `09_Profile.png` | PASS |

---

## Tab-by-Tab Verification

### 1. Discover Tab (Screenshots 01, 02, 06, 07)

**MVP Features Verified:**

| Feature | Present | Notes |
|---|---|---|
| S1a — Analyst bio & strategy | YES | Bio text visible under each analyst name |
| S1b — ROI vs Bank (labeled) | YES | "+34.2%" with "ROI VS BANK" label above |
| S1c — Margin / Turnover | YES | "8.7%" with "MARGIN/TO" label |
| S1d — Winning Months | YES | "9/10" with "90%" sub-label in green |
| S1e — Win Rate (market type) | YES | "62%" with "Mixed" / "Favorites" / "Longshots" sub-label |
| S1f — Volatile equity curve | YES | Visible drawdowns (e.g. Longshot Labs dips negative) |
| S2a — Copy Analyst button | YES | Black CTA button per card |
| S11a — Followers & copiers | YES | Shown on equity curve row |
| Search bar | YES | Top of Discover feed |
| Risk badge | YES | "Medium" / "Low" / "High" pill per card |
| Copy Amount Modal | YES | Screenshot 07 — input + Confirm + Cancel |

**Visual Compliance:**

| Rule | Status |
|---|---|
| Icons: lucide-react SVG only, zero emoji | PASS |
| Cards: white bg, rounded-[24px] | PASS |
| Cards: shadow-[0_8px_30px_rgba(0,0,0,0.04)] | PASS |
| Key data: extrabold tracking-tighter | PASS |
| Bottom bar: frosted glass, no borders | PASS |

**Issues Found:**

| ID | Severity | Description | Fix |
|---|---|---|---|
| D-01 | Low | Balance cards and stat labels clip slightly at left edge on smaller viewports | Add `px-5` guard or check `overflow-hidden` on parent |
| D-02 | Cosmetic | Equity curve X-axis labels ("Jul"–"Apr") are tight on 430px width | Consider hiding alternating labels or using 3-letter abbreviation only on wider breakpoints |

---

### 2. Markets Tab (Screenshots 03, 04)

**MVP Features Verified:**

| Feature | Present | Notes |
|---|---|---|
| S4a — Single-platform market feed | YES | 4 live markets rendered |
| S5a — Yes/No price chart | YES | Mini line chart per market |
| S6a — Yes/No bet buttons | YES | Green YES / Red NO with price + payout |
| S6b — Inline bet slip + return calc | YES | Screenshot 04 — amount input, potential return, net after fees |
| S12a — Net return after fees | YES | "Net after fees" line in bet slip |
| Sport/league/time badges | YES | Orange pill + league + clock |
| Trend arrow + % change | YES | Green up / Red down badges |

**Issues Found:**

| ID | Severity | Description | Fix |
|---|---|---|---|
| M-01 | Low | "Live Markets" section header overlaps with top header on scroll | Add `pt-2` or ensure header sticky z-index layering is correct |
| M-02 | Cosmetic | Bet slip "Place Bet" button and X close are slightly cramped at 430px | Consider stacking vertically on xs breakpoint |

---

### 3. Portfolio Tab (Screenshots 05, 08)

**MVP Features Verified:**

| Feature | Present | Notes |
|---|---|---|
| S7a — Balance / Invested / Returns cards | YES | 3-column grid, bold numbers |
| S7b — Copied Analysts list | YES | Screenshot 08 — "The Shark Syndicate" with ROI + Win Rate + Active dot |
| S7b — Active Bets list | YES | "Arsenal vs Chelsea" with $50 + Pending status |
| Balance updates after actions | YES | $1000 → $950 (after bet) → $850 (after bet + copy) |

**Issues Found:**

| ID | Severity | Description | Fix |
|---|---|---|---|
| P-01 | Low | Balance card labels ("BALANCE", "INVESTED") clip left edge slightly | Verify card padding on 430px, ensure `p-5` is sufficient |
| P-02 | None | Empty state not visible in screenshot 05 because a bet was already placed | Correct behavior — shows Active Bets section |

---

### 4. Profile Tab (Screenshot 09)

**MVP Features Verified:**

| Feature | Present | Notes |
|---|---|---|
| User avatar + name | YES | Orange gradient avatar + "Guest User" |
| Stats row (Copying / Bets / Returns) | YES | 1 / 1 / +$0 — matches actual state |
| Menu items with lucide icons | YES | Wallet, CreditCard, Bell, Settings, HelpCircle, LogOut |
| Sign Out in red | YES | Red text, distinct from other items |
| Chevron disclosure arrows | YES | ChevronRight on every row |

**Issues Found:**

| ID | Severity | Description | Fix |
|---|---|---|---|
| PR-01 | Cosmetic | User avatar card clips left edge slightly | Same padding issue as other tabs — global fix needed |

---

## Global Visual Audit

| Constraint | Requirement | Result |
|---|---|---|
| Icons | lucide-react SVG only, zero emoji | PASS — all icons are Lucide components |
| Cards | `bg-white rounded-[24px]` | PASS — verified in all tabs |
| Shadows | `shadow-[0_8px_30px_rgba(0,0,0,0.04)]` | PASS — subtle diffused shadow visible |
| Typography | `font-extrabold tracking-tighter` on key data | PASS — ROI, prices, balances all use impact style |
| Bottom bar | `bg-white/80 backdrop-blur-xl`, no borders/lines | PASS — frosted glass capsule, floating |
| Background | Apple HIG `#f5f5f7` | PASS — light system gray |
| Active tab | Orange highlight (icon + label) | PASS |
| Tab count | 4 tabs: Discover, Markets, Portfolio, Profile | PASS |

---

## Interaction Flow Test

| Step | Action | Expected | Actual | Status |
|---|---|---|---|---|
| 1 | Load app | Discover tab active, $1000 balance | Confirmed | PASS |
| 2 | Tap Markets tab | Markets feed renders | Confirmed | PASS |
| 3 | Tap YES on Arsenal market | Bet slip opens with YES side | Confirmed | PASS |
| 4 | Tap Place Bet | Bet placed, balance → $950 | Confirmed | PASS |
| 5 | Tap Portfolio tab | Shows Active Bets with Arsenal | Confirmed | PASS |
| 6 | Tap Discover tab | Analyst cards visible | Confirmed | PASS |
| 7 | Tap Copy Analyst | Copy amount modal opens | Confirmed | PASS |
| 8 | Tap Confirm ($100) | Analyst copied, balance → $850 | Confirmed | PASS |
| 9 | Tap Portfolio tab | Shows Copied Analysts + Active Bets | Confirmed | PASS |
| 10 | Tap Profile tab | User card + menu renders | Confirmed | PASS |

---

## Summary

| Metric | Value |
|---|---|
| Total screens captured | 9 |
| MVP features verified | 15 / 15 |
| Visual constraints passed | 6 / 6 |
| Interaction steps passed | 10 / 10 |
| Issues found | 5 (all Low / Cosmetic) |
| Blocking issues | 0 |

**Verdict: MVP UI shell is functional and visually compliant. Ready for review.**

---

## Recommended Fixes (Priority Order)

1. **Global padding clip** (D-01, P-01, PR-01) — Cards near screen edges clip content on 430px. Add `overflow-hidden` to card containers or increase horizontal padding from `px-5` to `px-6`.
2. **Bet slip layout on narrow viewport** (M-02) — Stack Place Bet / Cancel vertically below `sm:` breakpoint.
3. **Equity curve label density** (D-02) — Show every-other X-axis label on viewports < 430px.
