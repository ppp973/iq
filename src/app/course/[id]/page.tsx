'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import WhatsAppModal from '@/components/WhatsAppModal';
import { Loader2, Folder, ChevronRight, BookOpen, Fingerprint } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CourseSubjects({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [courseName, setCourseName] = useState('');
  const [showWA, setShowWA] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/content', {
          method: 'POST',
          body: JSON.stringify({ courseId: params.id }),
        });
        const json = await res.json();
        if (json.success) {
          const rawData = json.data;
          setCourseName(rawData.courseTitle || rawData.title || "Course Details");
          
          let items: any[] = [];
          if (rawData.data) items = rawData.data;
          else if (rawData.courseContent) items = rawData.courseContent;
          else if (rawData.lectures) items = rawData.lectures;

          const uniqueFolders = Array.from(new Set(items.map((i: any) => i.parentTitle || "General"))).sort();
          setSubjects(uniqueFolders);
        }
      } catch (e) { 
        console.error(e); 
      } finally { 
        setTimeout(() => setLoading(false), 800); // Smooth transition
      }
    };
    fetchData();
  }, [params.id]);

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-20 selection:bg-indigo-500/30">
      <Navbar />

      {/* WhatsApp Modal */}
      <WhatsAppModal isOpen={showWA} onClose={() => setShowWA(false)} />

      <main className="pt-28 px-5 max-w-3xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <div className="relative mb-6">
               <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full animate-pulse" />
               <Loader2 className="w-12 h-12 text-indigo-500 animate-spin relative z-10" />
            </div>
            <div className="flex items-center gap-2">
               <Fingerprint className="w-4 h-4 text-gray-600 animate-pulse" />
               <p className="text-gray-500 font-mono text-[10px] tracking-[0.3em] uppercase">Authenticating Content</p>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Course Header Card */}
            <div className="relative p-6 md:p-8 rounded-[32px] bg-gradient-to-br from-[#111] to-[#050505] border border-white/5 overflow-hidden mb-10 shadow-2xl">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/10 blur-[100px] rounded-full" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold text-indigo-400 bg-indigo-400/10 border border-indigo-400/20 px-3 py-1 rounded-full uppercase tracking-widest">
                    ID: {params.id}
                  </span>
                  <span className="text-[10px] font-bold text-green-400 bg-green-400/10 border border-green-400/20 px-3 py-1 rounded-full uppercase tracking-widest">
                    Verified Batch
                  </span>
                </div>
                <h1 className="text-2xl md:text-4xl font-black leading-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {courseName}
                </h1>
              </div>
            </div>
            
            {/* Subject List Title */}
            <div className="flex items-center justify-between mb-6 px-2">
               <div className="flex items-center gap-2">
                 <BookOpen className="w-5 h-5 text-indigo-500" />
                 <h2 className="text-sm font-bold tracking-widest uppercase text-gray-400">Available Subjects</h2>
               </div>
               <span className="text-[10px] font-mono text-gray-600">{subjects.length} Folders Found</span>
            </div>
            
            {/* Subjects Grid/List */}
            <div className="space-y-4">
              <AnimatePresence>
                {subjects.map((folder, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link href={`/course/${params.id}/${encodeURIComponent(folder)}`}>
                      <div className="group relative bg-[#0d0d0d] p-5 rounded-2xl border border-white/5 flex items-center justify-between active:scale-[0.97] transition-all hover:bg-[#121212] hover:border-indigo-500/40">
                        <div className="flex items-center gap-5 relative z-10">
                          {/* Premium Folder Icon */}
                          <div className="relative">
                            <div className="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-20 blur-lg transition-opacity" />
                            <div className="w-14 h-14 bg-[#161616] border border-white/5 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-all duration-300">
                              <Folder className="w-7 h-7" />
                            </div>
                          </div>
                          
                          <div className="flex flex-col">
                            <span className="font-bold text-base md:text-lg text-gray-300 group-hover:text-white transition-colors line-clamp-1 italic">
                              {folder}
                            </span>
                            <span className="text-[10px] text-gray-600 font-medium group-hover:text-gray-400 transition-colors">
                              Click to view lectures
                            </span>
                          </div>
                        </div>
                        
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-500 transition-all duration-300">
                          <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                        </div>
                        
                        {/* Hover Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/[0.02] to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </main>

      {/* Modern Backdrop decoration */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-screen-xl h-full pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-indigo-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] right-[5%] w-80 h-80 bg-purple-600/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
