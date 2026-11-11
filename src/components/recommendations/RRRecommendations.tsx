import React, { useState } from 'react';
import { BatterData, BowlerData } from '../../types';
import { SQUAD_RECOMMENDATIONS_DATA } from '../../data/cricketData';
import { StatusBadge } from '../common/StatusBadge';
import { 
  ShieldCheck, 
  Target, 
  AlertTriangle, 
  Sparkles, 
  Flame, 
  Crosshair, 
  ArrowRight, 
  Info,
  CheckCircle2,
  Lock,
  ChevronRight
} from 'lucide-react';

interface RRRecommendationsProps {
  batters: BatterData[];
  bowlers: BowlerData[];
  onSelectPlayer: (player: BatterData | BowlerData) => void;
}

export const RRRecommendations: React.FC<RRRecommendationsProps> = ({ batters, bowlers, onSelectPlayer }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const allPlayersMap = new Map<string, BatterData | BowlerData>();
  batters.forEach(b => allPlayersMap.set(b.id, b));
  bowlers.forEach(b => allPlayersMap.set(b.id, b));

  const filteredCategories = activeCategory === 'all'
    ? SQUAD_RECOMMENDATIONS_DATA
    : SQUAD_RECOMMENDATIONS_DATA.filter(c => c.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Strategic Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0A2558] via-[#081F4D] to-[#00122E] border border-blue-800/50 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-600/20 text-pink-400 border border-pink-500/30 mb-2">
          <Target className="w-3.5 h-3.5" />
          Rajasthan Royals Strategic Auction Blueprint • IPL 2027
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">
          Data-Led Squad Construction &amp; Target Shortlists
        </h2>
        <p className="text-slate-300 text-xs md:text-sm max-w-3xl mt-2 leading-relaxed">
          Empirical guidance tailored to Rajasthan Royals' 2022-26 franchise profile: <strong>batting is already at or above par</strong> (+5.6 runs/100 balls), but <strong>wicket-taking under pressure lags significantly</strong> (6.0 vs 6.7 expected). Targets are prioritized to directly eliminate this deficit.
        </p>

        {/* Auction Caveat Banner */}
        <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300">Mandatory Governance Notice:</strong> Auction availability, retention choices, overseas slots, and base prices are not part of the ball-by-ball dataset. All candidates are evaluated purely on on-field performance metrics; franchise scouts must independently verify retention releases prior to auction bidding.
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeCategory === 'all' ? 'bg-pink-600 text-white shadow' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
          }`}
        >
          All Strategy Categories
        </button>
        <button
          onClick={() => setActiveCategory('bowling')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeCategory === 'bowling' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Priority Bowling (Fix RR Gap)
        </button>
        <button
          onClick={() => setActiveCategory('batting')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeCategory === 'batting' ? 'bg-pink-600 text-white shadow' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Priority Batting Targets
        </button>
        <button
          onClick={() => setActiveCategory('retention')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeCategory === 'retention' ? 'bg-amber-600 text-white shadow' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
          }`}
        >
          In-House Retention (Dubey)
        </button>
        <button
          onClick={() => setActiveCategory('death')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeCategory === 'death' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Death-Over Specialists
        </button>
        <button
          onClick={() => setActiveCategory('caution')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeCategory === 'caution' ? 'bg-rose-600 text-white shadow' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Caution &amp; Red Flags
        </button>
      </div>

      {/* Categories Grid */}
      <div className="space-y-6">
        {filteredCategories.map((cat, catIdx) => (
          <div 
            key={catIdx}
            className="p-5 md:p-6 rounded-2xl bg-[#081F4D]/90 border border-blue-900/60 shadow-xl space-y-4"
          >
            <div className="border-b border-blue-900/60 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${cat.tagColor}`}></span>
                  {cat.category}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{cat.subtitle}</p>
              </div>
              <span className="text-xs text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800 self-start sm:self-auto font-mono">
                {cat.players.length} Target{cat.players.length > 1 ? 's' : ''}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {cat.players.map((target) => {
                const fullPlayer = allPlayersMap.get(target.id);

                return (
                  <div 
                    key={target.id}
                    className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-pink-500/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-bold text-white">{target.name}</h4>
                            <span className="text-xs px-2 py-0.5 rounded bg-blue-900/40 text-cyan-300 font-mono">
                              Model Rank #{target.modelRank}
                            </span>
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5">{target.role}</div>
                        </div>

                        <div className="text-right">
                          <div className="text-[10px] text-slate-400 uppercase font-semibold">Reliability</div>
                          <div className="text-sm font-bold text-pink-400 font-mono">
                            {target.verifiedRating > 0 ? `+${target.verifiedRating.toFixed(2)}` : target.verifiedRating.toFixed(2)}
                          </div>
                        </div>
                      </div>

                      {/* Stat Pill Bar */}
                      <div className="flex flex-wrap items-center gap-2 mt-3 text-[11px]">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          Status: <strong className="text-white">{target.status}</strong>
                        </span>
                        {target.pressureSR && (
                          <span className="px-2 py-0.5 rounded bg-pink-950/60 text-pink-300 border border-pink-800/40 font-mono">
                            Pressure SR: <strong>{target.pressureSR}</strong> (vs {target.normalSR})
                          </span>
                        )}
                        {target.pressureEcon && (
                          <span className="px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40 font-mono">
                            Econ: <strong>{target.pressureEcon}</strong> (vs {target.normalEcon})
                          </span>
                        )}
                        {target.deathPct && (
                          <span className="px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/40">
                            {target.deathPct}
                          </span>
                        )}
                      </div>

                      {/* Tactical Rationale */}
                      <div className="mt-3 text-xs text-slate-300 leading-relaxed bg-blue-950/30 p-2.5 rounded-lg border border-blue-900/30">
                        <strong className="text-pink-400 block mb-0.5">Rajasthan Royals Tactical Rationale:</strong>
                        {target.tacticalRationale}
                      </div>

                      {/* Auction Governance Disclaimer */}
                      <div className="mt-2 text-[11px] text-amber-300/90 flex items-center gap-1.5">
                        <Lock className="w-3 h-3 text-amber-400 shrink-0" />
                        <span>{target.auctionStatus}</span>
                      </div>
                    </div>

                    {fullPlayer && (
                      <button
                        onClick={() => onSelectPlayer(fullPlayer)}
                        className="mt-4 pt-2 border-t border-slate-800/80 text-xs font-medium text-pink-400 hover:text-pink-300 flex items-center justify-between transition-colors"
                      >
                        <span>View complete ball-by-ball scouting profile</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

