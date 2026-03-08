'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation'; // Added missing imports
import { ChevronLeft, Shield } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <nav className="fixed top-0 w-full z-[100] bg-zinc-950/70 backdrop-blur-xl border-b border-white/5 h-20 flex items-center px-6 justify-between transition-all duration-300">
      <div className="flex items-center gap-4">
        {!isHome ? (
          <button 
            onClick={() => router.back()} 
            className="group w-11 h-11 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white active:scale-95 transition-all hover:border-indigo-500/50 hover:bg-zinc-800"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>
        ) : (
          <div className="relative">
            {/* Soft Glow behind the icon */}
            <div className="absolute inset-0 bg-indigo-600 blur-lg opacity-20" />
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/20 ring-1 ring-white/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
        )}
        
        <div className="flex flex-col">
          <h1 className="text-xl font-black tracking-tighter text-white leading-none">
            STUDY<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">IQ</span>
          </h1>
          <div className="flex items-center gap-1.5 mt-1">
             <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
             <span className="text-[10px] font-bold text-zinc-500 tracking-[0.25em] uppercase">
               Universe
             </span>
          </div>
        </div>
      </div>

      {isHome && (
        <Link href="/developer" className="relative group">
          {/* Outer Ring Animation */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />
          
          <div className="relative w-11 h-11 rounded-full border-2 border-zinc-800 p-0.5 bg-zinc-950 overflow-hidden group-hover:border-transparent transition-colors">
            <img 
              src="/Lalit.jpg" 
              className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
              alt="Lalit" 
            />
          </div>
        </Link>
      )}
    </nav>
  );
}
