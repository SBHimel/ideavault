'use client';

import React from 'react';
import Link from 'next/link';

const FeaturedIdeas = ({ ideas }) => {
  // হোম পেজের জন্য ডাটা থেকে মাত্র ৬টি আইডিয়া স্লাইস করে নেওয়া হলো
  const featured = ideas?.slice(0, 6) || [];

  return (
    <section className="bg-zinc-50 dark:bg-zinc-950 py-20 px-4 sm:px-6 lg:px-8 text-zinc-900 dark:text-zinc-100 border-t border-b border-zinc-200 dark:border-zinc-900/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent mb-4 tracking-tight">
            Featured Innovations
          </h2>
          <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
            Explore the top cutting-edge concepts pitched by our global developer community.
          </p>
        </div>

        {/* Ideas Grid (Max 6 Items) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((idea) => (
            <div 
              key={idea._id} 
              className="group bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-violet-500/5 dark:hover:shadow-violet-500/5 flex flex-col justify-between backend-card backdrop-blur-sm hover:-translate-y-1"
            >
              <div>
                {/* Image (Optional Check) */}
                {idea.imageUrl && (
                  <div className="w-full h-40 rounded-xl overflow-hidden mb-4 border border-zinc-200 dark:border-zinc-800/60">
                    <img 
                      src={idea.imageUrl} 
                      alt={idea.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                
                {/* Category Badge */}
                <span className="text-xs font-bold text-violet-600 dark:text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-md uppercase tracking-wider">
                  {idea.category}
                </span>

                <h3 className="text-xl font-bold mt-3 text-zinc-800 dark:text-zinc-200 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-1">
                  {idea.title}
                </h3>
                
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                  {idea.shortDesc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800/60 flex justify-between items-center text-xs">
                <span className="text-zinc-400 dark:text-zinc-500 font-medium">By {idea.author || 'Anonymous'}</span>
                <Link 
                  href={`/ideas/${idea._id}`} 
                  className="text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 font-semibold flex items-center gap-1 transition-colors"
                >
                  View Blueprint 
                  <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 🚀 See All Ideas Button */}
        <div className="mt-16 text-center">
          <Link href="/ideas">
            <button className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold text-white dark:text-zinc-950 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]">
              See All Ideas
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedIdeas;