'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Banner = () => {
  // Public folder er image shoho updated slides data
  const slides = [
    {
      id: 1,
      image: "/assets/slides1.jpg", 
      title: "Empower Your Startup Journey",
      subtitle: "Turn your disruptive ideas into scalable businesses. Connect with innovators, mentors, and investors worldwide.",
      tag: "INNOVATION",
      overlayClass: "bg-gradient-to-r from-slate-950/70 via-indigo-950/60 to-slate-950/70" // Adjusted opacity for clarity
    },
    {
      id: 2,
      image: "/assets/slides2.jpg",
      title: "Where Groundbreaking Ideas Meet Action",
      subtitle: "Stop waiting for the perfect moment. Share your tech, sustainability, or business innovations and find your dream co-founders.",
      tag: "COLLABORATION",
      overlayClass: "bg-gradient-to-r from-slate-950/70 via-emerald-950/60 to-slate-950/70" // Adjusted opacity for clarity
    },
    {
      id: 3,
      image: "/assets/slides3.jpg",
      title: "Fueling the Next Generation of Unicorns",
      subtitle: "Discover next-gen tech concepts, vote on brilliant innovations, and be part of the global startup revolution.",
      tag: "FUTURE TECH",
      overlayClass: "bg-gradient-to-r from-slate-950/70 via-purple-950/60 to-slate-950/70" // Adjusted opacity for clarity
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play (5 Seconds)
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[500px] md:h-[650px] overflow-hidden bg-slate-950 text-white">
      
      {/* Slides Wrapper */}
      <div 
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-full h-full flex-shrink-0 flex items-center justify-center px-6 md:px-16 relative bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }} // Dynamic background image
          >
            {/* Gradient Overlay without Backdrop Blur: Chobi clear dekhar jonno backdrop-blur bad deya hoyeche */}
            <div className={`absolute inset-0 ${slide.overlayClass}`} />

            {/* Content Container (z-10 use kora hoyeche overlay er upore anar jonno) */}
            <div className="relative z-10 max-w-4xl text-center space-y-6">
              {/* Badge/Tag */}
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full uppercase">
                {slide.tag}
              </span>

              {/* Title */}
              <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                {slide.title}
              </h1>

              {/* Description */}
              <p className="text-sm md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
                {slide.subtitle}
              </p>

              {/* CTA Button */}
              <div className="pt-4">
                <Link 
                  href="/ideas" 
                  className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-slate-950 bg-gradient-to-r from-blue-400 to-emerald-400 hover:from-blue-500 hover:to-emerald-500 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Explore Ideas
                  <svg className="w-5 h-5 ml-2 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-md border border-white/10 transition-colors z-20 group hidden md:block"
      >
        <svg className="w-6 h-6 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-md border border-white/10 transition-colors z-20 group hidden md:block"
      >
        <svg className="w-6 h-6 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators / Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'w-8 bg-blue-400' : 'w-2.5 bg-gray-600 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;