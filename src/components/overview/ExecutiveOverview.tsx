import React from 'react';
import { BatterData, BowlerData } from '../../types';
import { RR_SCOUTING_GAPS } from '../../data/cricketData';
import { 
  Users, 
  Flame, 
  ShieldAlert, 
  TrendingUp, 
  Award, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle,
  BarChart2,
  ChevronRight,
  Target,
  ArrowUpRight
} from 'lucide-react';

interface ExecutiveOverviewProps {
  batters: BatterData[];
  bowlers: BowlerData[];
  onSelectPlayer: (player: BatterData | BowlerData) => void;
  onNavigateTab: (tab: string) => void;
}

export const ExecutiveOverview: React.FC<ExecutiveOverviewProps> = ({ 
  batters, 
  bowlers, 
  onSelectPlayer,
  onNavigateTab 
}) => {
  const topBatter = batters.find(b => b.id === 'ashutosh-sharma');
  const topBowler = bowlers.find(b => b.id === 'mohsin-khan');
  const internalRRPlayer = batters.find(b => b.id === 'shubham-dubey');

  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#001D48] via-[#0A2558] to-[#00122E] border border-blue-800/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-pink-600/20 text-pink-400 border border-pink-500/30 mb-3">
            <Flame className="w-3.5 h-3.5 text-pink-500" />
            SupeRR Selector Season 2 • IPL 2027 Auction Intelligence
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Reliable Under Pressure <span className="text-pink-500">Analytics</span>
          </h1>
          <p className="text-slate-300 text-sm md:text-base mt-2 leading-relaxed">
            Data-led verification of supplied Top 10 Batters and Top 10 Bowlers against 200,999 ball-by-ball records (IPL & Men's T20I, Jan 2022 to Nov 2026). Calibrated specifically to solve Rajasthan Royals' clutch match-finishing and death bowling deficits.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-4 text-xs">
            <span className="px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700">
              Matches Evaluated: <strong className="text-white">883</strong>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700">
              High-Pressure Deliveries: <strong className="text-pink-400">39,869 (19.8%)</strong>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700">
              Pressure Threshold: <strong className="text-cyan-300">PI &ge; 0.51 (Overs &gt; 4)</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Players Analysed */}
        <div className="p-5 rounded-xl bg-[#081F4D]/80 border border-blue-900/50 shadow-lg relative overflow-hidden group hover:border-pink-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Eligible Pool</span>
            <Users className="w-5 h-5 text-blue-400 group-hover:text-pink-400 transition-colors" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-white">92 Batters / 145 Bowlers</div>
            <div className="text-xs text-slate-400 mt-1">Non-Pakistani qualified pool (min &ge;80b &amp; &ge;60b)</div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-blue-900/40 text-[11px] text-pink-300 flex items-center justify-between">
            <span>Pakistani players excluded</span>
            <span className="font-mono">IPL Rule Compliant</span>
          </div>
        </div>

        {/* KPI 2: Top-Rated Batter */}
        <div 
          onClick={() => topBatter && onSelectPlayer(topBatter)}
          className="p-5 rounded-xl bg-[#081F4D]/80 border border-pink-500/30 shadow-lg relative overflow-hidden group hover:border-pink-500 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-pink-400 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-pink-500" />
              #1 Pressure Batter
            </span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-pink-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-white flex items-center gap-2">
              Ashutosh Sharma
              <span className="text-xs px-2 py-0.5 rounded bg-pink-600/30 text-pink-300 font-mono">1.63</span>
            </div>
            <div className="text-xs text-slate-300 mt-1">
              SR Surge: <strong className="text-emerald-400">189 vs 109 (+80 delta)</strong>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-blue-900/40 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Model Rank #1 of 92</span>
            <span className="text-pink-400 font-semibold">Supported</span>
          </div>
        </div>

        {/* KPI 3: Top-Rated Bowler */}
        <div 
          onClick={() => topBowler && onSelectPlayer(topBowler)}
          className="p-5 rounded-xl bg-[#081F4D]/80 border border-blue-500/30 shadow-lg relative overflow-hidden group hover:border-blue-500 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-cyan-400" />
              #1 Pressure Bowler
            </span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-white flex items-center gap-2">
              Mohsin Khan
              <span className="text-xs px-2 py-0.5 rounded bg-blue-600/30 text-cyan-300 font-mono">1.23</span>
            </div>
            <div className="text-xs text-slate-300 mt-1">
              Econ: <strong className="text-emerald-400">7.22</strong> • Wkts: <strong className="text-white">10 vs 7.5 exp</strong>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-blue-900/40 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Model Rank #11 of 145</span>
            <span className="text-cyan-400 font-semibold">66% Death Overs</span>
          </div>
        </div>

        {/* KPI 4: RR Core Gap Diagnosis */}
        <div 
          onClick={() => onNavigateTab('recommendations')}
          className="p-5 rounded-xl bg-[#081F4D]/80 border border-rose-500/30 shadow-lg relative overflow-hidden group hover:border-rose-500 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              RR Franchise Deficit
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-rose-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-white">
              6.0 <span className="text-sm font-normal text-slate-400">vs 6.7 exp wkts</span>
            </div>
            <div className="text-xs text-rose-300 mt-1">
              -10.1% Pressure Wicket Deficit (1,737 balls)
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-blue-900/40 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Batting: +5.6 above par</span>
            <span className="text-rose-400 font-semibold">Target Bowlers</span>
          </div>
        </div>
      </div>

      {/* Rajasthan Royals Core Gap Analysis Callout */}
      <div className="p-6 rounded-2xl bg-[#081F4D]/90 border border-blue-800/60 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-900/60 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-400">
              <Target className="w-4 h-4 text-pink-500" />
              Franchise Pressure Diagnosis (IPL 2022 to 2026 Records)
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              Where Rajasthan Royals Win &amp; Where Chases Slip Away
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('recommendations')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-pink-600 hover:bg-pink-500 text-white transition-colors self-start md:self-auto"
          >
            View Tactical Action Plan
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {RR_SCOUTING_GAPS.map((gap, idx) => {
            const isNegative = gap.differential.startsWith('-');
            return (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/70 border border-blue-950 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-400">{gap.area}</div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-lg font-extrabold text-white">{gap.rrRecord}</span>
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                      isNegative ? 'bg-rose-950/80 text-rose-400 border border-rose-800/40' : 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/40'
                    }`}>
                      {gap.differential}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">League Exp: {gap.leagueExpected}</div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-300 leading-normal">
                  {gap.diagnosis}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Critical Verification Insights & Discrepancies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Supported Picks */}
        <div className="p-5 rounded-xl bg-emerald-950/15 border border-emerald-500/30">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Verified &amp; Best Supported
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Players with sufficient sample size (&ge;80 balls for batters, &ge;60 balls for bowlers) whose ball-by-ball recalculation yields a positive rating:
          </p>
          <div className="space-y-2 mt-3 text-xs">
            <div 
              onClick={() => onSelectPlayer(batters[1])}
              className="p-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-emerald-800/30 cursor-pointer flex items-center justify-between"
            >
              <div>
                <strong className="text-white">Ashutosh Sharma</strong> (Model Rank #1)
                <div className="text-[11px] text-emerald-400">+80 SR surge, 14/19 inns &ge; exp</div>
              </div>
              <span className="text-emerald-400 font-mono font-bold">+1.63</span>
            </div>
            <div 
              onClick={() => onSelectPlayer(bowlers[2])}
              className="p-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-emerald-800/30 cursor-pointer flex items-center justify-between"
            >
              <div>
                <strong className="text-white">Mohsin Khan</strong> (Model Rank #11)
                <div className="text-[11px] text-cyan-300">7.22 econ under pressure, 10 wkts</div>
              </div>
              <span className="text-cyan-400 font-mono font-bold">+1.23</span>
            </div>
            <div 
              onClick={() => onSelectPlayer(batters[0])}
              className="p-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-emerald-800/30 cursor-pointer flex items-center justify-between"
            >
              <div>
                <strong className="text-white">Shashank Singh</strong> (Model Rank #18)
                <div className="text-[11px] text-slate-300">Dismissed only 9 times vs 17.2 exp</div>
              </div>
              <span className="text-emerald-400 font-mono font-bold">+0.71</span>
            </div>
            <div 
              onClick={() => onSelectPlayer(batters[3])}
              className="p-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-emerald-800/30 cursor-pointer flex items-center justify-between"
            >
              <div>
                <strong className="text-white">Ayush Badoni</strong> (Model Rank #20)
                <div className="text-[11px] text-slate-300">158 vs 135 SR, 10 vs 16.5 dismissals</div>
              </div>
              <span className="text-emerald-400 font-mono font-bold">+0.55</span>
            </div>
          </div>
        </div>

        {/* Card 2: Scouting Red Flags (Not Supported) */}
        <div className="p-5 rounded-xl bg-rose-950/15 border border-rose-500/30">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-3">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            Not Supported (Volume Illusions)
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Supplied ranking lists ranked these players highly based on cumulative volume, but objective ball-by-ball pressure analysis reveals negative splits:
          </p>
          <div className="space-y-3 mt-3 text-xs">
            <div 
              onClick={() => onSelectPlayer(batters[4])}
              className="p-3 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-rose-800/30 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <strong className="text-white">Abdul Samad</strong>
                <span className="text-rose-400 font-mono font-bold">-0.93 (Rank #81/92)</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Supplied 506 runs, but under standardized pressure scores at only <strong className="text-rose-400">130 SR vs 161</strong> in ordinary play (-31 drop).
              </div>
            </div>

            <div 
              onClick={() => onSelectPlayer(bowlers[4])}
              className="p-3 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-rose-800/30 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <strong className="text-white">Vaibhav Arora</strong>
                <span className="text-rose-400 font-mono font-bold">-0.85 (Rank #126/145)</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Supplied 23 wickets, but verified pressure economy is <strong className="text-rose-400">10.61 vs 8.88 normal</strong> (+1.73 leakier). Only 30% dot balls.
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Sample Size Warnings & Opener Invisibility */}
        <div className="p-5 rounded-xl bg-purple-950/15 border border-purple-500/30">
          <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-4 h-4 text-purple-400" />
            Sample Size Limits &amp; Structural Biases
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            10 out of the 20 supplied player slots cannot be statistically validated due to sample size constraints under objective criteria:
          </p>
          <div className="space-y-2 mt-3 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-purple-800/30">
              <span className="text-white font-semibold">Openers Have 0 Pressure Balls:</span>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Prabhsimran Singh (1168 balls) &amp; Priyansh Arya (513 balls) never face PI &ge; 0.51 because early overs (1-4) carry low pressure index.
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-purple-800/30">
              <span className="text-white font-semibold">Micro-Samples Under Min Threshold:</span>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Sameer Rizvi (4 inns), Salil Arora (25 balls), Vipraj Nigam (71b bat, 34b bowl), Sakib Hussain (5 spells), Praful Hinge (26 balls). Ratings are indicative only.
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-purple-800/30 flex items-center justify-between">
              <div>
                <span className="text-white font-semibold">Promising Thin:</span>
                <span className="text-slate-400 text-[11px]"> Shubham Dubey (94b) &amp; Anshul Kamboj (64b)</span>
              </div>
              <span className="text-amber-400 font-mono text-xs">Watch</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

