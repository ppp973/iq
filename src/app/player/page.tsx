'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { X, Loader2, ExternalLink, RefreshCw, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function PlayerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  const PROXY_PLAYER_BASE = "https://utkarsh-player.netlify.app/player?url=";

  useEffect(() => {
    const rawUrl = searchParams.get('url');
    if (rawUrl) {
      setVideoUrl(rawUrl.trim());
    }
  }, [searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isIframeLoaded) setIsError(true);
    }, 10000); // 10 seconds timeout
    return () => clearTimeout(timer);
  }, [isIframeLoaded]);

  if (!videoUrl) {
    return (
      <div className="flex flex-col items-center justify-center h-[100dvh] bg-zinc-950 text-white">
        <div className="relative mb-6">
           <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
           <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full animate-pulse" />
        </div>
        <p className="text-[10px] font-black tracking-[0.5em] text-zinc-500 uppercase">
          Initializing Stream
        </p>
      </div>
    );
  }

  const finalSrc = `${PROXY_PLAYER_BASE}${encodeURIComponent(videoUrl)}`;

  return (
    <div className="relative w-full h-[100dvh] bg-black overflow-hidden flex flex-col">
      
      {/* TOP OVERLAY BAR */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="absolute top-0 left-0 w-full p-6 z-[60] flex justify-between items-center bg-gradient-to-b from-black/95 via-black/50 to-transparent pt-8"
      >
        <div className="flex items-center gap-4 pointer-events-auto">
          <button
            onClick={() => router.back()}
            className="w-12 h-12 rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white active:scale-90 transition-all hover:bg-white/10 hover:border-white/20"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="hidden md:block">
             <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-indigo-400" />
                <span className="text-[10px] font-black text-indigo-400 tracking-[0.2em] uppercase">Secured Premium Link</span>
             </div>
             <p className="text-xs text-zinc-400 font-bold max-w-[200px] truncate">Spidy Cinema Mode</p>
          </div>
        </div>

        <div className="flex items-center gap-3 pointer-events-auto">
            <button
                onClick={() => {
                   setIsIframeLoaded(false);
                   const frame = document.getElementById('video-frame') as HTMLIFrameElement;
                   if (frame) frame.src = finalSrc;
                }}
                className="w-12 h-12 rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all active:rotate-180 duration-500"
            >
                <RefreshCw className="w-5 h-5" />
            </button>
            <a
              href={finalSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-black px-5 py-3 rounded-2xl shadow-xl active:scale-95 transition-all group overflow-hidden relative"
            >
              <span className="text-[11px] font-black tracking-tighter relative z-10 group-hover:text-indigo-600 transition-colors">
                EXTERNAL PLAYER
              </span>
              <ExternalLink className="w-4 h-4 relative z-10 group-hover:text-indigo-600 transition-colors" />
            </a>
        </div>
      </motion.div>

      {/* THE PLAYER CONTAINER */}
      <div className="w-full h-full relative z-10 bg-black flex items-center justify-center">
        {!isIframeLoaded && (
            <div className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center">
                 <Loader2 className="w-8 h-8 text-zinc-700 animate-spin mb-4" />
                 <p className="text-[10px] font-bold text-zinc-700 tracking-widest uppercase">Buffering Source...</p>
            </div>
        )}
        <iframe
          id="video-frame"
          src={finalSrc}
          onLoad={() => setIsIframeLoaded(true)}
          className="w-full h-full border-none relative z-30"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        />
      </div>

      {/* ERROR ALERT POPUP */}
      <AnimatePresence>
        {isError && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[70] w-[90%] max-w-md"
          >
            <div className="bg-zinc-950/90 backdrop-blur-2xl border border-red-500/20 p-5 rounded-[2rem] shadow-2xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 shrink-0">
                   <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-black text-white leading-none mb-1 uppercase tracking-tight">Stream Issue?</p>
                  <p className="text-[10px] text-zinc-500 font-medium">Switching to External Player usually fixes it.</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsError(false)}
                  className="px-4 py-3 bg-zinc-900 text-zinc-400 rounded-xl text-[10px] font-bold uppercase"
                >
                  Dismiss
                </button>
                <a
                  href={finalSrc}
                  target="_blank"
                  className="px-4 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase flex items-center gap-1"
                >
                  Fix <Zap size={10} className="fill-current" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DECORATIVE LIGHTING EFFECT */}
      <div className="fixed top-0 left-1/4 w-1/2 h-2 bg-indigo-500/20 blur-3xl pointer-events-none z-[61]" />
    </div>
  );
}

export default function VideoPlayerPage() {
  return (
    <div className="fixed inset-0 z-[9999] bg-black h-[100dvh] w-screen">
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center bg-black">
             <div className="flex flex-col items-center gap-4">
                <Loader2 className="animate-spin text-indigo-500 w-10 h-10" />
                <span className="text-[10px] font-bold text-zinc-600 tracking-[0.4em] uppercase">Spidy Player</span>
             </div>
          </div>
        }
      >
        <PlayerContent />
      </Suspense>
    </div>
  );
}
