'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CommentSection = ({ ideaId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');

    // Active Dummy Authentication tracking model
    const currentUser = { name: "Current Innovator", email: "user@example.com" };

    
    // 1. FETCH COMMENTS FROM SEPARATE COLLECTION
   
    useEffect(() => {
        const fetchComments = async () => {
            const res = await fetch(`http://localhost:5000/comments/${ideaId}`);
            const data = await res.json();
            setComments(data);
        };
        fetchComments();
    }, [ideaId]);

    // ==========================================
    // ২. ADD NEW COMMENT DATA (POST REQUEST)
    // ==========================================
    const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const freshComment = {
        ideaId: ideaId,
        userName: currentUser.name,
        userEmail: currentUser.email,
        text: newComment,
        timestamp: new Date().toLocaleString()
    };

    try {
        const res = await fetch(`http://localhost:5000/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(freshComment)
        });

        const data = await res.json();
        if (data.insertedId) {
            const postedComment = { ...freshComment, _id: data.insertedId };
            setComments([postedComment, ...comments]);
            setNewComment('');
            
            // 🎉 সফল হওয়ার টোস্ট
            toast.success('Your comment has been posted!');
        }
    } catch (error) {
        // ❌ এরর হওয়ার টোস্ট
        toast.error('Failed to post comment. Try again!');
    }
};

    // ==========================================
    // ৩. SAVE MOUNTED COMMENT CHANGES (PATCH REQUEST)
    // ==========================================
    const handleSaveEdit = async (commentId) => {
    if (!editText.trim()) return;

    const updatedPayload = {
        text: editText,
        timestamp: "Edited at " + new Date().toLocaleTimeString()
    };

    try {
        const res = await fetch(`http://localhost:5000/comments/${commentId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedPayload)
        });

        const data = await res.json();
        if (data.modifiedCount > 0) {
            setComments(comments.map(c => c._id === commentId ? { ...c, text: editText, timestamp: updatedPayload.timestamp } : c));
            setEditingId(null);
            
            // 🎉 সফল হওয়ার টোস্ট
            toast.success('Comment updated successfully!');
        }
    } catch (error) {
        // ❌ এরর হওয়ার টোস্ট
        toast.error('Could not update comment.');
    }
};

    // ==========================================
    // ৪. EXECUTE COMMENT DELETION (DELETE REQUEST)
    // ==========================================
    const handleDelete = async (commentId) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    try {
        const res = await fetch(`http://localhost:5000/comments/${commentId}`, {
            method: 'DELETE'
        });

        const data = await res.json();
        if (data.deletedCount > 0) {
            setComments(comments.filter(c => c._id !== commentId));
            
            // 🎉 সফল হওয়ার টোস্ট
            toast.success('Comment deleted!');
        }
    } catch (error) {
        // ❌ এরর হওয়ার টোস্ট
        toast.error('Failed to delete comment.');
    }
};

    const startEdit = (comment) => {
        setEditingId(comment._id);
        setEditText(comment.text);
    };

    return (
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-900">
            <h3 className="font-heading text-xl font-bold mb-6 flex items-center text-zinc-900 dark:text-zinc-200">
                💬 Discussion Forum ({comments.length})
            </h3>

            {/* Input Form Setup */}
            <form onSubmit={handleAddComment} className="mb-8">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-4 shadow-sm focus-within:ring-2 focus-within:ring-violet-500/20 focus-within:border-violet-500 transition-all">
                    <textarea
                        rows="3"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add your technical perspective or query..."
                        className="w-full bg-transparent border-0 outline-none resize-none text-sm text-zinc-800 dark:text-zinc-200 placeholder-zinc-400"
                    />
                    <div className="flex justify-between items-center pt-3 border-t border-zinc-100 dark:border-zinc-800/60">
                        <span className="text-xs text-zinc-400">Posting as: <strong className="text-zinc-600 dark:text-zinc-300">{currentUser.name}</strong></span>
                        <button type="submit" className="px-4 py-2 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-xl transition-colors shadow">
                            Share Concept
                        </button>
                    </div>
                </div>
            </form>

            {/* Comments List Grid Iteration */}
            <div className="space-y-4">
                {comments.map((comment) => {
                    const isOwnComment = comment.userEmail === currentUser.email;

                    return (
                        <div key={comment._id} className="bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/60 rounded-2xl p-5 shadow-sm">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold uppercase text-zinc-600 dark:text-zinc-300">
                                        {comment.userName ? comment.userName[0] : "U"}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{comment.userName}</h4>
                                        <p className="text-[10px] text-zinc-400 font-medium">{comment.timestamp}</p>
                                    </div>
                                </div>

                                {isOwnComment && editingId !== comment._id && (
                                    <div className="flex items-center space-x-2 text-xs font-semibold">
                                        <button onClick={() => startEdit(comment)} className="text-zinc-400 hover:text-violet-500 transition-colors">Edit</button>
                                        <span className="text-zinc-300 dark:text-zinc-700">|</span>
                                        <button onClick={() => handleDelete(comment._id)} className="text-zinc-400 hover:text-rose-500 transition-colors">Delete</button>
                                    </div>
                                )}
                            </div>

                            {editingId === comment._id ? (
                                <div className="space-y-3 mt-2">
                                    <textarea
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-sm text-zinc-800 dark:text-zinc-200 outline-none focus:border-violet-500"
                                        rows="2"
                                    />
                                    <div className="flex justify-end space-x-2 text-xs font-bold">
                                        <button onClick={() => setEditingId(null)} className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">Cancel</button>
                                        <button onClick={() => handleSaveEdit(comment._id)} className="px-3 py-1.5 rounded-lg bg-violet-600 text-white">Save Changes</button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pl-1">
                                    {comment.text}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CommentSection;