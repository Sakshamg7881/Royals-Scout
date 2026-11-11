import React, { useState, useMemo } from 'react';
import { BatterData, VerificationStatus } from '../../types';
import { StatusBadge, SampleFlagBadge } from '../common/StatusBadge';
import { Search, ArrowUpDown, ChevronDown, ChevronUp, Eye, Download, Info, Filter, AlertCircle } from 'lucide-react';
import { downloadBattersCSV } from '../../utils/csvExport';

interface BattersTableProps {
  batters: BatterData[];
  onSelectPlayer: (player: BatterData) => void;
  onCompareWith?: (player: BatterData) => void;
}

type SortField = 'rank' | 'name' | 'balls' | 'runs' | 'strikeRate' | 'strikeRateDelta' | 'modelRank' | 'rating';

export const BattersTable: React.FC<BattersTableProps> = ({ batters, onSelectPlayer, onCompareWith }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('rank');
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'verified' | 'supplied' | 'comparison'>('verified');

  const filteredAndSortedBatters = useMemo(() => {
    return batters
      .filter(b => {
        const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              b.team.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || b.verified.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        let valA: any;
        let valB: any;

        switch (sortField) {
          case 'rank':
            valA = a.rank;
            valB = b.rank;
            break;
          case 'name':
            valA = a.name;
            valB = b.name;
            break;
          case 'balls':
            valA = a.verified.balls;
            valB = b.verified.balls;
            break;
          case 'runs':
            valA = viewMode === 'supplied' ? a.supplied.runs : a.verified.runs;
            valB = viewMode === 'supplied' ? b.supplied.runs : b.verified.runs;
            break;
          case 'strikeRate':
            valA = viewMode === 'supplied' ? a.supplied.strikeRate : a.verified.strikeRate;
            valB = viewMode === 'supplied' ? b.supplied.strikeRate : b.verified.strikeRate;
            break;
          case 'strikeRateDelta':
            valA = a.verified.strikeRateDelta ?? -999;
            valB = b.verified.strikeRateDelta ?? -999;
            break;
          case 'modelRank':
            valA = a.verified.modelRank ?? 999;
            valB = b.verified.modelRank ?? 999;
            break;
          case 'rating':
            valA = a.verified.rating ?? -999;
            valB = b.verified.rating ?? -999;
            break;
          default:
            valA = a.rank;
            valB = b.rank;
        }

        if (valA < valB) return sortAsc ? -1 : 1;
        if (valA > valB) return sortAsc ? 1 : -1;
        return 0;
      });
  }, [batters, searchTerm, statusFilter, sortField, sortAsc, viewMode]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(field === 'rank' || field === 'name' || field === 'modelRank');
    }
  };

  return (
    <div className="space-y-4">
      {/* Table Control Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-[#081F4D]/80 border border-blue-900/60">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search batters or teams..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-pink-500 w-56"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select 
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-900">All Statuses ({batters.length})</option>
              <option value="Supported" className="bg-slate-900">Supported (3)</option>
              <option value="Promising, thin" className="bg-slate-900">Promising, thin (1)</option>
              <option value="Not supported" className="bg-slate-900">Not supported (1)</option>
              <option value="Insufficient sample" className="bg-slate-900">Insufficient Sample (3)</option>
              <option value="No pressure data" className="bg-slate-900">No Pressure Data (2)</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-900/90 p-1 rounded-lg border border-slate-700 text-xs">
            <button
              onClick={() => setViewMode('verified')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                viewMode === 'verified' ? 'bg-pink-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Verified (Report Definition)
            </button>
            <button
              onClick={() => setViewMode('comparison')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                viewMode === 'comparison' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Comparison View
            </button>
            <button
              onClick={() => setViewMode('supplied')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                viewMode === 'supplied' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Supplied Only
            </button>
          </div>
        </div>

        {/* Export Button */}
        <button
          onClick={downloadBattersCSV}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 transition-colors self-start md:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          Export CSV (Batters)
        </button>
      </div>

      {/* Discrepancy Note Callout */}
      <div className="px-4 py-2.5 rounded-lg bg-pink-950/20 border border-pink-500/20 text-xs text-pink-200/90 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <Info className="w-4 h-4 text-pink-400 shrink-0" />
          <span>
            <strong>Analytical Integrity Note:</strong> The supplied list order (#1 to #10) is preserved strictly as provided. Verified figures recompute deliveries where Pressure Index &ge; 0.51 (mid/late innings, overs &gt; 4).
          </span>
        </span>
        <span className="text-[11px] text-pink-400 font-mono hidden md:inline-block">Pool size: 92 eligible batters</span>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl border border-blue-900/50 bg-[#081F4D]/90 shadow-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-blue-900/70 bg-[#051433] text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-3 w-12 cursor-pointer hover:text-white" onClick={() => handleSort('rank')}>
                <div className="flex items-center gap-1">
                  # <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>
              <th className="py-3 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('name')}>
                <div className="flex items-center gap-1">
                  Player Name & Role <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>
              <th className="py-3 px-3">Status & Verification</th>
              
              {viewMode !== 'supplied' ? (
                <>
                  <th className="py-3 px-3 text-right cursor-pointer hover:text-white" onClick={() => handleSort('balls')}>
                    <div className="flex items-center justify-end gap-1">
                      Pressure Balls <ArrowUpDown className="w-3 h-3 text-slate-500" />
                    </div>
                  </th>
                  <th className="py-3 px-3 text-right cursor-pointer hover:text-white" onClick={() => handleSort('runs')}>
                    <div className="flex items-center justify-end gap-1">
                      Pressure Runs <ArrowUpDown className="w-3 h-3 text-slate-500" />
                    </div>
                  </th>
                  <th className="py-3 px-3 text-right cursor-pointer hover:text-white" onClick={() => handleSort('strikeRate')}>
                    <div className="flex items-center justify-end gap-1">
                      Pressure SR <ArrowUpDown className="w-3 h-3 text-slate-500" />
                    </div>
                  </th>
                  <th className="py-3 px-3 text-right cursor-pointer hover:text-white" onClick={() => handleSort('strikeRateDelta')}>
                    <div className="flex items-center justify-end gap-1">
                      Normal SR &Delta; <ArrowUpDown className="w-3 h-3 text-slate-500" />
                    </div>
                  </th>
                  <th className="py-3 px-3 text-center">Dism. (Exp)</th>
                  <th className="py-3 px-3 text-center">Inns &ge; Exp</th>
                  <th className="py-3 px-3 text-center cursor-pointer hover:text-white" onClick={() => handleSort('modelRank')}>
                    <div className="flex items-center justify-center gap-1">
                      Model Rank <ArrowUpDown className="w-3 h-3 text-slate-500" />
                    </div>
                  </th>
                  <th className="py-3 px-3 text-right cursor-pointer hover:text-white" onClick={() => handleSort('rating')}>
                    <div className="flex items-center justify-end gap-1">
                      Rating <ArrowUpDown className="w-3 h-3 text-slate-500" />
                    </div>
                  </th>
                </>
              ) : (
                <>
                  <th className="py-3 px-3 text-right">Supplied Runs</th>
                  <th className="py-3 px-3 text-right">Supplied SR</th>
                  <th className="py-3 px-3 text-center">Supplied Matches</th>
                  <th className="py-3 px-3 text-center">Definition</th>
                </>
              )}

              {viewMode === 'comparison' && (
                <th className="py-3 px-3 text-center bg-blue-950/60 border-l border-blue-800/40">
                  Runs Discrepancy
                </th>
              )}

              <th className="py-3 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-950/70 text-slate-200">
            {filteredAndSortedBatters.map((b) => {
              const isOutlier = b.id === 'ashutosh-sharma';
              const isRedFlag = b.id === 'abdul-samad';
              const isRRInternal = b.id === 'shubham-dubey';

              return (
                <tr 
                  key={b.id} 
                  className={`hover:bg-blue-900/30 transition-colors cursor-pointer ${
                    isOutlier ? 'bg-pink-950/15' : isRedFlag ? 'bg-rose-950/15' : isRRInternal ? 'bg-amber-950/10' : ''
                  }`}
                  onClick={() => onSelectPlayer(b)}
                >
                  <td className="py-3 px-3 font-mono font-bold text-slate-400">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                      b.rank === 1 ? 'bg-amber-500/20 text-amber-300 font-extrabold border border-amber-500/30' :
                      b.rank === 2 ? 'bg-pink-500/20 text-pink-300 font-extrabold border border-pink-500/30' :
                      'text-slate-400'
                    }`}>
                      {b.rank}
                    </span>
                  </td>

                  <td className="py-3 px-3 font-medium">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white hover:text-pink-400 transition-colors">
                        {b.name}
                      </span>
                      {isRRInternal && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-pink-600 text-white uppercase tracking-tighter">
                          In RR Squad
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <span>{b.team.split('(')[0]}</span>
                      <span>•</span>
                      <span>Pos #{b.medianPosition}</span>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="flex flex-col gap-1 items-start">
                      <StatusBadge status={b.verified.status} />
                      <SampleFlagBadge flag={b.sampleFlag} />
                    </div>
                  </td>

                  {viewMode !== 'supplied' ? (
                    <>
                      <td className="py-3 px-3 text-right font-mono">
                        {b.verified.balls > 0 ? (
                          <span className={b.verified.balls >= 100 ? 'text-slate-200' : 'text-amber-300'}>
                            {b.verified.balls}
                          </span>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-semibold text-white">
                        {b.verified.runs > 0 ? b.verified.runs : <span className="text-slate-500">-</span>}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold">
                        {b.verified.strikeRate > 0 ? (
                          <span className={b.verified.strikeRate >= 180 ? 'text-pink-400' : 'text-slate-200'}>
                            {b.verified.strikeRate.toFixed(0)}
                          </span>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right font-mono">
                        {b.verified.strikeRateDelta !== null ? (
                          <span className={`px-1.5 py-0.5 rounded text-[11px] font-semibold ${
                            b.verified.strikeRateDelta > 0 
                              ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40' 
                              : 'bg-rose-950/60 text-rose-400 border border-rose-800/40'
                          }`}>
                            {b.verified.strikeRateDelta > 0 ? '+' : ''}{b.verified.strikeRateDelta}
                          </span>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-slate-300">
                        {b.verified.dismissals > 0 || b.verified.expectedDismissals > 0 ? (
                          <span>
                            {b.verified.dismissals}{' '}
                            <span className="text-slate-500 text-[10px]">({b.verified.expectedDismissals})</span>
                          </span>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center font-mono">
                        {b.verified.innsAboveExp !== '0/0' ? (
                          <span className="text-slate-300">{b.verified.innsAboveExp}</span>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center font-mono">
                        {b.verified.modelRank ? (
                          <span className={`px-2 py-0.5 rounded font-bold text-xs ${
                            b.verified.modelRank === 1 ? 'bg-pink-600/30 text-pink-300 border border-pink-500/40' :
                            b.verified.modelRank <= 20 ? 'bg-blue-600/20 text-blue-300' :
                            b.verified.modelRank > 60 ? 'bg-rose-600/20 text-rose-400' : 'text-slate-400'
                          }`}>
                            #{b.verified.modelRank} <span className="text-[10px] font-normal text-slate-400">/ 92</span>
                          </span>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold">
                        {b.verified.rating !== null ? (
                          <span className={b.verified.rating >= 0.7 ? 'text-pink-400' : b.verified.rating < 0 ? 'text-rose-400' : 'text-slate-300'}>
                            {b.verified.rating > 0 ? `+${b.verified.rating.toFixed(2)}` : b.verified.rating.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-3 px-3 text-right font-mono font-bold text-white">{b.supplied.runs}</td>
                      <td className="py-3 px-3 text-right font-mono text-cyan-300">{b.supplied.strikeRate.toFixed(1)}</td>
                      <td className="py-3 px-3 text-center font-mono text-slate-300">{b.supplied.matches}</td>
                      <td className="py-3 px-3 text-center text-slate-400 text-[11px] italic">Unstated Screenshot</td>
                    </>
                  )}

                  {viewMode === 'comparison' && (
                    <td className="py-3 px-3 text-center font-mono text-xs bg-blue-950/40 border-l border-blue-800/40">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-slate-400 line-through text-[11px]">{b.supplied.runs}</span>
                        <span className="text-slate-500">&rarr;</span>
                        <span className="text-pink-400 font-bold">{b.verified.runs}</span>
                        <span className="text-rose-400 text-[10px]">
                          ({b.verified.runs - b.supplied.runs})
                        </span>
                      </div>
                    </td>
                  )}

                  <td className="py-3 px-3 text-center" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => onSelectPlayer(b)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-pink-600/30 text-slate-300 hover:text-pink-400 transition-colors"
                      title="View Complete Scouting Card"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

