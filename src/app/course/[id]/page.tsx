'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import WhatsAppModal from '@/components/WhatsAppModal'; // Import New Modal
import { Loader2, Folder, ChevronRight } from 'lucide-react';

export default function CourseSubjects({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [courseName, setCourseName] = useState('');
  const [showWA, setShowWA] = useState(true); // Control Modal

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
    <div className="min-h-screen bg-black text-white pb-10">
      <Navbar />

      {/* NEW PREMIUM MODAL */}
      <WhatsAppModal isOpen={showWA} onClose={() => setShowWA(false)} />

      <div className="pt-24 px-4 max-w-2xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
            <p className="text-gray-500 font-mono text-sm tracking-widest">DECRYPTING...</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
               <span className="text-[10px] font-bold text-indigo-500 bg-indigo-500/10 px-2 py-1 rounded mb-2 inline-block">BATCH ID: {params.id}</span>
               <h1 className="text-2xl font-bold leading-tight text-white">{courseName}</h1>
            </div>
            
            <p className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-4 ml-1">
              Select Subject ({subjects.length})
            </p>
            
            <div className="space-y-3">
              {subjects.map((folder, i) => (
                <Link key={i} href={`/course/${params.id}/${encodeURIComponent(folder)}`}>
                  <div className="bg-[#111] p-5 rounded-2xl border border-white/5 flex items-center justify-between active:scale-[0.98] transition-all hover:bg-[#161616] hover:border-indigo-500/30 group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-900/10 rounded-xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Folder className="w-6 h-6" />
                      </div>
                      <span className="font-bold text-base text-gray-200 line-clamp-1 group-hover:text-white">{folder}</span>
                    </div>
                    <ChevronRight className="text-gray-600 group-hover:text-white transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
            }
