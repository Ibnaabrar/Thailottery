import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_WINNERS } from '../data/mockData';
import { Trophy, Sparkles, ChevronLeft, ChevronRight, Award, Quote } from 'lucide-react';

export const WinnerShowcase: React.FC = () => {
  const { language, t } = useApp();
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + MOCK_WINNERS.length) % MOCK_WINNERS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % MOCK_WINNERS.length);
  };

  const getStory = (winner: typeof MOCK_WINNERS[0]) => {
    if (language === 'TH') return winner.storyTH;
    if (language === 'BN') return winner.storyBN;
    return winner.storyEN;
  };

  const activeWinner = MOCK_WINNERS[activeIndex];

  return (
    <section id="winners" className="py-16 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold tracking-widest text-amber-400 uppercase bg-amber-400/10 px-3 py-1.5 rounded-full inline-block mb-3 border border-amber-400/20">
            {t('quickWinners')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t('lblWinnersShowcase')}
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            {t('lblWinnersSubtitle')}
          </p>
        </div>

        {/* Carousel Showcase Container */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-950 via-slate-900/90 to-slate-950 border border-amber-500/20 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl relative">
          
          {/* Sparkles top */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-slate-900 border border-amber-500/30 px-4.5 py-1 rounded-full text-xs font-bold text-amber-400 flex items-center gap-1">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span>GLO Millionaire Hall of Fame</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Winner Stats Badge */}
            <div className="md:col-span-5 text-center md:text-left space-y-4">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shadow-inner">
                <Trophy className="h-7 w-7 text-amber-400 animate-bounce" />
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400/70 block">
                  Winner Jackpot Prize
                </span>
                <h3 className="text-3xl sm:text-4xl font-black font-sans text-amber-400 tracking-tight mt-1">
                  {activeWinner.amount}
                </h3>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-slate-400">
                  Ticket Selected: <strong className="font-mono text-white tracking-widest">{activeWinner.ticket}</strong>
                </div>
                <div className="text-xs text-slate-400">
                  Draw Date: <strong className="text-white">{activeWinner.date}</strong>
                </div>
                <div className="text-xs text-slate-400">
                  Certified Winner: <strong className="text-white">{activeWinner.name}</strong>
                </div>
              </div>
            </div>

            {/* Quote and Story */}
            <div className="md:col-span-7 bg-slate-950/40 border border-slate-800/60 p-6 rounded-2xl relative space-y-4 shadow-inner">
              <Quote className="absolute top-4 right-4 h-10 w-10 text-amber-400/10 pointer-events-none" />
              
              <div className="flex items-center gap-1 text-[10px] font-bold text-amber-500 uppercase tracking-widest">
                <Award className="h-4 w-4" />
                <span>Verified Winner Story</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic font-medium">
                "{getStory(activeWinner)}"
              </p>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-4">
                <div className="flex gap-1">
                  {MOCK_WINNERS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-1.5 rounded-full transition-all ${idx === activeIndex ? 'w-6 bg-amber-400' : 'w-1.5 bg-slate-700 hover:bg-slate-500'}`}
                    />
                  ))}
                </div>

                {/* Arrow Controls */}
                <div className="flex gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-850 text-white transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-850 text-white transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
