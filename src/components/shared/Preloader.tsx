"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";


const names = [
  "アビナッシュ",
  "अविनाश कुमार",       
  "অবিনাশ কুমার",      
  "અવિનાશ કુમાર",       
  "ଅବିନାଶ କୁମାର",   
  "ਅਵਿਨਾਸ਼ ਕੁਮਾਰ",      
  "అవినాష్ కుమార్",        
  "اویناش کمار",     
  "Avinash Kumar",       
]

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState(names[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Only run on initial load
    // const storedLoad = sessionStorage.getItem("hasLoaded");

    // if (storedLoad) {
    //   setIsLoading(false);
    //   return;
    // }

    if (index < names.length - 1) {
      const timer = setTimeout(() => {
        const nextIndex = index + 1;
        // Animate out
        gsap.to(".preloader-text", {
          opacity: 0,
          y: -10,
          duration: 0.1,
          onComplete: () => {
            setIndex(nextIndex);
            setName(names[nextIndex]);
            // Animate in
            gsap.fromTo(".preloader-text",
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.1 }
            );
          }
        });
      }, 100);

      return () => clearTimeout(timer);
    }

    // When the array completes, trigger the GSAP exit animation
    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
        sessionStorage.setItem("hasLoaded", "true");
      },
    });

    // Step 1: Fade background to reveal the site behind the text
    tl.to(preloaderRef.current, {
      backgroundColor: "rgba(0, 0, 0, 0)",
      duration: 1,
      ease: "power2.inOut",
      delay: 0.5
    })
      // Step 2: Fade the text slightly after background starts fading
      .to(".preloader-text", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
      }, "-=0.6");

    return () => {
      tl.kill();
    };
  }, [index]);

  if (!isLoading && typeof window !== 'undefined' && sessionStorage.getItem("hasLoaded")) {
    return null;
  }

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background"
      style={{
        pointerEvents: isLoading ? 'auto' : 'none'
      }}
    >
      <div className="flex flex-col items-center justify-center text-center w-full max-w-[800px] mx-auto z-10 px-4">
        {/* Top layout sync (matches pill height) */}
        <div className="max-sm:mb-0 mb-7 invisible" aria-hidden="true">
          <div className="py-1 px-3 text-[11px]">&nbsp;</div>
        </div>

        <motion.h1
          className={`preloader-text font-erode ${index === names.length - 1 
            ? "text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6rem]" 
            : "text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[6.5rem]"} font-extrabold tracking-[-0.05em] leading-[0.9] mb-5 drop-shadow-sm text-foreground`}
        >
          {name}
        </motion.h1>

        {/* Bottom layout sync (matches description height) */}
        <div className="mb-10 max-w-full sm:max-w-[80%] invisible" aria-hidden="true">
          <p className="text-[16px] sm:text-[18px] md:text-[20px] leading-[1.65] line-clamp-2">
            &nbsp;<br />&nbsp;
          </p>
        </div>

        {/* Bottom layout sync (matches buttons height) */}
        <div className="flex items-center gap-3 md:gap-4 invisible" aria-hidden="true">
          <div className="py-2.5 sm:py-3 px-5 sm:px-6">&nbsp;</div>
        </div>
      </div>
    </div>
  );
}
