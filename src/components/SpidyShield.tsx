'use client';
import { useEffect } from 'react';

export default function SpidyShield() {
  useEffect(() => {
    // 1. Right Click Disable
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Keyboard Shortcuts Block (F12, Ctrl+Shift+I, Ctrl+U, etc.)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') || 
        (e.ctrlKey && e.shiftKey && e.key === 'J') || 
        (e.ctrlKey && e.key === 'U') ||
        (e.ctrlKey && e.key === 'S')
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // 3. DevTools Detect & Freeze (Debugger Trap)
    // Ye code browser ko rok dega agar koi Inspect element kholne ki koshish karega
    const freezeDevTools = () => {
      if (process.env.NODE_ENV === 'production') {
        setInterval(() => {
          const start = performance.now();
          // Debugger statement browser ko rok deta hai agar DevTools open ho
          debugger; 
          if (performance.now() - start > 100) {
            document.body.innerHTML = '<div style="background:black;color:red;height:100vh;display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:bold;">SPIDY SECURITY: DEVTOOLS NOT ALLOWED 🚫</div>';
          }
        }, 1000);
      }
    };

    // Event Listeners Add Karo
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    
    // Trap Chalu Karo
    freezeDevTools();

    // Cleanup (Jab component hate to listeners hata do)
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null; // Ye component screen par kuch nahi dikhayega, bas background me kaam karega
}
