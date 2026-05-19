"use client";

import React, { useState } from "react";
import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button, Modal } from "@heroui/react";
import { useRouter } from "next/navigation"; // ✅ redirect-এর বদলে useRouter
import toast from "react-hot-toast";

export function DeleteAlert({ idea }) {
    const { _id, title } = idea;
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/idea/${_id}`, {
                method: "DELETE",
                headers: {
                    'content-type': 'application/json'
                }
            });
            
            const data = await res.json();
            
            if (data.deletedCount > 0) {
                toast.success('Concept permanently purged from database! 🗑️');
                
               
                setTimeout(() => {
                    router.push('/ideas');
                    router.refresh(); 
                }, 1200);
            } else {
                toast.error('Could not find the target resource.');
            }
        } catch (error) {
            toast.error('Network execution failure while deleting.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <AlertDialog>
           
            <Button 
                variant="danger" 
                className="rounded-xl font-bold text-xs bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 hover:bg-rose-600 hover:text-white transition-all shadow-sm active:scale-95"
            > 
                <TrashBin className="size-4 mr-1" /> Delete Concept
            </Button>
            
            <Modal.Backdrop className="bg-black/60 backdrop-blur-md"> 
                <AlertDialog.Container placement="center">
                    <AlertDialog.Dialog className="sm:max-w-[440px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 shadow-2xl">
                        <AlertDialog.CloseTrigger className="top-4 right-4" />
                        
                        <AlertDialog.Header className="flex items-center gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800/60">
                            <AlertDialog.Icon status="danger" className="p-2 rounded-xl bg-rose-500/10 text-rose-600" />
                            <div className="flex flex-col">
                                <AlertDialog.Heading className="text-lg font-extrabold text-zinc-900 dark:text-white">Destructive Action Required</AlertDialog.Heading>
                                <p className="text-xs text-zinc-400 font-medium">This process cannot be reversed or recovered</p>
                            </div>
                        </AlertDialog.Header>
                        
                        <AlertDialog.Body className="py-4">
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Are you absolutely sure you want to permanently purge <strong className="text-zinc-900 dark:text-white font-bold">“{title}”</strong> and all associated parameters from the core system layer?
                            </p>
                        </AlertDialog.Body>
                        
                        <AlertDialog.Footer className="pt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex justify-end gap-2 text-xs font-bold">
                            <Button 
                                slot="close" 
                                variant="tertiary" 
                                className="px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200"
                            >
                                Cancel
                            </Button>
                            <Button 
                                onClick={handleDelete} 
                                disabled={loading}
                                slot="close" 
                                variant="danger"
                                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-500/10 active:scale-98 transition-all disabled:opacity-50"
                            >
                                {loading ? 'Purging Concept...' : 'Confirm Destruction'}
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </Modal.Backdrop>
        </AlertDialog>
    );
}