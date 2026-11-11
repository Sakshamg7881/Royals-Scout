import React from 'react';
import { 
  Flame, 
  Download, 
  Presentation, 
  Menu, 
  Search, 
  FileSpreadsheet, 
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { downloadBattersCSV, downloadBowlersCSV } from '../../utils/csvExport';

interface NavbarProps {
  onToggleSidebar: () => void;
  onOpenPresentation: () => void;
  activeTab: string;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onToggleSidebar, 
  onOpenPresentation,
  activeTab 
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#001D48]/90 backdrop-blur-md border-b border-blue-900/50 px-4 lg:px-8 py-3 flex items-center justify-between">
      {/* Left: Mobile Menu & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
          title="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-600 to-rose-500 flex items-center justify-center font-black text-white text-base shadow-lg shadow-pink-600/30">
            RR
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-sm tracking-tight hidden sm:inline-block">
                Rajasthan Royals
              </span>
              <span className="text-pink-400 font-bold text-xs uppercase tracking-wider bg-pink-950/60 px-2 py-0.5 rounded border border-pink-800/40">
                SupeRR Selector S2
              </span>
            </div>
            <div className="text-[11px] text-slate-400 hidden sm:block">
              IPL 2027 Pressure Scouting Intelligence
            </div>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2.5">
        {/* CSV Export Dropdown / Buttons */}
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            onClick={downloadBattersCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            title="Download Batters Verified CSV"
          >
            <Download className="w-3.5 h-3.5 text-pink-400" />
            <span>Batters CSV</span>
          </button>
          <button
            onClick={downloadBowlersCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            title="Download Bowlers Verified CSV"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Bowlers CSV</span>
          </button>
        </div>

        {/* Presentation Mode Button */}
        <button
          onClick={onOpenPresentation}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-lg shadow-pink-600/30 transition-all transform hover:scale-[1.02]"
        >
          <Presentation className="w-4 h-4" />
          <span className="hidden md:inline">Judges Presentation (2-3 min)</span>
          <span className="md:hidden">Pitch</span>
        </button>
      </div>
    </header>
  );
};

