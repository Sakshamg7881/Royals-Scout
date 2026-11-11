import React, { useState } from 'react';
import { BATTERS_DATA, BOWLERS_DATA } from './data/cricketData';
import { BatterData, BowlerData } from './types';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { ExecutiveOverview } from './components/overview/ExecutiveOverview';
import { BattersTable } from './components/tables/BattersTable';
import { BowlersTable } from './components/tables/BowlersTable';
import { PlayerComparison } from './components/comparison/PlayerComparison';
import { PressureAnalytics } from './components/analytics/PressureAnalytics';
import { RRRecommendations } from './components/recommendations/RRRecommendations';
import { MethodologyView } from './components/methodology/MethodologyView';
import { PlayerProfileModal } from './components/common/PlayerProfileModal';
import { JudgesPresentationMode } from './components/presentation/JudgesPresentationMode';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState<boolean>(false);
  const [selectedPlayer, setSelectedPlayer] = useState<BatterData | BowlerData | null>(null);

  const handleSelectPlayer = (player: BatterData | BowlerData) => {
    setSelectedPlayer(player);
  };

  const handleCompareWith = (player: BatterData | BowlerData) => {
    setActiveTab('comparison');
  };

  return (
    <div className="min-h-screen bg-[#00122E] text-slate-100 flex flex-col font-sans selection:bg-pink-500 selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpenPresentation={() => setIsPresentationOpen(true)}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <Navbar
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onOpenPresentation={() => setIsPresentationOpen(true)}
          activeTab={activeTab}
        />

        <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {activeTab === 'overview' && (
            <ExecutiveOverview
              batters={BATTERS_DATA}
              bowlers={BOWLERS_DATA}
              onSelectPlayer={handleSelectPlayer}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'batters' && (
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  Top 10 Batters: Verified Pressure Rankings
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Comparing original supplied rankings against recomputed ball-by-ball Pressure Index (&ge;0.51 after Over 4).
                </p>
              </div>
              <BattersTable
                batters={BATTERS_DATA}
                onSelectPlayer={handleSelectPlayer}
                onCompareWith={handleCompareWith}
              />
            </div>
          )}

          {activeTab === 'bowlers' && (
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  Top 10 Bowlers: Verified Pressure Rankings
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Assessing bowling economy, wicket strike rates, dot-ball percentages, and death-overs resistance.
                </p>
              </div>
              <BowlersTable
                bowlers={BOWLERS_DATA}
                onSelectPlayer={handleSelectPlayer}
                onCompareWith={handleCompareWith}
              />
            </div>
          )}

          {activeTab === 'comparison' && (
            <PlayerComparison
              batters={BATTERS_DATA}
              bowlers={BOWLERS_DATA}
              onSelectPlayer={handleSelectPlayer}
            />
          )}

          {activeTab === 'analytics' && (
            <PressureAnalytics
              batters={BATTERS_DATA}
              bowlers={BOWLERS_DATA}
              onSelectPlayer={handleSelectPlayer}
            />
          )}

          {activeTab === 'recommendations' && (
            <RRRecommendations
              batters={BATTERS_DATA}
              bowlers={BOWLERS_DATA}
              onSelectPlayer={handleSelectPlayer}
            />
          )}

          {activeTab === 'methodology' && (
            <MethodologyView />
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-blue-900/40 bg-[#00173B]/50 py-6 px-4 lg:px-8 mt-12 text-center text-xs text-slate-400 space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <span>Rajasthan Royals SupeRR Selector Season 2</span>
            <span>•</span>
            <span>IPL 2027 Scouting Round 1</span>
            <span>•</span>
            <span>Data-Led Analytical Verification Companion</span>
          </div>
          <div className="text-[11px] text-slate-500 max-w-2xl mx-auto">
            All rankings, ratings, and metrics derived from ball_by_ball data pack (Jan 2022 to Nov 2026). Auction eligibility and retentions are non-asserted unverified parameters.
          </div>
        </footer>
      </div>

      {/* Individual Player Profile Modal / Drawer */}
      {selectedPlayer && (
        <PlayerProfileModal
          player={selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
          onCompareWith={handleCompareWith}
        />
      )}

      {/* Full-Screen Judges Presentation Mode */}
      {isPresentationOpen && (
        <JudgesPresentationMode
          batters={BATTERS_DATA}
          bowlers={BOWLERS_DATA}
          onExit={() => setIsPresentationOpen(false)}
          onSelectPlayer={handleSelectPlayer}
        />
      )}
    </div>
  );
}

export default App;

