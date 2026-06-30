import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Coins, Ticket, Bell, Sparkles, CheckCircle2, XCircle, AlertCircle, Calendar, PlusCircle } from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const { currentUser, setCurrentUser, results, language, t } = useApp();
  const [depositValue, setDepositValue] = useState('1000');
  const [successAlert, setSuccessAlert] = useState('');

  if (!currentUser) return null;

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(depositValue);
    if (isNaN(val) || val <= 0) return;

    setCurrentUser({
      ...currentUser,
      walletBalance: currentUser.walletBalance + val
    });
    setSuccessAlert(`Successfully deposited ${val} ฿ into your GLO wallet.`);
    setTimeout(() => setSuccessAlert(''), 3000);
  };

  const toggleAlertSetting = (settingKey: 'drawAlerts' | 'newsAlerts' | 'smsAlerts') => {
    setCurrentUser({
      ...currentUser,
      notifications: {
        ...currentUser.notifications,
        [settingKey]: !currentUser.notifications[settingKey]
      }
    });
  };

  const handleCheckTicket = (ticketId: string) => {
    const updatedTickets = currentUser.tickets.map((t) => {
      if (t.id !== ticketId) return t;

      const draw = results.find((r) => r.drawDate === t.drawDate);
      if (!draw) return t;

      if (draw.status === 'Upcoming') {
        return { ...t, status: 'Checked' as const, winRank: undefined, winAmount: 0 };
      }

      const num = t.ticketNumber;
      
      // 1. First Prize Match
      if (num === draw.firstPrize) {
        return { ...t, status: 'Checked' as const, winRank: '1st Prize', winAmount: draw.firstPrizeAmount };
      }

      // 2. 3-Digit Prefix Match
      const pMatch = draw.threeDigitPrefix.find((p) => num.startsWith(p));
      if (pMatch) {
        return { ...t, status: 'Checked' as const, winRank: '3-Digit Prefix', winAmount: 4000 };
      }

      // 3. 3-Digit Suffix Match
      const sMatch = draw.threeDigitSuffix.find((s) => num.endsWith(s));
      if (sMatch) {
        return { ...t, status: 'Checked' as const, winRank: '3-Digit Suffix', winAmount: 4000 };
      }

      // 4. 2-Digit Suffix Match
      if (num.endsWith(draw.twoDigit)) {
        return { ...t, status: 'Checked' as const, winRank: '2-Digit', winAmount: 2000 };
      }

      // No match
      return { ...t, status: 'Checked' as const, winRank: undefined, winAmount: 0 };
    });

    // Check if there was a winning ticket and add to balance!
    const originalTicket = currentUser.tickets.find((tick) => tick.id === ticketId);
    const updatedTicket = updatedTickets.find((tick) => tick.id === ticketId);
    let winPayout = 0;
    if (originalTicket && originalTicket.status === 'Pending' && updatedTicket && updatedTicket.winAmount) {
      winPayout = updatedTicket.winAmount;
    }

    setCurrentUser({
      ...currentUser,
      tickets: updatedTickets,
      walletBalance: currentUser.walletBalance + winPayout
    });

    if (winPayout > 0) {
      setSuccessAlert(`CONGRATULATIONS! You won ${winPayout.toLocaleString()} ฿ from ticket ${updatedTicket?.ticketNumber}! Funds loaded to wallet.`);
    } else {
      setSuccessAlert(`Checking complete. Ticket ${updatedTicket?.ticketNumber} did not win in this draw. Better luck next time!`);
    }
    setTimeout(() => setSuccessAlert(''), 5000);
  };

  return (
    <section id="dashboard" className="py-16 bg-slate-50 border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title bar */}
        <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-amber-600 uppercase bg-amber-50 px-3 py-1.5 rounded-full inline-block mb-3 border border-amber-200">
              Personal Account Management
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              User Portal Dashboard
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold bg-slate-900 text-white px-4 py-2 rounded-xl shadow-sm">
            <span>Logged in as:</span>
            <strong className="text-amber-400">{currentUser.fullName}</strong>
          </div>
        </div>

        {/* Global Notifications logs */}
        {successAlert && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-bold text-center animate-bounce flex items-center justify-center gap-1.5">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            <span>{successAlert}</span>
          </div>
        )}

        {/* Top dashboard summary blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Wallet and Quick Recharge */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-6">
            <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2 pb-2 border-b border-slate-50">
              <Coins className="h-4.5 w-4.5 text-amber-500" />
              <span>Wallet & Transactions</span>
            </h3>

            <div className="p-5 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-950 text-white flex flex-col items-center text-center relative overflow-hidden shadow-md">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Total Funds Available</span>
              <h4 className="text-3xl font-black font-mono text-amber-400 mt-1.5 tracking-tight">
                {currentUser.walletBalance.toLocaleString()} ฿
              </h4>
              <p className="text-[10px] text-slate-400 mt-1.5 font-semibold">Verified GLO escrow balance</p>
            </div>

            {/* Recharge form */}
            <form onSubmit={handleDeposit} className="space-y-3 pt-2">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">Simulated Recharge (฿)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={depositValue}
                  onChange={(e) => setDepositValue(e.target.value)}
                  placeholder="e.g., 500"
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white outline-none"
                  id="recharge-val-input"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5"
                  id="recharge-submit-btn"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Recharge</span>
                </button>
              </div>
            </form>
          </div>

          {/* Secured Tickets List Log */}
          <div className="lg:col-span-2 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-6">
            <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2 pb-2 border-b border-slate-50">
              <Ticket className="h-4.5 w-4.5 text-amber-500 animate-pulse" />
              <span>{t('savedTickets')} ({currentUser.tickets.length})</span>
            </h3>

            {currentUser.tickets.length > 0 ? (
              <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
                {currentUser.tickets.map((ticket) => (
                  <div 
                    key={ticket.id}
                    className="p-4 bg-slate-50 border border-slate-150 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-amber-500/30 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-mono font-black text-sm border-b-2 border-amber-500">
                        🎫
                      </div>
                      <div>
                        <div className="text-sm font-black font-mono text-slate-900 tracking-widest">{ticket.ticketNumber}</div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-amber-500" />
                          <span>Draw: {ticket.drawDate} | Bought: {ticket.purchaseDate}</span>
                        </p>
                      </div>
                    </div>

                    {/* Check Status Action and Outputs */}
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                      {ticket.status === 'Pending' ? (
                        <button
                          onClick={() => handleCheckTicket(ticket.id)}
                          className="px-4 py-2 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold rounded-xl text-xs transition-all shadow-sm"
                          id={`check-ticket-btn-${ticket.id}`}
                        >
                          Verify Draw Result
                        </button>
                      ) : ticket.winAmount && ticket.winAmount > 0 ? (
                        <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-xl">
                          <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 animate-pulse" />
                          <span>Won: {ticket.winRank} ({ticket.winAmount.toLocaleString()} ฿)</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-xl">
                          <XCircle className="h-4.5 w-4.5 text-slate-400" />
                          <span>Did Not Win</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 py-8 text-center font-semibold">
                No digital tickets purchased yet. Tap "{t('quickBuy')}" to get started!
              </p>
            )}
          </div>

          {/* Secure Notification Settings */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2 pb-2 border-b border-slate-50">
              <Bell className="h-4.5 w-4.5 text-amber-500" />
              <span>Alert Preferences</span>
            </h3>

            <div className="space-y-4 pt-2">
              
              {/* Alert draw */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Draw result alerts</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Send a push notification on drawing days.</p>
                </div>
                <input
                  type="checkbox"
                  checked={currentUser.notifications.drawAlerts}
                  onChange={() => toggleAlertSetting('drawAlerts')}
                  className="h-4 w-4 text-amber-500 focus:ring-amber-400 border-slate-300 rounded cursor-pointer"
                  id="pref-draw-check"
                />
              </div>

              {/* Alert news */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Official news releases</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Alert me of fraud notices and policies.</p>
                </div>
                <input
                  type="checkbox"
                  checked={currentUser.notifications.newsAlerts}
                  onChange={() => toggleAlertSetting('newsAlerts')}
                  className="h-4 w-4 text-amber-500 focus:ring-amber-400 border-slate-300 rounded cursor-pointer"
                  id="pref-news-check"
                />
              </div>

              {/* Alert SMS */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">SMS winner alerts</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Direct phone messages on winning coupons.</p>
                </div>
                <input
                  type="checkbox"
                  checked={currentUser.notifications.smsAlerts}
                  onChange={() => toggleAlertSetting('smsAlerts')}
                  className="h-4 w-4 text-amber-500 focus:ring-amber-400 border-slate-300 rounded cursor-pointer"
                  id="pref-sms-check"
                />
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
