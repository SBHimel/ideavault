"use client";

import React, { useState } from 'react';
import { authClient } from "@/lib/auth-client";
import { Check, ArrowRight, Eye, EyeSlash } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, Separator, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
    const router = useRouter();
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
            const { data, error } = await authClient.signUp.email({
                email: user.email,
                password: user.password,
                name: user.name,
                image: user.image || ""
            });

            if (data) {
                toast.success("Account initiated successfully! Welcome aboard 🚀", {
                    style: { background: '#09090b', color: '#fff', border: '1px solid #27272a' }
                });

                setTimeout(() => {
                    router.push('/');
                    router.refresh();
                }, 1200);
            }

            if (error) {
                toast.error(error.message || "Authentication layer error.");
            }
        } catch (err) {
            toast.error("Network interface disconnected.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignin = async()=>{
        await authClient.signIn.social({
            provider: "google",
        });
    };


    // 💡 HeroUI inputs এর জন্য নিখুঁত Light এবং Dark থিম গাইডলাইন
    const inputClassNames = {
        label: "text-zinc-600 dark:text-zinc-300 text-xs font-semibold mb-1",
        inputWrapper: [
            "bg-zinc-100/70 dark:bg-zinc-950",
            "border",
            "border-zinc-200 dark:border-zinc-800",
            "hover:border-zinc-300 dark:hover:border-zinc-700",
            "focus-within:!border-violet-500",
            "rounded-xl",
            "transition-colors",
            "shadow-none",
            "data-[hover=true]:bg-zinc-100/90",
            "data-[hover=true]:dark:bg-zinc-950",
            "group-data-[focus=true]:bg-zinc-100",
            "group-data-[focus=true]:dark:bg-zinc-950"
        ],
        input: [
            "text-zinc-900 dark:text-zinc-100",
            "placeholder:text-zinc-400 dark:placeholder:text-zinc-600",
            "text-sm"
        ]
    };

    return (

        <div className="relative min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex items-center justify-center px-4 py-12 z-10 transition-colors duration-300">


            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />


            <div className="max-w-md w-full bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-xl dark:shadow-2xl backdrop-blur-md relative z-20 transition-all">


                <div className="mb-6 text-center">
                    <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent mb-2 tracking-tight">
                        Create Account
                    </h1>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Join the global hub of tech innovators and pitch your blueprints.
                    </p>
                </div>

                {/* Main Form */}
                <Form onSubmit={onSubmit} className="flex flex-col gap-4 w-full">

                    {/* Name Field */}
                    {/* Name Field */}
                    <TextField isRequired name="name" type="text" className="w-full flex flex-col">
                        <Label className={inputClassNames.label}>Full Name *</Label>
                        <Input
                            placeholder="e.g., John Doe"
                            className="w-full mt-1 px-3 py-2.5 text-sm bg-zinc-100/70 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-violet-500 dark:focus:border-violet-400 rounded-xl text-zinc-900 dark:text-zinc-100 outline-none transition-all placeholder-zinc-400 dark:placeholder-zinc-600 shadow-none"
                        />
                        <FieldError className="text-xs text-rose-500 mt-0.5" />
                    </TextField>


                    {/* Photo URL Field */}
                    <TextField name="image" type="url" className="w-full flex flex-col">
                        <Label className={inputClassNames.label}>Photo URL</Label>
                        <Input
                            placeholder="https://example.com/avatar.jpg"
                            className="w-full mt-1 px-3 py-2.5 text-sm bg-zinc-100/70 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-violet-500 dark:focus:border-violet-400 rounded-xl text-zinc-900 dark:text-zinc-100 outline-none transition-all placeholder-zinc-400 dark:placeholder-zinc-600 shadow-none"
                        />
                        <FieldError className="text-xs text-rose-500 mt-0.5" />
                    </TextField>

                    {/* Email Field */}
                    {/* Email Field */}
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        className="w-full flex flex-col"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label className={inputClassNames.label}>Email Address *</Label>
                        <Input
                            placeholder="john@example.com"
                            className="w-full mt-1 px-3 py-2.5 text-sm bg-zinc-100/70 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-violet-500 dark:focus:border-violet-400 rounded-xl text-zinc-900 dark:text-zinc-100 outline-none transition-all placeholder-zinc-400 dark:placeholder-zinc-600 shadow-none"
                        />
                        <FieldError className="text-xs text-rose-500 mt-0.5" />
                    </TextField>

                    {/* Password Field */}
                    <TextField
                        isRequired
                        name="password"
                        type="text"
                        className="w-full flex flex-col"
                        validate={(value) => {
                            if (value.length < 6) {
                                return "Password must be at least 6 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Must contain at least one uppercase letter";
                            }
                            if (!/[a-z]/.test(value)) {
                                return "Must contain at least one lowercase letter";
                            }
                            return null;
                        }}
                    >
                        <Label className={inputClassNames.label}>Password *</Label>
                        <div className="relative w-full">
                            <Input
                                placeholder="••••••••"
                                className="w-full mt-1 px-3 py-2.5 pr-10 text-sm bg-zinc-100/70 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-violet-500 dark:focus:border-violet-400 rounded-xl text-zinc-900 dark:text-zinc-100 outline-none transition-all placeholder-zinc-400 dark:placeholder-zinc-600 shadow-none"
                                type={showPassword ? "text" : "password"}
                            />
                            
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors focus:outline-none flex items-center justify-center mt-0.5"
                            >
                                {showPassword ? (
                                    <EyeSlash className="size-4" />
                                ) : (
                                    <Eye className="size-4" />
                                )}
                            </button>
                        </div>
                        <Description className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1 block leading-normal"></Description>
                        <Description className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1 block leading-normal">
                            Min 6 characters with at least 1 uppercase & 1 lowercase letter.
                        </Description>
                        <FieldError className="text-xs text-rose-500 mt-0.5" />
                    </TextField>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-3 w-full">
                        <Button
                            type="submit"
                            disabled={loading}
                           className="flex-1 h-11 inline-flex items-center justify-center text-xl md:text-sm tracking-wide md:tracking-normal font-bold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 rounded-xl shadow-lg shadow-violet-500/10 transition-all duration-300 active:scale-98 disabled:opacity-50"
                        >
                            {loading ? 'Syncing...' : <> <span className="h-11 flex items-center justify-center text-center font-semibold text-zinc-900 dark:text-zinc-100 mx-auto">
   <Check className="size-6 mr-1.5" /> Create Account
</span></>}
                        </Button>
                        <Button
                            type="reset"
                            className="h-11 px-5 text-sm font-bold rounded-xl bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
                        >
                            Reset
                        </Button>
                    </div>

                    <div className="flex items-center justify-center gap-4 my-2 w-full select-none">
                        {/* বাঁদিকের দাগ */}
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-zinc-200 dark:to-zinc-800" />

                        {/* মাঝখানের টেক্সট */}
                        <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 tracking-wide lowercase first-letter:uppercase">
                            Or sign up with
                        </span>

                        {/* ডানদিকের দাগ */}
                        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-zinc-200 dark:to-zinc-800" />
                    </div>

                    <div className=''>
                        <Button onClick={handleGoogleSignin}  variant='outline' className={'rounded-xl w-full '}><FcGoogle></FcGoogle> Sign in with Google</Button>
                    </div>

                    {/* Switch to Login Link */}
                    <p className="text-center text-xs text-zinc-500 mt-2">
                        Already have an identity?{' '}
                        <Link href="/login" className="text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 hover:underline font-semibold transition-colors">
                            Log In <ArrowRight className="size-3 inline ml-0.5" />
                        </Link>
                    </p>
                </Form>

            </div>
        </div>
    )
};

export default Register;