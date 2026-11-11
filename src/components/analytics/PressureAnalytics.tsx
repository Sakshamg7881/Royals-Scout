import React, { useState } from 'react';
import { BatterData, BowlerData } from '../../types';
import { 
  ResponsiveContainer, 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  Tooltip, 
  CartesianGrid, 
  ReferenceLine,
  BarChart,
  Bar,
  Legend,
  Cell
} from 'recharts';
import { 
  BarChart3, 
  GitCommit, 
  Layers, 
  TrendingUp, 
  Info, 
  Flame, 
  Filter, 
  ArrowRight,
  ShieldAlert,
  Sliders
} from 'lucide-react';

interface PressureAnalyticsProps {
  batters: BatterData[];
  bowlers: BowlerData[];
  onSelectPlayer: (player: BatterData | BowlerData) => void;
}

export const PressureAnalytics: React.FC<PressureAnalyticsProps> = ({ batters, bowlers, onSelectPlayer }) => {
  const [activeSubTab, setActiveSubTab] = useState<'scatter' | 'discrepancy' | 'components' | 'innings'>('scatter');

  // Scatter data for Batters (Pressure SR vs Normal SR)
  const batterScatterData = batters
    .filter(b => b.verified.strikeRate > 0 && b.verified.normalStrikeRate !== null)
    .map(b => ({
      name: b.name,
      normalSR: b.verified.normalStrikeRate,
      pressureSR: b.verified.strikeRate,
      balls: b.verified.balls,
      status: b.verified.status,
      player: b,
      isAshutosh: b.id === 'ashutosh-sharma',
      isSamad: b.id === 'abdul-samad'
    }));

  // Scatter data for Bowlers (Pressure Econ vs Normal Econ)
  const bowlerScatterData = bowlers
    .filter(b => b.verified.economy > 0)
    .map(b => ({
      name: b.name,
      pressureEcon: b.verified.economy,
      normalEcon: b.verified.normalEconomy,
      balls: b.verified.balls,
      status: b.verified.status,
      player: b,
      isMohsin: b.id === 'mohsin-khan',
      isVaibhav: b.id === 'vaibhav-arora'
    }));

  // Figure 2: Supplied vs Verified Runs (Batters)
  const batterDiscrepancyData = batters.map(b => ({
    name: b.name.split(' ')[0],
    fullName: b.name,
    suppliedRuns: b.supplied.runs,
    verifiedRuns: b.verified.runs,
    discrepancy: b.verified.runs - b.supplied.runs
  }));

  // Figure 2: Supplied vs Verified Wickets (Bowlers)
  const bowlerDiscrepancyData = bowlers.map(b => ({
    name: b.name.split(' ')[0],
    fullName: b.name,
    suppliedWickets: b.supplied.wickets,
    verifiedWickets: b.verified.wickets,
    discrepancy: b.verified.wickets - b.supplied.wickets
  }));

  // Figure 1: Innings 1 vs Innings 2 Pressure Behaviour
  const inningsComparisonData = [
    {
      name: 'Innings 1 (Ordinary)',
      wicketsPer100: 5.1,
      runsPer100: 137.7,
      balls: '93,466 deliveries',
      phase: '1st Innings Ordinary'
    },
    {
      name: 'Innings 1 (High Pressure)',
      wicketsPer100: 6.9,
      runsPer100: 117.0,
      balls: '12,261 deliveries',
      phase: '1st Innings High Pressure'
    },
    {
      name: 'Innings 2 (Ordinary)',
      wicketsPer100: 4.7,
      runsPer100: 130.9,
      balls: '67,626 deliveries',
      phase: '2nd Innings Ordinary'
    },
    {
      name: 'Innings 2 (High Pressure)',
      wicketsPer100: 7.5,
      runsPer100: 137.3,
      balls: '27,608 deliveries',
      phase: '2nd Innings High Pressure'
    }
  ];

  // Component Z-Scores breakdown for all batters
  const batterZScoreComponents = batters
    .filter(b => b.verified.rating !== null)
    .map(b => ({
      name: b.name.split(' ')[0],
      fullName: b.name,
      runValue: b.verified.zScores.value * 0.35,
      dismissal: b.verified.zScores.dismissal * 0.25,
      baseline: b.verified.zScores.baseline * 0.20,
      consistency: b.verified.zScores.consistency * 0.20,
      composite: b.verified.rating ?? 0
    }));

  // Component Z-Scores breakdown for all bowlers
  const bowlerZScoreComponents = bowlers
    .filter(b => b.verified.rating !== null)
    .map(b => ({
      name: b.name.split(' ')[0],
      fullName: b.name,
      econValue: b.verified.zScores.value * 0.35,
      wicketRate: b.verified.zScores.wickets * 0.25,
      baseline: b.verified.zScores.baseline * 0.20,
      consistency: b.verified.zScores.consistency * 0.20,
      composite: b.verified.rating ?? 0
    }));

  return (
    <div className="space-y-6">
      {/* Header and Sub-Tab Navigation */}
      <div className="p-5 rounded-xl bg-[#081F4D]/80 border border-blue-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-pink-500" />
            Pressure Analytics &amp; Empirical Validation Engine
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Visualizing empirical evidence from Figure 1 through Figure 6 of the Rajasthan Royals Scouting Report.
          </p>
        </div>

        {/* Sub-Tab Navigation */}
        <div className="flex flex-wrap items-center bg-slate-900 p-1 rounded-lg border border-slate-700 text-xs">
          <button
            onClick={() => setActiveSubTab('scatter')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeSubTab === 'scatter' ? 'bg-pink-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Pressure vs Baseline (Fig 5)
          </button>
          <button
            onClick={() => setActiveSubTab('discrepancy')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeSubTab === 'discrepancy' ? 'bg-pink-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Supplied vs Verified (Fig 2)
          </button>
          <button
            onClick={() => setActiveSubTab('components')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeSubTab === 'components' ? 'bg-pink-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Component Z-Scores (Fig 3-4)
          </button>
          <button
            onClick={() => setActiveSubTab('innings')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeSubTab === 'innings' ? 'bg-pink-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Innings Dynamics (Fig 1)
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: Pressure vs Ordinary Baseline (Scatter Plots - Figure 5) */}
      {activeSubTab === 'scatter' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs text-slate-300 flex items-start gap-3">
            <Info className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
            <div>
              <strong>Reading Figure 5:</strong> On the left (Batters), players <em>above the dashed diagonal line (y &gt; x)</em> score faster under pressure than in ordinary play. On the right (Bowlers), players <em>above the diagonal</em> are tighter under pressure (conceding fewer runs per over). 
              Notice how <strong>Ashutosh Sharma</strong>, <strong>Shashank Singh</strong>, and <strong>Ayush Badoni</strong> sit cleanly above the line, whereas <strong>Abdul Samad</strong> and <strong>Vaibhav Arora</strong> fall into negative territory.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Batter Scatter Plot */}
            <div className="p-5 rounded-xl bg-[#081F4D]/90 border border-blue-900/50 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-pink-500"></span>
                  Batters: Pressure Strike Rate vs Ordinary Strike Rate
                </h3>
                <span className="text-[11px] text-pink-400 font-mono">Above line = Faster under pressure</span>
              </div>
              <p className="text-[11px] text-slate-400 mb-4">
                X-Axis: Ordinary SR (x) • Y-Axis: Pressure SR (y). Dashed line is baseline equality (y = x).
              </p>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis 
                      type="number" 
                      dataKey="normalSR" 
                      name="Normal SR" 
                      unit="" 
                      domain={[80, 200]} 
                      stroke="#94a3b8" 
                      tick={{ fontSize: 11 }}
                      label={{ value: 'Ordinary Situation SR', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 11 }}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="pressureSR" 
                      name="Pressure SR" 
                      unit="" 
                      domain={[80, 220]} 
                      stroke="#94a3b8" 
                      tick={{ fontSize: 11 }}
                      label={{ value: 'Pressure SR', angle: -90, position: 'insideLeft', offset: 15, fill: '#64748b', fontSize: 11 }}
                    />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }}
                      content={({ payload }) => {
                        if (payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-[#0f172a] border border-blue-700/60 p-3 rounded-xl shadow-xl text-xs text-white">
                              <div className="font-bold text-pink-400">{data.name}</div>
                              <div className="mt-1">Pressure SR: <strong>{data.pressureSR}</strong></div>
                              <div>Ordinary SR: <strong>{data.normalSR}</strong></div>
                              <div>Delta: <strong className={data.pressureSR > data.normalSR ? 'text-emerald-400' : 'text-rose-400'}>
                                {data.pressureSR > data.normalSR ? '+' : ''}{(data.pressureSR - data.normalSR).toFixed(0)}
                              </strong></div>
                              <div className="text-[10px] text-slate-400 mt-1">Balls Faced: {data.balls}</div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <ReferenceLine 
                      segment={[{ x: 80, y: 80 }, { x: 200, y: 200 }]} 
                      stroke="#ec4899" 
                      strokeDasharray="4 4" 
                      strokeWidth={1.5}
                    />
                    <Scatter 
                      data={batterScatterData} 
                      fill="#EA1B86"
                      onClick={(e) => onSelectPlayer(e.player)}
                      className="cursor-pointer"
                    >
                      {batterScatterData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.isAshutosh ? '#EA1B86' : entry.isSamad ? '#f43f5e' : (entry.normalSR !== null && entry.pressureSR >= entry.normalSR) ? '#3b82f6' : '#94a3b8'} 
                          stroke={entry.isAshutosh ? '#ffffff' : '#00122E'}
                          strokeWidth={entry.isAshutosh ? 2 : 1}
                        />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 px-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-pink-500"></span> Ashutosh Sharma (+80 surge)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span> Abdul Samad (-31 drop)
                </span>
              </div>
            </div>

            {/* Bowler Scatter Plot */}
            <div className="p-5 rounded-xl bg-[#081F4D]/90 border border-blue-900/50 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                  Bowlers: Ordinary Economy vs Pressure Economy
                </h3>
                <span className="text-[11px] text-cyan-400 font-mono">Above line = Tighter under pressure</span>
              </div>
              <p className="text-[11px] text-slate-400 mb-4">
                X-Axis: Pressure Economy (x) • Y-Axis: Ordinary Economy (y). Above diagonal y = x saves runs.
              </p>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis 
                      type="number" 
                      dataKey="pressureEcon" 
                      name="Pressure Econ" 
                      unit="" 
                      domain={[6, 12]} 
                      stroke="#94a3b8" 
                      tick={{ fontSize: 11 }}
                      label={{ value: 'Pressure Economy (x)', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 11 }}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="normalEcon" 
                      name="Ordinary Econ" 
                      unit="" 
                      domain={[6, 12]} 
                      stroke="#94a3b8" 
                      tick={{ fontSize: 11 }}
                      label={{ value: 'Ordinary Economy (y)', angle: -90, position: 'insideLeft', offset: 15, fill: '#64748b', fontSize: 11 }}
                    />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }}
                      content={({ payload }) => {
                        if (payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-[#0f172a] border border-cyan-700/60 p-3 rounded-xl shadow-xl text-xs text-white">
                              <div className="font-bold text-cyan-400">{data.name}</div>
                              <div className="mt-1">Pressure Econ: <strong>{data.pressureEcon.toFixed(2)}</strong></div>
                              <div>Ordinary Econ: <strong>{data.normalEcon.toFixed(2)}</strong></div>
                              <div>Delta (Saved): <strong className={data.normalEcon > data.pressureEcon ? 'text-emerald-400' : 'text-rose-400'}>
                                {(data.normalEcon - data.pressureEcon).toFixed(2)} rpo
                              </strong></div>
                              <div className="text-[10px] text-slate-400 mt-1">Balls Bowled: {data.balls}</div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <ReferenceLine 
                      segment={[{ x: 6, y: 6 }, { x: 12, y: 12 }]} 
                      stroke="#06b6d4" 
                      strokeDasharray="4 4" 
                      strokeWidth={1.5}
                    />
                    <Scatter 
                      data={bowlerScatterData} 
                      fill="#06b6d4"
                      onClick={(e) => onSelectPlayer(e.player)}
                      className="cursor-pointer"
                    >
                      {bowlerScatterData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.isMohsin ? '#06b6d4' : entry.isVaibhav ? '#f43f5e' : entry.normalEcon >= entry.pressureEcon ? '#3b82f6' : '#94a3b8'} 
                          stroke={entry.isMohsin ? '#ffffff' : '#00122E'}
                          strokeWidth={entry.isMohsin ? 2 : 1}
                        />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 px-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span> Mohsin Khan (7.22 vs 8.33 - saves 1.11 rpo)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span> Vaibhav Arora (10.61 vs 8.88 - leaks 1.73 rpo)
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: Supplied vs Verified Discrepancies (Figure 2) */}
      {activeSubTab === 'discrepancy' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs text-slate-300 flex items-start gap-3">
            <ShieldAlert className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <strong>Figure 2 Verification Audit:</strong> Verified pressure runs are lower than supplied figures for 9 of 10 batters (e.g. Shashank Singh 415 vs 694), and verified wickets are lower for all 10 bowlers (e.g. Vaibhav Arora 9 vs 23). 
              The supplied screenshots did not define their filters; our report applies strict situational leverage (PI &ge; 0.51 after Over 4).
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Batters Runs Discrepancy */}
            <div className="p-5 rounded-xl bg-[#081F4D]/90 border border-blue-900/50 shadow-xl">
              <h3 className="text-sm font-bold text-white mb-1">
                Batters: Supplied vs Verified Pressure Runs
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Comparison of screenshot-supplied runs (blue) vs ball-by-ball verified runs (pink)
              </p>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={batterDiscrepancyData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                    <XAxis type="number" stroke="#64748b" tick={{ fontSize: 11 }} />
                    <YAxis type="category" dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} width={70} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Bar dataKey="suppliedRuns" fill="#3b82f6" name="Supplied Runs" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="verifiedRuns" fill="#EA1B86" name="Verified Runs (Report)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bowlers Wickets Discrepancy */}
            <div className="p-5 rounded-xl bg-[#081F4D]/90 border border-blue-900/50 shadow-xl">
              <h3 className="text-sm font-bold text-white mb-1">
                Bowlers: Supplied vs Verified Pressure Wickets
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Supplied screenshot wickets (blue) vs ball-by-ball verified wickets (cyan)
              </p>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bowlerDiscrepancyData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                    <XAxis type="number" stroke="#64748b" tick={{ fontSize: 11 }} />
                    <YAxis type="category" dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} width={70} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Bar dataKey="suppliedWickets" fill="#3b82f6" name="Supplied Wickets" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="verifiedWickets" fill="#06b6d4" name="Verified Wickets (Report)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: Component Z-Scores Stacked (Figure 3 & Figure 4) */}
      {activeSubTab === 'components' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs text-slate-300">
            <strong>Standardized Rating Decomposition:</strong> Rating = 0.35 &middot; z(Value) + 0.25 &middot; z(Dismissal/Wickets) + 0.20 &middot; z(Baseline Delta) + 0.20 &middot; z(Consistency).
            This decomposes each player's rating into its exact statistical drivers, preventing one-dimensional lucky spells from distorting rankings.
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Batters Component Breakdown */}
            <div className="p-5 rounded-xl bg-[#081F4D]/90 border border-blue-900/50 shadow-xl">
              <h3 className="text-sm font-bold text-white mb-1">
                Batters: Composite Rating Contribution (Figure 3)
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Weighted z-score components across all 8 evaluated batters
              </p>

              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={batterZScoreComponents} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                    <XAxis type="number" stroke="#64748b" tick={{ fontSize: 11 }} />
                    <YAxis type="category" dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} width={75} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                      formatter={(val: number) => [val.toFixed(2), 'Weighted Z']}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Bar dataKey="runValue" stackId="a" fill="#3b82f6" name="Run Value (35%)" />
                    <Bar dataKey="dismissal" stackId="a" fill="#10b981" name="Dismissal Avoidance (25%)" />
                    <Bar dataKey="baseline" stackId="a" fill="#ec4899" name="Baseline Surge (20%)" />
                    <Bar dataKey="consistency" stackId="a" fill="#a855f7" name="Consistency (20%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bowlers Component Breakdown */}
            <div className="p-5 rounded-xl bg-[#081F4D]/90 border border-blue-900/50 shadow-xl">
              <h3 className="text-sm font-bold text-white mb-1">
                Bowlers: Composite Rating Contribution (Figure 4)
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Weighted z-score components across all 10 evaluated bowlers
              </p>

              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bowlerZScoreComponents} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                    <XAxis type="number" stroke="#64748b" tick={{ fontSize: 11 }} />
                    <YAxis type="category" dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} width={75} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                      formatter={(val: number) => [val.toFixed(2), 'Weighted Z']}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Bar dataKey="econValue" stackId="a" fill="#3b82f6" name="Econ Value (35%)" />
                    <Bar dataKey="wicketRate" stackId="a" fill="#10b981" name="Wicket Strike (25%)" />
                    <Bar dataKey="baseline" stackId="a" fill="#ec4899" name="Baseline Delta (20%)" />
                    <Bar dataKey="consistency" stackId="a" fill="#a855f7" name="Consistency (20%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: Innings Characteristics (Figure 1) */}
      {activeSubTab === 'innings' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-pink-950/30 border border-pink-500/30 text-xs text-slate-300">
            <strong>Innings Pressure Divergence:</strong> Scoring rates move in <em>opposite directions</em> between the two innings under pressure. In first innings, batters score slower (117.0 vs 137.7) to rebuild after collapse. In second innings chases, batters are forced to score faster (137.3 vs 130.9) to chase the required run rate. That is why raw strike rates cannot be pooled without format/innings/phase expectation normalization!
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Wickets Rate per 100 Balls */}
            <div className="p-5 rounded-xl bg-[#081F4D]/90 border border-blue-900/50 shadow-xl">
              <h3 className="text-sm font-bold text-white mb-1">
                Wickets Lost per 100 Balls (Figure 1 Left)
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Pressure states increase wicket hazard across both 1st and 2nd innings
              </p>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={inningsComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                    <YAxis stroke="#64748b" tick={{ fontSize: 11 }} domain={[0, 9]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                      formatter={(val: number) => [`${val} wkts / 100 balls`, 'Wicket Hazard']}
                    />
                    <Bar dataKey="wicketsPer100" fill="#ec4899" radius={[4, 4, 0, 0]} name="Wickets / 100 Balls" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Batter Runs per 100 Balls */}
            <div className="p-5 rounded-xl bg-[#081F4D]/90 border border-blue-900/50 shadow-xl">
              <h3 className="text-sm font-bold text-white mb-1">
                Batter Runs per 100 Balls (Figure 1 Right)
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                1st Innings slows down under crisis; 2nd Innings chases accelerate
              </p>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={inningsComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                    <YAxis stroke="#64748b" tick={{ fontSize: 11 }} domain={[100, 150]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                      formatter={(val: number) => [`${val} runs / 100 balls`, 'Scoring Rate']}
                    />
                    <Bar dataKey="runsPer100" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Batter Runs / 100 Balls" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
