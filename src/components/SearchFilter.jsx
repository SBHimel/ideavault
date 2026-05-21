"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@heroui/react";

export default function SearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");

  // 🔍 ১. সার্চের জন্য ১ সেকেন্ডের Debounce লজিক
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      
      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      router.push(`/ideas?${params.toString()}`);
    }, 1000); 

    return () => clearTimeout(delayDebounce);
  }, [search, router]);

  // 📂 ২. ক্যাটাগরি চেঞ্জ হওয়ার সাথে সাথে ইনস্ট্যান্ট ফিল্টার
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    const params = new URLSearchParams(window.location.search);
    
    if (selectedCategory) {
      params.set("category", selectedCategory);
    } else {
      params.delete("category");
    }

    router.push(`/ideas?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full md:w-auto items-center">

      {/* 🔍 এরর ফ্রি প্রিমিয়াম সার্চ ইনপুট */}
      <div className="relative max-w-xs  flex items-center">
        <Input
          type="text"
          placeholder="Search by title..."
          variant="bordered"
          radius="xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* ❌ সার্চ বক্সে কিছু লেখা থাকলে এই সুন্দর ক্রশ বাটনটি ইনপুটের ভেতরে ভাসবে */}
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 font-bold text-sm transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* 📂 সুন্দর কাস্টম ড্রপডাউন */}
      <select
        className="p-2 px-4 h-10 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 text-sm font-medium focus:outline-none focus:border-violet-500 dark:focus:border-violet-400 transition-colors cursor-pointer"
        value={category}
        onChange={handleCategoryChange}
      >
        <option value="">All Categories</option>
        <option value="Tech">Tech</option>
        <option value="Business">Business</option>
        <option value="Education">Education</option>
        <option value="Health">Health</option>
      </select>
      
    </div>
  );
}