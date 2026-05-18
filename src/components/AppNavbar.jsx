'use client'; // Next.js App Router-e state use korar jonno eta dorkar

import React, { useState } from 'react';
import Link from 'next/link'; // Next.js er nijosso Link component

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Website Name */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold tracking-wider bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              IdeaVault
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="hover:text-blue-400 transition-colors duration-200 font-medium">Home</Link>

            <Link href="/ideas" className="hover:text-blue-400 transition-colors duration-200 font-medium">Ideas</Link>

            <Link href="/add-idea" className="hover:text-blue-400 transition-colors duration-200 font-medium">Add Idea</Link>

            <Link href="/my-ideas" className="hover:text-blue-400 transition-colors duration-200 font-medium">My Ideas</Link>

            <Link href="/my-interactions" className="hover:text-blue-400 transition-colors duration-200 font-medium">My Interactions</Link>
            
          </div>

          {/* Auth Buttons (Login & Register) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="px-4 py-2 text-sm font-medium hover:text-blue-400 transition-colors duration-200">
              Login
            </Link>
            <Link href="/register" className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5">
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-800 focus:outline-none"
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
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 hover:text-blue-400">Home</Link>
            <Link href="/ideas" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 hover:text-blue-400">Ideas</Link>
            <Link href="/add-idea" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 hover:text-blue-400">Add Idea</Link>
            <Link href="/my-ideas" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 hover:text-blue-400">My Ideas</Link>
            <Link href="/my-interactions" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 hover:text-blue-400">My Interactions</Link>
          </div>
          <div className="pt-4 pb-4 border-t border-slate-700 px-5 flex flex-col space-y-2">
            <Link href="/login" onClick={() => setIsOpen(false)} className="w-full text-center py-2 text-base font-medium hover:text-blue-400">
              Login
            </Link>
            <Link href="/register" onClick={() => setIsOpen(false)} className="w-full text-center py-2 text-base font-medium bg-blue-600 hover:bg-blue-700 rounded-xl shadow">
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AppNavbar;