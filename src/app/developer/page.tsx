'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Code, Shield, Crown, Globe } from 'lucide-react';

export default function Developer() {
  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-indigo-900/20 to-transparent"></div>
      
      <div className="z-10 w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 mb-8 hover:text-white transition">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <div className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-8 text-center relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-indigo-600 to-purple-600 opacity-20"></div>
           
           <div className="w-32 h-32 mx-auto rounded-full p-1 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 relative z-10 mb-4 shadow-xl">
             <div className="w-full h-full rounded-full overflow-hidden border-4 border-black relative">
               <Image src="/Lalit.jpg" fill alt="Lalit" className="object-cover" />
             </div>
             <div className="absolute bottom-0 right-0 bg-blue-500 p-1.5 rounded-full border-4 border-[#0f0f0f]">
               <Shield className="w-4 h-4 text-white" />
             </div>
           </div>
           
           <h1 className="text-3xl font-black text-white mb-1 tracking-tight">𝑳𝑨𝑳𝑰𝑻 △</h1>
           <p className="text-indigo-400 font-bold text-xs tracking-[0.2em] uppercase mb-6">Full Stack Developer</p>
           
           <div className="flex justify-center gap-3 mb-8">
             <span className="px-3 py-1 rounded-lg bg-[#1a1a1a] border border-[#333] text-[10px] font-bold text-gray-300">NEXT.JS</span>
             <span className="px-3 py-1 rounded-lg bg-[#1a1a1a] border border-[#333] text-[10px] font-bold text-gray-300">REACT</span>
             <span className="px-3 py-1 rounded-lg bg-[#1a1a1a] border border-[#333] text-[10px] font-bold text-gray-300">SECURE UI</span>
           </div>
           
           <div className="space-y-3 text-left">
             <div className="p-4 rounded-xl bg-[#151515] border border-white/5 flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500"><Crown className="w-5 h-5" /></div>
               <div><h3 className="font-bold text-sm">System Architect</h3><p className="text-[10px] text-gray-500">Built SpidyUniverse V2.0</p></div>
             </div>
             <div className="p-4 rounded-xl bg-[#151515] border border-white/5 flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500"><Globe className="w-5 h-5" /></div>
               <div><h3 className="font-bold text-sm">Proxy Master</h3><p className="text-[10px] text-gray-500">Secure Video Streaming</p></div>
             </div>
           </div>
           
           <div className="mt-8 pt-6 border-t border-white/5">
             <p className="text-xs text-gray-600 font-mono">"Code is Poetry." - 𝑳𝑨𝑳𝑰𝑻 △</p>
           </div>
        </div>
      </div>
    </div>
  );
}
