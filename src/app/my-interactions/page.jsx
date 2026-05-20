'use client';

import React, { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';

const MyInteractions = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const fetchUserComments = async () => { 
    try {
        setLoading(true);

       
        const { data: tokenData } = await authClient.token();

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user-comments`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${tokenData?.token}` 
            }
        });

        const data = await res.json();
        setComments(data);
    } catch (err) {
        console.error("Error fetching comments:", err);
    } finally {
        setLoading(false);
    }
  };

  // 🔄 ২. পেজ লোড হলে বা ইউজার এভেইলেবল হলে ফাংশনটি কল হবে
  useEffect(() => {
    if (user?.email) {
      fetchUserComments(); 
    }
  }, [user?.email]);

  // প্রিমিয়াম স্পিনার লোডিং স্টেট
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 px-4">
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-violet-500/20 border-t-violet-600 dark:border-t-violet-400 rounded-full animate-spin"></div>
          <div className="absolute w-12 h-12 border-4 border-fuchsia-500/10 border-b-fuchsia-500 dark:border-b-fuchsia-400 rounded-full animate-spin duration-1000"></div>
        </div>
        <div className="text-center space-y-1 animate-pulse">
          <p className="text-base font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent tracking-wide">
            Loading your interactions...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-zinc-900 dark:text-zinc-100">
      <h1 className="text-3xl font-bold mb-8">My Comments & Interactions ({comments.length})</h1>
      
      {comments.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-xl border-zinc-700">
          <p className="text-zinc-400">You haven't commented on any blueprints yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments?.map((comment) => (
            <div key={comment._id} className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
              <p className="text-zinc-800 dark:text-zinc-200 font-medium mb-3">
                "{comment.text}"
              </p>
              <div className="flex items-center justify-between text-xs text-zinc-400">
                {/* ডাটাবেজের টাইমস্ট্যাম্প ফরম্যাট হ্যান্ডেল করার সেফ রেন্ডারিং */}
                <span>{comment.timestamp ? comment.timestamp.split(',')[0] : 'Recent'}</span>
                {comment.ideaId && (
                  <Link 
                    href={`/ideas/${comment.ideaId}`} 
                    className="inline-flex items-center text-violet-500 dark:text-violet-400 font-bold hover:underline"
                  >
                    View Original Idea →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyInteractions;