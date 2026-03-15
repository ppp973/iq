'use client';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { Search, Heart, Play, Sparkles, LayoutGrid, Clock, ChevronRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import coursesData from '@/data/courses.json';

// --- Types ---
interface Course {
  id: number | string;
  title: string;
}

// --- NEW PREMIUM SPLASH SCREEN ---
const SplashScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0, scale: 1.1 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent" />
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative flex flex-col items-center"
    >
      <div className="relative w-32 h-32 md:w-40 md:h-40 mb-8">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-2 border-dashed border-indigo-500/40 rounded-full" 
        />
        <div className="absolute inset-2 rounded-full overflow-hidden border border-white/10 shadow-2xl shadow-indigo-500/20">
          <img src="https://i.pinimg.com/736x/a6/e8/4c/a6e84cd182745f53f833b579ebe88e28.jpg" alt="Logo" className="w-full h-full object-cover" />
        </div>
      </div>
      <h2 className="text-2xl font-black tracking-[0.3em] text-white">VIP STUDY</h2>
      <p className="text-indigo-400 text-[10px] font-bold mt-2 tracking-[0.5em] uppercase">Powered by Raj</p>
    </motion.div>
  </motion.div>
);

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(12);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const sortedCourses = useMemo(() => {
    return [...coursesData].sort((a: Course, b: Course) => Number(b.id) - Number(a.id));
  }, []);

  const [filteredCourses, setFilteredCourses] = useState<Course[]>(sortedCourses);

  useEffect(() => {
    const splashTimer = setTimeout(() => setShowSplash(false), 2500);
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

  const toggleFav = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    const newFavs = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id];
    setFavorites(newFavs);
    localStorage.setItem('spidy_favs', JSON.stringify(newFavs));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-indigo-500/30">
      <AnimatePresence>{showSplash && <SplashScreen />}</AnimatePresence>

      <Navbar />

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[150px] rounded-full" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <main className="relative pt-32 px-6 max-w-7xl mx-auto">
        
        {/* --- HERO SECTION --- */}
        <section className="mb-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/50 border border-zinc-800 mb-6"
          >
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold tracking-wide text-zinc-400 uppercase">Welcome to the Future of Learning</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-purple-400">Knowledge.</span>
          </h1>

          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500" />
            <div className="relative flex items-center">
              <Search className="absolute left-5 text-zinc-500 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search premium batches..." 
                className="w-full bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl py-5 pl-14 pr-6 text-lg outline-none focus:border-indigo-500/50 transition-all"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* --- FAVORITES (BENTO STYLE) --- */}
        {favorites.length > 0 && !query && (
          <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold flex items-center gap-3">
                <div className="p-2 rounded-lg bg-rose-500/10"><Heart className="w-5 h-5 fill-rose-500 text-rose-500" /></div>
                Continue Learning
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {sortedCourses.filter(c => favorites.includes(c.id.toString())).slice(0, 4).map((course, idx) => (
                <Link href={`/course/${course.id}`} key={`fav-${course.id}`} className={`group relative overflow-hidden rounded-3xl bg-zinc-900/50 border border-zinc-800 p-4 hover:border-indigo-500/50 transition-all ${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                   <div className="relative h-full flex flex-col">
                      <div className={`relative rounded-2xl overflow-hidden bg-zinc-800 ${idx === 0 ? 'h-64' : 'h-32'} mb-4`}>
                        <Image src="/mybatches.png" alt="" fill className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
                        <div className="absolute bottom-3 left-3 flex items-center gap-2">
                           <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                              <Play className="w-3 h-3 fill-white" />
                           </div>
                           <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Resume</span>
                        </div>
                      </div>
                      <h3 className={`font-bold text-zinc-100 line-clamp-2 ${idx === 0 ? 'text-xl' : 'text-sm'}`}>{course.title}</h3>
                   </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* --- MAIN GRID --- */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <div className="space-y-1">
              <h2 className="text-3xl font-black text-white flex items-center gap-3">
                Explore Universe
              </h2>
              <p className="text-zinc-500 text-sm font-medium">Discover your next milestone from {filteredCourses.length} batches</p>
            </div>
            <div className="hidden md:flex bg-zinc-900 p-1 rounded-xl border border-zinc-800">
               <button className="p-2 bg-zinc-800 rounded-lg text-white"><LayoutGrid size={18} /></button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.slice(0, visibleCount).map((course) => (
              <motion.div 
                layout
                key={`course-${course.id}`}
                className="group relative bg-zinc-900/20 backdrop-blur-sm border border-zinc-800/50 rounded-[2rem] overflow-hidden hover:bg-zinc-900/40 transition-all duration-300"
              >
                {/* ID Tag */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold text-indigo-300">
                    #{course.id}
                  </span>
                </div>

                {/* Fav Button */}
                <button 
                  onClick={(e) => toggleFav(course.id.toString(), e)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center group/btn"
                >
                  <Heart className={`w-5 h-5 transition-transform group-hover/btn:scale-110 ${favorites.includes(course.id.toString()) ? 'fill-rose-500 text-rose-500' : 'text-zinc-500'}`} />
                </button>

                <div className="relative h-48 overflow-hidden">
                  <Image src="/mybatches.png" alt={course.title} fill className="object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Premium Batch</span>
                  </div>
                  <h3 className="font-bold text-lg leading-tight mb-6 line-clamp-2 text-zinc-100 group-hover:text-indigo-400 transition-colors">
                    {course.title}
                  </h3>
                  
                  <Link href={`/course/${course.id}`}>
                    <button className="w-full group/btn relative flex items-center justify-center gap-3 bg-zinc-100 text-black py-4 rounded-2xl font-black text-sm overflow-hidden transition-all hover:bg-white active:scale-95">
                      <Play className="w-4 h-4 fill-black" />
                      START LEARNING
                      <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* LOAD MORE */}
          {filteredCourses.length > visibleCount && (
            <div className="flex justify-center mt-20">
              <button 
                onClick={() => setVisibleCount(prev => prev + 12)}
                className="group relative px-10 py-4 bg-zinc-900 rounded-2xl font-bold border border-zinc-800 hover:border-indigo-500/50 transition-all"
              >
                <span className="relative z-10 flex items-center gap-2">
                   Load More Batches <Clock size={16} className="text-indigo-400" />
                </span>
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Footer Branding */}
      <footer className="mt-40 border-t border-zinc-900 py-12 text-center">
         <p className="text-zinc-600 font-medium tracking-[0.2em] text-[10px] uppercase mb-4">The VIP Standard</p>
         <div className="flex items-center justify-center gap-4 text-zinc-400">
            <div className="h-px w-12 bg-zinc-800" />
            <span className="font-black text-white">SPIDYUNIVERSE</span>
            <div className="h-px w-12 bg-zinc-800" />
         </div>
      </footer>
    </div>
  );
}
