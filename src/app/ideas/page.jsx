import IdeaCards from '@/components/IdeaCards';
import SearchFilter from '@/components/SearchFilter';
import React from 'react';

export const metadata = { title: "All-ideas | Idea Vault" };

const Ideas = async ({ searchParams }) => {
    
    // Next.js ১৫+ এর নিয়ম অনুযায়ী searchParams await করা হলো
    const resolvedParams = await searchParams; 
    
    const search = resolvedParams?.search || "";
    const category = resolvedParams?.category || "";

    // ডাইনামিক কী ট্রিক
    const key = `${search}-${category}`; 

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/idea?search=${search}&category=${category}`, 
        { cache: 'no-store' }
    ); 
    const ideas = await res.json();

    return (
        <div key={key} className="bg-zinc-50 dark:bg-zinc-950 min-h-screen text-zinc-900 dark:text-white py-12 px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                
                {/* Header Info */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-zinc-200 dark:border-zinc-900 pb-6 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                            Explore Innovation
                        </h1>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                            Browse through revolutionary startup ideas pitched by creators globally.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 shadow-sm">
                        Total Ideas: <span className="text-violet-600 dark:text-violet-400 font-bold">{ideas.length}</span>
                    </div>
                </div>

                {/* সার্চ এবং ফিল্টার কম্পোনেন্ট */}
                <SearchFilter />

              
                {ideas.length === 0 ? (
                    // 📭 যদি কোনো আইডিয়া না থাকে (খালি থাকে) তবে এই সুন্দর মেসেজটি দেখাবে
                    <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 bg-white dark:bg-zinc-900/50 shadow-sm">
                        <span className="text-5xl mb-4">🔍</span>
                        <h3 className="text-xl font-bold text-zinc-700 dark:text-zinc-300">No Ideas Found</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm">
                            We couldn't find any ideas matching "{search || category}". Try searching for something else or clearing the filters!
                        </p>
                    </div>
                ) : (
                    // 📊 যদি আইডিয়া থাকে, তবে আগের মতো সুন্দর ৩-কলামের গ্রিডে কার্ডগুলো দেখাবে
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {ideas.map(idea => (
                            <IdeaCards key={idea._id} idea={idea} />
                        ))}
                    </div>
                )}
                
            </div>
        </div>
    );
};

export default Ideas;