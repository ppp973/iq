'use client';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, Heart, Play, Sparkles, LayoutGrid, 
  Clock, ChevronRight, Zap, Orbit, Layers, 
  ArrowUpRight, Command, Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import coursesData from '@/data/courses.json';

// --- TYPES ---
interface Course {
  id: number | string;
  title: string;
}

// --- ULTRA-MODERN SPLASH ---
const SplashScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center"
  >
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative"
    >
      <div className="w-24 h-24 border-t-2 border-r-2 border-indigo-500 rounded-full animate-spin" />
      <div className="absolute inset-0 flex items-center justify-center font-black text-white text-xl tracking-tighter">
        VIP
      </div>
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
    const splashTimer = setTimeout(() => setShowSplash(false), 2000);
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

  return (
    <div className="min-h-screen bg-[#020202] text-zinc-300 selection:bg-indigo-500/40 selection:text-white font-sans">
      <AnimatePresence>{showSplash && <SplashScreen />}</AnimatePresence>

      {/* BACKGROUND ORBS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-purple-600/10 blur-[100px] rounded-full" />
      </div>

      <main className="max-w-[1600px] mx-auto flex gap-6 p-6">
        
        {/* --- LEFT SIDEBAR (NEW) --- */}
        <aside className="hidden lg:flex flex-col w-64 h-[calc(100vh-3rem)] sticky top-6 bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-6 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-12 px-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center">
              <Orbit className="text-white w-6 h-6" />
            </div>
            <span className="font-black text-xl tracking-tighter text-white uppercase">Universe</span>
          </div>

          <nav className="flex-1 space-y-2">
            {[
              { icon: LayoutGrid, label: 'Discover', active: true },
              { icon: Sparkles, label: 'Trending', active: false },
              { icon: Layers, label: 'Categories', active: false },
              { icon: Heart, label: 'My Library', active: false },
            ].map((item) => (
              <button key={item.label} className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${item.active ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'hover:bg-white/5 text-zinc-500'}`}>
                <item.icon size={20} />
                <span className="text-sm font-bold">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-4 rounded-3xl border border-white/5">
            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Pro Access</p>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">Unlock premium features and certifications.</p>
            <button className="w-full py-2 bg-white text-black rounded-xl text-xs font-black">UPGRADE</button>
          </div>
        </aside>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="flex-1">
          
          {/* HEADER / SEARCH BAR */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight">The Lab.</h1>
              <p className="text-zinc-500 text-sm font-medium">Curated batches for elite developers.</p>
            </div>
            
            <div className="relative group min-w-[320px]">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
              </div>
              <input 
                onChange={(e) => setQuery(e.target.value)}
                type="text" 
                placeholder="Find a batch (Cmd + K)" 
                className="w-full bg-zinc-900/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-indigo-500/30 focus:bg-zinc-900/60 transition-all text-sm"
              />
              <div className="absolute right-4 inset-y-0 flex items-center">
                <kbd className="px-2 py-1 bg-zinc-800 rounded text-[10px] font-mono text-zinc-500 border border-zinc-700">K</kbd>
              </div>
            </div>
          </header>

          {/* BENTO HIGHLIGHT SECTION */}
          {!query && (
            <div className="grid grid-cols-12 gap-4 mb-12">
              <div className="col-span-12 md:col-span-8 h-[350px] relative rounded-[2.5rem] overflow-hidden group bg-zinc-900">
                <Image src="/mybatches.png" alt="Featured" fill className="object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 max-w-md">
                  <div className="flex items-center gap-2 mb-4">
                     <span className="px-3 py-1 bg-indigo-600 rounded-full text-[10px] font-black text-white uppercase tracking-tighter">Trending Now</span>
                  </div>
                  <h2 className="text-4xl font-black text-white mb-4 leading-none">Mastering Advanced Architectures</h2>
                  <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-black text-sm hover:px-8 transition-all">
                    START NOW <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>
              <div className="col-span-12 md:col-span-4 h-[350px] bg-indigo-600/10 border border-indigo-500/20 rounded-[2.5rem] p-8 flex flex-col">
                <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center mb-6">
                  <Zap className="text-white fill-white" size={24} />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Fast Track</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-auto">Jump straight into the most recent modules and never miss an update from the VIP curriculum.</p>
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-zinc-800" />
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-black bg-zinc-900 flex items-center justify-center text-[10px] font-bold">+12k</div>
                </div>
              </div>
            </div>
          )}

          {/* MAIN GRID */}
          <div className="flex items-center justify-between mb-8">
             <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-white uppercase tracking-widest text-[14px]">Catalog</h2>
                <div className="h-px w-12 bg-zinc-800" />
             </div>
             <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-white/5 rounded-xl text-xs font-bold hover:bg-zinc-800 transition-all">
                <Filter size={14} /> Filter
             </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {filteredCourses.slice(0, visibleCount).map((course) => (
              <motion.div 
                layout
                key={course.id}
                className="group relative bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-4 transition-all hover:border-indigo-500/40"
              >
                <div className="relative aspect-[16/10] rounded-[1.5rem] overflow-hidden mb-5">
                  <Image src="/mybatches.png" alt={course.title} fill className="object-cover opacity-70 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold text-white">
                    ID: {course.id}
                  </div>
                  <button className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                    <Heart size={14} className={favorites.includes(course.id.toString()) ? 'fill-current' : ''} />
                  </button>
                </div>

                <div className="px-2 pb-2">
                  <h3 className="font-bold text-zinc-100 mb-6 line-clamp-2 h-12 group-hover:text-indigo-400 transition-colors">
                    {course.title}
                  </h3>
                  
                  <Link href={`/course/${course.id}`} className="block">
                    <button className="w-full flex items-center justify-between bg-zinc-900 border border-white/5 p-4 rounded-2xl group-hover:bg-indigo-600 transition-all duration-300">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white">Enroll Batch</span>
                      <ChevronRight size={18} className="text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* LOAD MORE */}
          {filteredCourses.length > visibleCount && (
            <div className="flex justify-center mt-16 pb-20">
              <button 
                onClick={() => setVisibleCount(v => v + 8)}
                className="px-8 py-4 rounded-2xl bg-white text-black font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                BROWSE MORE BATCHES
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
