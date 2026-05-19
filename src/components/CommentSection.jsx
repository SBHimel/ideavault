'use client';

import React, { useState, useEffect } from 'react';

const CommentSection = ({ ideaId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');

    // Mock Active User Data (Tomar auth mechanism built hole oikhan theke ashbe)
    const currentUser = { name: "Current Innovator", email: "user@example.com" };

    // 1. Fetch Comments
    useEffect(() => {
        // Tumi backend endpoint ready korle ekhane fetch call bosiye nio
        // fetch(`http://localhost:5000/comments/${ideaId}`).then(...)
        
        // Example initial structured state mapping dummy arrays
        setComments([
            {
                _id: "c1",
                userName: "Anika Rahman",
                text: "This architecture scales beautifully. Have you considered decentralized file access speeds?",
                timestamp: "2 hours ago",
                userEmail: "anika@example.com"
            },
            {
                _id: "c2",
                userName: "Zayan Ahmed",
                text: "Budget optimization is crisp, but node data redundancy limits might require cloud checks.",
                timestamp: "Just now",
                userEmail: "user@example.com" // Matches currentUser for demonstration
            }
        ]);
    }, [ideaId]);

    // 2. Add Comment Action
    const handleAddComment = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const freshComment = {
            _id: Math.random().toString(36).substr(2, 9), // Temporary unique unique key mapping
            userName: currentUser.name,
            text: newComment,
            timestamp: "Just now",
            userEmail: currentUser.email
        };

        setComments([freshComment, ...comments]);
        setNewComment('');
    };

    // 3. Trigger Edit Mode Selection
    const startEdit = (comment) => {
        setEditingId(comment._id);
        setEditText(comment.text);
    };

    // 4. Save Edited Content
    const handleSaveEdit = (id) => {
        if (!editText.trim()) return;
        setComments(comments.map(c => c._id === id ? { ...c, text: editText, timestamp: "Edited just now" } : c));
        setEditingId(null);
    };

    // 5. Delete Action Process
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this comment?")) {
            setComments(comments.filter(c => c._id !== id));
        }
    };

    return (
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-900">
            <h3 className="font-heading text-xl font-bold mb-6 flex items-center text-zinc-900 dark:text-zinc-100">
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

            {/* Comments Iteration Map Layout */}
            <div className="space-y-4">
                {comments.map((comment) => {
                    const isOwnComment = comment.userEmail === currentUser.email;

                    return (
                        <div key={comment._id} className="bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/60 rounded-2xl p-5 shadow-sm transition-all">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold uppercase text-zinc-600 dark:text-zinc-300">
                                        {comment.userName[0]}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{comment.userName}</h4>
                                        <p className="text-[10px] text-zinc-400 font-medium">{comment.timestamp}</p>
                                    </div>
                                </div>

                                {/* Dynamic Modification Controls for Own Items */}
                                {isOwnComment && editingId !== comment._id && (
                                    <div className="flex items-center space-x-2 text-xs font-semibold">
                                        <button onClick={() => startEdit(comment)} className="text-zinc-400 hover:text-violet-500 transition-colors">Edit</button>
                                        <span className="text-zinc-300 dark:text-zinc-700">|</span>
                                        <button onClick={() => handleDelete(comment._id)} className="text-zinc-400 hover:text-rose-500 transition-colors">Delete</button>
                                    </div>
                                )}
                            </div>

                            {/* Conditional Display Field or Inline Edit Form */}
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