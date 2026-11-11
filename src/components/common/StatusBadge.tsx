import React from 'react';
import { VerificationStatus } from '../../types';
import { CheckCircle2, AlertTriangle, XCircle, HelpCircle, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: VerificationStatus;
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, showIcon = true }) => {
  switch (status) {
    case 'Supported':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          {showIcon && <CheckCircle2 className="w-3.5 h-3.5" />}
          Supported
        </span>
      );
    case 'Promising, thin':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30">
          {showIcon && <AlertCircle className="w-3.5 h-3.5" />}
          Promising, thin
        </span>
      );
    case 'Mixed':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
          {showIcon && <AlertTriangle className="w-3.5 h-3.5" />}
          Mixed
        </span>
      );
    case 'Not supported':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/30">
          {showIcon && <XCircle className="w-3.5 h-3.5" />}
          Not supported
        </span>
      );
    case 'Insufficient sample':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-400 border border-purple-500/30">
          {showIcon && <HelpCircle className="w-3.5 h-3.5" />}
          Insufficient sample *
        </span>
      );
    case 'No pressure data':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-500/15 text-slate-400 border border-slate-500/30">
          {showIcon && <HelpCircle className="w-3.5 h-3.5" />}
          No pressure data
        </span>
      );
    default:
      return null;
  }
};

export const SampleFlagBadge: React.FC<{ flag: string }> = ({ flag }) => {
  if (flag === 'Adequate') {
    return (
      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
        Sample: Adequate
      </span>
    );
  }
  if (flag.includes('Thin')) {
    return (
      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-950/60 text-amber-300 border border-amber-800/40">
        Sample: Thin (&lt;100b)
      </span>
    );
  }
  if (flag.includes('Insufficient')) {
    return (
      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-purple-950/60 text-purple-300 border border-purple-800/40">
        Sample: Under Minimum *
      </span>
    );
  }
  return (
    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-slate-400 border border-slate-700">
      0 High-Pressure Balls
    </span>
  );
};

