'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Component client-e mount na hawa porjonto button render korbo na (Hydration error bondho korar jonno)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Button load hobar agei ekti khali small structure thakbe jate layout transform na hoy
    return <div className="w-9 h-9 bg-slate-100 dark:bg-slate-900 rounded-xl animate-pulse" />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-300 group text-slate-700 dark:text-slate-300 shadow-sm"
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 group-hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-600 transition-transform duration-300 group-hover:-rotate-12" />
      )}
    </button>
  );
};

export default ThemeToggle;