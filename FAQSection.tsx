import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, Ticket, Award, TrendingUp, BookOpen, Phone } from 'lucide-react';

export const QuickServices: React.FC = () => {
  const { t, setActiveModal } = useApp();

  const services = [
    {
      id: 'qs1',
      icon: <CheckCircle className="h-6 w-6 text-amber-600" />,
      title: t('quickCheck'),
      descEN: 'Instantly verify your draw tickets against official ledger archives.',
      descTH: 'ตรวจเลขสลากกินแบ่งรัฐบาลของคุณอย่างรวดเร็วกับระบบฐานข้อมูลหลัก',
      descBN: 'অফিসিয়াল লেজার আর্কাইভের সাথে আপনার টিকিটগুলো মিলিয়ে নিন।',
      link: '#checker',
      action: null
    },
    {
      id: 'qs2',
      icon: <Ticket className="h-6 w-6 text-amber-600" />,
      title: t('quickBuy'),
      descEN: 'Purchase authorized digital lottery tickets at face value securely.',
      descTH: 'ซื้อสลากกินแบ่งดิจิทัลอย่างเป็นทางการในราคายุติธรรม 80 บาท',
      descBN: 'নিরাপদ উপায়ে ন্যায্যমূল্যে অফিসিয়াল ডিজিটাল লটারি টিকিট ক্রয় করুন।',
      link: '#',
      action: () => setActiveModal('buyTicket')
    },
    {
      id: 'qs3',
      icon: <Award className="h-6 w-6 text-amber-600" />,
      title: t('quickWinners'),
      descEN: 'Discover stories of recent jackpot multi-millionaire winners.',
      descTH: 'พบปะทำเนียบผู้ถูกรางวัลที่ 1 และรับแรงบันดาลใจแห่งโชคลาภ',
      descBN: 'আমাদের সাম্প্রতিক কোটিপতি লটারি বিজয়ীদের গল্পগুলো জানুন।',
      link: '#winners',
      action: null
    },
    {
      id: 'qs4',
      icon: <TrendingUp className="h-6 w-6 text-amber-600" />,
      title: t('quickStats'),
      descEN: 'Analyze previous drawing patterns and reward distributions.',
      descTH: 'วิเคราะห์แนวโน้มรางวัล เลขท้าย และประวัติการจ่ายเงินสะสม',
      descBN: 'পূর্ববর্তী ড্র-এর সংখ্যা বিশ্লেষণ এবং পুরস্কারের তথ্য দেখুন।',
      link: '#stats',
      action: null
    },
    {
      id: 'qs5',
      icon: <BookOpen className="h-6 w-6 text-amber-600" />,
      title: t('quickFaq'),
      descEN: 'Find solutions to claiming procedures, security, and policies.',
      descTH: 'ค้นหาคำตอบเกี่ยวกับการขึ้นรางวัล มาตรฐานความปลอดภัย และนโยบาย',
      descBN: 'পুরস্কার দাবি করার নিয়মাবলী, নিরাপত্তা এবং পলিসি সম্পর্কে জানুন।',
      link: '#faq',
      action: null
    },
    {
      id: 'qs6',
      icon: <Phone className="h-6 w-6 text-amber-600" />,
      title: t('quickContact'),
      descEN: 'Reach out to official channels for queries, support, or claims.',
      descTH: 'ติดต่อสอบถามเจ้าหน้าที่เพื่อขอรับการช่วยเหลือ แนะนำการขึ้นรางวัล',
      descBN: 'যেকোনো লটারি জিজ্ঞাসা বা সহায়তার জন্য আমাদের সাথে যোগাযোগ করুন।',
      link: '#contact',
      action: null
    }
  ];

  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {services.map((item) => {
            const ContentWrapper = () => (
              <div className="flex flex-col items-center text-center p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 dark:bg-amber-500/20 group-hover:bg-amber-500 text-amber-600 group-hover:text-white transition-all mb-4 shadow-inner">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-400 dark:text-slate-400 line-clamp-3 leading-relaxed hidden sm:block">
                  {useApp().language === 'TH' ? item.descTH : useApp().language === 'BN' ? item.descBN : item.descEN}
                </p>
              </div>
            );

            if (item.action) {
              return (
                <button key={item.id} onClick={item.action} className="text-left w-full focus:outline-none">
                  <ContentWrapper />
                </button>
              );
            }

            return (
              <a key={item.id} href={item.link}>
                <ContentWrapper />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
