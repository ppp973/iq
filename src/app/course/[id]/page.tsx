'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import WhatsAppModal from '@/components/WhatsAppModal';
import { Loader2, Folder, ChevronRight, BookOpen, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

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
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    fetchData();
  }, [params.id]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 pb-20 relative overflow-hidden">
      {/* Premium Ambient Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />

      <Navbar />

      {/* NEW PREMIUM MODAL */}
      <WhatsAppModal isOpen={showWA} onClose={() => setShowWA(false)} />

      <main className="pt-28 px-4 max-w-3xl mx-auto relative z-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <div className="relative mb-6">
               <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
               <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 animate-pulse" />
            </div>
            <p className="text-zinc-500 font-black text-[10px] tracking-[0.5em] uppercase">Decrypting Content</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Course Header Card */}
            <div className="mb-10 relative p-6 rounded-[2.5rem] bg-zinc-900/30 border border-white/5 backdrop-blur-xl overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <GraduationCap size={80} className="text-white" />
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                   <div className="px-2 py-0.5 bg-indigo-500 text-[10px] font-black rounded text-white tracking-tighter">BATCH {params.id}</div>
                   <div className="h-[1px] w-8 bg-zinc-800" />
                   <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Premium Course</span>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-black leading-tight text-white mb-2 drop-shadow-md">
                   {courseName}
                </h1>
                <p className="text-sm text-zinc-400 font-medium">By Spidy Universe Team</p>
            </div>
            
            <div className="flex items-center justify-between mb-6 px-2">
                <div className="flex items-center gap-2">
                    <BookOpen size={18} className="text-indigo-400" />
                    <h2 className="text-sm font-black text-zinc-200 tracking-widest uppercase">Subjects List</h2>
                </div>
                <span className="text-[10px] font-bold text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-white/5">
                   {subjects.length} FOLDERS
                </span>
            </div>
            
            {/* Subjects Grid */}
            <div className="grid gap-4">
              {subjects.map((folder, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={`/course/${params.id}/${encodeURIComponent(folder)}`}>
                    <div className="group bg-zinc-900/40 backdrop-blur-md p-5 rounded-[2rem] border border-white/5 flex items-center justify-between hover:bg-zinc-900/80 hover:border-indigo-500/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-300 active:scale-[0.98]">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-zinc-950 border border-white/5 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-inner">
                          <Folder className="w-6 h-6 fill-current opacity-80" />
                        </div>
                        <div>
                          <span className="font-bold text-lg text-zinc-200 group-hover:text-white transition-colors block">
                             {folder}
                          </span>
                          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Open Library</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-950/50 border border-white/5 group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 transition-all">
                        <ChevronRight className="text-zinc-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" size={20} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
