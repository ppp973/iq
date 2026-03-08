'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Code, Shield, Crown, Globe, Sparkles, Terminal, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Developer() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background Cinematic Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-md"
      >
        <Link href="/" className="group inline-flex items-center gap-2 text-zinc-500 mb-8 hover:text-white transition-all">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
          <span className="text-xs font-black tracking-widest uppercase">Back to VIPSTUDY</span>
        </Link>
        
        <div className="relative group">
          {/* Animated Gradient Border Layer */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="bg-zinc-950/80 backdrop-blur-2xl border border-white/5 rounded-[3rem] p-8 text-center relative overflow-hidden shadow-2xl">
            
            {/* Top Banner Effect */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-indigo-600/20 to-purple-600/20"></div>
            
            {/* Profile Section */}
            <div className="relative z-10 mb-6">
              <div className="w-32 h-32 mx-auto relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-2 bg-gradient-to-tr from-indigo-500 via-transparent to-purple-500 rounded-full opacity-40"
                />
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-zinc-950 relative z-10 shadow-2xl">
                   <Image src="/Lalit.jpg" fill alt="Lalit" className="object-cover scale-110" />
                </div>
                <motion.div 
                  whileHover={{ scale: 1.2 }}
                  className="absolute bottom-1 right-1 bg-indigo-600 p-2 rounded-xl border-4 border-zinc-950 z-20 shadow-xl"
                >
                  <Shield className="w-4 h-4 text-white fill-current" />
                </motion.div>
              </div>
            </div>
            
            {/* Name & Title */}
            <div className="relative z-10">
              <h1 className="text-4xl font-black text-white mb-1 tracking-tighter">RAJ <span className="text-indigo-500">0</span></h1>
              <div className="flex items-center justify-center gap-2 mb-6">
                 <Sparkles size={14} className="text-amber-500" />
                 <p className="text-zinc-500 font-black text-[10px] tracking-[0.4em] uppercase">Full Stack Architect</p>
              </div>
              
              {/* Tech Stack Chips */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {['Next.js 14', 'React', 'TypeScript', 'Tailwind'].map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black text-zinc-400 tracking-wider hover:bg-white/10 transition-colors uppercase">
                    {tech}
                  </span>
                ))}
              </div>
              
              {/* Achievement Cards */}
              <div className="grid gap-3 text-left">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-center gap-4 group/item"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover/item:bg-indigo-500 group-hover/item:text-white transition-all duration-500">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-xs text-white uppercase tracking-tight">System Architect</h3>
                    <p className="text-[10px] text-zinc-500 font-bold">VIPSTUDY V5.0 Engine</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 5 }}
                  className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-center gap-4 group/item"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover/item:bg-purple-500 group-hover/item:text-white transition-all duration-500">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-xs text-white uppercase tracking-tight">Proxy Master</h3>
                    <p className="text-[10px] text-zinc-500 font-bold">Encrypted Video Streaming Logic</p>
                  </div>
                </motion.div>
              </div>
              
              {/* Footer Quote */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <div className="flex items-center justify-center gap-2 text-zinc-600 group-hover:text-zinc-400 transition-colors">
                   <Code size={14} />
                   <p className="text-[10px] font-mono italic tracking-tight">"Turning logic into digital art."</p>
                </div>
                <p className="mt-4 text-[9px] font-black text-zinc-800 tracking-[0.5em] uppercase">Developed with ❤️ by RAJ</p>
              </div>
            </div>

          </div>
        </div>
      </motion.div>

      {/* Decorative Dots Background */}
      <div className="absolute inset-0 z-0 opacity-20 [background-image:radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:20px_20px]"></div>
    </div>
  );
}
