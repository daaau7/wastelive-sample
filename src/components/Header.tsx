"use client";

import React from 'react';
import "@reown/appkit-wallet-button/react";
const Header = () => {
  return (
    <header className="w-full flex items-center justify-between px-8 py-4 border-b border-white/10">
    {/*  <div className="text-2xl font-bold">WasteLive</div> */}
     <div></div> 
      <div>
      <appkit-wallet-button
        wallet="walletConnect"
      />
      </div>
    </header>
  );
};

export default Header;