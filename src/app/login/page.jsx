"use client";

import React, { useEffect, useState } from 'react';
import { authClient } from "@/lib/auth-client";
import { Check, ArrowRight, Eye, EyeSlash } from "@gravity-ui/icons";
import { Button, Form, Input, Label, TextField, FieldError } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation"; // 👈useSearchParams আবার অ্যাড করা হলো
import toast from "react-hot-toast";
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {

    useEffect(() => {
        document.title = "Login | Idea Vault";
    }, []);

    const router = useRouter();
    const searchParams = useSearchParams(); // 👈 ইউআরএল এর প্যারামস রিড করার জন্য

    // 🎯 ম্যাজিক লাইন: মিডলওয়্যার যে 'redirectTo' পাঠিয়েছে তা ধরবে। কিছু না থাকলে ডিফল্ট হোমে ('/') যাবে।
    const from = searchParams.get("redirectTo") || "/"; 

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        try {
            const { data, error } = await authClient.signIn.email({
                email: user.email,
                password: user.password,
            });

            if (data) {
                toast.success("Welcome back! Identity authorized 🚀", {
                    style: { background: '#09090b', color: '#fff', border: '1px solid #27272a' }
                });

                // ✅ সাকসেস হলে হোমে না গিয়ে, ইউজার যে পেজ থেকে এসেছে (from) সেখানে নিয়ে যাবে
                setTimeout(() => {
                    router.push(from);
                    router.refresh();
                }, 1200);
            }

            if (error) {
                toast.error(error.message || "Invalid credentials. Access denied.");
            }
        } catch (err) {
            toast.error("Network interface disconnected.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignin = async () => {
        await authClient.signIn.social({
            provider: "google",
            
            callbackURL: from, 
        });
    };

    const inputStyle = "w-full mt-1 px-3 py-2.5 text-sm bg-zinc-100/70 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-violet-500 dark:focus:border-violet-400 rounded-xl text-zinc-900 dark:text-zinc-100 outline-none transition-all placeholder-zinc-400 dark:placeholder-zinc-600 shadow-none";

    return (
        <div className="relative min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex items-center justify-center px-4 py-12 z-10 transition-colors duration-300">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-md w-full bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-xl dark:shadow-2xl backdrop-blur-md relative z-20">

                <div className="mb-6 text-center">
                    <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent mb-2 tracking-tight">
                        Account Login
                    </h1>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Enter your credentials to access your secure vault.
                    </p>
                </div>

                <Form onSubmit={onSubmit} className="flex flex-col gap-4 w-full">

                    <TextField isRequired name="email" type="email" className="w-full flex flex-col">
                        <Label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">Email Address *</Label>
                        <Input placeholder="john@example.com" className={inputStyle} />
                        <FieldError className="text-xs text-rose-500 mt-0.5" />
                    </TextField>

                    <TextField isRequired name="password" type={showPassword ? "text" : "password"} className="w-full flex flex-col">
                        <div className="flex justify-between items-center">
                            <Label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">Password *</Label>
                            <button type="button" className="text-[11px] font-medium text-violet-600 dark:text-violet-400 hover:underline transition-all">
                                Forgot Password?
                            </button>
                        </div>
                        <div className="relative w-full">
                            <Input placeholder="••••••••" className={`${inputStyle} pr-10`} />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors focus:outline-none flex items-center justify-center mt-0.5"
                            >
                                {showPassword ? <EyeSlash className="size-4" /> : <Eye className="size-4" />}
                            </button>
                        </div>
                        <FieldError className="text-xs text-rose-500 mt-0.5" />
                    </TextField>

                    <div className="flex items-center justify-center gap-4 my-2 w-full select-none">
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-zinc-200 dark:to-zinc-800" />
                        <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 tracking-wide lowercase first-letter:uppercase">
                            Or sign in with
                        </span>
                        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-zinc-200 dark:to-zinc-800" />
                    </div>

                    <div>
                        <Button type="button" onClick={handleGoogleSignin} variant='outline' className='rounded-xl w-full flex items-center justify-center gap-2'>
                            <FcGoogle /> Sign in with Google
                        </Button>
                    </div>

                    <div className="pt-2 w-full">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-11 inline-flex items-center justify-center text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 rounded-xl shadow-lg transition-all duration-300 active:scale-98 disabled:opacity-50"
                        >
                            {loading ? 'Authorizing...' : <><Check className="size-4 mr-1.5" /> Login</>}
                        </Button>
                    </div>

                    <p className="text-center text-xs text-zinc-500 mt-2">
                        New to the platform?{' '}
                        <Link href="/register" className="text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 hover:underline font-semibold transition-colors">
                            Create Account <ArrowRight className="size-3 inline ml-0.5" />
                        </Link>
                    </p>
                </Form>
            </div>
        </div>
    );
};

export default Login;