"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const introNames = [
  "\u30a2\u30d3\u30ca\u30c3\u30b7\u30e5",
  "\u0905\u0935\u093f\u0928\u093e\u0936 \u0915\u0941\u092e\u093e\u0930",
  "\u0985\u09ac\u09bf\u09a8\u09be\u09b6 \u0995\u09c1\u09ae\u09be\u09b0",
  "\u0a85\u0ab5\u0abf\u0aa8\u0abe\u0ab6 \u0a95\u0ac1\u0aae\u0abe\u0ab0",
  "\u0b05\u0b2c\u0b3f\u0b28\u0b3e\u0b36 \u0b15\u0b41\u0b2e\u0b3e\u0b30",
  "\u0a05\u0a35\u0a3f\u0a28\u0a3e\u0a38\u0a3c \u0a15\u0a41\u0a2e\u0a3e\u0a30",
  "\u0c05\u0c35\u0c3f\u0c28\u0c3e\u0c37\u0c4d \u0c15\u0c41\u0c2e\u0c3e\u0c30\u0c4d",
  "\u0627\u0648\u06cc\u0646\u0627\u0634 \u06a9\u0645\u0627\u0631",
  "Avinash Kumar",
];

const HOME_INTRO_EVENT = "home-intro-visibility";

const Hero3 = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const isAnyHovered = hoveredLink !== null;
  const [introIndex, setIntroIndex] = useState(0);
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.dispatchEvent(
      new CustomEvent(HOME_INTRO_EVENT, {
        detail: { visible: false },
      })
    );

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      const frameId = window.requestAnimationFrame(() => {
        setIntroIndex(introNames.length - 1);
        setIsIntroComplete(true);
        window.dispatchEvent(
          new CustomEvent(HOME_INTRO_EVENT, {
            detail: { visible: true },
          })
        );
      });

      return () => {
        window.cancelAnimationFrame(frameId);
        window.dispatchEvent(
          new CustomEvent(HOME_INTRO_EVENT, {
            detail: { visible: true },
          })
        );
      };
    }

    let timeoutId: ReturnType<typeof setTimeout>;

    const runIntro = (index: number) => {
      const isLastName = index === introNames.length - 1;
      const nextDelay = isLastName ? 450 : 140;

      timeoutId = setTimeout(() => {
        if (isLastName) {
          setIsIntroComplete(true);
          window.dispatchEvent(
            new CustomEvent(HOME_INTRO_EVENT, {
              detail: { visible: true },
            })
          );
          return;
        }

        setIntroIndex(index + 1);
        runIntro(index + 1);
      }, nextDelay);
    };

    runIntro(0);

    return () => {
      clearTimeout(timeoutId);
      window.dispatchEvent(
        new CustomEvent(HOME_INTRO_EVENT, {
          detail: { visible: true },
        })
      );
    };
  }, []);

  const currentName = introNames[introIndex];
  const contentDelay = isIntroComplete ? 0.1 : 0;

  return (
    <div className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-background px-4 text-foreground transition-colors duration-300">
      <div className="flex flex-col items-center justify-center text-center w-full max-w-[800px] mx-auto z-10">
        {/* Available for work */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isIntroComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{
            duration: 0.6,
            delay: contentDelay,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className={`flex items-center gap-2 mb-6 bg-foreground/3 py-1 px-3 rounded-md border border-foreground/8 transition-all duration-500 ${
            isAnyHovered ? "opacity-20" : "opacity-100"
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full transition-colors duration-500 ${
                isAnyHovered ? "bg-foreground/20" : "bg-foreground opacity-75"
              }`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-2 w-2 transition-colors duration-500 ${
                isAnyHovered ? "bg-foreground/20" : "bg-foreground"
              }`}
            ></span>
          </span>
          <span
            className={`text-[11px] font-sans font-medium tracking-wide transition-colors duration-500 ${
              isAnyHovered ? "text-foreground/20" : "text-foreground/70"
            }`}
          >
            Available for work
          </span>
        </motion.div>

        <div
          className={`font-erode text-[3.5rem] max-[350px]:text-[3.4rem]  sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6rem] font-extrabold tracking-[-0.05em] leading-[0.9] mb-5 max-[350px]:-mb-1 drop-shadow-sm transition-colors duration-500 ${
            isAnyHovered ? "text-foreground/20" : "text-foreground"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={`${introIndex}-${currentName}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{
                duration: isIntroComplete ? 0.45 : 0.18,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            >
              {currentName}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isIntroComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.7,
            delay: contentDelay + 0.1,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className={`font-sans text-[16px] sm:text-[18px] md:text-[20px] leading-[1.65] mb-10 max-w-full sm:max-w-[80%] font-normal tracking-[-0.01em] transition-colors duration-500 ${
            isAnyHovered ? "text-foreground/10" : "text-foreground/50"
          }`}
        >
          <strong
            className={`font-semibold transition-colors duration-500 ${
              isAnyHovered ? "text-foreground/10" : "text-foreground/80"
            }`}
          >
            Creative Developer
          </strong>{" "}
          building fast, immersive products for the web with a focus on
          performance, interaction, and clean UI/UX.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isIntroComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.5,
            delay: contentDelay + 0.2,
            ease: "easeOut",
          }}
          className="flex items-center gap-3 md:gap-4 z-20"
        >
          <Link
            href="/about"
            onMouseEnter={() => setHoveredLink("about")}
            onMouseLeave={() => setHoveredLink(null)}
            className={`font-sans text-[13px] sm:text-sm font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg transition-all duration-500 shadow-sm hover:shadow-md active:scale-95 ${
              hoveredLink === "about"
                ? "bg-foreground text-background"
                : hoveredLink === "work"
                ? "bg-foreground/90 text-background/90 opacity-40"
                : "bg-foreground text-background"
            }`}
          >
            More about me
          </Link>

          <Link
            href="/work"
            onMouseEnter={() => setHoveredLink("work")}
            onMouseLeave={() => setHoveredLink(null)}
            className={`bg-background font-sans text-[13px] sm:text-sm font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg transition-all duration-500 shadow-sm hover:shadow-md active:scale-95 border ${
              hoveredLink === "work"
                ? "border-foreground/30 text-foreground"
                : hoveredLink === "about"
                ? "border-foreground/10 text-foreground/90 opacity-50"
                : "border-foreground/15 text-foreground"
            }`}
          >
            View work
          </Link>
        </motion.div>
      </div>

      {/* Bottom line */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={isIntroComplete ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
        transition={{
          duration: 1,
          delay: contentDelay + 0.25,
          ease: "easeOut",
        }}
        className="absolute bottom-20 w-[60%] max-w-[400px] h-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
      />
    </div>
  );
};

export default Hero3;
