'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import toast from 'react-hot-toast'; 

const IdeaForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); 

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
    setLoading(true); 

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
     
        toast.success('Your innovation has been published successfully! 🚀', {
          style: {
            background: '#09090b',
            color: '#fff',
            border: '1px solid #27272a'
          }
        });

       
        setFormData({
          title: '', shortDesc: '', detailedDesc: '', category: '',
          tags: '', imageUrl: '', budget: '', targetAudience: '',
          problemStatement: '', proposedSolution: ''
        });

      
        setTimeout(() => {
          router.push('/ideas');
          router.refresh(); 
        }, 1200);

      } else {
        toast.error('Failed to submit the blueprint. Please try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Network failure. Server may be offline.');
    } finally {
      setLoading(false); 
    }
  };

 
  const baseInputStyles = "w-full px-4 py-3 text-sm bg-zinc-100/70 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-1 focus:ring-violet-500/20 text-zinc-900 dark:text-zinc-100 rounded-xl focus:outline-none transition-all placeholder-zinc-400 dark:placeholder-zinc-600";

  return (
    <section className="bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8 text-zinc-900 dark:text-zinc-100 min-h-screen flex items-center justify-center transition-colors duration-300">
      <div className="max-w-4xl w-full bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 md:p-10 shadow-xl dark:shadow-2xl backdrop-blur-sm transition-all">
        
        {/* Form Header */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent mb-2 tracking-tight">
            Pitch Your Next Big Idea
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Fill out the fields below to showcase your innovation to the global community.
          </p>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Grid Layout: Title & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Idea Title *</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., AI Smart Grid for Cities"
                className={baseInputStyles}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Category *</label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className={`${baseInputStyles} cursor-pointer appearance-none`}
              >
                <option value="" disabled className="text-zinc-400 dark:text-zinc-600">Select a Category</option>
                <option value="tech" className="bg-white text-zinc-400  dark:bg-zinc-900">Tech</option>
                <option value="health" className="bg-white text-zinc-400 dark:bg-zinc-900">Health</option>
                <option value="ai" className="bg-white text-zinc-400  dark:bg-zinc-900">AI (Artificial Intelligence)</option>
                <option value="education" className="bg-white text-zinc-400  dark:bg-zinc-900">Education</option>
                <option value="sustainability" className="bg-white text-zinc-400  dark:bg-zinc-900">Sustainability</option>
                <option value="fintech" className="bg-white text-zinc-400  dark:bg-zinc-900">Fintech</option>
              </select>
            </div>
          </div>

          {/* Short Description */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Short Description *</label>
            <input
              type="text"
              name="shortDesc"
              required
              maxLength={150}
              value={formData.shortDesc}
              onChange={handleChange}
              placeholder="A punchy one-liner or short pitch (max 150 characters)"
              className={baseInputStyles}
            />
          </div>

          {/* Problem Statement & Proposed Solution (Two Column) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Problem Statement *</label>
              <textarea
                name="problemStatement"
                required
                rows={4}
                value={formData.problemStatement}
                onChange={handleChange}
                placeholder="What critical problem are you trying to solve?"
                className={`${baseInputStyles} resize-none`}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Proposed Solution *</label>
              <textarea
                name="proposedSolution"
                required
                rows={4}
                value={formData.proposedSolution}
                onChange={handleChange}
                placeholder="How does your idea solve this specific problem?"
                className={`${baseInputStyles} resize-none`}
              />
            </div>
          </div>

          {/* Detailed Description */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Detailed Description *</label>
            <textarea
              name="detailedDesc"
              required
              rows={5}
              value={formData.detailedDesc}
              onChange={handleChange}
              placeholder="Explain the entire workflow, business architecture, or technical details..."
              className={baseInputStyles}
            />
          </div>

          {/* Target Audience & Image URL (Two Column) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Target Audience *</label>
              <input
                type="text"
                name="targetAudience"
                required
                value={formData.targetAudience}
                onChange={handleChange}
                placeholder="e.g., College Students, Small Businesses"
                className={baseInputStyles}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Image URL</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/banner.jpg"
                className={baseInputStyles}
              />
            </div>
          </div>

          {/* Tags & Estimated Budget (Two Column - Optional Fields) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Tags <span className="text-[10px] font-normal lowercase text-zinc-400 dark:text-zinc-600">(optional)</span></label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g., web3, greenenergy, automation"
                className={baseInputStyles}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Estimated Budget <span className="text-[10px] font-normal lowercase text-zinc-400 dark:text-zinc-600">(optional)</span></label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="e.g., $5,000 - $10,000"
                className={baseInputStyles}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={loading} 
              className="w-full md:w-auto inline-flex items-center justify-center px-10 py-3.5 text-base font-bold text-white dark:text-zinc-950 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 rounded-xl shadow-md hover:shadow-xl dark:shadow-violet-500/5 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Publishing Blueprint...' : 'Publish Idea'}
              {!loading && (
                <svg className="w-5 h-5 ml-2 -mr-1" fill="none" >
                  <path strokeLinecap="round" strokeLinejoin="round"  />
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