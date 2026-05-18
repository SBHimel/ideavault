import React from 'react';

const Features = () => {
  const features = [
    {
      id: 1,
      icon: "💡",
      title: "Share Concepts",
      desc: "Drop your raw, disruptive ideas and get early-stage validation from tech enthusiasts."
    },
    {
      id: 2,
      icon: "🤝",
      title: "Find Co-founders",
      desc: "Connect with developers, designers, and marketers who share your vision and drive."
    },
    {
      id: 3,
      icon: "🚀",
      title: "Get Incubated",
      desc: "Present your polished ideas to angel investors and start-up mentors worldwide."
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Innovators" },
    { number: "4.5K+", label: "Ideas Shared" },
    { number: "1.2M+", label: "Total Interactions" }
  ];

  return (
    // Base: Light mode (bg-zinc-50, text-zinc-900)
    // dark: Dark mode (dark:bg-zinc-950, dark:text-white)
    <section className="bg-zinc-50 dark:bg-zinc-950 py-16 md:py-24 border-t border-zinc-200 dark:border-zinc-900 text-zinc-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Text */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-sm font-semibold tracking-widest text-violet-600 dark:text-violet-400 uppercase">
            Why IdeaHub?
          </h2>
          {/* Gradient text: Light mode e slate-800 optimization, dark mode e white metallic look */}
          <p className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
            Built for the Architects of Tomorrow
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feat) => (
            <div 
              key={feat.id} 
              // Card component background and border behavior changed
              className="bg-white dark:bg-zinc-900/40 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 hover:border-violet-500/30 transition-all duration-300 transform hover:-translate-y-2 group shadow-sm dark:shadow-none"
            >
              {/* Icon Container code */}
              <div className="text-4xl mb-4 bg-zinc-100 dark:bg-zinc-800 w-14 h-14 flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-inner">
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-zinc-800 dark:text-zinc-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                {feat.title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Sub-section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-zinc-100 dark:bg-gradient-to-r dark:from-violet-950/20 dark:via-zinc-900/60 dark:to-indigo-950/20 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 p-8 text-center backdrop-blur-sm shadow-md dark:shadow-xl">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-1">
              <p className="text-4xl md:text-5xl font-black bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                {stat.number}
              </p>
              <p className="text-xs font-medium tracking-wider text-zinc-500 dark:text-zinc-500 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;