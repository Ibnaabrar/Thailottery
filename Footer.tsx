import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, X, ShieldAlert } from 'lucide-react';

export const AlertBar: React.FC = () => {
  const { alertNotice, isAlertDismissed, setIsAlertDismissed, t } = useApp();

  if (isAlertDismissed) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 px-4 py-2 text-xs font-bold shadow-md relative z-50 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
        <Bell className="h-4 w-4 animate-bounce text-slate-950 flex-shrink-0" />
        <span className="uppercase text-[9px] tracking-widest bg-slate-950 text-white px-2 py-0.5 rounded font-black">
          {t('announcement')}
        </span>
        
        {/* Marquee or Static Notification depending on width */}
        <p className="truncate text-slate-950 tracking-tight font-sans">
          {t('alertNotice')}
        </p>
      </div>

      <button
        onClick={() => setIsAlertDismissed(true)}
        className="p-1 hover:bg-black/10 rounded-full transition-colors flex-shrink-0"
        id="dismiss-alert-btn"
        title="Dismiss Alert"
      >
        <X className="h-4 w-4 text-slate-950" />
      </button>
    </div>
  );
};
