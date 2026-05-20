'use client';

import React, { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

const MyIdeas = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  
  const [myIdeas, setMyIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIdea, setEditingIdea] = useState(null);
  const [updateData, setUpdateData] = useState({ title: '', shortDesc: '' });

  useEffect(() => {
    
    if (user?.email) {
      const getSecureData = async () => {
        try {
          const { data: tokenData } = await authClient.token();

          fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/idea?email=${user.email}`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'authorization': `Bearer ${tokenData?.token}` 
            }
          })
            .then((res) => res.json())
            .then((data) => {
              setMyIdeas(data);
              setLoading(false);
            })
            .catch((err) => {
              console.error(err);
              setLoading(false);
            });
        } catch (err) {
          console.error(err);
          setLoading(false);
        }
      };
      getSecureData();
    }
  }, [user?.email]);

  
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this innovation blueprint? ⚠️")) return;

    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/idea/${id}`, {
        method: 'DELETE',
        headers: {
          'authorization': `Bearer ${tokenData?.token}`
        }
      });
      const data = await res.json();
      
      if (data.deletedCount > 0) {
        setMyIdeas(myIdeas.filter(idea => idea._id !== id));
        toast.success('Blueprint removed successfully!');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete.');
    }
  };

  // Modal 
  const openUpdateModal = (idea) => {
    setEditingIdea(idea);
    setUpdateData({ title: idea.title, shortDesc: idea.shortDesc });
    setIsModalOpen(true);
  };

  
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/idea/${editingIdea._id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${tokenData?.token}`
        },
        body: JSON.stringify(updateData)
      });
      const data = await res.json();

      if (data.modifiedCount > 0) {
        
        setMyIdeas(myIdeas.map(idea => idea._id === editingIdea._id ? { ...idea, ...updateData } : idea));
        toast.success('Blueprint updated successfully! 🚀');
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error('Update failed.');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 px-4">
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-violet-500/20 border-t-violet-600 dark:border-t-violet-400 rounded-full animate-spin"></div>
          <div className="absolute w-12 h-12 border-4 border-fuchsia-500/10 border-b-fuchsia-500 dark:border-b-fuchsia-400 rounded-full animate-spin duration-1000"></div>
        </div>
        <div className="text-center space-y-1 animate-pulse">
          <p className="text-base font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent tracking-wide">
            Loading your blueprints...
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
            Fetching your innovations from the vault
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Published Ideas ({myIdeas.length})</h1>
      
      {myIdeas.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-xl border-zinc-700">
          <p className="text-zinc-400 mb-4">You haven't pitched any ideas yet.</p>
          <Link href="/add-idea" className="px-5 py-2.5 bg-violet-600 text-white font-medium rounded-xl text-sm">
             Pitch an Idea
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {myIdeas.map((idea) => (
            <div key={idea._id} className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">{idea.title}</h2>
                <p className="text-zinc-400 text-sm mb-4">{idea.shortDesc}</p>
                
                
                <Link href={`/ideas/${idea._id}`} className="text-violet-400 text-xs font-semibold hover:underline block mb-4">
                  View Details →
                </Link>
              </div>
              
              
              <div className="flex items-center justify-between pt-4 border-t border-zinc-800/60">
                <button 
                  onClick={() => openUpdateModal(idea)} 
                  className="text-xs font-bold text-amber-400 hover:underline transition-all"
                >
                  Update (Modal)
                </button>
                <button 
                  onClick={() => handleDelete(idea._id)} 
                  className="text-xs font-bold text-rose-500 hover:underline transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

     
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Update Innovation Blueprint</h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Title</label>
                <input 
                  type="text" 
                  value={updateData.title}
                  onChange={(e) => setUpdateData({ ...updateData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white text-sm focus:outline-none focus:border-violet-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Short Description</label>
                <textarea 
                  value={updateData.shortDesc}
                  onChange={(e) => setUpdateData({ ...updateData, shortDesc: e.target.value })}
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white text-sm focus:outline-none focus:border-violet-500 h-24"
                  required
                />
              </div>
              <div className="flex items-center justify-end space-x-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium rounded-xl"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-xs font-medium rounded-xl"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyIdeas;