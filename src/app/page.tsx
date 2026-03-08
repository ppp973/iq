'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { Search, Heart, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import coursesData from '@/data/courses.json';

export default function Home() {

  const [showSplash, setShowSplash] = useState(true);
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(20);
  const [favorites, setFavorites] = useState<string[]>([]);

  const sortedCourses = [...coursesData].sort((a: any, b: any) => b.id - a.id);
  const [filteredCourses, setFilteredCourses] = useState(sortedCourses);

  useEffect(() => {

    setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    const savedFavs = localStorage.getItem('spidy_favs');
    if (savedFavs) {
      setFavorites(JSON.parse(savedFavs));
    }

  }, []);

  useEffect(() => {

    const results = sortedCourses.filter((c: any) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.id.toString().includes(query)
    );

    setFilteredCourses(results);

  }, [query]);

  const toggleFav = (id: string, e: any) => {

    e.preventDefault();

    let newFavs = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id];

    setFavorites(newFavs);
    localStorage.setItem('spidy_favs', JSON.stringify(newFavs));

  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">

      {/* Splash Screen */}

      <AnimatePresence>

        {showSplash && (

          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
          >

            <motion.h1
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-black tracking-tight"
            >
              SPIDY
              <span className="text-indigo-500">UNIVERSE</span>
            </motion.h1>

            <p className="text-xs text-gray-500 mt-2 tracking-widest font-mono">
              POWERED BY 𝑳𝑨𝑳𝑰𝑻 △
            </p>

          </motion.div>

        )}

      </AnimatePresence>

      <Navbar />

      <main className="pt-20 px-4 max-w-7xl mx-auto">

        {/* Search */}

        <div className="relative mb-8">

          <input
            type="text"
            placeholder="Search Batches..."
            className="w-full bg-[#0f0f0f] border border-white/10 rounded-2xl p-4 pl-12 text-lg font-medium outline-none focus:border-indigo-500 transition-all"
            onChange={(e) => setQuery(e.target.value)}
          />

          <Search className="absolute left-4 top-4 text-gray-500 w-6 h-6" />

        </div>

        {/* Favorites */}

        {favorites.length > 0 && !query && (

          <div className="mb-10">

            <h2 className="text-lg font-bold text-indigo-400 mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 fill-indigo-400" />
              Saved Batches
            </h2>

            <div className="flex gap-4 overflow-x-auto pb-4">

              {sortedCourses
                .filter((c: any) => favorites.includes(c.id.toString()))
                .map((course: any) => (

                  <Link key={course.id} href={`/course/${course.id}`}>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="min-w-[260px] bg-[#0f0f0f] border border-indigo-500/40 rounded-2xl p-4"
                    >

                      <div className="h-32 rounded-xl overflow-hidden mb-3">

                        <Image
                          src="/mybatches.png"
                          alt="course"
                          width={400}
                          height={200}
                          className="w-full h-full object-cover"
                        />

                      </div>

                      <h3 className="font-semibold text-sm line-clamp-2">
                        {course.title}
                      </h3>

                    </motion.div>

                  </Link>

                ))}

            </div>

          </div>

        )}

        {/* All Courses */}

        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Zap className="text-yellow-400 w-6 h-6" />
          All Batches ({filteredCourses.length})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredCourses.slice(0, visibleCount).map((course: any) => (

            <Link key={course.id} href={`/course/${course.id}`}>

              <motion.div
                whileHover={{ y: -6 }}
                className="bg-[#0b0b0b] border border-white/5 rounded-3xl overflow-hidden shadow-2xl"
              >

                <div className="relative h-44">

                  <Image
                    src="/mybatches.png"
                    alt="course"
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  <div className="absolute bottom-3 left-4 right-4">

                    <span className="bg-indigo-600 text-xs font-bold px-2 py-1 rounded-md">
                      ID: {course.id}
                    </span>

                    <h3 className="font-bold text-lg mt-1 line-clamp-2">
                      {course.title}
                    </h3>

                  </div>

                  <button
                    onClick={(e) => toggleFav(course.id.toString(), e)}
                    className="absolute top-3 right-3 w-10 h-10 bg-black/50 backdrop-blur rounded-full flex items-center justify-center"
                  >

                    <Heart
                      className={`w-5 h-5 ${
                        favorites.includes(course.id.toString())
                          ? 'fill-red-500 text-red-500'
                          : 'text-white'
                      }`}
                    />

                  </button>

                </div>

                <div className="p-4 flex justify-between bg-[#111]">

                  <span className="text-xs text-gray-400">
                    By SPIDYUNIVERSE
                  </span>

                  <span className="text-xs text-green-400 font-bold">
                    ACTIVE
                  </span>

                </div>

              </motion.div>

            </Link>

          ))}

        </div>

        {/* Load More */}

        {visibleCount < filteredCourses.length && (

          <button
            onClick={() => setVisibleCount(prev => prev + 20)}
            className="w-full mt-10 py-4 rounded-2xl bg-[#111] border border-white/10 text-gray-300 font-semibold hover:bg-[#1a1a1a] transition"
          >
            Load More Batches
          </button>

        )}

      </main>

    </div>
  );

}
