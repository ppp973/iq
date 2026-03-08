'use client';
import { useEffect } from 'react';
import DisableDevtool from 'disable-devtool';

export default function HardBomberSecurity() {
  useEffect(() => {
    // 💀 HACKER KILLER FUNCTION
    const killHacker = () => {
        // 1. Clear Data
        try { localStorage.clear(); sessionStorage.clear(); } catch(e) {}
        
        // 2. Browser Hang/Freeze Karne ki koshish (Infinite Loop)
        // Warning: Ye browser ko crash kar sakta hai
        while(true) {
            window.location.href = "https://www.google.com";
            document.body.innerHTML = "SYSTEM CRASHED";
        }
    };

    // 🔥 STRATEGY 1: Library Protection
    DisableDevtool({
      ondevtoolopen: killHacker, // Open hote hi Kill
      disableMenu: true,
      disableSelect: true,
      disableCopy: true,
      detectors: [1, 0, 3, 4], // Resize detection ON
      interval: 200, 
    });

    // 🔥 STRATEGY 2: Aggressive Resize Detector
    // Agar user Settings se DevTools kholta hai to window size change hota hai
    let widthThreshold = window.outerWidth - window.innerWidth > 160;
    let heightThreshold = window.outerHeight - window.innerHeight > 160;
    
    if (widthThreshold || heightThreshold) {
       // Agar pehle se khula hai to turant kill karo
       killHacker();
    }

    // Resize Event Listener
    const handleResize = () => {
        if (
            (window.outerWidth - window.innerWidth > 160) || 
            (window.outerHeight - window.innerHeight > 160)
        ) {
            killHacker();
        }
    };
    window.addEventListener('resize', handleResize);

    // 🔥 STRATEGY 3: Debugger Trap (Browser Pauser)
    const interval = setInterval(() => {
      const start = performance.now();
      debugger; // Ye line DevTools khulte hi code ko ROK degi (Pause)
      if (performance.now() - start > 100) {
        killHacker();
      }
    }, 500);

    return () => {
        clearInterval(interval);
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  return null;
}
