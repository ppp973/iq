import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

// 👇 Security Component
import HardBomberSecurity from "@/components/HardBomberSecurity";
// 👇 Tera Naya Admin Tracker
import VisitorTracker from "@/components/VisitorTracker";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SPIDY UNIVERSE",
  description: "Premium Education Portal by Lalit",
  manifest: "/manifest.json",
  icons: {
    apple: "/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.className} bg-black text-white antialiased select-none`}>
        
        {/* 1. SECURITY (Production Only) */}
        {process.env.NODE_ENV === 'production' && <HardBomberSecurity />}

        {/* 2. VISITOR TRACKER (Admin Panel Connection) */}
        <VisitorTracker />
        
        {children}
      </body>
    </html>
  );
}
