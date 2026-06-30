import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LotteryResult, NewsPost } from '../types';
import { X, Plus, BookOpen, Trophy, Ticket, Users, CheckCircle, Trash } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { 
    activeModal, 
    setActiveModal, 
    results, 
    addResult, 
    news, 
    addNewsPost 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'draws' | 'news' | 'logs'>('draws');

  // Draw Form State
  const [drawDate, setDrawDate] = useState('2026-07-16');
  const [drawNo, setDrawNo] = useState('Draw #105');
  const [firstPrize, setFirstPrize] = useState('850124');
  const [twoDigit, setTwoDigit] = useState('62');
  const [threePrefix1, setThreePrefix1] = useState('119');
  const [threePrefix2, setThreePrefix2] = useState('504');
  const [threeSuffix1, setThreeSuffix1] = useState('883');
  const [threeSuffix2, setThreeSuffix2] = useState('021');

  // News Form State
  const [newsTitle, setNewsTitle] = useState('');
  const [newsSummary, setNewsSummary] = useState('');
  const [newsContent, setNewsContent] = useState('');

  const [adminMsg, setAdminMsg] = useState('');

  if (activeModal !== 'admin') return null;

  const handleCreateDraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (!drawDate || firstPrize.length !== 6 || twoDigit.length !== 2) {
      setAdminMsg('Error: Please enter a valid 6-digit first prize and 2-digit number.');
      return;
    }

    const newDraw: LotteryResult = {
      id: 'r_admin_' + Date.now(),
      drawDate,
      drawNumber: drawNo,
      firstPrize,
      firstPrizeAmount: 6000000,
      twoDigit,
      threeDigitPrefix: [threePrefix1 || '123', threePrefix2 || '456'],
      threeDigitSuffix: [threeSuffix1 || '789', threeSuffix2 || '012'],
      secondPrize: ['991102', '564534', '110903', '768923', '230985'],
      thirdPrize: ['120456', '890345', '112234', '987345', '678345', '110293', '349021', '876120', '349081', '238902'],
      status: 'Drawn'
    };

    addResult(newDraw);
    setAdminMsg(`Success: ${drawNo} results published successfully!`);
    setTimeout(() => setAdminMsg(''), 3000);
  };

  const handlePublishNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle || !newsSummary || !newsContent) {
      setAdminMsg('Error: Please populate all fields.');
      return;
    }

    const newPost: NewsPost = {
      id: 'news_admin_' + Date.now(),
      titleEN: newsTitle,
      titleTH: newsTitle + ' (TH)',
      titleBN: newsTitle + ' (BN)',
      summaryEN: newsSummary,
      summaryTH: newsSummary + ' (TH)',
      summaryBN: newsSummary + ' (BN)',
      contentEN: newsContent,
      contentTH: newsContent + ' (TH Content)',
      contentBN: newsContent + ' (BN Content)',
      date: new Date().toISOString().slice(0, 10),
      imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop'
    };

    addNewsPost(newPost);
    setAdminMsg('Success: News article published successfully!');
    setNewsTitle('');
    setNewsSummary('');
    setNewsContent('');
    setTimeout(() => setAdminMsg(''), 3000);
  };

  // Extract all users tickets from simulated localStorage
  const allUsers = JSON.parse(localStorage.getItem('glo_users') || '[]');
  const allTickets = allUsers.flatMap((u: any) => u.tickets.map((t: any) => ({ ...t, userEmail: u.email })));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-white rounded-3xl border border-slate-100 shadow-2xl p-6 relative max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header title */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-shrink-0">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              <span>GLO Back-Office Admin CMS</span>
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Control panel for drawing schedules, announcements, and audit logs.</p>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1 rounded-full text-slate-400 hover:bg-slate-50 transition-colors"
            id="close-admin-btn"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation buttons */}
        <div className="flex gap-2.5 py-3 border-b border-slate-50 flex-shrink-0">
          <button
            onClick={() => setActiveTab('draws')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === 'draws' ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
          >
            <Trophy className="h-4 w-4" />
            Upload Draws
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === 'news' ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
          >
            <BookOpen className="h-4 w-4" />
            Publish News
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === 'logs' ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
          >
            <Ticket className="h-4 w-4" />
            Purchases Log ({allTickets.length})
          </button>
        </div>

        {/* Admin Alerts feedback */}
        {adminMsg && (
          <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-bold text-center flex items-center justify-center gap-1.5 flex-shrink-0">
            <CheckCircle className="h-4.5 w-4.5 text-emerald-500 animate-pulse" />
            <span>{adminMsg}</span>
          </div>
        )}

        {/* Tab contents scroll area */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          
          {/* Upload Drawing Results Tab */}
          {activeTab === 'draws' && (
            <form onSubmit={handleCreateDraw} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Draw Number</label>
                  <input
                    type="text"
                    value={drawNo}
                    onChange={(e) => setDrawNo(e.target.value)}
                    placeholder="e.g. Draw #105"
                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Draw Date (YYYY-MM-DD)</label>
                  <input
                    type="date"
                    value={drawDate}
                    onChange={(e) => setDrawDate(e.target.value)}
                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">1st Prize Number (6 Digits)</label>
                  <input
                    type="text"
                    value={firstPrize}
                    onChange={(e) => setFirstPrize(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="e.g. 123456"
                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm font-bold tracking-widest text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">2-Digit Number (2 Digits)</label>
                  <input
                    type="text"
                    value={twoDigit}
                    onChange={(e) => setTwoDigit(e.target.value.replace(/\D/g, '').slice(0, 2))}
                    placeholder="e.g. 45"
                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm font-bold tracking-widest text-slate-800"
                  />
                </div>
              </div>

              {/* 3 Digits Prefix & Suffix */}
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase">Prefix #1</label>
                  <input
                    type="text"
                    value={threePrefix1}
                    onChange={(e) => setThreePrefix1(e.target.value.slice(0, 3))}
                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-center font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase">Prefix #2</label>
                  <input
                    type="text"
                    value={threePrefix2}
                    onChange={(e) => setThreePrefix2(e.target.value.slice(0, 3))}
                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-center font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase">Suffix #1</label>
                  <input
                    type="text"
                    value={threeSuffix1}
                    onChange={(e) => setThreeSuffix1(e.target.value.slice(0, 3))}
                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-center font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase">Suffix #2</label>
                  <input
                    type="text"
                    value={threeSuffix2}
                    onChange={(e) => setThreeSuffix2(e.target.value.slice(0, 3))}
                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-center font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                Publish New Drawing Results
              </button>
            </form>
          )}

          {/* Publish News Tab */}
          {activeTab === 'news' && (
            <form onSubmit={handlePublishNews} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Article Title</label>
                <input
                  type="text"
                  value={newsTitle}
                  onChange={(e) => setNewsTitle(e.target.value)}
                  placeholder="e.g., Important Security Warning to GLO Customers"
                  className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Summary Notice (1-2 sentences)</label>
                <input
                  type="text"
                  value={newsSummary}
                  onChange={(e) => setNewsSummary(e.target.value)}
                  placeholder="e.g., GLO issues warning against unapproved third-party websites."
                  className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-850"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Article Content (Full Text)</label>
                <textarea
                  value={newsContent}
                  onChange={(e) => setNewsContent(e.target.value)}
                  placeholder="Insert complete article details here..."
                  className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-850 h-32 outline-none focus:bg-white focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                Publish Press Release Article
              </button>
            </form>
          )}

          {/* Purchases Log Tab */}
          {activeTab === 'logs' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-700">Audit Logs for Purchased Tickets ({allTickets.length})</h4>
              
              {allTickets.length > 0 ? (
                <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                  {allTickets.map((t: any, index: number) => (
                    <div key={index} className="p-3.5 bg-slate-50 border border-slate-150 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-800 font-mono tracking-widest text-sm">Ticket: {t.ticketNumber}</div>
                        <div className="text-[10px] text-slate-400 mt-1">User: <strong className="text-slate-600">{t.userEmail}</strong> | Date: {t.purchaseDate}</div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-slate-800 bg-slate-100 border border-slate-200 px-2 py-1 rounded">
                          Draw: {t.drawDate}
                        </span>
                        <div className="text-[9px] text-slate-400 mt-1">Allocated securely</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 py-8 text-center font-medium">
                  No tickets purchased across the portal yet.
                </p>
              )}
            </div>
          )}

        </div>

        {/* Modal close footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-150 flex justify-end flex-shrink-0">
          <button
            onClick={() => setActiveModal(null)}
            className="px-5 py-2.5 bg-slate-950 hover:bg-slate-900 text-white rounded-xl text-xs font-bold uppercase"
          >
            Exit CMS Control
          </button>
        </div>

      </div>
    </div>
  );
};
