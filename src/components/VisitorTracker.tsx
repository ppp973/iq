'use client';
import Script from 'next/script';

export default function VisitorTracker() {
  return (
    <>
      {/* 1. Socket.io Library Load karo */}
      <Script 
        src="https://devlalitadmin.onrender.com/socket.io/socket.io.js"
        strategy="lazyOnload"
        onLoad={() => {
          try {
            // @ts-ignore
            if (window.io) {
              
              // --- TERA UNIQUE ID LOGIC START ---
              
              // 1. Check karo ki user ke paas purana ID card hai ya nahi
              let visitorId = localStorage.getItem('visitor_id');
               
              // Agar nahi hai, to naya banao (Random Number + Time)
              if (!visitorId) {
                  visitorId = 'user_' + Math.random().toString(36).substr(2, 9) + Date.now();
                  localStorage.setItem('visitor_id', visitorId);
              }

              // 2. Server ko ID ke saath connect karo
              // @ts-ignore
              const socket = window.io("https://devlalitadmin.onrender.com", { 
                  query: { 
                      type: 'visitor',
                      visitorId: visitorId  // Ye gyi Unique ID server pe
                  } 
              });

              console.log("🟢 Connected to Admin. ID:", visitorId);
              
              // --- LOGIC END ---
            }
          } catch (e) {
            console.error("Tracking Connection Failed:", e);
          }
        }}
      />
    </>
  );
}
