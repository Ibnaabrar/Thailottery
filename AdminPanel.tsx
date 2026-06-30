import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FAQS } from '../data/mockData';
import { ChevronDown, ChevronUp, BookOpen, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { language, t } = useApp();
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq1');

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const getQuestion = (faq: typeof FAQS[0]) => {
    if (language === 'TH') return faq.qTH;
    if (language === 'BN') return faq.qBN;
    return faq.qEN;
  };

  const getAnswer = (faq: typeof FAQS[0]) => {
    if (language === 'TH') return faq.aTH;
    if (language === 'BN') return faq.aBN;
    return faq.aEN;
  };

  return (
    <section id="faq" className="py-16 bg-slate-50 border-b border-slate-100">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold tracking-widest text-amber-600 uppercase bg-amber-50 px-3 py-1.5 rounded-full inline-block mb-3 border border-amber-200">
            {t('quickFaq')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('lblFaqTitle')}
          </h2>
          <p className="text-sm text-slate-500 mt-2.5">
            {t('lblFaqSubtitle')}
          </p>
        </div>

        {/* Accordions List */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div 
                key={faq.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-300"
              >
                {/* Header Trigger */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 hover:text-amber-700 transition-colors focus:outline-none"
                  id={`faq-trigger-${faq.id}`}
                >
                  <span className="flex items-center gap-3 text-xs sm:text-sm">
                    <HelpCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                    <span>{getQuestion(faq)}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-4.5 w-4.5 text-amber-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4.5 w-4.5 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {/* Body Content */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-50 text-xs text-slate-500 leading-relaxed font-sans bg-slate-50/50">
                    <p>{getAnswer(faq)}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
