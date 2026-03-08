'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { X, Loader2, ExternalLink, RefreshCw, AlertTriangle } from 'lucide-react';

function PlayerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  // Proxy URL
  const PROXY_PLAYER_BASE = "https://lalitproxy.vercel.app/player?url=";

  useEffect(() => {
    const rawUrl = searchParams.get('url');
    if (rawUrl) {
      setVideoUrl(rawUrl.trim());
    }
  }, [searchParams]);

  // अगर 8 सेकंड तक iframe load न हो
  useEffect(() => {
    const timer = setTimeout(() => {
      const iframe = document.getElementById('video-frame');
      if (!iframe) setIsError(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  if (!videoUrl) {
    return (
      <div className="flex flex-col items-center justify-center h-[100dvh] bg-black text-white">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
        <p className="text-xs font-mono tracking-widest text-zinc-500">
          GETTING LINK...
        </p>
      </div>
    );
  }

  const finalSrc = `${PROXY_PLAYER_BASE}${encodeURIComponent(videoUrl)}`;

  return (
    <div className="relative w-full h-[100dvh] bg-black overflow-hidden flex flex-col">

      {/* TOP CONTROLS */}
      <div className="absolute top-0 left-0 w-full p-4 z-50 flex justify-between items-start pointer-events-none bg-gradient-to-b from-black/90 to-transparent h-24">
        
        <button
          onClick={() => router.back()}
          className="pointer-events-auto w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white active:scale-90 transition hover:bg-white/20"
        >
          <X className="w-5 h-5" />
        </button>

        <a
          href={finalSrc}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 border border-white/10 px-4 py-2 rounded-full shadow-lg shadow-indigo-900/20 active:scale-95 transition"
        >
          <span className="text-[10px] font-bold text-white tracking-wider">
            OPEN EXTERNALLY
          </span>
          <ExternalLink className="w-3 h-3 text-white" />
        </a>

      </div>

      {/* PLAYER */}
      <div className="w-full h-full relative z-10 bg-black">
        <iframe
          id="video-frame"
          src={finalSrc}
          className="w-full h-full border-none"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          style={{ width: '100%', height: '100%', backgroundColor: '#000' }}
        />
      </div>

      {/* ERROR POPUP */}
      {isError && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-40 bg-[#111] border border-red-500/30 p-4 rounded-2xl w-[90%] max-w-sm flex items-center justify-between shadow-2xl">

          <div className="flex items-center gap-3">
            <AlertTriangle className="text-yellow-500 w-5 h-5" />
            <div>
              <p className="text-xs font-bold text-white">
                Video not playing?
              </p>
              <p className="text-[10px] text-zinc-400">
                Try opening in native player
              </p>
            </div>
          </div>

          <a
            href={finalSrc}
            target="_blank"
            className="bg-white text-black text-xs font-bold px-3 py-2 rounded-lg"
          >
            Open
          </a>

          <button
            onClick={() => setIsError(false)}
            className="absolute -top-2 -right-2 bg-white rounded-full p-1 text-black"
          >
            <X size={12} />
          </button>

        </div>
      )}

      {/* REFRESH */}
      <button
        onClick={() => {
          const frame = document.getElementById('video-frame') as HTMLIFrameElement;
          if (frame) frame.src = finalSrc;
        }}
        className="absolute bottom-6 right-6 z-50 pointer-events-auto p-3 rounded-full bg-black/50 border border-white/10 text-white/50 hover:text-white active:scale-90 transition backdrop-blur-md"
      >
        <RefreshCw className="w-5 h-5" />
      </button>

    </div>
  );
}

export default function VideoPlayerPage() {
  return (
    <div className="fixed inset-0 z-[9999] bg-black h-[100dvh] w-screen">
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center bg-black">
            <Loader2 className="animate-spin text-indigo-500" />
          </div>
        }
      >
        <PlayerContent />
      </Suspense>
    </div>
  );
}
