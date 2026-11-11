import React, { useState, useEffect } from 'react';
import { BatterData, BowlerData } from '../../types';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  ShieldAlert, 
  CheckCircle2, 
  Flame, 
  Target, 
  BarChart3, 
  ArrowRight,
  Maximize2,
  Clock,
  Sparkles
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface JudgesPresentationModeProps {
  batters: BatterData[];
  bowlers: BowlerData[];
  onExit: () => void;
  onSelectPlayer: (player: BatterData | BowlerData) => void;
}

export const JudgesPresentationMode: React.FC<JudgesPresentationModeProps> = ({
  batters,
  bowlers,
  onExit,
  onSelectPlayer
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const totalSlides = 4;

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) setCurrentSlide(currentSlide + 1);
  };

  const handlePrev = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        onExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  return (
    <div className="fixed inset-0 z-50 bg-[#001026] text-white flex flex-col justify-between overflow-hidden animate-fade-in font-sans">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-blue-900/40 bg-[#001D48]/70 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center font-black text-sm text-white shadow-lg shadow-pink-600/30">
            RR
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              SupeRR Selector Season 2 • Judges Pitch Deck
              <span className="text-[10px] uppercase tracking-wider bg-pink-600/30 text-pink-300 px-2 py-0.5 rounded border border-pink-500/30">
                2-3 Min Briefing
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Reliable Under Pressure: A Data-Led Scouting Report for IPL 2027
            </div>
          </div>
        </div>

        {/* Slide Tracker and Exit */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === idx ? 'w-8 bg-pink-500' : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                title={`Slide ${idx + 1}`}
              />
            ))}
          </div>
          <span className="text-xs font-mono text-slate-400">
            {currentSlide + 1} / {totalSlides}
          </span>
          <button
            onClick={onExit}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white transition-colors ml-2"
            title="Exit Presentation Mode (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Content Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-12 flex items-center justify-center">
        <div className="w-full max-w-6xl">
          {/* SLIDE 1: Executive Overview & The RR Franchise Gap */}
          {currentSlide === 0 && (
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-600/20 text-pink-400 border border-pink-500/30">
                <Target className="w-3.5 h-3.5" /> Slide 1: Franchise Context &amp; The Core Problem
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Rajasthan Royals' Gap is <span className="text-pink-500">Wicket-Taking Under Pressure</span>
              </h2>
              <p className="text-slate-300 text-base md:text-lg max-w-3xl leading-relaxed">
                Evaluating 200,999 ball-by-ball deliveries across IPL 2022 to 2026 confirms that RR’s batting is already performing above league expectation. 
                The empirical weakness that costs tight matches is bowling penetration when games tighten.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="p-6 rounded-2xl bg-[#081F4D] border border-rose-500/40 shadow-xl">
                  <div className="flex items-center justify-between text-rose-400 font-bold uppercase text-xs tracking-wider">
                    <span>The Observable Franchise Deficit</span>
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="text-4xl font-extrabold text-white">5.99</span>
                    <span className="text-sm text-slate-400">vs 6.66 expected wkts / 100 balls</span>
                    <span className="text-xs font-bold text-rose-400 px-2 py-0.5 rounded bg-rose-950/80 border border-rose-800">
                      -10.1% Deficit
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    Across 1,737 high-pressure balls bowled by Rajasthan Royals, bowlers conceded 8.85 an over (solid economy), but failed to strike. Opponents steadily chased down targets without losing wickets in clusters.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#081F4D] border border-emerald-500/40 shadow-xl">
                  <div className="flex items-center justify-between text-emerald-400 font-bold uppercase text-xs tracking-wider">
                    <span>RR Batting Baseline (Healthy)</span>
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="text-4xl font-extrabold text-white">155.0</span>
                    <span className="text-sm text-slate-400">vs 149.4 expected runs / 100 balls</span>
                    <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800">
                      +5.6 Above Par
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    Across 1,432 pressure balls, RR batters scored above league par with 7.05 dismissals/100 balls vs 7.08 expected. Batting requires targeted finisher enhancement (e.g. Ashutosh, Dubey), not overhaul.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 2: Verification Discrepancies & Volume Illusions */}
          {currentSlide === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-600/20 text-cyan-400 border border-cyan-500/30">
                <BarChart3 className="w-3.5 h-3.5" /> Slide 2: Supplied Rankings vs Objective Verification
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Separating <span className="text-pink-500">True Clutch Performers</span> from Volume Illusions
              </h2>
              <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
                The supplied screenshot rankings were based on undefined volume metrics. Recomputing pressure with objective win-probability index (PI &ge; 0.51 after Over 4) reveals dramatic revelations:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Winner Card: Ashutosh & Mohsin */}
                <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 shadow-xl space-y-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Validated #1 Targets (Statistically Sound)
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-900/40">
                      <div className="flex items-center justify-between">
                        <strong className="text-base text-white">Ashutosh Sharma (DC)</strong>
                        <span className="text-xs font-mono font-bold text-pink-400 bg-pink-950/60 px-2 py-0.5 rounded border border-pink-800">
                          Model Rank #1 / 92
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 mt-1">
                        Surges from 109 normal SR to <strong>189 under pressure (+80 delta)</strong>. Stayed top 10 in 500/500 Monte Carlo tests.
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-900/40">
                      <div className="flex items-center justify-between">
                        <strong className="text-base text-white">Mohsin Khan (LSG)</strong>
                        <span className="text-xs font-mono font-bold text-cyan-300 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800">
                          Model Rank #11 / 145
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 mt-1">
                        Takes 10 wickets vs 7.5 expected with a stifling <strong>7.22 economy</strong> and 40% dot balls (66% death overs).
                      </div>
                    </div>
                  </div>
                </div>

                {/* Red Flag Card: Samad & Vaibhav Arora */}
                <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/40 shadow-xl space-y-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4" /> Busted by Rigorous Data (Scouting Cautions)
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-rose-900/40">
                      <div className="flex items-center justify-between">
                        <strong className="text-base text-white">Abdul Samad (LSG)</strong>
                        <span className="text-xs font-mono font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800">
                          Model Rank #81 / 92
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 mt-1">
                        Supplied 506 runs was volume. Under real pressure, SR collapses from <strong>161 to 130 (-31 drop)</strong>.
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/80 border border-rose-900/40">
                      <div className="flex items-center justify-between">
                        <strong className="text-base text-white">Vaibhav Arora (KKR)</strong>
                        <span className="text-xs font-mono font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800">
                          Model Rank #126 / 145
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 mt-1">
                        Supplied 23 wickets was match volume. Concedes a disastrous <strong>10.61 economy</strong> under pressure (+1.73 leakier).
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 3: The Data Science Engine */}
          {currentSlide === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-600/20 text-purple-300 border border-purple-500/30">
                <Sparkles className="w-3.5 h-3.5" /> Slide 3: Statistical Governance &amp; Methodological Rigour
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Objective Mathematics, <span className="text-pink-500">Not Reputation</span>
              </h2>
              <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
                How our algorithm guarantees reproducible, unbiased scouting intelligence across diverse formats and match situations.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                <div className="p-5 rounded-2xl bg-[#081F4D] border border-blue-900/50 shadow-xl">
                  <div className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-2">
                    1. Dynamic Pressure Index (PI)
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Evaluated on all 200,999 balls using required run rate (chases) or excess wickets &amp; par trajectory (1st innings). <strong>PI &ge; 0.51 after over 4</strong> defines the high-pressure quadrant (19.8% of deliveries).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#081F4D] border border-blue-900/50 shadow-xl">
                  <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">
                    2. Empirical Bayes Shrinkage
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Constants (60, 150, 5) regress small sample bursts toward league average. A batter with 80 balls cannot eclipse a proven performer with 250 balls on pure luck.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#081F4D] border border-blue-900/50 shadow-xl">
                  <div className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                    3. Monte Carlo Sensitivity
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    500 random weight variations prove stability: Ashutosh Sharma achieved <strong>100% Top-10 retention</strong>, confirming that model rankings are genuinely signal, not arbitrary weighting artifacts.
                  </p>
                </div>
              </div>

              {/* Sample Size Transparency Banner */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-slate-300 flex items-center justify-between">
                <div>
                  <strong className="text-white">Sample Size Integrity:</strong> Openers (Prabhsimran Singh &amp; Priyansh Arya) correctly flagged with 0 pressure balls; 7 other players tagged with asterisks (*) due to thin sample thresholds.
                </div>
                <span className="font-mono text-pink-400 font-bold shrink-0 ml-4">Zero Hidden Flaws</span>
              </div>
            </div>
          )}

          {/* SLIDE 4: Rajasthan Royals IPL 2027 Action Plan */}
          {currentSlide === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-600/20 text-pink-400 border border-pink-500/30">
                <Flame className="w-3.5 h-3.5" /> Slide 4: Rajasthan Royals IPL 2027 Action Blueprint
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Actionable Recommendations for the <span className="text-pink-500">RR War Room</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                {/* Action 1 */}
                <div className="p-5 rounded-2xl bg-[#081F4D] border border-blue-500/40 shadow-xl flex flex-col justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600/30 text-cyan-300 uppercase tracking-wider border border-blue-500/30">
                      Auction Priority #1
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2">Mohsin Khan (Left-arm Seam)</h3>
                    <div className="text-xs text-cyan-300 mt-0.5">LSG Squad (Unverified 2027 Status)</div>
                    <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                      Directly solves RR's -10.1% pressure wicket deficit. 10 wickets vs 7.5 exp, 7.22 economy, 66% death overs. If released by LSG, allocate primary seamer purse.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-blue-900/40 text-[11px] text-slate-400">
                    Alternative: Watch <strong>Anshul Kamboj</strong> (CSK, 84% death, 47% dots)
                  </div>
                </div>

                {/* Action 2 */}
                <div className="p-5 rounded-2xl bg-[#081F4D] border border-pink-500/40 shadow-xl flex flex-col justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-pink-600/30 text-pink-300 uppercase tracking-wider border border-pink-500/30">
                      Auction Priority #2
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2">Ashutosh Sharma (Finisher)</h3>
                    <div className="text-xs text-pink-300 mt-0.5">DC Squad (Unverified 2027 Status)</div>
                    <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                      Rank #1 batter in entire dataset. 189 pressure SR (+80 surge) at position 7. Provides unshakeable match-finishing firepower if in auction pool.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-pink-900/40 text-[11px] text-slate-400">
                    Backup: <strong>Shashank Singh</strong> (PBKS, 9 dism vs 17.2 exp)
                  </div>
                </div>

                {/* Action 3 */}
                <div className="p-5 rounded-2xl bg-[#081F4D] border border-amber-500/40 shadow-xl flex flex-col justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-600/30 text-amber-300 uppercase tracking-wider border border-amber-500/30">
                      Internal Retention
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2">Shubham Dubey</h3>
                    <div className="text-xs text-amber-300 mt-0.5">Already in Rajasthan Royals Squad</div>
                    <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                      185 strike rate under pressure, beating expected runs in 7 of 9 pressure innings. Do not look outside: retain and assign him explicit death-hitting role.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-amber-900/40 text-[11px] text-slate-400">
                    Cost Efficiency: Zero auction expenditure required.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Control Bar */}
      <div className="px-8 py-4 border-t border-blue-900/40 bg-[#001D48]/80 backdrop-blur-md flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentSlide === 0}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
            currentSlide === 0 
              ? 'text-slate-600 cursor-not-allowed' 
              : 'bg-slate-800 hover:bg-slate-700 text-white'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous Slide
        </button>

        <div className="text-center hidden sm:block">
          <div className="text-xs font-semibold text-slate-300">
            {currentSlide === 0 && 'Executive Overview & Rajasthan Royals Deficit'}
            {currentSlide === 1 && 'Verification Discrepancies & Top Performers'}
            {currentSlide === 2 && 'Statistical Methodology & Bayesian Rigour'}
            {currentSlide === 3 && 'Rajasthan Royals IPL 2027 Auction Blueprint'}
          </div>
          <div className="text-[10px] text-slate-500">Use Left / Right arrow keys or spacebar to navigate</div>
        </div>

        {currentSlide < totalSlides - 1 ? (
          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs font-bold bg-pink-600 hover:bg-pink-500 text-white transition-colors shadow-lg shadow-pink-600/30"
          >
            Next Slide
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onExit}
            className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-lg shadow-emerald-600/30"
          >
            Return to Interactive Hub
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

