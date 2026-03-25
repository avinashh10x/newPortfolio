"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import NumberFlow from "@number-flow/react";

export default function Preloader2() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on the home page
    if (pathname !== "/" && pathname !== "/home") return;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
        sessionStorage.setItem("hasLoaded", "true");
      }
    });

    const countObj = { value: 0 };

    // Counter animation with GSAP driving the React state
    tl.to(countObj, {
      value: 100,
      duration: 2.2, // Smooth, professional timing
      ease: "power3.inOut",
      onUpdate: () => {
        // Pass the updated value to NumberFlow
        setProgress(Math.round(countObj.value));
      }
    });

    // Fade out text, counter smoothly (removed progress bar refs)
    tl.to([textRef.current, counterRef.current, ".percent-symbol"], {
      opacity: 0,
      y: -20,
      duration: 0.6,
      ease: "power2.inOut",
      stagger: 0.1
    }, "-=0.2");

    // Elegant slide up to reveal the website
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "expo.inOut",
    }, "-=0.1");

    return () => {
      tl.kill();
    };
  }, [pathname]);

  if (pathname !== "/" && pathname !== "/home") {
    return null;
  }

  // Prevent flash after loading is complete
  if (!isLoading && typeof window !== 'undefined' && sessionStorage.getItem("hasLoaded")) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background text-foreground pointer-events-auto"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-full max-w-[300px] sm:max-w-[500px] px-8">
        
        {/* Premium, mysterious, professional intro text */}
        <div ref={textRef} className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-foreground/50 mb-6 sm:mb-8 font-poppins text-center">
          {/* Crafting Digital Excellence */}
        </div>

        {/* Counter */}
        <div className="flex items-end justify-center mb-6 overflow-hidden">
          <div
            ref={counterRef}
            className="font-erode text-6xl sm:text-7xl md:text-8xl font-medium tracking-tighter leading-none flex"
          >
            <NumberFlow 
              value={progress} 
              format={{ useGrouping: false }}
              // NumberFlow handles the rolling internal transitions to give that modern, premium blur spin effect! 
            />
          </div>
          <span className="percent-symbol text-xl sm:text-2xl md:text-3xl font-light text-foreground/50 ml-1 sm:ml-2 mb-1 sm:mb-2">
            %
          </span>
        </div>
        
      </div>
    </div>
  );
}
