import React from 'react';
import { BatterData, BowlerData } from '../../types';
import { StatusBadge, SampleFlagBadge } from './StatusBadge';
import { X, Award, Target, Zap, Shield, HelpCircle, BarChart3, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';

interface PlayerProfileModalProps {
  player: BatterData | BowlerData | null;
  onClose: () => void;
  onCompareWith?: (player: BatterData | BowlerData) => void;
}

export const PlayerProfileModal: React.FC<PlayerProfileModalProps> = ({ player, onClose, onCompareWith }) => {
  if (!player) return null;

  const isBatter = player.role === 'batter';
  const batter = isBatter ? (player as BatterData) : null;
  const bowler = !isBatter ? (player as BowlerData) : null;

  // Prepare component z-score data for the chart
  const zScoreData = isBatter && batter ? [
    { name: 'Run Value (A)', score: batter.verified.zScores.value, fill: '#3b82f6' },
    { name: 'Dismissals (B)', score: batter.verified.zScores.dismissal, fill: '#10b981' },
    { name: 'Vs Baseline (C)', score: batter.verified.zScores.baseline, fill: '#ec4899' },
    { name: 'Consistency (D)', score: batter.verified.zScores.consistency, fill: '#a855f7' },
  ] : bowler ? [
    { name: 'Economy Value (A)', score: bowler.verified.zScores.value, fill: '#3b82f6' },
    { name: 'Wicket Strike (B)', score: bowler.verified.zScores.wickets, fill: '#10b981' },
    { name: 'Vs Baseline (C)', score: bowler.verified.zScores.baseline, fill: '#ec4899' },
    { name: 'Consistency (D)', score: bowler.verified.zScores.consistency, fill: '#a855f7' },
  ] : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#081F4D] border border-blue-900/60 rounded-2xl shadow-2xl text-slate-100 p-6 md:p-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-blue-900/50 pb-5">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-pink-600/20 text-pink-400 border border-pink-500/40">
                Supplied Rank #{player.rank}
              </span>
              <StatusBadge status={player.verified.status} />
              <SampleFlagBadge flag={player.sampleFlag} />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-2 flex items-center gap-3">
              {player.name}
              <span className="text-sm font-normal text-slate-400 bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700">
                {player.team}
              </span>
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              {isBatter ? `Median Batting Position: #${batter?.medianPosition}` : `${bowler?.bowlingType} Bowler • ${bowler?.deathOversPct}% Death Overs (16-20)`}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Unverified Auction Status Banner */}
        <div className="my-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5 text-xs text-amber-200">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-300">Auction & Retention Governance: </span>
            {player.retentionStatus}. Note: Auction pool availability, retentions, and prices are strictly unverified from the dataset and subject to official IPL 2027 governing council publications.
          </div>
        </div>

        {/* Verification Discrepancy Box: Supplied vs Verified */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
          {/* Supplied Card */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            <div className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              Supplied Screenshot Figures (Unstated Definition)
            </div>
            {isBatter && batter ? (
              <div className="grid grid-cols-3 gap-2 text-center mt-3">
                <div className="bg-slate-800/60 p-2.5 rounded-lg">
                  <div className="text-xs text-slate-400">Pressure Runs</div>
                  <div className="text-lg font-bold text-white">{batter.supplied.runs}</div>
                </div>
                <div className="bg-slate-800/60 p-2.5 rounded-lg">
                  <div className="text-xs text-slate-400">Pressure SR</div>
                  <div className="text-lg font-bold text-white">{batter.supplied.strikeRate.toFixed(1)}</div>
                </div>
                <div className="bg-slate-800/60 p-2.5 rounded-lg">
                  <div className="text-xs text-slate-400">Matches</div>
                  <div className="text-lg font-bold text-white">{batter.supplied.matches}</div>
                </div>
              </div>
            ) : bowler ? (
              <div className="grid grid-cols-3 gap-2 text-center mt-3">
                <div className="bg-slate-800/60 p-2.5 rounded-lg">
                  <div className="text-xs text-slate-400">Pressure Wkts</div>
                  <div className="text-lg font-bold text-white">{bowler.supplied.wickets}</div>
                </div>
                <div className="bg-slate-800/60 p-2.5 rounded-lg">
                  <div className="text-xs text-slate-400">Pressure Balls</div>
                  <div className="text-lg font-bold text-white">{bowler.supplied.balls}</div>
                </div>
                <div className="bg-slate-800/60 p-2.5 rounded-lg">
                  <div className="text-xs text-slate-400">Matches</div>
                  <div className="text-lg font-bold text-white">{bowler.supplied.matches}</div>
                </div>
              </div>
            ) : null}
            <div className="text-[11px] text-slate-500 mt-2 italic">
              * The supplied figures could not be reproduced directly from ball-by-ball logs without knowledge of the author's hidden filter parameters.
            </div>
          </div>

          {/* Verified Card */}
          <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-600/30">
            <div className="text-xs uppercase font-bold tracking-wider text-pink-400 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
                Verified Ball-by-Ball Recalculation (PI &ge; 0.51)
              </span>
              <span className="text-white font-mono bg-pink-600/30 px-2 py-0.5 rounded text-[11px]">
                {player.verified.modelRank ? `Model Rank #${player.verified.modelRank}` : 'Unranked'}
              </span>
            </div>

            {isBatter && batter ? (
              <div className="grid grid-cols-4 gap-2 text-center mt-3">
                <div className="bg-blue-900/30 p-2 rounded-lg">
                  <div className="text-[10px] text-slate-300">Verified Balls</div>
                  <div className="text-base font-bold text-pink-300">{batter.verified.balls}</div>
                </div>
                <div className="bg-blue-900/30 p-2 rounded-lg">
                  <div className="text-[10px] text-slate-300">Pressure Runs</div>
                  <div className="text-base font-bold text-white">{batter.verified.runs}</div>
                </div>
                <div className="bg-blue-900/30 p-2 rounded-lg">
                  <div className="text-[10px] text-slate-300">Pressure SR</div>
                  <div className="text-base font-bold text-pink-400">{batter.verified.strikeRate}</div>
                </div>
                <div className="bg-blue-900/30 p-2 rounded-lg">
                  <div className="text-[10px] text-slate-300">SR Delta</div>
                  <div className={`text-base font-bold ${batter.verified.strikeRateDelta && batter.verified.strikeRateDelta > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {batter.verified.strikeRateDelta !== null ? `${batter.verified.strikeRateDelta > 0 ? '+' : ''}${batter.verified.strikeRateDelta}` : 'N/A'}
                  </div>
                </div>
              </div>
            ) : bowler ? (
              <div className="grid grid-cols-4 gap-2 text-center mt-3">
                <div className="bg-blue-900/30 p-2 rounded-lg">
                  <div className="text-[10px] text-slate-300">Verified Balls</div>
                  <div className="text-base font-bold text-pink-300">{bowler.verified.balls}</div>
                </div>
                <div className="bg-blue-900/30 p-2 rounded-lg">
                  <div className="text-[10px] text-slate-300">Wkts (Exp)</div>
                  <div className="text-base font-bold text-white">{bowler.verified.wickets} <span className="text-xs text-slate-400 font-normal">({bowler.verified.expectedWickets})</span></div>
                </div>
                <div className="bg-blue-900/30 p-2 rounded-lg">
                  <div className="text-[10px] text-slate-300">Pressure Econ</div>
                  <div className="text-base font-bold text-cyan-300">{bowler.verified.economy.toFixed(2)}</div>
                </div>
                <div className="bg-blue-900/30 p-2 rounded-lg">
                  <div className="text-[10px] text-slate-300">Dot Ball %</div>
                  <div className="text-base font-bold text-emerald-400">{bowler.verified.dotBallPct}%</div>
                </div>
              </div>
            ) : null}

            <div className="mt-2.5 flex items-center justify-between text-xs text-slate-300 px-1">
              <span>Composite Rating: <strong className="text-white font-mono">{player.verified.rating ?? 'N/A'}</strong></span>
              <span>
                {isBatter && batter ? (
                  `Dismissals: ${batter.verified.dismissals} (exp ${batter.verified.expectedDismissals})`
                ) : bowler ? (
                  `Spells ≤ Exp: ${bowler.verified.spellsBelowExp}`
                ) : null}
              </span>
            </div>
          </div>
        </div>

        {/* Model Component Z-Scores Visualization */}
        {zScoreData.length > 0 && (
          <div className="my-6 p-4 rounded-xl bg-slate-900/50 border border-blue-900/40">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-pink-400" />
              Standardized Rating Components (Z-Scores vs Eligible League Pool)
            </h4>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={zScoreData} layout="vertical" margin={{ top: 5, right: 30, left: 70, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                  <XAxis type="number" domain={[-3, 4]} stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} width={90} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                    formatter={(val: number) => [val.toFixed(2), 'Z-Score']}
                  />
                  <ReferenceLine x={0} stroke="#475569" strokeWidth={1.5} />
                  <Bar dataKey="score" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Weights: Run/Econ Value (35%), Dismissal/Wicket Strike (25%), Own Baseline Delta (20%), Innings Consistency (20%).
            </p>
          </div>
        )}

        {/* Scouting Observations & Rajasthan Royals Strategy */}
        <div className="space-y-4 my-6">
          <div className="p-4 rounded-xl bg-pink-950/20 border border-pink-500/30">
            <h4 className="text-sm font-bold text-pink-400 uppercase tracking-wider flex items-center gap-2 mb-1.5">
              <Zap className="w-4 h-4 text-pink-400" />
              Rajasthan Royals Tactical Fit & Scouting Verdict
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed">
              {player.rrFit}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20">
            <h4 className="text-sm font-bold text-blue-300 uppercase tracking-wider flex items-center gap-2 mb-1.5">
              <Target className="w-4 h-4 text-blue-400" />
              Empirical Scouting Observation
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {player.scoutingObservation}
            </p>
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
            <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Verified Strengths
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {player.strengths.map((str, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20">
            <h5 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              Identified Risks & Vulnerabilities
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {player.weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-blue-900/50 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Source: RR SupeRR Selector S2 Pressure Performance Report (Nov 2026)
          </div>
          <div className="flex items-center gap-3">
            {onCompareWith && (
              <button
                onClick={() => {
                  onCompareWith(player);
                  onClose();
                }}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
              >
                Add to Comparison Deck
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

