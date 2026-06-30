import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NewsPost } from '../types';
import { Calendar, ArrowRight, X, ShieldAlert, BookOpen } from 'lucide-react';

export const NewsSection: React.FC = () => {
  const { news, language, t } = useApp();
  const [selectedPost, setSelectedPost] = useState<NewsPost | null>(null);

  const getPostTitle = (post: NewsPost) => {
    if (language === 'TH') return post.titleTH;
    if (language === 'BN') return post.titleBN;
    return post.titleEN;
  };

  const getPostSummary = (post: NewsPost) => {
    if (language === 'TH') return post.summaryTH;
    if (language === 'BN') return post.summaryBN;
    return post.summaryEN;
  };

  const getPostContent = (post: NewsPost) => {
    if (language === 'TH') return post.contentTH;
    if (language === 'BN') return post.contentBN;
    return post.contentEN;
  };

  return (
    <section id="news" className="py-16 bg-slate-50 border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-amber-600 uppercase bg-amber-50 px-3 py-1.5 rounded-full inline-block mb-3 border border-amber-200">
              {t('navNews')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              News & Official Announcements
            </h2>
          </div>
          <span className="text-xs font-bold text-amber-600 flex items-center gap-1 hover:underline cursor-pointer">
            View All GLO Press Releases <ArrowRight className="h-4 w-4" />
          </span>
        </div>

        {/* News Blog Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {news.map((post) => (
            <div 
              key={post.id}
              className="flex flex-col sm:flex-row bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
            >
              {/* Image thumbnail */}
              <div className="sm:w-2/5 h-48 sm:h-full relative overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt="News article cover"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-amber-400" />
                  <span>{post.date}</span>
                </div>
              </div>

              {/* Text metadata */}
              <div className="p-5 sm:w-3/5 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-extrabold text-slate-900 leading-snug group-hover:text-amber-700 transition-colors">
                    {getPostTitle(post)}
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
                    {getPostSummary(post)}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedPost(post)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-amber-600 transition-colors self-start"
                  id={`read-more-btn-${post.id}`}
                >
                  <span>Read Full Notice</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Detail Reader Overlay modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col">
            
            {/* Modal Image Header */}
            <div className="h-56 relative w-full flex-shrink-0">
              <img 
                src={selectedPost.imageUrl} 
                alt="Banner article" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors backdrop-blur-sm"
                id="close-news-reader-btn"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="absolute bottom-4 left-5 right-5 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <BookOpen className="h-4 w-4" />
                  <span>GLO Press Release • {selectedPost.date}</span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-white leading-tight">
                  {getPostTitle(selectedPost)}
                </h4>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-4">
              <p className="text-xs font-semibold text-slate-400 border-l-2 border-amber-500 pl-2.5 py-0.5 leading-relaxed italic">
                {getPostSummary(selectedPost)}
              </p>
              
              <div className="text-xs text-slate-600 leading-relaxed space-y-3 font-sans pt-2 border-t border-slate-50">
                {getPostContent(selectedPost).split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Warning box */}
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex gap-3">
                <ShieldAlert className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <div>
                  <h5 className="text-[11px] font-bold text-amber-700 uppercase">GLO Security Policy</h5>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">
                    Always buy digital tickets from our verified portal. Never share your credential codes or wallet passwords with third parties.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end flex-shrink-0">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-xs font-semibold transition-colors"
              >
                Done Reading
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
