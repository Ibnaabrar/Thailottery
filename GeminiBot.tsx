import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Search, X, Calendar, Ticket, BookOpen, Clock } from 'lucide-react';
import { SearchResultItem } from '../types';

export const SearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    results, 
    news, 
    recentSearches, 
    addRecentSearch, 
    clearRecentSearches, 
    t,
    setSelectedTicketNumber,
    setSelectedDrawDate
  } = useApp();

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchResultItem[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const q = query.toLowerCase();
    const items: SearchResultItem[] = [];

    // Search drawings / tickets
    results.forEach((draw) => {
      if (draw.firstPrize.includes(q) || draw.drawNumber.toLowerCase().includes(q) || draw.drawDate.includes(q)) {
        items.push({
          type: 'ticket',
          title: `${draw.drawNumber} Result: ${draw.firstPrize}`,
          description: `Draw Date: ${draw.drawDate} | Winning 2-digit: ${draw.twoDigit}`,
          payload: { ticketNumber: draw.firstPrize, drawDate: draw.drawDate }
        });
      }
    });

    // Search News articles
    news.forEach((post) => {
      if (
        post.titleEN.toLowerCase().includes(q) || 
        post.titleTH.toLowerCase().includes(q) || 
        post.titleBN.toLowerCase().includes(q) ||
        post.contentEN.toLowerCase().includes(q)
      ) {
        items.push({
          type: 'news',
          title: post.titleEN,
          description: `GLO Announcement — ${post.date}`,
          link: '#news'
        });
      }
    });

    setSuggestions(items.slice(0, 5));
  }, [query, results, news]);

  if (!isSearchOpen) return null;

  const handleSuggestionClick = (item: SearchResultItem) => {
    addRecentSearch(query);
    if (item.type === 'ticket' && item.payload) {
      setSelectedTicketNumber(item.payload.ticketNumber);
      setSelectedDrawDate(item.payload.drawDate);
      const el = document.getElementById('checker');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (item.type === 'news') {
      const el = document.getElementById('news');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsSearchOpen(false);
  };

  const handleRecentClick = (search: string) => {
    setQuery(search);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-slate-950/60 backdrop-blur-sm pt-20 animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-100 shadow-2xl p-6 space-y-5 flex flex-col max-h-[80vh] overflow-hidden">
        
        {/* Title bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-50">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Search className="h-4.5 w-4.5 text-amber-500" />
            <span>Search System</span>
          </h3>
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-full text-slate-400 hover:bg-slate-50 transition-colors"
            id="close-search-modal-btn"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search input */}
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
            autoFocus
            id="search-input"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        </div>

        {/* Autocomplete / Suggestions list */}
        <div className="overflow-y-auto flex-1 space-y-4">
          
          {query.trim().length > 0 ? (
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Search Results ({suggestions.length})
              </h4>
              
              {suggestions.length > 0 ? (
                <div className="space-y-2">
                  {suggestions.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(item)}
                      className="w-full text-left p-3 rounded-xl border border-slate-50 hover:bg-slate-50 flex items-start gap-3 transition-colors group"
                    >
                      <div className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center flex-shrink-0">
                        {item.type === 'ticket' ? <Ticket className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 group-hover:text-amber-700 transition-colors">
                          {item.title}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 py-4 text-center">
                  {t('searchNoResult')}
                </p>
              )}
            </div>
          ) : (
            /* Recent searches when input is empty */
            recentSearches.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{t('recentSearches')}</span>
                  </h4>
                  <button 
                    onClick={clearRecentSearches}
                    className="text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors"
                  >
                    Clear History
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {recentSearches.map((search, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleRecentClick(search)}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-150 rounded-lg text-xs font-semibold text-slate-600 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300 transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )
          )}

        </div>

      </div>
    </div>
  );
};
