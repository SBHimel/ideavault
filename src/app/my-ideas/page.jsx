'use client';

import React, { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';

const MyIdeas = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  
  const [myIdeas, setMyIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // যখনই ইউজার লগইন অবস্থায় থাকবে, তখনই তার ইমেইল দিয়ে ডাটা ফেচ হবে
    if (user?.email) {
      fetch(`http://localhost:5000/idea?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setMyIdeas(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  if (loading) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 px-4">
      {/* গ্লোয়িং অ্যানিমেটেড স্পিনার */}
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-violet-500/20 border-t-violet-600 dark:border-t-violet-400 rounded-full animate-spin"></div>
        <div className="absolute w-12 h-12 border-4 border-fuchsia-500/10 border-b-fuchsia-500 dark:border-b-fuchsia-400 rounded-full animate-spin duration-1000"></div>
      </div>
      
      {/* অ্যানিমেটেড টেক্সট */}
      <div className="text-center space-y-1 animate-pulse">
        <p className="text-base font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent tracking-wide">
          Loading your blueprints...
        </p>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
          Fetching your innovations from the vault
        </p>
      </div>
    </div>
  );
}

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Published Ideas ({myIdeas.length})</h1>
      
      {myIdeas.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-xl border-zinc-700">
          <p className="text-zinc-400 mb-4">You haven't pitched any ideas yet.</p>
          <Link href="/add-idea" className="px-5 py-2.5 bg-violet-600 text-white font-medium rounded-xl text-sm">
             Pitch an Idea
          </Link>
        </div>
      ) : (
        // এখানে আপনার সুন্দর কার্ড লেআউটের কোড বসাবেন যা দিয়ে আপনি লুপ (map) চালাবেন
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {myIdeas.map((idea) => (
            <div key={idea._id} className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl">
              <h2 className="text-xl font-bold text-white mb-2">{idea.title}</h2>
              <p className="text-zinc-400 text-sm mb-4">{idea.shortDesc}</p>
              <Link href={`/ideas/${idea._id}`} className="text-violet-400 text-xs font-semibold hover:underline">
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyIdeas;