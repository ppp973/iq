'use client';
import { useEffect } from 'react';
import DisableDevtool from 'disable-devtool';

export default function AdvancedSecurity() {
  useEffect(() => {
    DisableDevtool({
      // 1. Agar DevTools khula, to kya karein?
      ondevtoolopen: (type) => {
        // Option A: Website Gayab kardo
        document.body.innerHTML = `
          <div style="height:100vh;background:black;color:red;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:monospace;text-align:center;">
            <h1 style="font-size:40px;">⚠️ SECURITY ALERT ⚠️</h1>
            <p style="font-size:20px;">SPIDY UNIVERSE: DEVTOOLS ARE BANNED.</p>
            <p>Your IP has been logged. Close DevTools to continue.</p>
          </div>
        `;
        
        // Option B: Tab hi band kardo (Browser allow kare to)
        // window.close();
        
        // Option C: Redirect kardo (Jise maza chakhana ho)
        // window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; 
      },

      // 2. Security Settings
      disableMenu: true,      // Right Click Band
      disableSelect: true,    // Text Selection Band
      disableCopy: true,      // Copy (Ctrl+C) Band
      disableCut: true,       // Cut (Ctrl+X) Band
      disablePaste: true,     // Paste (Ctrl+V) Band
      
      // 3. Detection Modes (Sab On kar diye)
      detectors: [
        1, // Shortcuts detect
        0, // Unknown sources
        3, // Window resize detection (Inspect element side me kholne par)
        4, // Mouse hover detection
      ],

      // 4. Clear Log (Console saaf rakhega taaki kuch dikhe na)
      clearLog: true, 
      
      // 5. Interval (Har 200ms me check karega)
      interval: 200, 
    });
  }, []);

  return null;
}
