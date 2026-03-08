
'use client';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Shield, User } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#000000]/90 backdrop-blur-md border-b border-white/10 h-16 flex items-center px-4 justify-between safe-area-top">
      <div className="flex items-center gap-3">
        {!isHome ? (
          <button 
            onClick={() => router.back()} 
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white active:scale-90 transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        ) : (
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Shield className="w-6 h-6 text-white" />
          </div>
        )}
        
        <div className="flex flex-col">
          <h1 className="text-lg font-black tracking-wide text-white leading-none">
            STUDY<span className="text-indigo-500">IQ</span>
          </h1>
          <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em]">SPIDYUNIVERSE</span>
        </div>
      </div>

      {isHome && (
        <Link href="/developer">
          <div className="w-10 h-10 rounded-full border border-white/20 p-0.5">
            <img src="/Lalit.jpg" className="w-full h-full rounded-full object-cover" alt="Lalit" />
          </div>
        </Link>
      )}
    </nav>
  );
            }
