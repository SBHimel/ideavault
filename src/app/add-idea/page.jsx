'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // ✅ রিডাইরেক্ট করার জন্য useRouter
import toast from 'react-hot-toast'; // ✅ টোস্ট নোটিফিকেশনের জন্য

const IdeaForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // ✅ সাবমিট লোডিং স্টেট

  const [formData, setFormData] = useState({
    title: '',
    shortDesc: '',
    detailedDesc: '',
    category: '',
    tags: '',
    imageUrl: '',
    budget: '',
    targetAudience: '',
    problemStatement: '',
    proposedSolution: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // লোডিং শুরু

    try {
      const res = await fetch('http://localhost:5000/idea', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.insertedId) {
        // ✅ ১. সাকসেস টোস্ট ফায়ার হবে
        toast.success('Your innovation has been published successfully! 🚀', {
          style: {
            background: '#0f172a',
            color: '#fff',
            border: '1px solid #1e293b'
          }
        });

        // ফিনাইল রিফ্রেশ বা স্টেট ক্লিয়ার
        setFormData({
          title: '', shortDesc: '', detailedDesc: '', category: '',
          tags: '', imageUrl: '', budget: '', targetAudience: '',
          problemStatement: '', proposedSolution: ''
        });

        // ✅ ২. ১.২ সেকেন্ড পর রিডাইরেক্ট হবে (যাতে ইউজার টোস্টটা দেখতে পারে)
        setTimeout(() => {
          router.push('/ideas');
          router.refresh(); // নতুন ডাটা লেটেস্ট দেখানোর জন্য ক্যাশ রিফ্রেশ
        }, 1200);

      } else {
        toast.error('Failed to submit the blueprint. Please try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Network failure. Server may be offline.');
    } finally {
      setLoading(false); // লোডিং শেষ
    }
  };

  return (
    <section className="bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-white min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-10 shadow-2xl backdrop-blur-sm">
        
        {/* Form Header */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent mb-2">
            Pitch Your Next Big Idea
          </h2>
          <p className="text-sm text-slate-400">
            Fill out the fields below to showcase your innovation to the global community.
          </p>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Grid Layout: Title & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-slate-300">Idea Title *</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., AI Smart Grid for Cities"
                className="w-full px-4 py-3 text-sm bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-slate-300">Category *</label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              >
                <option value="" disabled>Select a Category</option>
                <option value="tech">Tech</option>
                <option value="health">Health</option>
                <option value="ai">AI (Artificial Intelligence)</option>
                <option value="education">Education</option>
                <option value="sustainability">Sustainability</option>
                <option value="fintech">Fintech</option>
              </select>
            </div>
          </div>

          {/* Short Description */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-slate-300">Short Description *</label>
            <input
              type="text"
              name="shortDesc"
              required
              maxLength={150}
              value={formData.shortDesc}
              onChange={handleChange}
              placeholder="A punchy one-liner or short pitch (max 150 characters)"
              className="w-full px-4 py-3 text-sm bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600"
            />
          </div>

          {/* Problem Statement & Proposed Solution (Two Column) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-slate-300">Problem Statement *</label>
              <textarea
                name="problemStatement"
                required
                rows={4}
                value={formData.problemStatement}
                onChange={handleChange}
                placeholder="What critical problem are you trying to solve?"
                className="w-full px-4 py-3 text-sm bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600 resize-none"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-slate-300">Proposed Solution *</label>
              <textarea
                name="proposedSolution"
                required
                rows={4}
                value={formData.proposedSolution}
                onChange={handleChange}
                placeholder="How does your idea solve this specific problem?"
                className="w-full px-4 py-3 text-sm bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600 resize-none"
              />
            </div>
          </div>

          {/* Detailed Description */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-slate-300">Detailed Description *</label>
            <textarea
              name="detailedDesc"
              required
              rows={5}
              value={formData.detailedDesc}
              onChange={handleChange}
              placeholder="Explain the entire workflow, business architecture, or technical details..."
              className="w-full px-4 py-3 text-sm bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600"
            />
          </div>

          {/* Target Audience & Image URL (Two Column) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-slate-300">Target Audience *</label>
              <input
                type="text"
                name="targetAudience"
                required
                value={formData.targetAudience}
                onChange={handleChange}
                placeholder="e.g., College Students, Small Businesses"
                className="w-full px-4 py-3 text-sm bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-slate-300">Image URL</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/banner.jpg"
                className="w-full px-4 py-3 text-sm bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600"
              />
            </div>
          </div>

          {/* Tags & Estimated Budget (Two Column - Optional Fields) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-slate-500">Tags <span className="text-xs font-normal text-slate-600">(Optional)</span></label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g., web3, greenenergy, automation"
                className="w-full px-4 py-3 text-sm bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-slate-500">Estimated Budget <span className="text-xs font-normal text-slate-600">(Optional)</span></label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="e.g., $5,000 - $10,000"
                className="w-full px-4 py-3 text-sm bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={loading} // ✅ লোডিং ট্রু থাকলে বাটন ডিজেবল থাকবে
              className="w-full md:w-auto inline-flex items-center justify-center px-10 py-3.5 text-base font-semibold text-slate-950 bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 hover:from-blue-500 hover:to-emerald-500 rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-emerald-500/20 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Publishing Blueprint...' : 'Publish Idea'}
              {!loading && (
                <svg className="w-5 h-5 ml-2 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>

        </form>
      </div>
    </section>
  );
};

export default IdeaForm;