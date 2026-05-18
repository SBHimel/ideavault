import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    // Base: Light mode (bg-zinc-50, text-zinc-600, border-zinc-200)
    // dark: Dark mode (dark:bg-zinc-950, dark:text-zinc-400, dark:border-zinc-900)
    <footer className="bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 lg:px-8">
        
        {/* Main Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Column 1: Brand / Website Identity */}
          <div className="space-y-4">
            {/* Violet -> Fuchsia gradient based on the new theme */}
            <Link href="/" className="text-2xl font-bold tracking-wider bg-gradient-to-r from-violet-500 to-fuchsia-500 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
              IdeaHub
            </Link>
            <p className="text-sm text-zinc-500 dark:text-zinc-500 leading-relaxed">
              Where groundbreaking ideas meet action. Connect, collaborate, and fuel the next generation of startup innovation.
            </p>
          </div>

          {/* Column 2: Platform Links */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-800 dark:text-white tracking-wider uppercase mb-4">Platform</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/ideas" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200">Explore Ideas</Link>
              </li>
              <li>
                <Link href="/add-idea" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200">Add New Idea</Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200">Categories</Link>
              </li>
              <li>
                <Link href="/trending" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200">Trending Innovations</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-800 dark:text-white tracking-wider uppercase mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2.5">
                <svg className="w-4 h-4 text-violet-500 dark:text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="hover:text-zinc-900 dark:hover:text-white transition-colors">support@ideahub.com</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <svg className="w-4 h-4 text-violet-500 dark:text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="hover:text-zinc-900 dark:hover:text-white transition-colors">Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter / Quick Engage */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-zinc-800 dark:text-white tracking-wider uppercase">Stay Updated</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-500">Subscribe to get the latest startup updates directly.</p>
            <form className="flex space-x-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:border-violet-500 transition-colors"
              />
              <button className="px-4 py-2 text-sm bg-violet-600 hover:bg-violet-500 dark:bg-violet-600 dark:hover:bg-violet-500 text-white font-medium rounded-lg transition-colors shadow-lg shadow-violet-600/10">
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Divider Rule */}
        <hr className="my-10 border-zinc-200 dark:border-zinc-900" />

        {/* Bottom Section: Copyright & Social Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Copyright Text */}
          <p className="text-xs text-zinc-400 dark:text-zinc-600 text-center sm:text-left order-2 sm:order-1">
            &copy; {new Date().getFullYear()} IdeaHub Inc. All rights reserved. Built for future innovators.
          </p>

          {/* Social Links (SVG Icons for modern look) */}
          <div className="flex space-x-5 order-1 sm:order-2">
            
            {/* Twitter / X */}
            <a href="https://x.com/himel2nd" className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors duration-200">
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/sbhimel/" className="text-zinc-400 dark:text-zinc-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"/></svg>
            </a>

            {/* GitHub */}
            <a href="https://github.com/SBHimel" className="text-zinc-400 dark:text-zinc-500 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors duration-200">
              <span className="sr-only">GitHub</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>
            </a>

          </div>
          
        </div>

      </div>
    </footer>
  );
};

export default Footer;