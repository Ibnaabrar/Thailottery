import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft, ChevronRight, Clock, Award, ShieldCheck, Ticket } from 'lucide-react';

export const HeroSlider: React.FC = () => {
  const { language, t, banners, setActiveModal } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto sliding
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  // Live draw countdown calculation (Targeting July 16, 2026 14:00 GMT+7)
  const [timeLeft, setTimeLeft] = useState({ days: 16, hours: 3, minutes: 19, seconds: 41 });

  useEffect(() => {
    const targetDate = new Date('2026-07-16T14:00:00+07:00');
    
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const getSlideTitle = (slide: typeof banners[0]) => {
    if (language === 'TH') return slide.titleTH;
    if (language === 'BN') return slide.titleBN;
    return slide.titleEN;
  };

  const getSlideSubtitle = (slide: typeof banners[0]) => {
    if (language === 'TH') return slide.subtitleTH;
    if (language === 'BN') return slide.subtitleBN;
    return slide.subtitleEN;
  };

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-slate-900 text-white">
      {/* Slides */}
      <div className="relative h-[480px] sm:h-[520px] md:h-[580px] w-full">
        {banners.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0 pointer-events-none'}`}
          >
            {/* Background Image with elegant overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent z-10" />
            <img
              src={slide.imageUrl}
              alt="Lottery Banner"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />

            {/* Slider Content */}
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl space-y-6">
                  
                  {/* Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-wider uppercase">
                    <ShieldCheck className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
                    <span>GLO Verified Digital Portal</span>
                  </div>

                  {/* Main Header */}
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-sans leading-tight">
                    {getSlideTitle(slide)}
                  </h2>

                  {/* Subtitle */}
                  <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                    {getSlideSubtitle(slide)}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-4 pt-2">
                    <a
                      href="#checker"
                      className="px-6 py-3 rounded-full text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 transition-all shadow-lg hover:shadow-amber-500/10 flex items-center gap-1.5"
                    >
                      <Award className="h-4.5 w-4.5" />
                      {t('heroCtaCheck')}
                    </a>
                    <button
                      onClick={() => setActiveModal('buyTicket')}
                      className="px-6 py-3 rounded-full text-sm font-bold text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-all flex items-center gap-1.5"
                    >
                      <Ticket className="h-4.5 w-4.5 text-amber-400" />
                      {t('heroCtaBuy')}
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Manual Slide Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all backdrop-blur-sm hidden sm:block"
        id="banner-prev-btn"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all backdrop-blur-sm hidden sm:block"
        id="banner-next-btn"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/60'}`}
          />
        ))}
      </div>

      {/* Floating Draw Countdown Panel */}
      <div className="absolute right-4 bottom-12 md:right-8 lg:right-16 z-30 max-w-sm w-full bg-slate-900/90 border border-slate-700/60 p-5 rounded-2xl shadow-2xl backdrop-blur-md hidden lg:block animate-fade-in">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800">
          <Clock className="h-4 w-4 text-amber-400 animate-pulse" />
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            {t('liveCountdown')}
          </span>
        </div>
        <p className="text-xs font-semibold text-slate-400 mb-4 uppercase">
          Draw #105: July 16, 2026 (14:00 GMT+7)
        </p>

        {/* Counter Grid */}
        <div className="grid grid-cols-4 gap-2.5 text-center">
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
            <span className="block font-mono text-xl font-bold text-white">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Days</span>
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
            <span className="block font-mono text-xl font-bold text-white">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Hours</span>
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
            <span className="block font-mono text-xl font-bold text-white">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Min</span>
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
            <span className="block font-mono text-xl font-bold text-amber-400 animate-pulse">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Sec</span>
          </div>
        </div>
      </div>
    </section>
  );
};
