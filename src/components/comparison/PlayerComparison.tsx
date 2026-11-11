import React, { useState } from 'react';
import { BatterData, BowlerData } from '../../types';
import { StatusBadge, SampleFlagBadge } from '../common/StatusBadge';
import { Users, BarChart3, Radar as RadarIcon, Check, Plus, Trash2, ArrowRight } from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid,
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar 
} from 'recharts';

interface PlayerComparisonProps {
  batters: BatterData[];
  bowlers: BowlerData[];
  onSelectPlayer: (player: BatterData | BowlerData) => void;
}

export const PlayerComparison: React.FC<PlayerComparisonProps> = ({ batters, bowlers, onSelectPlayer }) => {
  const [selectedRole, setSelectedRole] = useState<'batters' | 'bowlers'>('batters');
  
  // Default selected comparisons
  const [selectedBatterIds, setSelectedBatterIds] = useState<string[]>([
    'ashutosh-sharma',
    'shashank-singh',
    'abdul-samad'
  ]);

  const [selectedBowlerIds, setSelectedBowlerIds] = useState<string[]>([
    'mohsin-khan',
    'rasikh-salam',
    'vaibhav-arora'
  ]);

  const activePlayers = selectedRole === 'batters' 
    ? batters.filter(b => selectedBatterIds.includes(b.id))
    : bowlers.filter(b => selectedBowlerIds.includes(b.id));

  const togglePlayerSelection = (id: string) => {
    if (selectedRole === 'batters') {
      if (selectedBatterIds.includes(id)) {
        if (selectedBatterIds.length > 1) {
          setSelectedBatterIds(selectedBatterIds.filter(item => item !== id));
        }
      } else {
        if (selectedBatterIds.length < 4) {
          setSelectedBatterIds([...selectedBatterIds, id]);
        }
      }
    } else {
      if (selectedBowlerIds.includes(id)) {
        if (selectedBowlerIds.length > 1) {
          setSelectedBowlerIds(selectedBowlerIds.filter(item => item !== id));
        }
      } else {
        if (selectedBowlerIds.length < 4) {
          setSelectedBowlerIds([...selectedBowlerIds, id]);
        }
      }
    }
  };

  // Prepare Comparative Bar Chart Data
  const barChartData = selectedRole === 'batters'
    ? activePlayers.map(p => {
        const b = p as BatterData;
        return {
          name: b.name.split(' ')[0],
          fullName: b.name,
          pressureSR: b.verified.strikeRate > 0 ? b.verified.strikeRate : 0,
          normalSR: b.verified.normalStrikeRate ?? 0,
          suppliedSR: b.supplied.strikeRate,
        };
      })
    : activePlayers.map(p => {
        const b = p as BowlerData;
        return {
          name: b.name.split(' ')[0],
          fullName: b.name,
          pressureEcon: b.verified.economy,
          normalEcon: b.verified.normalEconomy,
        };
      });

  // Prepare Radar Chart Data for Z-scores
  const radarDimensions = [
    { key: 'value', label: selectedRole === 'batters' ? 'Run Value' : 'Economy Value' },
    { key: 'wickets', label: selectedRole === 'batters' ? 'Dismissal Avoidance' : 'Wicket Strike' },
    { key: 'baseline', label: 'Baseline Delta' },
    { key: 'consistency', label: 'Match Consistency' },
  ];

  const radarChartData = radarDimensions.map(dim => {
    const obj: any = { subject: dim.label };
    activePlayers.forEach((p, idx) => {
      const zScores = selectedRole === 'batters' 
        ? (p as BatterData).verified.zScores 
        : (p as BowlerData).verified.zScores;
      
      const rawVal = dim.key === 'value' ? zScores.value
        : dim.key === 'wickets' ? (selectedRole === 'batters' ? (p as BatterData).verified.zScores.dismissal : (p as BowlerData).verified.zScores.wickets)
        : dim.key === 'baseline' ? zScores.baseline
        : zScores.consistency;
      
      // Shift z-scores by +2.5 to avoid negative clipping on radar
      obj[`player_${idx}`] = Math.max(0, Number((rawVal + 2.5).toFixed(2)));
      obj[`player_${idx}_raw`] = rawVal;
    });
    return obj;
  });

  const playerColors = ['#EA1B86', '#2563EB', '#10B981', '#F59E0B'];

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="p-5 rounded-xl bg-[#081F4D]/80 border border-blue-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-pink-500" />
            Multi-Player Pressure Head-to-Head Comparison
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Compare up to 4 players across pressure metrics, normal-situation deltas, and standardized z-scores.
          </p>
        </div>

        {/* Role Toggle */}
        <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-700 text-xs self-start md:self-auto">
          <button
            onClick={() => setSelectedRole('batters')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
              selectedRole === 'batters' ? 'bg-pink-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Batters Comparison
          </button>
          <button
            onClick={() => setSelectedRole('bowlers')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
              selectedRole === 'bowlers' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Bowlers Comparison
          </button>
        </div>
      </div>

      {/* Player Chips Selector */}
      <div className="p-4 rounded-xl bg-slate-900/70 border border-blue-900/40">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Select Players to Compare (Max 4):
        </div>
        <div className="flex flex-wrap gap-2">
          {(selectedRole === 'batters' ? batters : bowlers).map(p => {
            const isSelected = selectedRole === 'batters' 
              ? selectedBatterIds.includes(p.id) 
              : selectedBowlerIds.includes(p.id);

            return (
              <button
                key={p.id}
                onClick={() => togglePlayerSelection(p.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isSelected 
                    ? 'bg-pink-600 text-white shadow-md border border-pink-400' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                <span>{p.name}</span>
                {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5 text-slate-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Visualizations: Bar & Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Metric Comparison Chart */}
        <div className="p-5 rounded-xl bg-[#081F4D]/90 border border-blue-900/50 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-1">
            <BarChart3 className="w-4 h-4 text-pink-400" />
            {selectedRole === 'batters' 
              ? 'Strike Rate: Pressure vs Ordinary Situation' 
              : 'Economy Rate: Pressure vs Ordinary Overs'}
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            {selectedRole === 'batters' 
              ? 'Comparing strike rate surge in pressure (PI >= 0.51) against normal-match baseline' 
              : 'Comparing runs conceded per over under pressure vs ordinary bowling (lower is better)'}
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {selectedRole === 'batters' ? (
                <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} domain={[0, 220]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                    formatter={(val: number, name: string) => [val, name === 'pressureSR' ? 'Pressure SR' : 'Normal SR']}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="pressureSR" fill="#EA1B86" name="Pressure Strike Rate" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="normalSR" fill="#3b82f6" name="Ordinary Strike Rate" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} domain={[5, 13]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                    formatter={(val: number, name: string) => [val.toFixed(2), name === 'pressureEcon' ? 'Pressure Econ' : 'Normal Econ']}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="pressureEcon" fill="#EA1B86" name="Pressure Economy" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="normalEcon" fill="#3b82f6" name="Ordinary Economy" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Chart (Standardized Z-Scores) */}
        <div className="p-5 rounded-xl bg-[#081F4D]/90 border border-blue-900/50 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-1">
            <RadarIcon className="w-4 h-4 text-cyan-400" />
            4-Dimensional Reliability Radar (Standardized Z-Scores)
          </h3>
          <p className="text-xs text-slate-400 mb-2">
            Multi-axis assessment across Run/Econ Value, Wicket/Dismissal Control, Baseline Delta, and Innings Repeatability.
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarChartData} margin={{ top: 10, right: 30, left: 30, bottom: 10 }}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <PolarRadiusAxis domain={[0, 6]} stroke="#334155" tick={false} />
                {activePlayers.map((p, idx) => (
                  <Radar
                    key={p.id}
                    name={p.name}
                    dataKey={`player_${idx}`}
                    stroke={playerColors[idx % playerColors.length]}
                    fill={playerColors[idx % playerColors.length]}
                    fillOpacity={0.25}
                  />
                ))}
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '5px' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[11px] text-slate-400 text-center">
            * Axis values shifted (+2.5) for positive polar projection; raw z-scores span [-3.0, +3.5].
          </div>
        </div>
      </div>

      {/* Side-by-Side Player Profiles Comparison Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {activePlayers.map((player, idx) => {
          const isBatter = selectedRole === 'batters';
          const batter = isBatter ? (player as BatterData) : null;
          const bowler = !isBatter ? (player as BowlerData) : null;

          return (
            <div 
              key={player.id}
              className="p-4 rounded-xl bg-[#081F4D]/90 border border-blue-900/50 flex flex-col justify-between shadow-lg relative group"
            >
              <div 
                className="absolute top-0 left-0 right-0 h-1 rounded-t-xl" 
                style={{ backgroundColor: playerColors[idx % playerColors.length] }}
              />

              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
                  <span className="font-mono">Rank #{player.rank}</span>
                  <StatusBadge status={player.verified.status} showIcon={false} />
                </div>

                <h4 className="text-base font-bold text-white mt-1.5 flex items-center justify-between">
                  {player.name}
                </h4>
                <div className="text-[11px] text-slate-400 mt-0.5">{player.team}</div>

                <div className="mt-3">
                  <SampleFlagBadge flag={player.sampleFlag} />
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                  <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Composite Rating</div>
                    <div className="text-sm font-bold text-pink-400 font-mono">
                      {player.verified.rating ? (player.verified.rating > 0 ? `+${player.verified.rating.toFixed(2)}` : player.verified.rating.toFixed(2)) : 'N/A'}
                    </div>
                  </div>

                  <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Model Rank</div>
                    <div className="text-sm font-bold text-cyan-300 font-mono">
                      {player.verified.modelRank ? `#${player.verified.modelRank}` : 'Unranked'}
                    </div>
                  </div>

                  {isBatter && batter ? (
                    <>
                      <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                        <div className="text-[10px] text-slate-400">Pressure SR</div>
                        <div className="text-sm font-bold text-white font-mono">{batter.verified.strikeRate}</div>
                      </div>
                      <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                        <div className="text-[10px] text-slate-400">Normal SR</div>
                        <div className="text-sm font-bold text-slate-300 font-mono">{batter.verified.normalStrikeRate ?? 'N/A'}</div>
                      </div>
                      <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                        <div className="text-[10px] text-slate-400">Dism (Exp)</div>
                        <div className="text-sm font-semibold text-white font-mono">{batter.verified.dismissals} ({batter.verified.expectedDismissals})</div>
                      </div>
                      <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                        <div className="text-[10px] text-slate-400">Inns &ge; Exp</div>
                        <div className="text-sm font-semibold text-slate-300 font-mono">{batter.verified.innsAboveExp}</div>
                      </div>
                    </>
                  ) : bowler ? (
                    <>
                      <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                        <div className="text-[10px] text-slate-400">Pressure Econ</div>
                        <div className="text-sm font-bold text-white font-mono">{bowler.verified.economy.toFixed(2)}</div>
                      </div>
                      <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                        <div className="text-[10px] text-slate-400">Normal Econ</div>
                        <div className="text-sm font-bold text-slate-300 font-mono">{bowler.verified.normalEconomy.toFixed(2)}</div>
                      </div>
                      <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                        <div className="text-[10px] text-slate-400">Wkts (Exp)</div>
                        <div className="text-sm font-semibold text-white font-mono">{bowler.verified.wickets} ({bowler.verified.expectedWickets})</div>
                      </div>
                      <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                        <div className="text-[10px] text-slate-400">Dot Ball %</div>
                        <div className="text-sm font-semibold text-emerald-400 font-mono">{bowler.verified.dotBallPct}%</div>
                      </div>
                    </>
                  ) : null}
                </div>

                {/* Tactical Role Summary */}
                <div className="mt-3 p-2.5 rounded bg-blue-950/30 border border-blue-900/40 text-[11px] text-slate-300">
                  <span className="font-semibold text-pink-400 block mb-0.5">Scouting Fit:</span>
                  {player.rrFit.slice(0, 110)}...
                </div>
              </div>

              <button
                onClick={() => onSelectPlayer(player)}
                className="mt-4 w-full py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-pink-600/30 text-slate-200 hover:text-white transition-colors flex items-center justify-center gap-1.5"
              >
                Full Scouting Report
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

