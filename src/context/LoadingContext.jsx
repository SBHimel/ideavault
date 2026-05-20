'use client';

import React, { createContext, useContext, useState } from 'react';
import { Spinner } from '@heroui/react'; // HeroUI এর স্পিনার

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [activeRequests, setActiveRequests] = useState(0);

  // রিকোয়েস্ট শুরু হলে কাউন্ট বাড়বে
  const showLoading = () => setActiveRequests((prev) => prev + 1);
  
  // রিকোয়েস্ট শেষ বা এরর হলে কাউন্ট কমবে
  const hideLoading = () => setActiveRequests((prev) => Math.max(0, prev - 1));

  const isLoading = activeRequests > 0;

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {children}
      
      {/* 🔮 গ্লোবাল লোডিং স্পিনার ইউআই (WOW লেভেলের ব্লার ইফেক্ট সহ) */}
      {isLoading && (
        <div className="fixed inset-0 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md flex flex-col items-center justify-center z-[99999] transition-all duration-300">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-2xl flex flex-col items-center gap-4">
            <Spinner 
              size="lg" 
              color="secondary"
              classNames={{
                circle1: "border-b-violet-600 dark:border-b-violet-400",
                circle2: "border-b-fuchsia-600 dark:border-b-fuchsia-400"
              }}
            />
            <p className="text-xs font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase animate-pulse">
              Syncing Vault...
            </p>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};

export const useGlobalLoading = () => useContext(LoadingContext);