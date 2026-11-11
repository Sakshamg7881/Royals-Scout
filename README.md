# Rajasthan Royals SupeRR Selector S2 | Pressure Analytics Hub

> **IPL 2027 Auction Intelligence Dashboard**  
> Companion interactive platform to the official Rajasthan Royals Round 1 scouting submission: *"Reliable Under Pressure: A data-led scouting report for the IPL 2027 auction"*.

---

## 📌 Executive Summary & Key Findings

1. **Franchise Gap Diagnosis:**  
   Across 1,737 high-pressure balls bowled by Rajasthan Royals in IPL 2022 to 2026, RR took **5.99 wickets per 100 balls against 6.66 expected** (a **-10.1%** deficit). RR batting, meanwhile, scored at **155.0 per 100 balls against 149.4 expected** (+5.6 above par).  
   👉 **Tactical Imperative:** Prioritize proven pressure wicket-takers and death-over run restrictors.

2. **#1 Recommended Bowling Target:**  
   **Mohsin Khan** (Left-arm Seam, LSG) – Rating **1.23**, Model Rank **#11 of 145 eligible bowlers**. Took **10 wickets vs 7.5 expected**, conceded **7.22 runs per over under pressure** (vs 8.33 normal), **40% dot balls**, with **66%** of his pressure deliveries in overs 16–20.

3. **#1 Recommended Batting Target:**  
   **Ashutosh Sharma** (Finisher, DC) – Rating **1.63**, Model Rank **#1 of 92 eligible batters**. Explodes from a 109 normal strike rate to **189 under pressure** (+80 surge, z-score 3.5), beating expected runs in 14 of 19 pressure innings. Achieved **100% Top-10 retention across 500 Monte Carlo simulations**.

4. **Internal Retention Priority:**  
   **Shubham Dubey** – Already in Rajasthan Royals' IPL 2026 squad list. Strikes at **185 under pressure** (7 of 9 innings above expected runs). Action is retention and clarifying his death-hitting role, avoiding unnecessary auction expenditure.

5. **Analytical Verification Discrepancies (Volume Illusions Busted):**  
   - **Abdul Samad:** Ranked #5 in supplied list with 506 runs, but under objective situational pressure his strike rate collapses from **161 to 130 (-31 drop)**, ranking **#81 of 92**.
   - **Vaibhav Arora:** Ranked #5 bowler with 23 wickets, but leaks **10.61 runs per over under pressure** (vs 8.88 normal), ranking **#126 of 145**.
   - **Openers (Prabhsimran Singh & Priyansh Arya):** Carry **0 pressure balls** under strict definition because overs 1–4 are excluded; must be evaluated via powerplay phase metrics, not clutch pressure data.

---

## 🛠️ Tech Stack

- **Framework:** React 18 + Vite + TypeScript
- **Styling:** Tailwind CSS (Custom Rajasthan Royals Navy `#001D48`, Royal Pink `#EA1B86`, and Gold)
- **Visualizations:** Recharts (Scatter plots, Radar charts, Stacked bar charts, Responsive containers)
- **Icons:** Lucide React
- **Deployment:** Vercel-ready with `vercel.json`

---

## 🚀 Local Setup Instructions

### Prerequisites
- Node.js 18+ (tested on Node v22)
- npm or pnpm

### Steps

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd "RR Dashboard"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```
   The optimized production bundle is generated in `dist/`.

---

## ☁️ Vercel Deployment

This project includes a pre-configured `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Deploy via Vercel CLI:
```bash
npm i -g vercel
vercel
```

### Deploy via GitHub:
1. Push this repository to GitHub.
2. Import the repository in [vercel.com/new](https://vercel.com/new).
3. Framework Preset: **Vite**.
4. Click **Deploy**.

---

## 📊 Modules Included

1. **Executive Overview:** High-level KPIs, RR franchise deficit analysis, top players, verification breakdown.
2. **Top 10 Batters:** Interactive sortable table with toggle between Verified, Supplied, and Comparison views, modal drilldown.
3. **Top 10 Bowlers:** Interactive table with dot%, death-overs concentration (overs 16–20), economy deltas, and spell repeatability.
4. **Player Comparison:** Multi-player selector with comparative bar charts and 4-axis standardized z-score radar charts.
5. **Pressure Analytics:** Figure 1 (Innings 1 vs 2 divergence), Figure 2 (Supplied vs Verified discrepancy), Figure 3 & 4 (Component z-score breakdown), Figure 5 (Scatter plots with diagonal threshold line).
6. **RR Squad Strategy:** Actionable target tiers (Priority Bowling, Priority Batting, In-House Retention, Death Specialists, Caution / Red Flags).
7. **Methodology:** Complete mathematical definitions for Pressure Index ($PI_1, PI_2$), empirical Bayes shrinkage ($60, 150, 5$), and 500 Monte Carlo robustness trials.
8. **Judges Presentation Mode:** Full-screen 4-slide pitch deck designed for an executive review in 2–3 minutes with keyboard navigation (`Left`/`Right`/`Space`/`Esc`).
9. **CSV Data Export:** One-click downloads for verified batting and bowling datasets.

---

## ⚖️ Governance & Data Notice
- **Match Data:** Ball-by-ball delivery records (Jan 2022 to Nov 2026).
- **IPL Regulation Compliance:** All Pakistani national players are excluded from the candidate pool.
- **Auction Assertion Disclaimer:** Player retention, contract prices, overseas limits, and auction availability are unasserted in the match data pack and flagged as unverified for scout follow-up.

