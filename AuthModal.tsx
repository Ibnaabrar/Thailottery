import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { TrendingUp, Award, Users, Ticket, ArrowUpRight } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const { t } = useApp();

  const [ticketsSold, setTicketsSold] = useState(12480190);
  const [winners, setWinners] = useState(18910);
  const [prizesPaid, setPrizesPaid] = useState(389020410);
  const [activeUsers, setActiveUsers] = useState(849020);

  // Simple ticking timers to simulate real-time activity and make it super interactive
  useEffect(() => {
    const interval = setInterval(() => {
      setTicketsSold((prev) => prev + Math.floor(Math.random() * 3) + 1);
      setActiveUsers((prev) => prev + Math.floor(Math.random() * 2));
      
      if (Math.random() > 0.8) {
        setWinners((prev) => prev + 1);
        setPrizesPaid((prev) => prev + 2000);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="stats" className="py-16 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Text */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold tracking-widest text-amber-600 uppercase bg-amber-50 px-3 py-1.5 rounded-full inline-block mb-3 border border-amber-200">
            {t('quickStats')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('lblStatsTitle')}
          </h2>
          <p className="text-sm text-slate-500 mt-2.5">
            {t('lblStatsSubtitle')}
          </p>
        </div>

        {/* Counters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Total Tickets Sold Card */}
          <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-4 right-4 h-9 w-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <Ticket className="h-5 w-5 text-amber-400" />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              {t('statTicketsSold')}
            </p>
            <h4 className="text-2xl font-black font-mono text-slate-900 tracking-tight">
              {ticketsSold.toLocaleString()}
            </h4>
            <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
              <span className="bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded">
                +14.2% MoM
              </span>
              <span className="text-slate-400 font-normal">Real-time update</span>
            </div>
          </div>

          {/* Total Winners Awarded Card */}
          <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-4 right-4 h-9 w-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-md shadow-amber-500/10">
              <Award className="h-5 w-5" />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              {t('statTotalWinners')}
            </p>
            <h4 className="text-2xl font-black font-mono text-slate-900 tracking-tight">
              {winners.toLocaleString()}
            </h4>
            <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
              <span className="bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                <ArrowUpRight className="h-3 w-3" /> Live Verified
              </span>
              <span className="text-slate-400 font-normal">Certified players</span>
            </div>
          </div>

          {/* Prize Distributed Card */}
          <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-4 right-4 h-9 w-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-amber-400" />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              {t('statPrizesPaid')}
            </p>
            <h4 className="text-2xl font-black font-mono text-slate-900 tracking-tight text-amber-600">
              {prizesPaid.toLocaleString()}
            </h4>
            <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-amber-600">
              <span className="bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">
                Sovereign Treasury Guaranteed
              </span>
            </div>
          </div>

          {/* Active Digital Users Card */}
          <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-4 right-4 h-9 w-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <Users className="h-5 w-5 text-amber-400" />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              {t('statActiveUsers')}
            </p>
            <h4 className="text-2xl font-black font-mono text-slate-900 tracking-tight">
              {activeUsers.toLocaleString()}
            </h4>
            <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
              <span className="bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded">
                99.98% Uptime
              </span>
              <span className="text-slate-400 font-normal">API nodes active</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
