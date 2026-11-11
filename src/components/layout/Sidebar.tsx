import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Flame, 
  Target, 
  BookOpen, 
  Presentation, 
  Compass, 
  ShieldCheck, 
  SlidersHorizontal,
  X,
  Award
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onOpenPresentation: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpen,
  onClose,
  onOpenPresentation
}) => {
  const navItems = [
    {
      id: 'overview',
      label: 'Executive Overview',
      icon: LayoutDashboard,
      badge: 'Core'
    },
    {
      id: 'batters',
      label: 'Top 10 Batters',
      icon: Award,
      badge: '10'
    },
    {
      id: 'bowlers',
      label: 'Top 10 Bowlers',
      icon: Target,
      badge: '10'
    },
    {
      id: 'comparison',
      label: 'Player Comparison',
      icon: Users,
      badge: 'Radar'
    },
    {
      id: 'analytics',
      label: 'Pressure Analytics',
      icon: Flame,
      badge: 'Deep Dive'
    },
    {
      id: 'recommendations',
      label: 'RR Squad Strategy',
      icon: ShieldCheck,
      badge: 'IPL 2027'
    },
    {
      id: 'methodology',
      label: 'Model Methodology',
      icon: BookOpen,
      badge: 'Formulas'
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#00173B] border-r border-blue-900/40 p-4 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div>
          {/* Logo & Close on mobile */}
          <div className="flex items-center justify-between pb-5 border-b border-blue-900/40 px-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center font-extrabold text-sm text-white">
                RR
              </div>
              <div>
                <div className="text-sm font-extrabold text-white tracking-tight">ROYALS SCOUT</div>
                <div className="text-[10px] text-pink-400 font-semibold uppercase tracking-wider">Pressure Analytics</div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="lg:hidden p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg shadow-pink-600/25 font-bold' 
                      : 'text-slate-300 hover:bg-blue-950/70 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Widget */}
        <div className="space-y-3 pt-4 border-t border-blue-900/40">
          {/* Quick Pitch Deck Trigger */}
          <button
            onClick={() => {
              onOpenPresentation();
              onClose();
            }}
            className="w-full p-3 rounded-xl bg-gradient-to-r from-blue-950 to-pink-950/40 border border-pink-500/30 text-left hover:border-pink-500 transition-all group"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-pink-400 uppercase tracking-wider">
              <Presentation className="w-3.5 h-3.5" />
              Judges Pitch Mode
            </div>
            <div className="text-[11px] text-slate-300 mt-1">
              Full-screen 2-3 minute presentation
            </div>
          </button>

          <div className="px-2 text-[10px] text-slate-500 leading-tight">
            Rajasthan Royals SupeRR Selector S2<br />
            Data pack: ball_by_ball (2022-2026)<br />
            Prepared: 11 November 2026
          </div>
        </div>
      </aside>
    </>
  );
};

