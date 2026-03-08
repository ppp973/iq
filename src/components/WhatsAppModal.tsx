'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bell, ShieldCheck } from 'lucide-react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WhatsAppModal({ isOpen, onClose }: WhatsAppModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20, opacity: 0 }} 
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="relative w-full max-w-sm bg-zinc-950 border border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* Premium Animated Background Glow */}
            <div className="absolute top-[-20%] inset-x-0 h-64 bg-green-500/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="p-8 relative z-10 flex flex-col items-center text-center">
              
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-5 right-5 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-all text-zinc-500 hover:text-white active:scale-90"
              >
                <X size={20} />
              </button>

              {/* VIP Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full mb-6"
              >
                <ShieldCheck size={12} className="text-green-500" />
                <span className="text-[10px] font-black text-green-500 tracking-widest uppercase">Verified Channel</span>
              </motion.div>

              {/* Logo/Icon with Pulsing Effect */}
              <div className="relative mb-6">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full"
                />
                <div className="relative w-20 h-20 bg-zinc-900 border border-white/10 rounded-[2rem] flex items-center justify-center shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent" />
                   <svg viewBox="0 0 24 24" fill="#22c55e" className="w-10 h-10 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
              </div>

              <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Join VIPSTUDY</h2>
              <p className="text-sm text-zinc-500 mb-8 leading-relaxed px-2">
                Get instant access to <span className="text-zinc-200 font-semibold">Premium Notes</span>, Daily Leaks & Direct Updates from <span className="text-green-500 font-bold">RAJ</span>.
              </p>

              <a 
                href="https://whatsapp.com/channel/0029VbAvDSX0QeahEg4kkE3U" 
                target="_blank" 
                className="w-full group relative py-4 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-bold transition-all active:scale-95 overflow-hidden"
              >
                {/* Button Shine Effect */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <div className="flex items-center justify-center gap-2 relative z-10">
                   <Bell size={18} className="group-hover:animate-bounce" />
                   <span>Join Channel </span>
                </div>
              </a>

              <button 
                onClick={onClose}
                className="mt-5 text-[10px] font-black text-zinc-700 hover:text-zinc-400 tracking-[0.3em] uppercase transition-colors"
              >
                Not Today
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </AnimatePresence>
  );
}
