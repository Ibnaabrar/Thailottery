export type Language = 'EN' | 'TH' | 'BN';
export type Theme = 'light' | 'dark';

export interface LotteryResult {
  id: string;
  drawDate: string; // YYYY-MM-DD
  drawNumber: string; // e.g., "Draw #104"
  firstPrize: string; // 6-digit string
  firstPrizeAmount: number; // e.g., 6000000 (THB)
  twoDigit: string; // 2-digit string
  threeDigitPrefix: string[]; // 2 items, e.g. ["123", "456"]
  threeDigitSuffix: string[]; // 2 items, e.g. ["789", "012"]
  secondPrize: string[]; // 5 items
  thirdPrize: string[]; // 10 items
  status: 'Drawn' | 'Upcoming';
}

export interface NewsPost {
  id: string;
  titleTH: string;
  titleEN: string;
  titleBN: string;
  summaryTH: string;
  summaryEN: string;
  summaryBN: string;
  contentTH: string;
  contentEN: string;
  contentBN: string;
  date: string;
  imageUrl: string;
}

export interface Ticket {
  id: string;
  ticketNumber: string; // 6 digits
  drawDate: string; // YYYY-MM-DD
  purchaseDate: string;
  price: number;
  status: 'Pending' | 'Checked';
  winRank?: string;
  winAmount?: number;
}

export interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  walletBalance: number;
  tickets: Ticket[];
  notifications: {
    drawAlerts: boolean;
    newsAlerts: boolean;
    smsAlerts: boolean;
  };
}

export interface Banner {
  id: string;
  titleTH: string;
  titleEN: string;
  titleBN: string;
  subtitleTH: string;
  subtitleEN: string;
  subtitleBN: string;
  imageUrl: string;
  link: string;
}

export interface SearchResultItem {
  type: 'ticket' | 'news' | 'faq';
  title: string;
  description: string;
  link?: string;
  payload?: any;
}
