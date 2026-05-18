'use client'; 

import React, { useState } from 'react';
import Link from 'next/link'; 
import ThemeToggle from './ThemeToggle'; // Path check kore nio layout onushare

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Base: Light mode (bg-white, border-zinc-100, text-zinc-800)
    // dark: Dark mode (dark:bg-zinc-950, dark:border-zinc-900, dark:text-zinc-100)
    <nav className="bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 shadow-md border-b border-zinc-100 dark:border-zinc-900 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Website Name */}
          <div className="flex-shrink-0 flex items-center">
            {/* Logo gradient update: Violet to Fuchsia consistent theme */}
            <Link href="/" className="text-2xl font-bold tracking-wider bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
              IdeaVault
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          {/* Hover effects changed from blue to violet */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200 font-medium text-sm">Home</Link>
            <Link href="/ideas" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200 font-medium text-sm">Ideas</Link>
            <Link href="/add-idea" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200 font-medium text-sm">Add Idea</Link>
            <Link href="/my-ideas" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200 font-medium text-sm">My Ideas</Link>
            <Link href="/my-interactions" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200 font-medium text-sm">My Interactions</Link>
          </div>

          {/* Auth Buttons & Theme Toggle (Desktop Zone) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Login Hover Effect changed to Violet */}
            <Link href="/login" className="px-3 py-2 text-sm font-medium hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200">
              Login
            </Link>
            {/* Register Button Gradient updated to Violet -> Fuchsia mapping */}
            <Link href="/register" className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5">
              Register
            </Link>
          </div>

          {/* Mobile Right Zone (Toggle + Menu Button) */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Toggle Accent */}
            <ThemeToggle />

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 focus:outline-none transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        // BG optimized to zinc system: zinc-50 on light, zinc-900 on dark mode
        <div className="md:hidden bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 transition-colors duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-violet-600 dark:hover:text-violet-400">Home</Link>
            <Link href="/ideas" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-violet-600 dark:hover:text-violet-400">Ideas</Link>
            <Link href="/add-idea" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-violet-600 dark:hover:text-violet-400">Add Idea</Link>
            <Link href="/my-ideas" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-violet-600 dark:hover:text-violet-400">My Ideas</Link>
            <Link href="/my-interactions" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-violet-600 dark:hover:text-violet-400">My Interactions</Link>
          </div>
          <div className="pt-4 pb-4 border-t border-zinc-200 dark:border-zinc-800 px-5 flex flex-col space-y-2">
            <Link href="/login" onClick={() => setIsOpen(false)} className="w-full text-center py-2 text-base font-medium text-zinc-700 dark:text-zinc-300 hover:text-violet-600 dark:hover:text-violet-400">
              Login
            </Link>
            <Link href="/register" onClick={() => setIsOpen(false)} className="w-full text-center py-2.5 text-base font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl shadow">
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AppNavbar;