'use client';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Search, Heart, Zap, Flame, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import coursesData from '@/data/courses.json'; 

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(12);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Memoized sorted courses for performance
  const sortedCourses = useMemo(() => 
    [...coursesData].sort((a: any, b: any) => b.id - a.id), 
  []);

  const [filteredCourses, setFilteredCourses] = useState(sortedCourses);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2200);
    const savedFavs = localStorage.getItem('spidy_favs');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const results = sortedCourses.filter((c: any) => 
      c.title.toLowerCase().includes(query.toLowerCase()) || 
      c.id.toString().includes(query)
    );
    setFilteredCourses(results);
  }, [query, sortedCourses]);

  const toggleFav = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newFavs = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id];
    setFavorites(newFavs);
    localStorage.setItem('spidy_favs', JSON.stringify(newFavs));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30">
      <AnimatePresence>
        {showSplash && (
          <motion.div 
            exit={{ opacity: 0, scale: 1.1 }} 
            transition={{ duration: 0.8, ease: "circOut" }}
            className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
               <div className="absolute -inset-10 bg-indigo-600/20 blur-[100px] rounded-full" />
               <h1 className="text-5xl md:text-7xl font-black tracking-tighter relative z-10">
                SPIDY<span className="text-indigo-500 bg-clip-text">UNIVERSE</span>
              </h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 0.5 }} 
              className="text-[10px] md:text-xs text-gray-400 mt-6 tracking-[0.3em] font-mono uppercase"
            >
              Mastery in every pixel △
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />

      <main className="max-w-[1400px] mx-auto pt-24 px-5 md:px-10 pb-20">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Explore <span className="text-indigo-500">Batches</span></h2>
            <p className="text-gray-500 text-sm mt-1">Premium learning experience for the universe.</p>
          </div>

          {/* Premium Search Bar */}
          <div className="relative group w-full md:w-[400px]">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-focus-within:opacity-50 transition duration-500"></div>
            <div className="relative flex items-center">
              <input 
                type="text" 
                placeholder="Search by ID or Name..." 
                className="w-full bg-[#111] border border-white/5 rounded-2xl p-4 pl-12 text-sm md:text-base outline-none focus:ring-1 ring-indigo-500/50 transition-all placeholder:text-gray-600"
                onChange={(e) => setQuery(e.target.value)}
              />
              <Search className="absolute left-4 text-gray-500 w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
            </div>
          </div>
        </div>

        {/* Favorites Section (Horizontal Scroller) */}
        {favorites.length > 0 && !query && (
          <section className="mb-14">
            <div className="flex items-center gap-2 mb-5">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <h3 className="text-lg font-bold tracking-tight">Your Favorites</h3>
            </div>
            <div className="flex gap-5 overflow-x-auto pb-6 no-scrollbar snap-x">
              {sortedCourses.filter((c: any) => favorites.includes(c.id.toString())).map((course: any) => (
                <Link key={course.id} href={`/course/${course.id}`} className="min-w-[260px] md:min-w-[320px] snap-start">
                  <div className="group bg-[#0f0f0f] border border-white/10 rounded-2xl p-3 hover:border-indigo-500/40 transition-all">
                    <div className="aspect-video rounded-xl overflow-hidden mb-4 relative">
                      <img src="/mybatches.png" alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" />
                      <div className="absolute top-2 right-2 bg-indigo-600 text-[10px] font-bold px-2 py-1 rounded-md shadow-lg">SAVED</div>
                    </div>
                    <h4 className="font-bold text-sm md:text-base line-clamp-1 group-hover:text-indigo-400 transition-colors">{course.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Main Grid Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
             <div className="p-2 bg-indigo-500/10 rounded-lg">
                <LayoutGrid className="w-5 h-5 text-indigo-500" />
             </div>
             <h3 className="text-xl font-bold">Trending Now</h3>
          </div>
          <span className="text-xs font-mono text-gray-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
            {filteredCourses.length} COURSES FOUND
          </span>
        </div>

        {/* Responsive Grid: 1 on mobile, 2 on tablet, 3-4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCourses.slice(0, visibleCount).map((course: any, index: number) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                key={course.id}
              >
                <Link href={`/course/${course.id}`} className="block group">
                  <div className="relative bg-[#0d0d0d] border border-white/[0.05] rounded-[24px] overflow-hidden hover:border-white/20 transition-all duration-300 shadow-2xl">
                    
                    {/* Course Image & Badge */}
                    <div className="h-48 md:h-52 w-full relative overflow-hidden">
                      <img src="/mybatches.png" alt="Batch" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-80" />
                      
                      {/* Floating ID & Fav Button */}
                      <div className="absolute top-4 left-4">
                        <span className="backdrop-blur-md bg-black/40 border border-white/10 text-white text-[10px] font-mono px-3 py-1.5 rounded-full">
                          #{course.id}
                        </span>
                      </div>
                      
                      <button 
                        onClick={(e) => toggleFav(course.id.toString(), e)} 
                        className="absolute top-4 right-4 w-10 h-10 backdrop-blur-md bg-black/40 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition-all active:scale-90"
                      >
                        <Heart className={`w-5 h-5 transition-colors ${favorites.includes(course.id.toString()) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Premium Content</span>
                      </div>
                      <h3 className="font-bold text-lg leading-[1.3] line-clamp-2 min-h-[56px] group-hover:text-indigo-400 transition-colors">
                        {course.title}
                      </h3>
                      
                      <div className="mt-5 pt-4 border-t border-white/5 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                           <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold">SU</div>
                           <span className="text-[11px] text-gray-400 font-medium">VIPSTUDY</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-[11px] font-bold text-green-500">LIVE</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Section */}
        {visibleCount < filteredCourses.length && (
          <div className="mt-16 flex justify-center">
            <button 
              onClick={() => setVisibleCount(prev => prev + 12)}
              className="px-8 py-4 rounded-2xl bg-white text-black font-bold text-sm hover:bg-gray-200 transition-all active:scale-95 shadow-xl shadow-white/5"
            >
              Discover More Batches
            </button>
          </div>
        )}
      </main>

      {/* Footer Mobile Padding */}
      <div className="h-20 md:hidden" />
    </div>
  );
}
