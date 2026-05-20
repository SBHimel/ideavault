import React from 'react';
import Link from 'next/link';

const IdeaCards = ({ idea }) => {
    // Destructuring our mongoDB objects safely
    const { _id, title, category, shortDesc, tags, budget, author, imageUrl } = idea;

    // Fallback image source jodi database-e imageUrl thikthak na thake
    const finalImage = imageUrl || "/assets/slides1.jpg";

    return (
        
        <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl overflow-hidden flex flex-col justify-between hover:bg-zinc-50 dark:hover:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700/50 hover:shadow-xl hover:shadow-violet-500/5 dark:hover:shadow-violet-500/5 transition-all duration-300 group relative">
            
            {/* Top section: Dynamic Image Showcase */}
            <div className="relative h-48 w-full overflow-hidden bg-zinc-200 dark:bg-zinc-950">
                <img 
                    src={finalImage} 
                    alt={title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 dark:opacity-80 group-hover:opacity-100"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/10 dark:from-zinc-900 dark:via-transparent dark:to-zinc-950/20" />
                
               
                <span className="absolute top-4 left-4 px-2.5 py-1 text-[11px] font-bold text-violet-600 dark:text-violet-400 bg-white/90 dark:bg-zinc-950/80 backdrop-blur-md border border-violet-500/20 dark:border-violet-500/30 rounded-md uppercase tracking-wider shadow-md">
                    {category || "General"}
                </span>

                
                {budget && (
                    <span className="absolute top-4 right-4 text-[11px] font-semibold bg-fuchsia-500/10 dark:bg-fuchsia-500/10 border border-fuchsia-500/20 backdrop-blur-md px-2.5 py-1 rounded-md text-fuchsia-600 dark:text-fuchsia-400 shadow-md">
                        {budget}
                    </span>
                )}
            </div>

            {/* Middle section: Content Zone */}
            <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                   
                    <div className="w-10 h-[2px] bg-gradient-to-r from-violet-500 to-fuchsia-500 mb-4 rounded-full group-hover:w-20 transition-all duration-300" />

                    
                    <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-200 line-clamp-2 leading-snug mb-3">
                        {title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed mb-6">
                        {shortDesc}
                    </p>

                    {/* Optional Tags Layout */}
                    {tags && (
                        <div className="flex flex-wrap gap-1.5 mb-6">
                            {tags.split(',').slice(0, 3).map((tag, idx) => (
                                <span key={idx} className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded-md border border-zinc-200 dark:border-zinc-800">
                                    #{tag.trim()}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

               

                <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/60 pt-4 mt-auto">
                    <div className="flex items-center space-x-2.5">
                    
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 via-indigo-500 to-fuchsia-600 flex items-center justify-center text-xs font-bold text-white uppercase shadow-inner">
                            {author ? author[0] : "I"}
                        </div>
                        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 max-w-[100px] truncate">
                            {author || "Anonymous"}
                        </span>
                    </div>

                
                    <Link 
                        href={`/ideas/${_id}`} 
                        className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 dark:from-violet-500 dark:to-fuchsia-500 dark:hover:from-violet-600 dark:hover:to-fuchsia-600 rounded-lg shadow-md transition-all duration-300 transform active:scale-95 hover:shadow-violet-500/10"
                    >
                        View Details
                        <svg className="w-3.5 h-3.5 ml-1.5 -mr-0.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default IdeaCards;