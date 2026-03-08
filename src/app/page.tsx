
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Search, Heart, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import coursesData from '@/data/courses.json'; 

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(20);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Sort descending
  const sortedCourses = [...coursesData].sort((a: any, b: any) => b.id - a.id);
  const [filteredCourses, setFilteredCourses] = useState(sortedCourses);

  useEffect(() => {
    setTimeout(() => setShowSplash(false), 2200);
    const savedFavs = localStorage.getItem('spidy_favs');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
  }, []);

  useEffect(() => {
    const results = sortedCourses.filter((c: any) => 
      c.title.toLowerCase().includes(query.toLowerCase()) || c.id.toString().includes(query)
    );
    setFilteredCourses(results);
  }, [query]);

  const toggleFav = (id: string, e: any) => {
    e.preventDefault();
    let newFavs = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id];
    setFavorites(newFavs);
    localStorage.setItem('spidy_favs', JSON.stringify(newFavs));
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <AnimatePresence>
        {showSplash && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center">
            <motion.h1 initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-4xl font-black tracking-tighter">
              SPIDY<span className="text-indigo-600">UNIVERSE</span>
            </motion.h1>
            <p className="text-xs text-gray-500 mt-2 tracking-widest font-mono">POWERED BY 𝑳𝑨𝑳𝑰𝑻 △</p>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />

      <main className="pt-20 px-4">
        {/* Search */}
        <div className="relative mb-6">
          <input 
            type="text" 
            placeholder="Search Batches..." 
            className="w-full bg-[#111] border border-white/10 rounded-2xl p-4 pl-12 text-lg font-medium outline-none focus:border-indigo-500 transition-colors"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-4 text-gray-500 w-6 h-6" />
        </div>

        {/* Favorites */}
        {favorites.length > 0 && !query && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-indigo-400 mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5 fill-indigo-400" /> Saved Batches
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {sortedCourses.filter((c: any) => favorites.includes(c.id.toString())).map((course: any) => (
                <Link key={course.id} href={`/course/${course.id}`} className="min-w-[280px]">
                  <div className="bg-[#111] border border-indigo-500/50 rounded-2xl p-4 h-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 bg-indigo-600 rounded-bl-xl text-xs font-bold">SAVED</div>
                    <div className="h-32 rounded-xl bg-gray-800 mb-3 overflow-hidden">
                        <img src="/mybatches.png" className="w-full h-full object-cover opacity-80" />
                    </div>
                    <h3 className="font-bold text-sm line-clamp-2">{course.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Main Grid */}
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-500" /> All Batches ({filteredCourses.length})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {filteredCourses.slice(0, visibleCount).map((course: any) => (
            <Link key={course.id} href={`/course/${course.id}`}>
              <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden active:scale-95 transition-transform duration-200 shadow-xl">
                <div className="h-44 w-full relative">
                  <img src="/mybatches.png" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="bg-indigo-600/90 text-white text-[10px] font-bold px-2 py-1 rounded-md mb-2 inline-block">ID: {course.id}</span>
                    <h3 className="font-bold text-lg leading-tight line-clamp-2">{course.title}</h3>
                  </div>
                  <button onClick={(e) => toggleFav(course.id.toString(), e)} className="absolute top-3 right-3 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center">
                    <Heart className={`w-5 h-5 ${favorites.includes(course.id.toString()) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                  </button>
                </div>
                <div className="p-4 flex justify-between items-center bg-[#111]">
                   <span className="text-xs text-gray-400">By SPIDYUNIVERSE</span>
                   <span className="text-xs font-bold text-green-400">ACTIVE</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <button 
          onClick={() => setVisibleCount(prev => prev + 20)}
          className="w-full mt-8 py-4 rounded-2xl bg-[#111] border border-white/10 text-gray-400 font-bold active:bg-[#222]"
        >
          Load More Batches
        </button>
      </main>
    </div>
  );
      }
