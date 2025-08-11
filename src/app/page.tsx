// src/app/page.tsx

"use client";

import Header from "@/components/Header";
import MarketplaceSection from "@/components/Marketplace";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col text-white 
      bg-black 
      bg-[url('/wastelive-bg.png')] 
      bg-cover 
      bg-center 
      bg-fixed"
    >
      <Header />
      <MarketplaceSection />
    </div>
  );
}