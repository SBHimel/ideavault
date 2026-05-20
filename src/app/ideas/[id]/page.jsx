
import React from 'react';
import Link from 'next/link';
import CommentSection from '@/components/CommentSection'; 
import { Button } from '@heroui/react';
import { SquarePen } from 'lucide-react';
import { UpdateIdeaModal } from '@/components/UpdateIdeaModal';
import { DeleteAlert } from '@/components/DeleteAlert';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const IdeaDetailsPage = async ({ params }) => {
    const { id } = await params;

    const {token} = await auth.api.getToken({
        headers: await headers()
    })

    console.log(token);

    // Fetching particular idea data dynamically
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/idea/${id}`, { 
        cache: 'no-store',
        headers: {
            'authorization': `Bearer ${token}` 
        }
    });
    const idea = await res.json();

    // Safely destructuring data fields with fallbacks
    const {
        title,
        category,
        shortDesc,
        detailedDesc,
        problemStatement,
        proposedSolution,
        targetAudience,
        budget,
        imageUrl,
        tags,
        author
    } = idea;

    return (
        <section className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-5xl mx-auto">



              
<div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6'>
  
  {/* Back Button Layout */}
  <div className="flex items-center">
    <Link
      href="/ideas"
      className="inline-flex items-center text-sm font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 group"
    >
      <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Back to Exploration
    </Link>
  </div>


  <div className="flex items-center justify-start md:justify-end space-x-3">
    <UpdateIdeaModal idea={idea} />
    <DeleteAlert idea={idea} />
  </div>

</div>

                {/* Hero / Header Panel */}
                <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60 p-6 md:p-10 mb-10 shadow-sm">
                    {imageUrl && (
                        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 pointer-events-none">
                            <img src={imageUrl} alt="" className="w-full h-full object-cover blur-md" />
                        </div>
                    )}

                    <div className="relative z-10 space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="px-3 py-1 text-xs font-bold tracking-wider text-violet-600 dark:text-violet-400 bg-violet-500/10 border border-violet-500/20 rounded-md uppercase">
                                {category || "Startup Concept"}
                            </span>
                            {budget && (
                                <span className="px-3 py-1 text-xs font-semibold text-fuchsia-600 dark:text-fuchsia-400 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-md">
                                    Est. Budget: {budget}
                                </span>
                            )}
                        </div>

                        <h1 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-4xl text-zinc-900 dark:text-white">
                            {title}
                        </h1>

                        <p className="text-lg md:text-xl font-medium text-zinc-500 dark:text-zinc-400 max-w-3xl leading-relaxed">
                            {shortDesc}
                        </p>

                        <div className="flex items-center space-x-3 pt-4 border-t border-zinc-200 dark:border-zinc-800/60 max-w-xs">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 via-indigo-500 to-fuchsia-600 flex items-center justify-center text-sm font-bold text-white uppercase shadow-inner">
                                {author ? author[0] : "I"}
                            </div>
                            <div>
                                <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium uppercase tracking-wider">Pitched by</p>
                                <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">{author || "Anonymous Innovator"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Blueprint Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Left Column: Deep Core Content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Problem & Solution Split Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-rose-50/40 dark:bg-rose-950/10 border border-rose-100 dark:border-rose-950/30 rounded-2xl p-6">
                                <h3 className="text-base font-bold text-rose-600 dark:text-rose-400 flex items-center mb-3">
                                    <span className="mr-2">⚠️</span> The Problem Statement
                                </h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">
                                    {problemStatement}
                                </p>
                            </div>

                            <div className="bg-emerald-50/40 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-950/30 rounded-2xl p-6">
                                <h3 className="text-base font-bold text-emerald-600 dark:text-emerald-400 flex items-center mb-3">
                                    <span className="mr-2">✨</span> Proposed Solution
                                </h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">
                                    {proposedSolution}
                                </p>
                            </div>
                        </div>

                        {/* Detailed Description Panel */}
                        <div className="space-y-4">
                            <h2 className="font-heading text-xl md:text-2xl font-bold border-b border-zinc-200 dark:border-zinc-900 pb-2 text-zinc-900 dark:text-zinc-200">
                                Concept Architecture & Implementation
                            </h2>
                            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">
                                {detailedDesc}
                            </p>
                        </div>


                        <CommentSection ideaId={id} />



                    </div>

                    {/* Right Column: Sidebar / Meta Parameters */}
                    <div className="space-y-6">
                        {imageUrl && (
                            <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900 p-2">
                                <img src={imageUrl} alt={title} className="w-full h-auto object-cover rounded-xl" />
                            </div>
                        )}

                        <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 space-y-4">
                            <div>
                                <h4 className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500 tracking-wider mb-1">Target Audience</h4>
                                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                                    {targetAudience || "Global Consumer Market"}
                                </p>
                            </div>

                            {tags && (
                                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800/60">
                                    <h4 className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500 tracking-wider mb-2">Metadata Tags</h4>
                                    <div className="flex flex-wrap gap-1.5">
                                        {tags.split(',').map((tag, idx) => (
                                            <span key={idx} className="text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-md font-medium border border-zinc-200 dark:border-zinc-900">
                                                #{tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/60 rounded-2xl p-6 text-center space-y-4">
                            <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Interested in this project?</h4>
                            <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed">Connect with the founder to collaborate, invest, or offer core mentorship guidelines.</p>
                            <button className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 transition-all shadow-md active:scale-[0.98]">
                                Request Collaboration
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default IdeaDetailsPage;