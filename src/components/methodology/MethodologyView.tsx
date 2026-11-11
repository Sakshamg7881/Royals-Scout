import React from 'react';
import { METHODOLOGY_DETAILS } from '../../data/cricketData';
import { 
  BookOpen, 
  Calculator, 
  Filter, 
  Cpu, 
  AlertCircle, 
  CheckCircle2, 
  ShieldAlert, 
  Sliders, 
  Compass, 
  RefreshCw 
} from 'lucide-react';

export const MethodologyView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Title Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#001D48] via-[#0A2558] to-[#00122E] border border-blue-800/50 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-600/20 text-pink-400 border border-pink-500/30 mb-2">
          <Calculator className="w-3.5 h-3.5" />
          Section 4, 5, 6 &amp; 11 • Mathematical Architecture
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">
          Pressure Analytics Methodology &amp; Statistical Model
        </h2>
        <p className="text-slate-300 text-xs md:text-sm max-w-3xl mt-2 leading-relaxed">
          Full mathematical transparency on how pressure situations are objectively quantified, how expected values are conditioned, and how Bayesian shrinkage safeguards against small-sample mirages.
        </p>
      </div>

      {/* 1. Pressure Index Formulation */}
      <div className="p-6 rounded-2xl bg-[#081F4D]/90 border border-blue-900/60 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-pink-400 font-bold uppercase text-xs tracking-wider border-b border-blue-900/60 pb-3">
          <Cpu className="w-4 h-4 text-pink-500" />
          1. Objective Ball-by-Ball Pressure Situation Definition
        </div>
        
        <p className="text-xs text-slate-300 leading-relaxed">
          Pressure is computed on every single delivery from <strong>0 to 1</strong> using exclusively prior information available before the bowler enters their delivery stride. 
          Deliveries in overs 1-4 are excluded because early-innings states carry negligible situational win-probability context. 
          A ball is classified as <strong>High Pressure</strong> when its index is <strong className="text-pink-400">&ge; 0.51</strong> (the 75th percentile of the index after over 4). 
          This isolates the hardest 19.8% of all match deliveries (39,869 balls out of 200,999).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Second Innings Formula */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-blue-900/50">
            <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">
              Second Innings (Chases)
            </div>
            <div className="font-mono text-xs bg-slate-950 p-3 rounded-lg border border-slate-800 text-pink-300 overflow-x-auto">
              PI₂ = 0.5·clip((RRR − 6)/8, 0, 1) + 0.3·clip(W/8, 0, 1) + 0.2·clip((B − 24)/96, 0, 1)
            </div>
            <ul className="space-y-1 text-[11px] text-slate-400 mt-3">
              <li>• <strong>RRR:</strong> Required Run Rate = (target - score) / balls left &times; 6</li>
              <li>• <strong>W:</strong> Wickets lost by the batting side</li>
              <li>• <strong>B:</strong> Legal balls bowled in the chase</li>
              <li>• <em>PI₂ resets to 0 once target is reached</em></li>
            </ul>
          </div>

          {/* First Innings Formula */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-blue-900/50">
            <div className="text-xs font-bold text-pink-300 uppercase tracking-wider mb-2">
              First Innings (Setting Par / Distress)
            </div>
            <div className="font-mono text-xs bg-slate-950 p-3 rounded-lg border border-slate-800 text-pink-300 overflow-x-auto">
              PI₁ = 0.4·clip(Wx/3, 0, 1) + 0.4·clip((Par − S)/30, 0, 1) + 0.2·clip((B − 24)/96, 0, 1)
            </div>
            <ul className="space-y-1 text-[11px] text-slate-400 mt-3">
              <li>• <strong>Wx:</strong> Excess wickets = max(0, W - 0.32 &times; overs completed)</li>
              <li>• <strong>Par:</strong> League average first-innings score at same ball (165 baseline)</li>
              <li>• <strong>S:</strong> Current batting score</li>
              <li>• <strong>B:</strong> Legal deliveries bowled</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 2. Batting & Bowling Ranking Models */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Batting Model */}
        <div className="p-6 rounded-2xl bg-[#081F4D]/90 border border-blue-900/60 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-blue-900/60 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-pink-500" />
              2. Batting Evaluation Architecture
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-pink-600/20 text-pink-300 border border-pink-500/30">
              Min: 80 balls &amp; 8 inns (5+b)
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {METHODOLOGY_DETAILS.battingFormulas.components.map((comp, i) => (
              <div key={i} className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
                <div className="font-semibold text-white flex items-center justify-between">
                  <span>{comp.name}</span>
                </div>
                <div className="font-mono text-[11px] text-pink-400 my-1 bg-slate-950 px-2 py-1 rounded">
                  {comp.formula}
                </div>
                <div className="text-[11px] text-slate-400">{comp.desc}</div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-pink-950/20 border border-pink-500/30 text-xs text-pink-200">
            <strong>Shrinkage Terms (60, 150, 5):</strong> Empirical Bayes shrinkage pulls small samples toward the league average so that a batter with 85 lucky balls cannot outrank an experienced player with 260 balls.
          </div>
        </div>

        {/* Bowling Model */}
        <div className="p-6 rounded-2xl bg-[#081F4D]/90 border border-blue-900/60 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-blue-900/60 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              3. Bowling Evaluation Architecture
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-blue-600/20 text-cyan-300 border border-blue-500/30">
              Min: 60 balls &amp; 6 spells (6+b)
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {METHODOLOGY_DETAILS.bowlingFormulas.components.map((comp, i) => (
              <div key={i} className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
                <div className="font-semibold text-white flex items-center justify-between">
                  <span>{comp.name}</span>
                </div>
                <div className="font-mono text-[11px] text-cyan-400 my-1 bg-slate-950 px-2 py-1 rounded">
                  {comp.formula}
                </div>
                <div className="text-[11px] text-slate-400">{comp.desc}</div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/30 text-xs text-cyan-200">
            <strong>Expectation Conditioning:</strong> Expected economy E(Rc) and expected wickets E(W) are computed strictly within format &times; innings &times; phase cells, ensuring a T20I bowler is compared against T20I conditions and IPL bowlers against IPL conditions.
          </div>
        </div>
      </div>

      {/* 3. Monte Carlo Sensitivity & Limitations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monte Carlo Weight Sensitivity */}
        <div className="p-6 rounded-2xl bg-[#081F4D]/90 border border-blue-900/60 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold uppercase text-xs tracking-wider border-b border-blue-900/60 pb-3">
            <RefreshCw className="w-4 h-4 text-amber-400" />
            4. Monte Carlo Robustness Check (500 Random Weight Simulations)
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            To confirm that rankings are not artifacts of subjective analyst weights (0.35 / 0.25 / 0.20 / 0.20), the entire pool was re-ranked <strong>500 consecutive times</strong> with randomly drawn weights from uniform distributions:
          </p>

          <div className="space-y-2.5 pt-1 text-xs">
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <strong className="text-white">Ashutosh Sharma:</strong>
                <div className="text-[11px] text-slate-400">Remained in Top 10 in 500 of 500 trials</div>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                100% Top-10 Robustness
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <strong className="text-white">Mohsin Khan (Model Rank #11):</strong>
                <div className="text-[11px] text-slate-400">Entered Top 10 in 230 of 500 trials (borderline)</div>
              </div>
              <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 font-mono font-bold">
                46% Top-10 Incursion
              </span>
            </div>
          </div>
        </div>

        {/* Dataset Limitations & Boundary Conditions */}
        <div className="p-6 rounded-2xl bg-[#081F4D]/90 border border-blue-900/60 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-bold uppercase text-xs tracking-wider border-b border-blue-900/60 pb-3">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            5. Dataset Boundaries &amp; Rigorous Limitations
          </div>

          <div className="space-y-2 text-xs">
            {METHODOLOGY_DETAILS.limitations.map((lim, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800">
                <span className="font-semibold text-rose-300">• {lim.title}: </span>
                <span className="text-slate-300 text-[11px]">{lim.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

