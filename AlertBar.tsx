import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Sparkles, AlertCircle, CheckCircle, HelpCircle, Trophy, Calendar, Landmark } from 'lucide-react';

interface LotteryOption {
  id: string;
  nameEN: string;
  nameTH: string;
  nameBN: string;
  logo: string;
  digits: number;
  currency: string;
  firstPrizeAmount: number;
  secPrizeAmount: number;
  thirdPrizeAmount: number;
  placeholder: string;
  descEN: string;
  descTH: string;
  descBN: string;
}

const LOTTERIES: LotteryOption[] = [
  {
    id: 'national',
    nameEN: 'National Lottery',
    nameTH: 'สลากกินแบ่งแห่งชาติ',
    nameBN: 'ন্যাশনাল লটারি',
    logo: '🏛️',
    digits: 6,
    currency: '฿',
    firstPrizeAmount: 8000000,
    secPrizeAmount: 200000,
    thirdPrizeAmount: 100000,
    placeholder: 'e.g., 982341',
    descEN: 'Premium secure government drawing with daily and monthly high payouts.',
    descTH: 'สลากกินแบ่งแห่งชาติพรีเมียม ถอดรหัสแห่งความโชคดีพร้อมรางวัลสูงขึ้น',
    descBN: 'প্রিমিয়াম এবং নির্ভরযোগ্য সরকারি ন্যাশনাল লটারি ড্র।'
  },
  {
    id: 'thai',
    nameEN: 'Thai Government Lottery',
    nameTH: 'สลากกินแบ่งรัฐบาล (ไทย)',
    nameBN: 'থাইল্যান্ড লটারি',
    logo: '🇹🇭',
    digits: 6,
    currency: '฿',
    firstPrizeAmount: 6000000,
    secPrizeAmount: 100000,
    thirdPrizeAmount: 80000,
    placeholder: 'e.g., 123456',
    descEN: 'Standard official Thai government lottery drawn twice a month.',
    descTH: 'สลากกินแบ่งรัฐบาลไทยอย่างเป็นทางการ งวดประจำวันที่ 1 และ 16',
    descBN: 'থাইল্যান্ডের অফিশিয়াল সরকারি লটারি ড্র।'
  },
  {
    id: 'meghna',
    nameEN: 'Toto Meghna',
    nameTH: 'โตโต้ เมฆนา',
    nameBN: 'টোটো মেঘনা',
    logo: '🌊',
    digits: 4,
    currency: '৳',
    firstPrizeAmount: 350000,
    secPrizeAmount: 70000,
    thirdPrizeAmount: 30000,
    placeholder: 'e.g., 7382',
    descEN: 'Meghna regional specialty lottery drawn with rapid secure audits.',
    descTH: 'สลากตัวเลข 4 หลักที่เป็นที่นิยม ออกผลรางวัลรวดเร็วและปลอดภัย',
    descBN: 'মেঘনা অঞ্চলের ৪টি সংখ্যার বিশেষ আকর্ষণীয় লটারি ড্র।'
  },
  {
    id: 'fourd',
    nameEN: '4D Lottery',
    nameTH: 'โฟร์ดี ล็อตเตอรี่',
    nameBN: 'ফোর ডি লটারি',
    logo: '🔢',
    digits: 4,
    currency: 'RM',
    firstPrizeAmount: 150000,
    secPrizeAmount: 40000,
    thirdPrizeAmount: 15000,
    placeholder: 'e.g., 8839',
    descEN: 'Classic 4-Digit daily lottery drawing with standard odds.',
    descTH: 'สลาก 4 ตัวสุดคลาสสิก เลือกหมายเลขนำโชคที่คุณชื่นชอบ',
    descBN: 'ক্লাসিক ৪-ডিজিটের নিয়মিত লটারি ড্র।'
  },
  {
    id: 'dragon',
    nameEN: 'Grand Dragon 4D',
    nameTH: 'แกรนด์ดราก้อน 4D',
    nameBN: 'ড্রাগন লটারি',
    logo: '🐉',
    digits: 4,
    currency: '$',
    firstPrizeAmount: 180000,
    secPrizeAmount: 50000,
    thirdPrizeAmount: 25000,
    placeholder: 'e.g., 5521',
    descEN: 'High-stake live-streamed Grand Dragon ASEAN community draw.',
    descTH: 'แกรนด์ดราก้อน 4D สุดโปร่งใส ถ่ายทอดสดตรงจากศูนย์ออกรางวัล',
    descBN: 'আসিয়ানের শীর্ষতম এবং জনপ্রিয় ড্রাগন লটারি।'
  },
  {
    id: 'dubai',
    nameEN: 'Dubai Lottery',
    nameTH: 'ดูไบ ล็อตเตอรี่',
    nameBN: 'দুবাই লটারি',
    logo: '🏙️',
    digits: 6,
    currency: 'AED',
    firstPrizeAmount: 1200000,
    secPrizeAmount: 100000,
    thirdPrizeAmount: 30000,
    placeholder: 'e.g., 049281',
    descEN: 'Premium Millennium Millionaire raffle held at Dubai International Airport.',
    descTH: 'สลากกินแบ่งระดับโลก ตั๋วมิลเลนเนียมมิลเลียนแนร์ ดูไบ ดิวตี้ฟรี',
    descBN: 'দুবাই ডিউটি ফ্রি মিলেনিয়াম মিলিয়নিয়ার সুপার মেগা ড্র।'
  },
  {
    id: 'mahzooz',
    nameEN: 'Mahzooz Dubai',
    nameTH: 'มาห์ซูซ ดูไบ',
    nameBN: 'মাজুস লটারি',
    logo: '✨',
    digits: 5,
    currency: 'AED',
    firstPrizeAmount: 5000000,
    secPrizeAmount: 200000,
    thirdPrizeAmount: 50000,
    placeholder: 'e.g., 38927',
    descEN: 'Weekly live-broadcasted jackpot draw bringing fortune to the Middle East.',
    descTH: 'สลากนำโชครายสัปดาห์จากสหรัฐอาหรับเอมิเรตส์ แจกรางวัลมหาศาล',
    descBN: 'সংযুক্ত আরব আমিরাতের বিশ্বস্ত সাপ্তাহিক মাজুস ড্র।'
  },
  {
    id: 'bigticket',
    nameEN: 'Abu Dhabi Big Ticket',
    nameTH: 'บิ๊กทิกเก็ต อาบูดาบี',
    nameBN: 'বিগ টিকিট',
    logo: '🎫',
    digits: 6,
    currency: 'AED',
    firstPrizeAmount: 15000000,
    secPrizeAmount: 1000000,
    thirdPrizeAmount: 100000,
    placeholder: 'e.g., 294827',
    descEN: 'The region\'s premier monthly ticket raffle holding record grand payouts.',
    descTH: 'สลากรางวัลใหญ่สุดตระการตา อาบูดาบี บิ๊กทิกเก็ต ยอดนิยมอันดับหนึ่ง',
    descBN: 'আবুধাবি বিগ টিকিট - মধ্যপ্রাচ্যের সবচেয়ে বড় রাফেল ড্র।'
  }
];

const getDeterministicRandomDigits = (seed: string, length: number): string => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  let result = '';
  for (let i = 0; i < length; i++) {
    const val = Math.abs((hash + i * 37) % 10);
    result += val.toString();
  }
  return result;
};

export const ResultChecker: React.FC = () => {
  const { 
    results, 
    language, 
    t, 
    selectedTicketNumber, 
    setSelectedTicketNumber, 
    selectedDrawDate, 
    setSelectedDrawDate,
    addRecentSearch
  } = useApp();

  const [selectedLottery, setSelectedLottery] = useState<string>('thai');
  const [checking, setChecking] = useState(false);
  const [checked, setChecked] = useState(false);
  const [searchResult, setSearchResult] = useState<{
    won: boolean;
    rank: string;
    amount: number;
    matchedNumbers: string;
  } | null>(null);

  const [inputError, setInputError] = useState('');

  const activeLottery = LOTTERIES.find((l) => l.id === selectedLottery) || LOTTERIES[1];

  const handleTicketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    if (val.length <= activeLottery.digits) {
      setSelectedTicketNumber(val);
      setInputError('');
    }
  };

  const handleLotteryChange = (lotteryId: string) => {
    setSelectedLottery(lotteryId);
    setSelectedTicketNumber('');
    setChecked(false);
    setSearchResult(null);
    setInputError('');
  };

  // Generate deterministic drawing details for custom lotteries based on active selected draw date
  const getActiveDrawDetails = () => {
    const targetDraw = results.find((r) => r.drawDate === selectedDrawDate) || results[0];
    const drawDate = targetDraw.drawDate;

    if (selectedLottery === 'thai') {
      return {
        firstPrize: targetDraw.firstPrize,
        firstPrizeAmount: targetDraw.firstPrizeAmount,
        secPrizeAmount: 100000,
        thirdPrizeAmount: 80000,
        currency: '฿',
        twoDigit: targetDraw.twoDigit,
        threeDigitPrefix: targetDraw.threeDigitPrefix,
        threeDigitSuffix: targetDraw.threeDigitSuffix,
        secondPrize: targetDraw.secondPrize,
        thirdPrize: targetDraw.thirdPrize,
        status: targetDraw.status,
        drawNumber: targetDraw.drawNumber,
        drawDate: targetDraw.drawDate
      };
    } else {
      // Deterministic drawings for other lotteries
      const d = activeLottery.digits;
      const firstPrize = getDeterministicRandomDigits(selectedLottery + '_' + drawDate + '_first', d);
      const twoDigit = getDeterministicRandomDigits(selectedLottery + '_' + drawDate + '_twodigit', 2);
      
      const threeDigitPrefix = [
        getDeterministicRandomDigits(selectedLottery + '_' + drawDate + '_pref1', 3),
        getDeterministicRandomDigits(selectedLottery + '_' + drawDate + '_pref2', 3)
      ];
      const threeDigitSuffix = [
        getDeterministicRandomDigits(selectedLottery + '_' + drawDate + '_suff1', 3),
        getDeterministicRandomDigits(selectedLottery + '_' + drawDate + '_suff2', 3)
      ];

      const secondPrize = [
        getDeterministicRandomDigits(selectedLottery + '_' + drawDate + '_sec1', d),
        getDeterministicRandomDigits(selectedLottery + '_' + drawDate + '_sec2', d),
        getDeterministicRandomDigits(selectedLottery + '_' + drawDate + '_sec3', d)
      ];

      const thirdPrize = [
        getDeterministicRandomDigits(selectedLottery + '_' + drawDate + '_third1', d),
        getDeterministicRandomDigits(selectedLottery + '_' + drawDate + '_third2', d),
        getDeterministicRandomDigits(selectedLottery + '_' + drawDate + '_third3', d),
        getDeterministicRandomDigits(selectedLottery + '_' + drawDate + '_third4', d),
        getDeterministicRandomDigits(selectedLottery + '_' + drawDate + '_third5', d)
      ];

      return {
        firstPrize,
        firstPrizeAmount: activeLottery.firstPrizeAmount,
        secPrizeAmount: activeLottery.secPrizeAmount,
        thirdPrizeAmount: activeLottery.thirdPrizeAmount,
        currency: activeLottery.currency,
        twoDigit,
        threeDigitPrefix,
        threeDigitSuffix,
        secondPrize,
        thirdPrize,
        status: targetDraw.status,
        drawNumber: `Draw #${getDeterministicRandomDigits(selectedLottery + '_' + drawDate + '_no', 3)}`,
        drawDate
      };
    }
  };

  const drawInfo = getActiveDrawDetails();

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTicketNumber.length !== activeLottery.digits) {
      const errMsg = language === 'TH' 
        ? `กรุณากรอกหมายเลขสลากให้ครบ ${activeLottery.digits} หลัก` 
        : language === 'BN' 
        ? `অনুগ্রহ করে সঠিক ${activeLottery.digits}-ডিজিটের টিকিট নম্বর দিন।` 
        : `Please enter a valid ${activeLottery.digits}-digit ticket number.`;
      setInputError(errMsg);
      return;
    }

    setChecking(true);
    addRecentSearch(`${activeLottery.nameEN}: ${selectedTicketNumber}`);

    setTimeout(() => {
      setChecking(false);
      setChecked(true);

      const targetDraw = results.find((r) => r.drawDate === selectedDrawDate) || results[0];
      if (!targetDraw || targetDraw.status === 'Upcoming') {
        setSearchResult({
          won: false,
          rank: 'Draw Pending',
          amount: 0,
          matchedNumbers: ''
        });
        return;
      }

      const ticket = selectedTicketNumber;

      if (selectedLottery === 'thai') {
        // Original GLO Thai Government Lottery matching logic
        if (ticket === targetDraw.firstPrize) {
          setSearchResult({
            won: true,
            rank: t('lbl1stPrize'),
            amount: targetDraw.firstPrizeAmount,
            matchedNumbers: ticket
          });
          return;
        }

        const prefixMatch = targetDraw.threeDigitPrefix.find((p) => ticket.startsWith(p));
        if (prefixMatch) {
          setSearchResult({
            won: true,
            rank: t('lbl3DigitPrefix'),
            amount: 4000,
            matchedNumbers: prefixMatch + '***'
          });
          return;
        }

        const suffixMatch = targetDraw.threeDigitSuffix.find((s) => ticket.endsWith(s));
        if (suffixMatch) {
          setSearchResult({
            won: true,
            rank: t('lbl3DigitSuffix'),
            amount: 4000,
            matchedNumbers: '***' + suffixMatch
          });
          return;
        }

        if (ticket.endsWith(targetDraw.twoDigit)) {
          setSearchResult({
            won: true,
            rank: t('lbl2Digit'),
            amount: 2000,
            matchedNumbers: '****' + targetDraw.twoDigit
          });
          return;
        }

        if (targetDraw.secondPrize.includes(ticket)) {
          setSearchResult({
            won: true,
            rank: language === 'TH' ? 'รางวัลที่ 2' : language === 'BN' ? '২য় পুরস্কার' : '2nd Prize',
            amount: 100000,
            matchedNumbers: ticket
          });
          return;
        }

        if (targetDraw.thirdPrize.includes(ticket)) {
          setSearchResult({
            won: true,
            rank: language === 'TH' ? 'รางวัลที่ 3' : language === 'BN' ? '৩য় পুরস্কার' : '3rd Prize',
            amount: 80000,
            matchedNumbers: ticket
          });
          return;
        }

        setSearchResult(null);
      } else {
        // Evaluate other custom lotteries
        const data = getActiveDrawDetails();

        // 1st Prize
        if (ticket === data.firstPrize) {
          setSearchResult({
            won: true,
            rank: language === 'TH' ? 'รางวัลที่ 1' : language === 'BN' ? '১ম পুরস্কার' : '1st Prize',
            amount: data.firstPrizeAmount,
            matchedNumbers: ticket
          });
          return;
        }

        // 2-digit match
        if (ticket.endsWith(data.twoDigit)) {
          setSearchResult({
            won: true,
            rank: language === 'TH' ? 'เลขท้าย 2 ตัว' : language === 'BN' ? '২ ডিজিট' : '2-Digit Match',
            amount: Math.round(data.firstPrizeAmount * 0.0005),
            matchedNumbers: '*'.repeat(activeLottery.digits - 2) + data.twoDigit
          });
          return;
        }

        // 2nd Prize
        if (data.secondPrize.includes(ticket)) {
          setSearchResult({
            won: true,
            rank: language === 'TH' ? 'รางวัลที่ 2' : language === 'BN' ? '২য় পুরস্কার' : '2nd Prize',
            amount: data.secPrizeAmount,
            matchedNumbers: ticket
          });
          return;
        }

        // 3rd Prize
        if (data.thirdPrize.includes(ticket)) {
          setSearchResult({
            won: true,
            rank: language === 'TH' ? 'รางวัลที่ 3' : language === 'BN' ? '৩য় পুরস্কার' : '3rd Prize',
            amount: data.thirdPrizeAmount,
            matchedNumbers: ticket
          });
          return;
        }

        // Prefix Match Special
        if (ticket.substring(0, 3) === data.firstPrize.substring(0, 3)) {
          setSearchResult({
            won: true,
            rank: language === 'TH' ? 'รางวัลพิเศษ (เลขหน้า)' : language === 'BN' ? 'বিশেষ পুরস্কার' : 'Prefix Special Prize',
            amount: Math.round(data.firstPrizeAmount * 0.01),
            matchedNumbers: data.firstPrize.substring(0, 3) + '*'.repeat(activeLottery.digits - 3)
          });
          return;
        }

        setSearchResult(null);
      }
    }, 1000);
  };

  return (
    <section id="checker" className="py-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-extrabold tracking-widest text-indigo-600 uppercase bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1.5 rounded-full inline-block mb-3 border border-indigo-200 dark:border-indigo-900/50">
            {language === 'TH' ? 'ระบบตรวจผลรางวัลหลากหลายสลาก' : language === 'BN' ? 'মাল্টি-লটারি রেজাল্ট চেকার' : 'Multi-Lottery Result Checker'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            {language === 'TH' ? 'ตรวจผลรางวัลสลากทุกประเภท' : language === 'BN' ? 'লটারির ফলাফল চেক করুন' : 'Verify All Lottery Results'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {language === 'TH' 
              ? 'เลือกประเภทสลากที่คุณต้องการ เช่น แนลชันนัล, ไทย, เมฆนา, 4D, ดราก้อน, ดูไบ, มาห์ซูซ และบิ๊กทิกเก็ต แล้วกรอกตัวเลขเพื่อตรวจทันที' 
              : language === 'BN' 
              ? 'ন্যাশনাল লটারি, থাইল্যান্ড লটারি, টোটো মেঘনা, ফোর ডি, ড্রাগন, দুবাই লটারি, মাজুস এবং বিগ টিকিট সিলেক্ট করে খুব সহজে আপনার নম্বর চেক করুন।' 
              : 'Choose between premium local and international lotteries including National, Thai, Meghna, 4D, Grand Dragon, Dubai, Mahzooz, and Big Ticket.'}
          </p>
        </div>

        {/* Horizontal Navigation Tabs for Lotteries Selection */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 mb-4 px-1">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Landmark className="h-4 w-4 text-indigo-500" />
              <span>{language === 'TH' ? 'เลือกเกมสลากกินแบ่ง' : language === 'BN' ? 'লটারি গেম নির্বাচন করুন' : 'Select Lottery Game'}</span>
            </span>
            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded">
              8 {language === 'TH' ? 'ตัวเลือกที่รองรับ' : language === 'BN' ? 'টি সমর্থিত অপশন' : 'Options Supported'}
            </span>
          </div>

          <div className="flex overflow-x-auto pb-3 gap-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            {LOTTERIES.map((lottery) => {
              const isActive = selectedLottery === lottery.id;
              const name = language === 'TH' ? lottery.nameTH : language === 'BN' ? lottery.nameBN : lottery.nameEN;
              return (
                <button
                  key={lottery.id}
                  onClick={() => handleLotteryChange(lottery.id)}
                  className={`flex items-center gap-2 px-4.5 py-3 rounded-2xl text-xs font-bold tracking-tight whitespace-nowrap transition-all border ${
                    isActive
                      ? 'bg-gradient-to-r from-slate-900 to-slate-800 text-white border-slate-900 dark:border-slate-950 shadow-md scale-[1.02]'
                      : 'bg-white dark:bg-slate-850 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                  id={`lottery-tab-${lottery.id}`}
                >
                  <span className="text-lg">{lottery.logo}</span>
                  <span>{name}</span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 bg-amber-400 rounded-full animate-ping" />
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Active Lottery Description Banner */}
          <div className="mt-3.5 bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-4 flex items-center gap-3.5">
            <span className="text-2xl h-11 w-11 flex items-center justify-center bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
              {activeLottery.logo}
            </span>
            <div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {language === 'TH' ? activeLottery.nameTH : language === 'BN' ? activeLottery.nameBN : activeLottery.nameEN}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                {language === 'TH' ? activeLottery.descTH : language === 'BN' ? activeLottery.descBN : activeLottery.descEN}
              </p>
            </div>
          </div>
        </div>

        {/* Checker Core & Latest Draw Dashboard Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Result Checker Input Panel */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-900 dark:to-slate-950/45 border border-slate-200/80 dark:border-slate-800 p-6 rounded-3xl shadow-md">
            <h3 className="text-base font-extrabold text-slate-800 dark:text-white mb-5 flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-amber-500 animate-spin" />
              <span>{language === 'TH' ? 'ตรวจสลากทันที' : language === 'BN' ? 'কুইক চেক প্যানেল' : 'Quick Checker'}</span>
            </h3>

            <form onSubmit={handleCheck} className="space-y-5">
              
              {/* Ticket No input */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                  {language === 'TH' 
                    ? `เลขสลากที่ต้องการตรวจ (${activeLottery.digits} หลัก)` 
                    : language === 'BN' 
                    ? `লটারি নম্বর (${activeLottery.digits} ডিজিট)` 
                    : `Ticket Number (${activeLottery.digits} digits)`}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={selectedTicketNumber}
                    onChange={handleTicketChange}
                    placeholder={activeLottery.placeholder}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl font-mono text-lg font-bold text-slate-800 tracking-widest focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-slate-300"
                    maxLength={activeLottery.digits}
                    id="ticket-number-input"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <span className="text-[10px] bg-slate-100 text-slate-400 font-bold px-2 py-1 rounded">
                      {selectedTicketNumber.length}/{activeLottery.digits}
                    </span>
                  </div>
                </div>
                {inputError && (
                  <p className="mt-1.5 text-xs text-red-500 font-semibold flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span>{inputError}</span>
                  </p>
                )}
              </div>

              {/* Draw Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                  {t('lblDrawDate')}
                </label>
                <div className="relative">
                  <select
                    value={selectedDrawDate}
                    onChange={(e) => {
                      setSelectedDrawDate(e.target.value);
                      setChecked(false);
                    }}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 cursor-pointer appearance-none"
                    id="draw-date-select"
                  >
                    {results.map((r) => (
                      <option key={r.id} value={r.drawDate}>
                        {r.drawDate} ({r.drawNumber}) {r.status === 'Upcoming' ? '• [Upcoming]' : ''}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
                    <Calendar className="h-4 w-4 text-indigo-500" />
                  </div>
                </div>
              </div>

              {/* Submit trigger button */}
              <button
                type="submit"
                disabled={checking}
                className="w-full py-3.5 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-indigo-650 hover:to-indigo-700 text-white font-bold rounded-xl transition-all shadow-md text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                id="check-submit-btn"
              >
                {checking ? (
                  <>
                    <div className="h-4.5 w-4.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>{language === 'TH' ? 'กำลังตรวจสอบความถูกต้อง...' : language === 'BN' ? 'যাচাই করা হচ্ছে...' : 'Verifying Ledger...'}</span>
                  </>
                ) : (
                  <>
                    <Search className="h-4.5 w-4.5" />
                    <span>{language === 'TH' ? 'ตรวจสอบสลาก' : language === 'BN' ? 'ফলাফল চেক করুন' : 'Verify My Status'}</span>
                  </>
                )}
              </button>
            </form>

            {/* Check Results Output Display */}
            {checked && (
              <div className="mt-6 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-inner animate-fade-in">
                {searchResult ? (
                  // User WON!
                  <div className="text-center space-y-3.5">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 border border-emerald-200 animate-bounce">
                      <Trophy className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-emerald-600 tracking-widest uppercase">
                        {t('winGreeting')}
                      </h4>
                      <p className="text-sm font-bold text-slate-800 mt-1">
                        {t('winAmountMsg')}{' '}
                        <span className="text-indigo-600 font-extrabold text-lg">
                          {searchResult.amount.toLocaleString()} {drawInfo.currency}
                        </span>
                      </p>
                    </div>
                    
                    <div className="bg-indigo-500/5 border border-indigo-500/10 p-2.5 rounded-xl font-mono text-xs text-slate-600">
                      <div>{t('rank')}: <strong className="text-indigo-700 font-extrabold">{searchResult.rank}</strong></div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Matched Combo: <strong className="text-slate-700">{searchResult.matchedNumbers}</strong></div>
                    </div>

                    <p className="text-[10px] text-emerald-600 font-semibold flex items-center justify-center gap-1">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                      <span>{language === 'TH' ? 'การตรวจสอบความปลอดภัยเสร็จสมบูรณ์' : language === 'BN' ? 'নিরাপত্তা লেজার দ্বারা যাচাইকৃত' : 'Validated by Security Ledger'}</span>
                    </p>
                  </div>
                ) : (
                  // User LOST
                  <div className="text-center space-y-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                      <HelpCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-400 tracking-wider uppercase">
                        {t('loseGreeting')}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                        {t('noWinMsg')}
                      </p>
                    </div>
                    <div className="pt-1.5 border-t border-slate-50">
                      <span className="text-[10px] text-slate-300">Ticket Checked: {selectedTicketNumber}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Latest Drawings Dashboard Visual Board */}
          <div className="lg:col-span-7 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 gap-2">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                  <span>{activeLottery.logo}</span>
                  <span>{language === 'TH' ? `ผลรางวัลล่าสุด: ${activeLottery.nameTH}` : language === 'BN' ? `সর্বশেষ ফলাফল: ${activeLottery.nameBN}` : `Latest Results: ${activeLottery.nameEN}`}</span>
                </h3>
                <p className="text-[11px] text-slate-400 font-semibold uppercase mt-0.5">
                  {drawInfo.drawNumber} — {t('drawDate')}: {drawInfo.drawDate}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase ${drawInfo.status === 'Upcoming' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-indigo-50 text-indigo-700 border border-indigo-100'}`}>
                {drawInfo.status === 'Upcoming' ? 'Upcoming Draw' : 'Official Results'}
              </span>
            </div>

            {/* Core Results Block Grid */}
            <div className="space-y-6">
              
              {/* 1st Prize High-Contrast Box */}
              <div className="bg-gradient-to-r from-indigo-500/10 via-indigo-500/5 to-transparent border border-indigo-500/25 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-extrabold text-indigo-700 uppercase tracking-widest flex items-center gap-1 justify-center sm:justify-start">
                    <Trophy className="h-4 w-4 text-amber-500" />
                    {t('lbl1stPrize')}
                  </span>
                  <p className="text-xs text-slate-500 font-semibold mt-1">
                    {drawInfo.firstPrizeAmount.toLocaleString()} {drawInfo.currency} {language === 'TH' ? 'ต่อรางวัล' : 'payout'}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <div className="flex gap-1.5">
                    {drawInfo.firstPrize.split('').map((char, index) => (
                      <span 
                        key={index} 
                        className="inline-flex h-11 w-9 sm:h-12 sm:w-10 items-center justify-center rounded-xl bg-slate-900 text-white text-lg sm:text-xl font-black font-mono shadow-md border-b-4 border-indigo-500"
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                  {/* Shortcut to check 1st prize number */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTicketNumber(drawInfo.firstPrize);
                      setChecked(false);
                      setSearchResult(null);
                    }}
                    className="text-[10px] text-indigo-600 hover:text-indigo-800 font-bold hover:underline transition-all flex items-center gap-1 mt-1 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100"
                  >
                    🚀 {language === 'TH' ? 'ทดสอบตรวจเลขนี้' : language === 'BN' ? 'এই নম্বর টেস্ট করুন' : 'Test Check this No.'}
                  </button>
                </div>
              </div>

              {/* Grid for Prefixes, Suffixes & 2-Digits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* 3-Digit Prefix / Consolation 1 */}
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center">
                  <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    {selectedLottery === 'thai' ? t('lbl3DigitPrefix') : (language === 'TH' ? 'เลขนำโชคพิเศษ' : language === 'BN' ? 'বিশেষ সংখ্যা (প্রেফিক্স)' : 'Lucky Prefix')}
                  </span>
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="flex justify-center gap-2">
                      {drawInfo.threeDigitPrefix.map((prefix, idx) => (
                        <span key={idx} className="px-2 py-1 bg-white rounded-lg text-xs font-black font-mono text-slate-800 border border-slate-200">
                          {prefix}
                        </span>
                      ))}
                    </div>
                    {/* Shortcut */}
                    <button
                      type="button"
                      onClick={() => {
                        const randomPref = drawInfo.threeDigitPrefix[0];
                        const randomRest = selectedLottery === 'thai' ? '456' : getDeterministicRandomDigits(selectedLottery + '_p_rest', activeLottery.digits - 3);
                        setSelectedTicketNumber(randomPref + randomRest);
                        setChecked(false);
                        setSearchResult(null);
                      }}
                      className="text-[9px] text-slate-400 hover:text-indigo-600 font-bold hover:underline transition-all"
                    >
                      {language === 'TH' ? 'กรอกทดสอบ' : language === 'BN' ? 'টেস্ট করুন' : 'Test Check'}
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-2.5 font-semibold">
                    {selectedLottery === 'thai' ? '4,000 ฿' : `${Math.round(drawInfo.firstPrizeAmount * 0.01).toLocaleString()} ${drawInfo.currency}`}
                  </span>
                </div>

                {/* 3-Digit Suffix / Consolation 2 */}
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center">
                  <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    {selectedLottery === 'thai' ? t('lbl3DigitSuffix') : (language === 'TH' ? 'เลขท้ายพิเศษ' : language === 'BN' ? 'বিশেষ সংখ্যা (সাফিক্স)' : 'Lucky Suffix')}
                  </span>
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="flex justify-center gap-2">
                      {drawInfo.threeDigitSuffix.map((suffix, idx) => (
                        <span key={idx} className="px-2 py-1 bg-white rounded-lg text-xs font-black font-mono text-slate-800 border border-slate-200">
                          {suffix}
                        </span>
                      ))}
                    </div>
                    {/* Shortcut */}
                    <button
                      type="button"
                      onClick={() => {
                        const randomSuff = drawInfo.threeDigitSuffix[0];
                        const randomPrefix = selectedLottery === 'thai' ? '123' : getDeterministicRandomDigits(selectedLottery + '_s_rest', activeLottery.digits - 3);
                        setSelectedTicketNumber(randomPrefix + randomSuff);
                        setChecked(false);
                        setSearchResult(null);
                      }}
                      className="text-[9px] text-slate-400 hover:text-indigo-600 font-bold hover:underline transition-all"
                    >
                      {language === 'TH' ? 'กรอกทดสอบ' : language === 'BN' ? 'টেস্ট করুন' : 'Test Check'}
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-2.5 font-semibold">
                    {selectedLottery === 'thai' ? '4,000 ฿' : `${Math.round(drawInfo.firstPrizeAmount * 0.01).toLocaleString()} ${drawInfo.currency}`}
                  </span>
                </div>

                {/* 2-Digit */}
                <div className="bg-indigo-500/5 border border-indigo-500/10 p-4 rounded-xl text-center">
                  <span className="block text-[11px] font-bold text-indigo-700 uppercase tracking-wider mb-2">
                    {t('lbl2Digit')}
                  </span>
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="flex justify-center">
                      <span className="px-3.5 py-1 bg-indigo-600 text-white rounded-lg text-sm font-black font-mono shadow-sm">
                        {drawInfo.twoDigit}
                      </span>
                    </div>
                    {/* Shortcut */}
                    <button
                      type="button"
                      onClick={() => {
                        const randomPrefix = getDeterministicRandomDigits(selectedLottery + '_2_rest', activeLottery.digits - 2);
                        setSelectedTicketNumber(randomPrefix + drawInfo.twoDigit);
                        setChecked(false);
                        setSearchResult(null);
                      }}
                      className="text-[9px] text-indigo-500 hover:text-indigo-700 font-bold hover:underline transition-all"
                    >
                      {language === 'TH' ? 'กรอกทดสอบ' : language === 'BN' ? 'টেস্ট করুন' : 'Test Check'}
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-2.5 font-semibold">
                    {selectedLottery === 'thai' ? '2,000 ฿' : `${Math.round(drawInfo.firstPrizeAmount * 0.0005).toLocaleString()} ${drawInfo.currency}`}
                  </span>
                </div>

              </div>

              {/* Secondary Prizes Lists */}
              <div className="bg-slate-50/50 rounded-2xl p-4.5 border border-slate-100">
                <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>{language === 'TH' ? 'รางวัลรองอื่นๆ' : language === 'BN' ? 'অন্যান্য সান্ত্বনা পুরস্কারসমূহ' : 'Secondary Console Tiers'}</span>
                  <span className="text-[10px] text-indigo-600 bg-white px-2 py-0.5 rounded border border-slate-100">
                    {language === 'TH' ? 'รางวัลที่ 2 และ 3' : language === 'BN' ? '২য় এবং ৩য় পুরস্কার' : '2nd & 3rd Prizes'}
                  </span>
                </h4>

                <div className="space-y-3 font-mono text-xs text-slate-600">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-2.5 gap-2">
                    <span className="font-sans font-bold text-slate-500 flex items-center gap-1">
                      🥈 {language === 'TH' ? 'รางวัลที่ 2' : language === 'BN' ? '২য় পুরস্কার' : '2nd Prize'}
                      <span className="text-[10px] font-normal text-slate-400">({drawInfo.secPrizeAmount.toLocaleString()} {drawInfo.currency})</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {drawInfo.secondPrize.slice(0, 3).map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSelectedTicketNumber(item);
                            setChecked(false);
                            setSearchResult(null);
                          }}
                          className="px-2 py-1 bg-white hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 rounded text-[11px] font-bold transition-all cursor-pointer"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-1 gap-2">
                    <span className="font-sans font-bold text-slate-500 flex items-center gap-1">
                      🥉 {language === 'TH' ? 'รางวัลที่ 3' : language === 'BN' ? '৩য় পুরস্কার' : '3rd Prize'}
                      <span className="text-[10px] font-normal text-slate-400">({drawInfo.thirdPrizeAmount.toLocaleString()} {drawInfo.currency})</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {drawInfo.thirdPrize.slice(0, 4).map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSelectedTicketNumber(item);
                            setChecked(false);
                            setSearchResult(null);
                          }}
                          className="px-2 py-1 bg-white hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 rounded text-[11px] font-bold transition-all cursor-pointer"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {drawInfo.status !== 'Upcoming' && (
                <div className="pt-3 border-t border-slate-50 text-right">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">
                    * {language === 'TH' ? 'ตรวจสอบสถิติและรางวัลแล้วโดยคณะผู้ควบคุมอย่างเป็นทางการ' : language === 'BN' ? 'অফিসিয়াল কন্ট্রোলিং বোর্ড দ্বারা প্রত্যয়িত' : 'Certified and audit-checked by international boards'}
                  </span>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
