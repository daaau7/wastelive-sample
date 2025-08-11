// src/components/Hero.tsx

import React from 'react';

const Hero = () => {
  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">Next.js 15.3 Template Using Reown AppKit and TailwindCSS</h1>
      <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
        <div>
          <div className="mb-1 text-gray-400">Get started by editing this page in</div>
          <div className="inline-block bg-gray-800 px-3 py-1 rounded text-sm font-mono">/src/app/page.tsx</div>
        </div>
        <div>
          <div className="mb-1 text-gray-400">To configure supported chains, edit</div>
          <div className="inline-block bg-gray-800 px-3 py-1 rounded text-sm font-mono">/src/lib/networks.ts</div>
        </div>
      </div>
      <a
        href="https://github.com/lrmn7/wastelive-items"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black rounded font-semibold hover:bg-yellow-400 transition mb-8"
      >
        <span>⭐</span> Star on Github
      </a>
      <div className="text-gray-400 text-sm mt-8">
        Free template by <a href="https://lrmn.link" className="underline hover:text-white" target="_blank" rel="noopener noreferrer">L RMN</a>
      </div>
    </main>
  );
};

export default Hero;