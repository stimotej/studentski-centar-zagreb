"use client";

import Script from "next/script";

declare global {
  interface Window {
    instgrm: any;
  }
}

const Embeds = () => {
  const handleLoadInstagram = () => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  };

  return (
    <Script
      async
      src="https://www.instagram.com/embed.js"
      onReady={handleLoadInstagram}
    />
  );
};

export default Embeds;
