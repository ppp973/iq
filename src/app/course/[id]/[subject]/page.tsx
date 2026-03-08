'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { Loader2, Play, FileText, Download, ChevronRight, Layout, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SubjectContent({ params }: { params: { id: string, subject: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<any[]>([]);
  const [pdfs, setPdfs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'video' | 'pdf'>('video');
  const subjectName = decodeURIComponent(params.subject);

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
          let items: any[] = [];
          if (rawData.data) items = rawData.data;
          else if (rawData.courseContent) items = rawData.courseContent;
          else if (rawData.lectures) items = rawData.lectures;

          const filtered = items.filter((item: any) => (item.parentTitle || "General") === subjectName);
          
          setVideos(filtered.filter((i: any) => i.videoUrl || i.video_url));
          setPdfs(filtered.filter((i: any) => i.textUploadUrl || i.pdfUrl));
        }
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    fetchData();
  }, [params.id, subjectName]);

  const playVideo = (url: string) => {
    router.push(`/player?url=${encodeURIComponent(url)}`);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 pb-10 overflow-hidden relative">
      {/* Background Premium Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-indigo-600/10 blur-[100px] pointer-events-none" />
      
      <Navbar />

      <div className="pt-24 px-4 max-w-3xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-2">
             <div className="h-1 w-8 bg-indigo-500 rounded-full" />
             <span className="text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase">Subject Materials</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">{subjectName}</h1>
          <p className="text-sm text-zinc-500 mt-1">Explore your premium lectures and notes</p>
        </motion.div>

        {/* Premium Tab Switcher */}
        <div className="flex p-1.5 bg-zinc-900/50 backdrop-blur-xl rounded-2xl mb-8 border border-white/5 relative">
          <motion.div 
            layoutId="tab-bg"
            className="absolute inset-y-1.5 rounded-xl bg-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.4)]"
            style={{ 
              left: activeTab === 'video' ? '6px' : '50%', 
              width: 'calc(50% - 9px)' 
            }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
          <button 
            onClick={() => setActiveTab('video')} 
            className={`relative z-10 flex-1 py-3.5 flex items-center justify-center gap-2 font-bold text-sm transition-colors ${activeTab === 'video' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Video size={18} /> Videos <span className="text-[10px] opacity-60 bg-black/20 px-1.5 py-0.5 rounded-md">{videos.length}</span>
          </button>
          <button 
            onClick={() => setActiveTab('pdf')} 
            className={`relative z-10 flex-1 py-3.5 flex items-center justify-center gap-2 font-bold text-sm transition-colors ${activeTab === 'pdf' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Layout size={18} /> PDFs <span className="text-[10px] opacity-60 bg-black/20 px-1.5 py-0.5 rounded-md">{pdfs.length}</span>
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center pt-20 gap-4">
            <Loader2 className="animate-spin text-indigo-500 w-10 h-10" />
            <p className="text-zinc-500 font-medium animate-pulse">Fetching Premium Content...</p>
          </div>
        ) : (
          <motion.div 
            layout
            className="space-y-4"
          >
            <AnimatePresence mode="wait">
              {activeTab === 'video' ? (
                <motion.div 
                  key="video-list"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-3"
                >
                  {videos.map((item, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => playVideo(item.videoUrl || item.video_url)}
                      className="group bg-zinc-900/40 backdrop-blur-md p-4 rounded-3xl border border-white/5 flex gap-4 items-center hover:bg-zinc-900/80 hover:border-indigo-500/30 transition-all cursor-pointer"
                    >
                      <div className="w-14 h-14 bg-indigo-600/10 rounded-2xl flex items-center justify-center shrink-0 border border-indigo-500/20 group-hover:bg-indigo-600 transition-colors duration-300">
                        <Play className="w-6 h-6 text-indigo-500 group-hover:text-white fill-current" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-[15px] text-zinc-100 line-clamp-2 leading-snug">{item.name || item.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Premium Lecture</span>
                        </div>
                      </div>
                      <ChevronRight className="text-zinc-700 group-hover:text-indigo-500 transition-colors" size={20} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  key="pdf-list"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-3"
                >
                  {pdfs.map((item, i) => (
                    <motion.a 
                      key={i} 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={item.textUploadUrl || item.pdfUrl} 
                      target="_blank"
                      className="group bg-zinc-900/40 backdrop-blur-md p-4 rounded-3xl border border-white/5 flex gap-4 items-center hover:bg-zinc-900/80 hover:border-rose-500/30 transition-all"
                    >
                      <div className="w-14 h-14 bg-rose-500/10 rounded-2xl flex items-center justify-center shrink-0 border border-rose-500/20 group-hover:bg-rose-500 transition-colors duration-300">
                        <FileText className="w-6 h-6 text-rose-500 group-hover:text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-[15px] text-zinc-100 line-clamp-2 leading-snug">{item.name || item.title}</h3>
                        <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">Digital Notes</span>
                      </div>
                      <Download className="w-5 h-5 text-zinc-700 group-hover:text-rose-500 transition-colors" />
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            
            {((activeTab === 'video' && videos.length === 0) || (activeTab === 'pdf' && pdfs.length === 0)) && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="inline-flex p-5 bg-zinc-900 rounded-full mb-4 border border-white/5">
                  <Layout className="text-zinc-700 w-10 h-10" />
                </div>
                <p className="text-zinc-500 font-medium">Is category mein abhi kuch nahi hai.</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
