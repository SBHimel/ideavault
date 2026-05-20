"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { useEffect } from "react";
import { AlertTriangle, ArrowLeft, RotateCcw } from "lucide-react";

const ErrorPage = ({ error, reset }) => {
    useEffect(() => {
        console.error("🚨 Application Error:", error);
    }, [error]);

    return (
        <div className="relative min-h-screen overflow-hidden bg-white dark:bg-[#09090B] flex items-center justify-center px-6">

            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-violet-500/10 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-fuchsia-500/5 blur-3xl rounded-full pointer-events-none" />

            {/* Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,119,198,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,119,198,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />

            {/* Main Container */}
            <div className="relative z-10 w-full max-w-3xl">

                {/* Glass Card */}
                <div className="relative overflow-hidden rounded-[32px] border border-zinc-200/70 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_100px_rgba(0,0,0,0.45)]">

                    {/* Top Gradient Border */}
                    <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500" />

                    <div className="px-8 py-14 md:px-14 md:py-16">

                        {/* Icon */}
                        <div className="flex justify-center">
                            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 shadow-inner">
                                <AlertTriangle className="w-10 h-10 text-red-500" />
                            </div>
                        </div>

                        {/* Badge */}
                        <div className="mt-6 flex justify-center">
                            <span className="inline-flex items-center rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-100/70 dark:bg-zinc-800/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300">
                                System Error
                            </span>
                        </div>

                        {/* Heading */}
                        <div className="mt-8 text-center">
                            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
                                Something Went Wrong
                            </h1>

                            <p className="mt-5 max-w-xl mx-auto text-base md:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                                An unexpected error occurred while processing your request.
                                Please try refreshing the page or return to the homepage.
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-700 to-transparent" />

                        {/* Actions */}
                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

                            {/* Retry Button */}
                            <Button
                                onClick={() => reset()}
                                className="group w-full sm:w-auto rounded-2xl px-8 py-6 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 transition-all duration-300 shadow-lg shadow-violet-500/20 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <span className="flex items-center gap-2">
                                    <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                                    Try Again
                                </span>
                            </Button>

                            {/* Home Button */}
                            <Link href="/" className="w-full sm:w-auto">
                                <Button
                                    variant="bordered"
                                    className="group w-full sm:w-auto rounded-2xl px-8 py-6 text-sm font-semibold border-zinc-300 dark:border-zinc-700 bg-white/60 dark:bg-zinc-900/50 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <span className="flex items-center gap-2">
                                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                        Back to Home
                                    </span>
                                </Button>
                            </Link>

                        </div>

                        {/* Footer Text */}
                        <div className="mt-12 text-center">
                            <p className="text-xs tracking-wide text-zinc-400 dark:text-zinc-500">
                                ERROR • APPLICATION_EXCEPTION
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;