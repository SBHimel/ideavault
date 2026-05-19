'use client';

import React from 'react';
import { Lightbulb, Users, Award, ShieldCheck } from 'lucide-react';

const StatsSection = () => {
  // ডামি পরিসংখ্যান ডাটা (প্রজেক্টকে রিয়ালিস্টিক লুক দেওয়ার জন্য)
  const stats = [
    {
      id: 1,
      icon: <Lightbulb className="size-6 text-blue-500 dark:text-blue-400" />,
      number: "1,240+",
      label: "Innovations Pitched",
      desc: "Global production-ready concepts blueprints shared."
    },
    {
      id: 2,
      icon: <Users className="size-6 text-indigo-500 dark:text-indigo-400" />,
      number: "850+",
      label: "Active Visionaries",
      desc: "Engineers, founders, and creators collaborating daily."
    },
    {
      id: 3,
      icon: <Award className="size-6 text-emerald-500 dark:text-emerald-400" />,
      number: "$2.4M+",
      label: "Simulated Funding",
      desc: "Estimated infrastructure and development resource pools."
    },
    {
      id: 4,
      icon: <ShieldCheck className="size-6 text-fuchsia-500 dark:text-fuchsia-400" />,
      number: "99.8%",
      label: "Architecture Integrity",
      desc: "Concepts successfully vetted through technical metrics."
    }
  ];

  return (
    <section className="bg-zinc-50 dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8 text-zinc-900 dark:text-zinc-100 border-t border-b border-zinc-200 dark:border-zinc-900/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className="bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/60 p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50 flex flex-col items-center text-center group shadow-sm dark:shadow-none"
            >
              {/* Icon Container */}
              <div className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              
              {/* Number/Metric */}
              <h3 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-1">
                {stat.number}
              </h3>
              
              {/* Label */}
              <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-300 mb-2">
                {stat.label}
              </p>
              
              {/* Small Description */}
              <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed max-w-[240px]">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StatsSection;