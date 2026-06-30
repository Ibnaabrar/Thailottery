import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Globe, User, Menu, X, ChevronDown, LogOut, Settings, LayoutDashboard, Coins, Ticket, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    t, 
    currentUser, 
    logout, 
    setActiveModal, 
    setIsSearchOpen, 
    isSearchOpen,
    theme,
    toggleTheme
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const handleLangSelect = (lang: 'EN' | 'TH' | 'BN') => {
    setLanguage(lang);
    setLangDropdownOpen(false);
  };

  const getLangLabel = (lang: 'EN' | 'TH' | 'BN') => {
    if (lang === 'EN') return 'English';
    if (lang === 'TH') return 'ไทย';
    return 'বাংলা';
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#003366] dark:bg-slate-950 text-white border-b border-[#002244] dark:border-slate-900 shadow-md transition-all duration-300">
      {/* GLO Top Utility Strip with Official Contacts & Theme Switcher */}
      <div className="bg-[#002244] dark:bg-slate-900 border-b border-[#001122] dark:border-slate-950/40 text-[10px] sm:text-[11px] font-semibold py-1.5 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-1.5">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <span className="text-slate-300 font-medium">
              {language === 'TH' ? '📞 ติดต่ออย่างเป็นทางการ (IMO):' : language === 'BN' ? '📞 অফিশিয়াল কন্ট্যাক্ট (IMO):' : '📞 Official Contacts (IMO):'}
            </span>
            <span className="flex items-center gap-1 bg-white/10 dark:bg-slate-850 px-2 py-0.5 rounded text-amber-400 font-black tracking-wide">
              <span>🇧🇩 +8801861669929</span>
            </span>
            <span className="flex items-center gap-1 bg-white/10 dark:bg-slate-850 px-2 py-0.5 rounded text-amber-400 font-black tracking-wide">
              <span>🇹🇭 +66863870227</span>
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/10 dark:bg-slate-800 hover:bg-white/20 dark:hover:bg-slate-700 transition-all text-amber-400 hover:text-amber-300 cursor-pointer text-[9.5px] sm:text-[10px] uppercase tracking-wider font-black font-mono border border-white/5 shadow-sm"
              id="theme-toggle-btn"
              title="Toggle Dark/Light Mode"
            >
              {theme === 'light' ? (
                <>
                  <span>🌙 Dark</span>
                </>
              ) : (
                <>
                  <span>☀️ Light</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          
          {/* Logo & Government Name */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-400 shadow-sm border border-amber-400/25">
              <span className="font-serif text-sm font-black text-[#003366]">GLO</span>
            </div>
            <div>
              <h1 className="text-xs sm:text-sm font-black tracking-tight text-white font-sans uppercase">
                {t('appName')}
              </h1>
              <p className="text-[9px] text-amber-400 font-bold tracking-widest uppercase">
                {t('govHeader')}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4.5">
            <a href="#hero" className="text-xs font-bold text-slate-100 hover:text-amber-400 uppercase tracking-wider transition-colors">
              {t('navHome')}
            </a>
            <a href="#checker" className="text-xs font-bold text-slate-100 hover:text-amber-400 uppercase tracking-wider transition-colors">
              {t('navResults')}
            </a>
            <a href="#news" className="text-xs font-bold text-slate-100 hover:text-amber-400 uppercase tracking-wider transition-colors">
              {t('navNews')}
            </a>
            <a href="#stats" className="text-xs font-bold text-slate-100 hover:text-amber-400 uppercase tracking-wider transition-colors">
              {t('navServices')}
            </a>
            <a href="#faq" className="text-xs font-bold text-slate-100 hover:text-amber-400 uppercase tracking-wider transition-colors">
              {t('navContact')}
            </a>
          </nav>

          {/* Action Buttons & Switches */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Global Search Button */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 rounded-lg text-slate-200 hover:bg-white/10 transition-colors"
              title={t('btnSearch')}
              id="search-trigger-btn"
            >
              <Search className="h-4.5 w-4.5" />
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-white/20 text-xs font-bold text-slate-100 hover:bg-white/10 transition-colors"
                id="lang-selector-btn"
              >
                <Globe className="h-3.5 w-3.5 text-amber-400" />
                <span>{getLangLabel(language)}</span>
                <ChevronDown className="h-3 w-3" />
              </button>
              {langDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-36 rounded-lg border border-[#002244] bg-[#002244] p-1 shadow-xl ring-1 ring-black/5 z-50 text-white">
                  <button
                    onClick={() => handleLangSelect('EN')}
                    className={`flex w-full items-center px-2.5 py-1.5 text-left text-xs font-bold rounded ${language === 'EN' ? 'bg-amber-500 text-[#003366]' : 'text-slate-200 hover:bg-white/10'}`}
                  >
                    English (US)
                  </button>
                  <button
                    onClick={() => handleLangSelect('TH')}
                    className={`flex w-full items-center px-2.5 py-1.5 text-left text-xs font-bold rounded ${language === 'TH' ? 'bg-amber-500 text-[#003366]' : 'text-slate-200 hover:bg-white/10'}`}
                  >
                    ไทย (TH)
                  </button>
                  <button
                    onClick={() => handleLangSelect('BN')}
                    className={`flex w-full items-center px-2.5 py-1.5 text-left text-xs font-bold rounded ${language === 'BN' ? 'bg-amber-500 text-[#003366]' : 'text-slate-200 hover:bg-white/10'}`}
                  >
                    বাংলা (BN)
                  </button>
                </div>
              )}
            </div>

            {/* User Login/Dashboard Control */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1 rounded bg-[#002244] border border-white/10 text-white hover:bg-slate-900 transition-colors shadow-sm"
                  id="profile-dropdown-btn"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-[10px] font-bold text-slate-950">
                    {currentUser.fullName[0]}
                  </div>
                  <span className="text-xs font-bold max-w-[80px] truncate">{currentUser.fullName}</span>
                  <ChevronDown className="h-3 w-3 text-slate-300" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-1.5 w-52 rounded-lg border border-[#002244] bg-[#002244] p-1.5 shadow-xl ring-1 ring-black/5 z-50 text-white">
                    <div className="px-2.5 py-1.5 border-b border-white/10">
                      <p className="text-xs font-bold text-slate-100">{currentUser.fullName}</p>
                      <p className="text-[9px] text-slate-400 truncate">{currentUser.email}</p>
                      <div className="mt-1 flex items-center gap-1 text-xs font-extrabold text-amber-400">
                        <Coins className="h-3.5 w-3.5" />
                        <span>{currentUser.walletBalance.toLocaleString()} ฿</span>
                      </div>
                    </div>
                    
                    <div className="py-1">
                      <a 
                        href="#dashboard" 
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-bold text-slate-200 rounded hover:bg-white/10"
                      >
                        <LayoutDashboard className="h-4 w-4 text-slate-400" />
                        {t('btnDashboard')}
                      </a>
                      {currentUser.email === 'admin@glo.gov' && (
                        <a 
                          href="#admin" 
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            setActiveModal('admin');
                          }}
                          className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-bold text-amber-400 rounded bg-white/5 hover:bg-white/10"
                        >
                          <Settings className="h-4 w-4 text-amber-400" />
                          {t('btnAdmin')}
                        </a>
                      )}
                      <button 
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          setActiveModal('buyTicket');
                        }}
                        className="flex w-full items-center gap-2 px-2.5 py-1.5 text-xs font-bold text-slate-200 rounded hover:bg-white/10"
                      >
                        <Ticket className="h-4 w-4 text-slate-400" />
                        {t('quickBuy')}
                      </button>
                    </div>

                    <div className="border-t border-white/10 pt-1">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          logout();
                        }}
                        className="flex w-full items-center gap-2 px-2.5 py-1.5 text-xs font-bold text-red-400 rounded hover:bg-red-950/30"
                      >
                        <LogOut className="h-4 w-4" />
                        {t('btnLogout')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveModal('login')}
                  className="px-3.5 py-1 rounded text-xs font-bold text-slate-200 hover:bg-white/10 border border-white/20 transition-colors"
                  id="header-login-btn"
                >
                  {t('btnLogin')}
                </button>
                <button
                  onClick={() => setActiveModal('register')}
                  className="px-3.5 py-1 rounded text-xs font-bold text-[#003366] bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 transition-all shadow flex items-center gap-1"
                  id="header-register-btn"
                >
                  <Sparkles className="h-3 w-3" />
                  {t('btnRegister')}
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger menu trigger */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1 rounded-lg text-slate-200"
            >
              <Search className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 rounded-lg text-slate-100 hover:bg-white/10"
              id="mobile-menu-trigger"
            >
              {mobileMenuOpen ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#002244] bg-[#002244] px-4 py-3 space-y-3 shadow-inner text-white">
          <nav className="flex flex-col gap-1">
            <a 
              href="#hero" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-2.5 py-1.5 text-xs font-bold text-slate-100 hover:bg-white/10 rounded"
            >
              {t('navHome')}
            </a>
            <a 
              href="#checker" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-2.5 py-1.5 text-xs font-bold text-slate-100 hover:bg-white/10 rounded"
            >
              {t('navResults')}
            </a>
            <a 
              href="#news" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-2.5 py-1.5 text-xs font-bold text-slate-100 hover:bg-white/10 rounded"
            >
              {t('navNews')}
            </a>
            <a 
              href="#stats" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-2.5 py-1.5 text-xs font-bold text-slate-100 hover:bg-white/10 rounded"
            >
              {t('navServices')}
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-2.5 py-1.5 text-xs font-bold text-slate-100 hover:bg-white/10 rounded"
            >
              {t('navContact')}
            </a>
          </nav>

          <div className="border-t border-white/10 pt-2.5 flex flex-col gap-2">
            {/* Mobile Lang switcher */}
            <div className="flex items-center gap-2 justify-between px-2">
              <span className="text-[11px] text-slate-300 flex items-center gap-1 font-bold">
                <Globe className="h-3.5 w-3.5 text-amber-400" />
                Language
              </span>
              <div className="flex gap-1">
                <button 
                  onClick={() => handleLangSelect('EN')} 
                  className={`px-2 py-0.5 rounded text-[10px] font-black ${language === 'EN' ? 'bg-amber-400 text-slate-950' : 'bg-white/10 text-slate-200'}`}
                >
                  EN
                </button>
                <button 
                  onClick={() => handleLangSelect('TH')} 
                  className={`px-2 py-0.5 rounded text-[10px] font-black ${language === 'TH' ? 'bg-amber-400 text-slate-950' : 'bg-white/10 text-slate-200'}`}
                >
                  TH
                </button>
                <button 
                  onClick={() => handleLangSelect('BN')} 
                  className={`px-2 py-0.5 rounded text-[10px] font-black ${language === 'BN' ? 'bg-amber-400 text-slate-950' : 'bg-white/10 text-slate-200'}`}
                >
                  BN
                </button>
              </div>
            </div>

            {/* Mobile Theme switcher */}
            <div className="flex items-center gap-2 justify-between px-2 pt-1 border-t border-white/5">
              <span className="text-[11px] text-slate-300 flex items-center gap-1.5 font-bold">
                {theme === 'light' ? '🌙' : '☀️'}
                Theme Option
              </span>
              <button 
                onClick={toggleTheme} 
                className="px-2.5 py-0.5 rounded text-[10px] font-black bg-white/10 text-amber-400 border border-white/5 shadow-sm uppercase tracking-wider font-mono flex items-center gap-1"
                id="mobile-theme-toggle"
              >
                {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
              </button>
            </div>

            {/* Mobile IMO Contacts */}
            <div className="bg-[#001122] p-2.5 rounded-lg border border-white/10 mt-1">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Official IMO Contacts</p>
              <div className="flex flex-col gap-1.5 mt-1.5">
                <div className="flex items-center justify-between text-xs font-mono font-black text-amber-400">
                  <span>🇧🇩 Bangladesh</span>
                  <span>+8801861669929</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono font-black text-amber-400">
                  <span>🇹🇭 Thailand</span>
                  <span>+66863870227</span>
                </div>
              </div>
            </div>

            {/* Mobile Auth button */}
            {currentUser ? (
              <div className="bg-[#003366] p-2.5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-xs font-bold text-slate-100">{currentUser.fullName}</p>
                    <p className="text-[9px] text-slate-400">{currentUser.email}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-black text-amber-400">
                    <Coins className="h-3.5 w-3.5" />
                    <span>{currentUser.walletBalance.toLocaleString()} ฿</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2.5">
                  <a 
                    href="#dashboard" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1 py-1 bg-[#002244] border border-white/10 text-white rounded text-[11px] font-bold"
                  >
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    {t('btnDashboard')}
                  </a>
                  {currentUser.email === 'admin@glo.gov' && (
                    <button 
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setActiveModal('admin');
                      }}
                      className="flex items-center justify-center gap-1 py-1 bg-amber-400 text-slate-950 rounded text-[11px] font-bold"
                    >
                      <Settings className="h-3.5 w-3.5" />
                      {t('btnAdmin')}
                    </button>
                  )}
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setActiveModal('buyTicket');
                    }}
                    className="col-span-2 flex items-center justify-center gap-1.5 py-1.5 bg-[#001122] text-white rounded text-[11px] font-bold"
                  >
                    <Ticket className="h-3.5 w-3.5 text-amber-400" />
                    {t('quickBuy')}
                  </button>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full mt-2 flex items-center justify-center gap-1.5 py-1 text-red-400 bg-red-950/20 rounded text-[11px] font-bold"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  {t('btnLogout')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 px-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveModal('login');
                  }}
                  className="py-1.5 rounded text-xs font-bold text-slate-100 bg-white/10 border border-white/10"
                >
                  {t('btnLogin')}
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveModal('register');
                  }}
                  className="py-1.5 rounded text-xs font-bold text-slate-950 bg-amber-400"
                >
                  {t('btnRegister')}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
