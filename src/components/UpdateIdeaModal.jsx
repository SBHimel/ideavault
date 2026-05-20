"use client";

import React, { useState } from "react";
import { Button, Input, Label, Modal, Surface, TextField, TextArea } from "@heroui/react";
import { SquarePen, Lightbulb, Settings, DollarSign, Users, Tag } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export function UpdateIdeaModal({ idea }) {
    const {
        _id,
        title,
        category,
        shortDesc,
        detailedDesc,
        problemStatement,
        proposedSolution,
        targetAudience,
        budget,
        imageUrl,
        tags
    } = idea;

    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const updatedIdea = Object.fromEntries(formData.entries());

        try {

            const { data: tokenData } = await authClient.token()
            console.log(tokenData);

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/idea/${_id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${tokenData?.token}`
                },
                body: JSON.stringify(updatedIdea)
            });

            const data = await res.json();

            console.log(data);

            if (data.modifiedCount > 0 || data.matchedCount > 0) {
                toast.success('Concept parameters updated successfully! 🚀');

                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                toast.error('No architectural modifications were detected.');
            }
        } catch (error) {
            toast.error('Failed to patch system data.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal>
            {/* মেইন প্রিমিয়াম এডিট বাটন */}
            <Button
                variant='outline'
                className="rounded-xl border-zinc-200 dark:border-zinc-800 font-bold text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all shadow-sm active:scale-95 text-zinc-700 dark:text-zinc-300"
            >
                <SquarePen className="size-4 text-violet-500 mr-1" /> Update Concept
            </Button>

            <Modal.Backdrop className="bg-black/60 backdrop-blur-md">
                <Modal.Container placement="center">
                    {/* মডালের উইন্ডো বড় করা হয়েছে সুন্দর লেআউটের জন্য */}
                    <Modal.Dialog className="sm:max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-3xl overflow-hidden shadow-2xl">
                        <Modal.CloseTrigger className="top-4 right-4" />

                        <Modal.Header className="border-b border-zinc-100 dark:border-zinc-800/60 pb-4 px-6 pt-6">
                            <Modal.Icon className="bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 p-2 rounded-xl">
                                <Lightbulb className="size-5" />
                            </Modal.Icon>
                            <div className="flex flex-col">
                                <Modal.Heading className="text-xl font-extrabold text-zinc-900 dark:text-white">Refine Innovation Blueprint</Modal.Heading>
                                <p className="text-xs text-zinc-400 font-medium">Update technical scope, resource allocation, and strategy parameters</p>
                            </div>
                        </Modal.Header>

                        <Modal.Body className="p-6 max-h-[70vh] overflow-y-auto">
                            <Surface variant="default" className="bg-transparent p-0 border-none shadow-none">
                                {/* ✅ ফর্মের সাথে id যুক্ত করা হলো */}
                                <form id="update-form" onSubmit={onSubmit} className="flex flex-col gap-5">

                                    {/* Row 1: Title & Category */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <TextField defaultValue={title} className="w-full" name="title" type="text" required>
                                            <Label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Project Title</Label>
                                            <Input placeholder="E.g. Decentralized Cloud Layer" className="mt-1" />
                                        </TextField>
                                        <TextField defaultValue={category} className="w-full" name="category" type="text">
                                            <Label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Core Category</Label>
                                            <Input placeholder="E.g. SaaS / Web3" className="mt-1" />
                                        </TextField>
                                    </div>

                                    {/* Row 2: Elevator Pitch */}
                                    <TextField defaultValue={shortDesc} className="w-full" name="shortDesc" type="text" required>
                                        <Label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Elevator Pitch (Short Desc)</Label>
                                        <Input placeholder="A brief one-line summary of your project..." className="mt-1" />
                                    </TextField>

                                    {/* Row 3: Budget & Audience */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <TextField defaultValue={budget} className="w-full" name="budget" type="text">
                                            <Label className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1"><DollarSign className="size-3 text-fuchsia-500" /> Est. Budget</Label>
                                            <Input placeholder="E.g. $15,000" className="mt-1" />
                                        </TextField>
                                        <TextField defaultValue={targetAudience} className="w-full" name="targetAudience" type="text">
                                            <Label className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1"><Users className="size-3 text-blue-500" /> Target Market</Label>
                                            <Input placeholder="E.g. Enterprise DevOps Teams" className="mt-1" />
                                        </TextField>
                                    </div>

                                    {/* Row 4: Problem & Solution Details */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1">
                                            <Label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Problem Statement</Label>
                                            <TextArea defaultValue={problemStatement} name="problemStatement" placeholder="Describe the friction or market gap..." rows={3} className="w-full mt-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-sm outline-none focus:border-violet-500 text-zinc-800 dark:text-zinc-200 resize-none" />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <Label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Proposed Solution</Label>
                                            <TextArea defaultValue={proposedSolution} name="proposedSolution" placeholder="How does your tech stack fix it..." rows={3} className="w-full mt-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-sm outline-none focus:border-violet-500 text-zinc-800 dark:text-zinc-200 resize-none" />
                                        </div>
                                    </div>

                                    {/* Row 5: Deep Core Description */}
                                    <div className="flex flex-col gap-1">
                                        <Label className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1"><Settings className="size-3 text-violet-500" /> Architecture & Implementation</Label>
                                        <TextArea defaultValue={detailedDesc} name="detailedDesc" placeholder="Deep dive into specs, timelines, features..." rows={4} required className="w-full mt-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-sm outline-none focus:border-violet-500 text-zinc-800 dark:text-zinc-200" />
                                    </div>

                                    {/* Row 6: Image URL & Tags */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <TextField defaultValue={imageUrl} className="w-full" name="imageUrl" type="text">
                                            <Label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Cover Image Link</Label>
                                            <Input placeholder="https://example.com/cover.png" className="mt-1" />
                                        </TextField>
                                        <TextField defaultValue={tags} className="w-full" name="tags" type="text">
                                            <Label className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1"><Tag className="size-3 text-emerald-500" /> Meta Tags (Comma separated)</Label>
                                            <Input placeholder="ai, devops, infrastructure" className="mt-1" />
                                        </TextField>
                                    </div>

                                </form>
                            </Surface>
                        </Modal.Body>

                        <Modal.Footer className="border-t border-zinc-100 dark:border-zinc-800/60 p-4 bg-zinc-50/50 dark:bg-zinc-900/30 flex justify-end gap-2 text-xs font-bold">
                            <Button slot="close" variant="secondary" className="px-5 py-2.5 rounded-xl text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200">
                                Abort
                            </Button>
                            {/* ✅ form attribute দিয়ে বাইরের বাটনের সাথে ফর্ম যুক্ত করা হলো */}
                            <Button
                                type="submit"
                                form="update-form"
                                disabled={loading}
                                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-md shadow-violet-500/10 transition-all disabled:opacity-50"
                            >
                                {loading ? 'Commiting Changes...' : 'Push Blueprint Update'}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}