'use client';

import { Button } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

const NotFoundPage = () => {
  return (
    // 🌌 নিওমরফিক ব্যাকগ্রাউন্ড: লাইট এবং ডার্ক মোডে ডিফারেন্ট টোন
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      
      <div className="text-center max-w-2xl relative p-10 bg-white dark:bg-zinc-900 shadow-[20px_20px_60px_#e6e6e6,-20px_-20px_60px_#ffffff] dark:shadow-[20px_20px_60px_#101010,-20px_-20px_60px_#1d1d1d] rounded-3xl border border-zinc-100 dark:border-zinc-800">
        
        {/* ✨ সফট গ্লোয়িং অরবিট */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 blur-3xl rounded-full pointer-events-none" />

        {/* 🛑 404 টাইটেল: প্রিমিয়াম গ্রেডিয়েন্ট */}
        <h1 className="text-9xl font-extrabold tracking-tighter bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 dark:from-violet-400 dark:via-purple-400 dark:to-fuchsia-400 bg-clip-text text-transparent leading-none selection:bg-transparent">
          404
        </h1>

        {/* 标题 */}
        <h2 className="mt-6 text-3xl md:text-4xl font-extrabold text-zinc-800 dark:text-zinc-100 tracking-tight">
          Page Vanished Into Thin Air
        </h2>

        {/* বিবরণ */}
        <p className="mt-5 text-zinc-500 dark:text-zinc-400 text-base md:text-lg leading-relaxed max-w-md mx-auto">
          The brilliant idea you are looking for might have been shared elsewhere, renamed, or is currently evolving in the vault.
        </p>

        {/* 🛠️ অ্যাকশন বাটন গ্রুপ */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5 relative z-10">

          {/* প্রধান বাটন: গ্লোয়িং শ্যাডো সহ গ্রেডিয়েন্ট */}
          <Link href="/" className="w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto rounded-full px-10 py-7 text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 shadow-lg shadow-violet-500/30 dark:shadow-violet-500/15 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Go Back Home
            </Button>
          </Link>

          {/* আউটলাইন বাটন: বর্ডার ও সফট হোভার ইফেক্ট সহ */}
          <Link href="/ideas" className="w-full sm:w-auto">
            <Button
              variant="bordered"
              className="w-full sm:w-auto rounded-full px-10 py-7 text-sm font-bold border-2 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Explore Ideas
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;