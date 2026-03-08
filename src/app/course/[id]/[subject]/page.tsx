'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { Loader2, Play, FileText, Download } from 'lucide-react';

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

          // Filter by Current Subject
          const filtered = items.filter((item: any) => (item.parentTitle || "General") === subjectName);
          
          setVideos(filtered.filter((i: any) => i.videoUrl || i.video_url));
          setPdfs(filtered.filter((i: any) => i.textUploadUrl || i.pdfUrl));
        }
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    fetchData();
  }, [params.id, subjectName]);

  const playVideo = (url: string) => {
    // Navigate to dedicated player page
    router.push(`/player?url=${encodeURIComponent(url)}`);
  };

  return (
    <div className="min-h-screen bg-black text-white pb-10">
      <Navbar />
      <div className="pt-20 px-4">
        <h1 className="text-xl font-bold text-indigo-400 mb-1">{subjectName}</h1>
        <p className="text-xs text-gray-500 mb-6">Tap on any item to open</p>

        {/* Custom Tabs */}
        <div className="flex p-1 bg-[#111] rounded-xl mb-6 border border-white/10">
          <button 
            onClick={() => setActiveTab('video')} 
            className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all ${activeTab === 'video' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500'}`}
          >
            Videos ({videos.length})
          </button>
          <button 
            onClick={() => setActiveTab('pdf')} 
            className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all ${activeTab === 'pdf' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500'}`}
          >
            PDFs ({pdfs.length})
          </button>
        </div>

        {loading ? (
           <div className="flex justify-center pt-20"><Loader2 className="animate-spin text-indigo-500" /></div>
        ) : (
          <div className="space-y-4">
            {activeTab === 'video' ? (
              videos.map((item, i) => (
                <div 
                  key={i} 
                  onClick={() => playVideo(item.videoUrl || item.video_url)}
                  className="bg-[#111] p-4 rounded-2xl border border-white/5 flex gap-4 items-center active:bg-[#222] transition-colors cursor-pointer"
                >
                  <div className="w-16 h-12 bg-black rounded-lg flex items-center justify-center shrink-0 border border-white/10 relative">
                    <Play className="w-6 h-6 text-indigo-500 fill-indigo-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-200 line-clamp-2">{item.name || item.title}</h3>
                    <span className="text-[10px] text-gray-500 mt-1 block">Click to Play</span>
                  </div>
                </div>
              ))
            ) : (
              pdfs.map((item, i) => (
                <a 
                  key={i} 
                  href={item.textUploadUrl || item.pdfUrl} 
                  target="_blank"
                  className="bg-[#111] p-4 rounded-2xl border border-white/5 flex gap-4 items-center active:bg-[#222] transition-colors"
                >
                  <div className="w-12 h-12 bg-red-900/20 rounded-lg flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm text-gray-200 line-clamp-2">{item.name || item.title}</h3>
                    <span className="text-[10px] text-gray-500 mt-1 block">Tap to View PDF</span>
                  </div>
                  <Download className="w-5 h-5 text-gray-600" />
                </a>
              ))
            )}
            
            {((activeTab === 'video' && videos.length === 0) || (activeTab === 'pdf' && pdfs.length === 0)) && (
              <div className="text-center py-20 text-gray-600">No content found in this category.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
