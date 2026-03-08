'use client';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { Search, Heart, Zap, Play, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import coursesData from '@/data/courses.json';

interface Course {
  id: number | string;
  title: string;
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(20);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const sortedCourses = useMemo(() => {
    return [...coursesData].sort((a: Course, b: Course) => Number(b.id) - Number(a.id));
  }, []);

  const [filteredCourses, setFilteredCourses] = useState<Course[]>(sortedCourses);

  useEffect(() => {
    const splashTimer = setTimeout(() => setShowSplash(false), 2200);
    const savedFavs = localStorage.getItem('spidy_favs');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    const results = sortedCourses.filter((c: Course) => 
      c.title.toLowerCase().includes(query.toLowerCase()) || c.id.toString().includes(query)
    );
    setFilteredCourses(results);
  }, [query, sortedCourses]);

  const toggleFav = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation(); 
    const newFavs = favorites.includes(id) 
      ? favorites.filter(f => f !== id) 
      : [...favorites, id];
    setFavorites(newFavs);
    localStorage.setItem('spidy_favs', JSON.stringify(newFavs));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 pb-20 relative overflow-hidden">
      {/* Premium Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <AnimatePresence>
        {showSplash && (
          <motion.div exit={{ opacity: 0, filter: "blur(10px)" }} className="fixed inset-0 z-[9999] bg-zinc-950 flex flex-col items-center justify-center">
            <motion.h1 initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }} className="text-5xl font-black tracking-tighter">
              SPIDY<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">UNIVERSE</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-xs text-zinc-500 mt-3 tracking-[0.3em] font-mono">
              POWERED BY 𝑳𝑨𝑳𝑰𝑻 △
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />

      <main className="pt-24 px-4 max-w-7xl mx-auto relative z-10">
        {/* Search Bar - Premium Glass Look */}
        <div className="relative mb-12 max-w-2xl mx-auto">
          <input 
            type="text" 
            placeholder="Search your batches..." 
            className="w-full bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-full p-4 pl-14 text-lg font-medium outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-2xl"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 w-6 h-6" />
        </div>

        {/* Favorites Section */}
        {favorites.length > 0 && !query && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-zinc-100 mb-6 flex items-center gap-2">
              <Heart className="w-5 h-5 fill-rose-500 text-rose-500" /> Your Library
            </h2>
            <div className="flex gap-5 overflow-x-auto pb-6 no-scrollbar snap-x">
              {sortedCourses.filter((c: Course) => favorites.includes(c.id.toString())).map((course: Course) => (
                <div key={`fav-${course.id}`} className="min-w-[300px] snap-start">
                  <div className="bg-zinc-900/40 backdrop-blur-sm border border-indigo-500/30 rounded-3xl p-3 relative overflow-hidden group hover:border-indigo-500/80 transition-colors">
                    <div className="h-36 rounded-2xl bg-zinc-800 mb-4 overflow-hidden relative">
                        <Image src="/mybatches.png" alt={course.title} fill className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="px-2 pb-2">
                      <h3 className="font-bold text-sm line-clamp-2 text-zinc-200">{course.title}</h3>
                      <Link href={`/course/${course.id}`} className="mt-3 w-full py-2.5 bg-indigo-500/10 hover:bg-indigo-500 text-indigo-400 hover:text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all">
                        <Play className="w-3 h-3 fill-current" /> Resume
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Grid Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-white flex items-center gap-3 tracking-tight">
            <Sparkles className="w-6 h-6 text-indigo-400" /> Explore Universe
          </h2>
          <span className="text-sm font-medium text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full">{filteredCourses.length} Batches</span>
        </div>

        {/* Premium Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.slice(0, visibleCount).map((course: Course) => (
            <div key={`course-${course.id}`} className="group relative bg-zinc-900/30 backdrop-blur-xl border border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-700 transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] flex flex-col">
              
              {/* Image Header */}
              <div className="h-52 w-full relative overflow-hidden">
                <Image src="/mybatches.png" alt={course.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-80 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-zinc-950/60 backdrop-blur-md text-zinc-300 border border-zinc-700/50 text-[10px] font-bold px-2.5 py-1 rounded-lg">
                    ID: {course.id}
                  </span>
                </div>

                {/* Favorite Button */}
                <button onClick={(e) => toggleFav(course.id.toString(), e)} className="absolute top-4 right-4 z-20 w-10 h-10 bg-zinc-950/40 backdrop-blur-md border border-zinc-700/50 rounded-full flex items-center justify-center hover:bg-zinc-800 transition-colors">
                  <Heart className={`w-5 h-5 transition-colors ${favorites.includes(course.id.toString()) ? 'fill-rose-500 text-rose-500' : 'text-zinc-400'}`} />
                </button>
              </div>

              {/* Card Body & Title */}
              <div className="px-5 pt-2 pb-5 flex flex-col flex-grow z-10 -mt-8">
                <div className="flex-grow">
                  <h3 className="font-extrabold text-[1.15rem] leading-tight line-clamp-2 text-zinc-100 group-hover:text-indigo-400 transition-colors duration-300 drop-shadow-md">
                    {course.title}
                  </h3>
                  <p className="text-sm text-zinc-500 mt-2 font-medium">By SPIDYUNIVERSE</p>
                </div>

                {/* Let's Study Button */}
                <Link href={`/course/${course.id}`} className="mt-6">
                  <button className="w-full py-3.5 rounded-xl bg-zinc-100 text-zinc-950 font-bold flex items-center justify-center gap-2 hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                    <Play className="w-4 h-4 fill-current" /> Let's Study
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {filteredCourses.length > visibleCount && (
          <div className="flex justify-center mt-12">
            <button 
              onClick={() => setVisibleCount(prev => prev + 20)}
              className="px-8 py-4 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 font-bold hover:bg-zinc-800 hover:text-zinc-200 transition-colors flex items-center gap-2"
            >
              Load More Batches
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
