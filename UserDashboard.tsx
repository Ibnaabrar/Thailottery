import React from 'react';
import { useApp } from '../context/AppContext';
import { Smartphone, ShieldCheck, Download, Star } from 'lucide-react';

export const DownloadApp: React.FC = () => {
  const { t } = useApp();

  return (
    <section className="py-16 bg-white overflow-hidden border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Rounded Container Box */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
          
          {/* Background vector glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column Information */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                <Smartphone className="h-4 w-4 text-amber-500 animate-pulse" />
                <span>Available for Android & iOS</span>
              </div>

              {/* Title heading */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                {t('lblDownloadApp')}
              </h2>

              <p className="text-slate-350 text-sm leading-relaxed max-w-xl">
                {t('lblDownloadSubtitle')} Buy tickets at official standard prices, cash out winnings in 1-click, and watch live drawings inside our secure mobile ecosystem.
              </p>

              {/* Trust highlights */}
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-amber-500 flex-shrink-0" />
                  <span className="text-xs font-semibold text-slate-200">100% Secure Ledger</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-amber-500 flex-shrink-0" />
                  <span className="text-xs font-semibold text-slate-200">Instant Cash-Outs</span>
                </div>
              </div>

              {/* Badges and Store downloads */}
              <div className="flex flex-wrap items-center gap-4">
                
                {/* App store button */}
                <a 
                  href="#"
                  className="flex items-center gap-3 px-5 py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-xl transition-all shadow-md group"
                >
                  <svg className="h-6 w-6 text-white group-hover:scale-105 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.1 16.67C20.08 16.74 19.67 18.11 18.71 19.5M15.97 4.17C16.63 3.37 17.07 2.28 16.95 1C15.85 1.04 14.51 1.73 13.73 2.64C13.07 3.41 12.49 4.52 12.64 5.78C13.87 5.87 15.12 5.17 15.97 4.17Z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Download on the</p>
                    <p className="text-xs font-black font-sans leading-none mt-0.5">App Store</p>
                  </div>
                </a>

                {/* Google Play button */}
                <a 
                  href="#"
                  className="flex items-center gap-3 px-5 py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-xl transition-all shadow-md group"
                >
                  <svg className="h-6 w-6 text-white group-hover:scale-105 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M17.5,12L12,6.5V11H7.5V13H12V17.5L17.5,12Z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Get it on</p>
                    <p className="text-xs font-black font-sans leading-none mt-0.5">Google Play</p>
                  </div>
                </a>

              </div>
            </div>

            {/* Right Column QR Code & Preview */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center gap-4">
              
              {/* Fake QR Code Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-800 shadow-xl flex flex-col items-center max-w-[200px] text-slate-950 relative group">
                {/* QR graphic */}
                <div className="h-32 w-32 bg-slate-100 rounded-lg flex items-center justify-center p-2">
                  <div className="grid grid-cols-5 grid-rows-5 gap-1.5 h-full w-full">
                    {/* Fake QR blocks */}
                    <div className="bg-slate-900 rounded-sm col-span-2 row-span-2" />
                    <div className="bg-slate-100 rounded-sm" />
                    <div className="bg-slate-900 rounded-sm col-span-2 row-span-2" />
                    <div className="bg-slate-900 rounded-sm" />
                    <div className="bg-slate-100 rounded-sm" />
                    <div className="bg-slate-900 rounded-sm" />
                    <div className="bg-slate-100 rounded-sm" />
                    <div className="bg-slate-900 rounded-sm col-span-2" />
                    <div className="bg-slate-900 rounded-sm col-span-2 row-span-2" />
                    <div className="bg-slate-100 rounded-sm" />
                    <div className="bg-slate-900 rounded-sm" />
                    <div className="bg-slate-900 rounded-sm col-span-2" />
                    <div className="bg-slate-100 rounded-sm" />
                  </div>
                </div>
                
                {/* Info Text */}
                <p className="text-[9px] font-black tracking-widest text-slate-400 mt-3 text-center uppercase">
                  Scan to Download
                </p>
              </div>

              {/* rating info */}
              <div className="flex items-center gap-1.5 bg-slate-950/80 border border-slate-800/80 px-4 py-2 rounded-full shadow-inner">
                <div className="flex gap-0.5 text-amber-400">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <Star className="h-3.5 w-3.5 fill-current" />
                </div>
                <span className="text-xs text-slate-200 font-bold">4.9/5 Rating</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
