import React from 'react';
import Link from 'next/link';

const TrendingIdeas = () => {
  // Static mock data resembling real application data
  const trendingCards = [
    {
      id: 1,
      title: "AI-Powered Smart Grid for Urban Energy Optimization",
      category: "Artificial Intelligence",
      votes: 142,
      author: "Naimur Rahman",
      avatarLetter: "N",
      time: "2 hours ago"
    },
    {
      id: 2,
      title: "Decentralized Carbon Credit Market Using Blockchain",
      category: "Sustainability",
      votes: 98,
      author: "Anika Tasnim",
      avatarLetter: "A",
      time: "5 hours ago"
    },
    {
      id: 3,
      title: "EdTech VR Toolkit for Interactive Medical Surgery Labs",
      category: "EdTech / VR",
      votes: 215,
      author: "Zayan Khan",
      avatarLetter: "Z",
      time: "1 day ago"
    }
  ];

  return (
    // Base: Light mode (bg-zinc-50, text-zinc-900, border-zinc-200)
    // dark: Dark mode (dark:bg-zinc-950, dark:text-white, dark:border-zinc-900)
    <section className="bg-zinc-50 dark:bg-zinc-950 py-16 md:py-24 border-t border-zinc-200 dark:border-zinc-900 text-zinc-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            {/* Tag update: Fuchsia text matching the brand style */}
            <h2 className="text-sm font-semibold tracking-widest text-fuchsia-600 dark:text-fuchsia-400 uppercase">What's Hot 🔥</h2>
            <p className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
  Trending Startup Concepts
</p>
          </div>
          <Link 
            href="/ideas" 
            className="inline-flex items-center text-sm font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 transition-colors group"
          >
            See all ideas
            <svg className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Ideas Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trendingCards.map((card) => (
            <div 
              key={card.id} 
              // Card component handles dynamic background shifting cleanly
              className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between hover:bg-zinc-100/50 dark:hover:bg-zinc-900/60 hover:shadow-xl hover:shadow-violet-500/5 dark:hover:shadow-violet-500/5 transition-all duration-300 group relative overflow-hidden"
            >
              <div>
                {/* Top: Category Tag & Upvote Display */}
                <div className="flex justify-between items-center mb-5">
                  {/* Category Pill: Violet variant adjustment */}
                  <span className="px-2.5 py-1 text-xs font-medium text-violet-600 dark:text-violet-400 bg-violet-500/10 border border-violet-500/20 rounded-md">
                    {card.category}
                  </span>
                  {/* Upvote Button: Violet interaction fill */}
                  <div className="flex items-center space-x-1 bg-zinc-200/60 dark:bg-zinc-800/60 px-2 py-1 rounded-lg text-xs font-semibold text-zinc-600 dark:text-zinc-300 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    <span>{card.votes}</span>
                  </div>
                </div>

                {/* Middle: Title */}
                <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-200 leading-snug mb-6 line-clamp-2">
                  {card.title}
                </h3>
              </div>

              {/* Bottom: Profile & Metadata */}
              <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800/60 pt-4 mt-auto">
                <div className="flex items-center space-x-3">
                  {/* Avatar Frame: Violet to Fuchsia identity blend */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-xs font-bold text-white shadow-md">
                    {card.avatarLetter}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{card.author}</p>
                    <p className="text-[10px] text-zinc-400 dark:text-zinc-500">{card.time}</p>
                  </div>
                </div>

                {/* Open/Interact Arrow Button */}
                <div className="p-1.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-violet-600 dark:hover:bg-violet-600 hover:text-white dark:hover:text-white rounded-lg transition-all duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrendingIdeas;