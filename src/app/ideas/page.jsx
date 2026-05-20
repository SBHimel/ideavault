import IdeaCards from '@/components/IdeaCards';
import React from 'react';

const Ideas = async () => {
   
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/idea`, { cache: 'no-store' }); 
    const ideas = await res.json();

    // console.log(ideas);

    return (
        // Base: Light mode (bg-zinc-50, text-zinc-900)
        // dark: Dark mode (dark:bg-zinc-950, dark:text-white)
        <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen text-zinc-900 dark:text-white py-12 px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                
                {/* Header Info */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-zinc-200 dark:border-zinc-900 pb-6 gap-4">
                    <div>
                        {/* Heading Gradient Update: Violet to Fuchsia style mapping */}
                        <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                            Explore Innovation
                        </h1>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                            Browse through revolutionary startup ideas pitched by creators globally.
                        </p>
                    </div>
                    {/* Ideas Badge: Dynamic support for light/dark layout structure */}
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 shadow-sm">
                        Total Ideas: <span className="text-violet-600 dark:text-violet-400 font-bold">{ideas.length}</span>
                    </div>
                </div>

                {/* 3-Column Grid System */}
                {/* Ekhane static card wrapper seamless loop load nibe */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        ideas.map(idea => (
                            <IdeaCards key={idea._id} idea={idea} />
                        ))
                    }
                </div>
                
            </div>
        </div>
    );
};

export default Ideas;