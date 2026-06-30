import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Theme, LotteryResult, NewsPost, UserAccount, Ticket, Banner } from '../types';
import { INITIAL_BANNERS, INITIAL_LOTTERY_RESULTS, INITIAL_NEWS, DICTIONARY } from '../data/mockData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  
  // Lottery results
  results: LotteryResult[];
  setResults: React.Dispatch<React.SetStateAction<LotteryResult[]>>;
  addResult: (newResult: LotteryResult) => void;
  
  // Banners & News
  banners: Banner[];
  setBanners: React.Dispatch<React.SetStateAction<Banner[]>>;
  addBanner: (banner: Banner) => void;
  news: NewsPost[];
  setNews: React.Dispatch<React.SetStateAction<NewsPost[]>>;
  addNewsPost: (post: NewsPost) => void;
  
  // Users & Auth
  currentUser: UserAccount | null;
  setCurrentUser: (user: UserAccount | null) => void;
  login: (email: string, pass: string) => { success: boolean; error?: string };
  register: (name: string, email: string, phone: string, pass: string) => { success: boolean; error?: string };
  logout: () => void;
  updateWallet: (amount: number) => void;
  purchaseTicket: (ticketNumber: string, drawDate: string) => { success: boolean; error?: string; ticket?: Ticket };
  
  // Global Modals and searches
  activeModal: 'login' | 'register' | 'buyTicket' | 'payment' | 'admin' | null;
  setActiveModal: (modal: 'login' | 'register' | 'buyTicket' | 'payment' | 'admin' | null) => void;
  
  selectedTicketNumber: string;
  setSelectedTicketNumber: (num: string) => void;
  selectedDrawDate: string;
  setSelectedDrawDate: (date: string) => void;
  
  // Alert banner
  alertNotice: string;
  setAlertNotice: (msg: string) => void;
  isAlertDismissed: boolean;
  setIsAlertDismissed: (val: boolean) => void;
  
  // Global search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  recentSearches: string[];
  addRecentSearch: (search: string) => void;
  clearRecentSearches: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Lang state
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('glo_language');
    return (saved as Language) || 'EN';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('glo_language', lang);
  };

  // Theme state
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('glo_theme');
    return (saved as Theme) || 'light';
  });

  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme);
    localStorage.setItem('glo_theme', nextTheme);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const t = (key: string): string => {
    return DICTIONARY[language]?.[key] || DICTIONARY['EN']?.[key] || key;
  };

  // Banners & News
  const [banners, setBanners] = useState<Banner[]>(() => {
    const saved = localStorage.getItem('glo_banners');
    return saved ? JSON.parse(saved) : INITIAL_BANNERS;
  });

  const [news, setNews] = useState<NewsPost[]>(() => {
    const saved = localStorage.getItem('glo_news');
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });

  // Results state
  const [results, setResults] = useState<LotteryResult[]>(() => {
    const saved = localStorage.getItem('glo_results');
    return saved ? JSON.parse(saved) : INITIAL_LOTTERY_RESULTS;
  });

  // Persist edits
  useEffect(() => {
    localStorage.setItem('glo_banners', JSON.stringify(banners));
  }, [banners]);

  useEffect(() => {
    localStorage.setItem('glo_news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('glo_results', JSON.stringify(results));
  }, [results]);

  const addResult = (newResult: LotteryResult) => {
    setResults((prev) => {
      const filtered = prev.filter((r) => r.drawDate !== newResult.drawDate);
      return [newResult, ...filtered];
    });
  };

  const addBanner = (banner: Banner) => {
    setBanners((prev) => [banner, ...prev]);
  };

  const addNewsPost = (post: NewsPost) => {
    setNews((prev) => [post, ...prev]);
  };

  // Auth & Accounts
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem('glo_current_user');
    if (saved) return JSON.parse(saved);
    
    // Default seed user
    const defaultUser: UserAccount = {
      id: 'usr_default',
      fullName: 'John Doe',
      email: 'user@example.com',
      phoneNumber: '0812345678',
      walletBalance: 1250,
      tickets: [
        {
          id: 't_default_1',
          ticketNumber: '123456',
          drawDate: '2026-07-01',
          purchaseDate: '2026-06-25 14:20',
          price: 80,
          status: 'Pending'
        },
        {
          id: 't_default_2',
          ticketNumber: '782390',
          drawDate: '2026-06-16',
          purchaseDate: '2026-06-10 09:15',
          price: 80,
          status: 'Checked',
          winRank: '1st Prize',
          winAmount: 6000000
        }
      ],
      notifications: {
        drawAlerts: true,
        newsAlerts: true,
        smsAlerts: false
      }
    };
    return defaultUser;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('glo_current_user', JSON.stringify(currentUser));
      // Save user to simulated user database too
      const users = JSON.parse(localStorage.getItem('glo_users') || '[]');
      const index = users.findIndex((u: any) => u.email === currentUser.email);
      if (index >= 0) {
        users[index] = currentUser;
      } else {
        users.push(currentUser);
      }
      localStorage.setItem('glo_users', JSON.stringify(users));
    } else {
      localStorage.removeItem('glo_current_user');
    }
  }, [currentUser]);

  const login = (email: string, pass: string) => {
    // Basic password validation or check admin
    if (email.toLowerCase() === 'admin@glo.gov' || email.toLowerCase() === 'admin') {
      // Allow admin login easily
      const adminUser: UserAccount = {
        id: 'usr_admin',
        fullName: 'GLO System Administrator',
        email: 'admin@glo.gov',
        phoneNumber: '026244300',
        walletBalance: 99999,
        tickets: [],
        notifications: { drawAlerts: true, newsAlerts: true, smsAlerts: true }
      };
      setCurrentUser(adminUser);
      return { success: true };
    }

    const users = JSON.parse(localStorage.getItem('glo_users') || '[]');
    const found = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      return { success: true };
    }

    // Auto-create a user on first try for smooth demo flow
    const newUser: UserAccount = {
      id: 'usr_' + Date.now(),
      fullName: email.split('@')[0].toUpperCase(),
      email: email,
      phoneNumber: '0123456789',
      walletBalance: 1000,
      tickets: [],
      notifications: { drawAlerts: true, newsAlerts: true, smsAlerts: false }
    };
    setCurrentUser(newUser);
    return { success: true };
  };

  const register = (name: string, email: string, phone: string, pass: string) => {
    const users = JSON.parse(localStorage.getItem('glo_users') || '[]');
    const exists = users.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, error: 'Email already registered.' };
    }

    const newUser: UserAccount = {
      id: 'usr_' + Date.now(),
      fullName: name,
      email: email,
      phoneNumber: phone,
      walletBalance: 500, // Sign up bonus
      tickets: [],
      notifications: { drawAlerts: true, newsAlerts: true, smsAlerts: false }
    };
    
    users.push(newUser);
    localStorage.setItem('glo_users', JSON.stringify(users));
    setCurrentUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateWallet = (amount: number) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      walletBalance: Math.max(0, currentUser.walletBalance + amount)
    });
  };

  const purchaseTicket = (ticketNumber: string, drawDate: string) => {
    if (!currentUser) {
      return { success: false, error: 'Please login to purchase tickets.' };
    }

    if (currentUser.walletBalance < 80) {
      return { success: false, error: 'Insufficient wallet balance. Please deposit funds.' };
    }

    const newTicket: Ticket = {
      id: 't_' + Date.now() + Math.floor(Math.random() * 100),
      ticketNumber,
      drawDate,
      purchaseDate: new Date().toISOString().slice(0, 16).replace('T', ' '),
      price: 80,
      status: 'Pending'
    };

    const updatedUser: UserAccount = {
      ...currentUser,
      walletBalance: currentUser.walletBalance - 80,
      tickets: [newTicket, ...currentUser.tickets]
    };

    setCurrentUser(updatedUser);
    return { success: true, ticket: newTicket };
  };

  // State elements
  const [activeModal, setActiveModal] = useState<'login' | 'register' | 'buyTicket' | 'payment' | 'admin' | null>(null);
  const [selectedTicketNumber, setSelectedTicketNumber] = useState('');
  const [selectedDrawDate, setSelectedDrawDate] = useState(() => {
    const drawn = results.filter((r) => r.status === 'Drawn');
    return drawn.length > 0 ? drawn[0].drawDate : '2026-07-01';
  });

  // Announcement Bar Notice
  const [alertNotice, setAlertNotice] = useState('Draw #105 starts in 2 hours! Live stream starts at 14:00 GMT+7.');
  const [isAlertDismissed, setIsAlertDismissed] = useState(false);

  // Search Engine State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('glo_recent_searches');
    return saved ? JSON.parse(saved) : ['123456', 'Draw #104', 'Announcement', 'How to claim'];
  });

  const addRecentSearch = (search: string) => {
    if (!search.trim()) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s !== search);
      const updated = [search, ...filtered].slice(0, 5);
      localStorage.setItem('glo_recent_searches', JSON.stringify(updated));
      return updated;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('glo_recent_searches');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        results,
        setResults,
        addResult,
        banners,
        setBanners,
        addBanner,
        news,
        setNews,
        addNewsPost,
        currentUser,
        setCurrentUser,
        login,
        register,
        logout,
        updateWallet,
        purchaseTicket,
        activeModal,
        setActiveModal,
        selectedTicketNumber,
        setSelectedTicketNumber,
        selectedDrawDate,
        setSelectedDrawDate,
        alertNotice,
        setAlertNotice,
        isAlertDismissed,
        setIsAlertDismissed,
        searchQuery,
        setSearchQuery,
        recentSearches,
        addRecentSearch,
        clearRecentSearches,
        isSearchOpen,
        setIsSearchOpen,
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
