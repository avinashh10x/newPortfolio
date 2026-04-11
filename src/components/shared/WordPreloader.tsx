"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

const hellos = [
  "Hello",           // English (first — fades in, holds)
  "こんにちは",       // Japanese
  "હેલો",            // Gujarati
  "హలో",            // Telugu
  "Ciao",            // Italian
  "नमस्ते",          // Hindi
];

const FIRST_WORD_HOLD = 800;  // ms — first "Hello" stays longer
const WORD_DISPLAY_DURATION = 120; // ms per subsequent word

function isHomePath(path: string) {
  return path === "/" || path === "/home";
}

export default function WordPreloader() {
  const pathname = usePathname();

  // Determine initial phase synchronously — if not home, start as "done"
  // so the preloader never renders even for a single frame
  const [phase, setPhase] = useState<"fadein" | "words" | "reveal" | "done">(
    () => (isHomePath(pathname) ? "fadein" : "done")
  );
  const [index, setIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);

  // Phase 1: Fade in the first "Hello" and hold it
  useEffect(() => {
    if (phase !== "fadein") return;
    if (!wordRef.current) return;

    // Fade in with GSAP
    gsap.fromTo(
      wordRef.current,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          // Hold for a moment, then start cycling
          setTimeout(() => {
            setIndex(1);
            setPhase("words");
          }, FIRST_WORD_HOLD);
        },
      }
    );
  }, [phase]);

  // Phase 2: Cycle through remaining words
  useEffect(() => {
    if (phase !== "words") return;

    if (index < hellos.length - 1) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, WORD_DISPLAY_DURATION);
      return () => clearTimeout(timer);
    }

    // Last word reached — hold briefly then slide up
    const holdTimer = setTimeout(() => {
      setPhase("reveal");
    }, 500);
    return () => clearTimeout(holdTimer);
  }, [index, phase]);

  // Phase 3: Slide up reveal
  const runReveal = useCallback(() => {
    if (!wrapperRef.current) return;

    gsap.set(wrapperRef.current, { willChange: "transform" });

    // Calculate total distance: viewport + curve overhang
    const totalSlide = window.innerHeight + 150;

    const tl = gsap.timeline({
      onComplete: () => setPhase("done"),
    });

    // Slide the ENTIRE wrapper up — far enough to clear the curve too
    tl.to(wrapperRef.current, {
      y: -totalSlide,
      duration: 1,
      ease: "power3.inOut",
    });

    return () => tl.kill();
  }, []);

  useEffect(() => {
    if (phase === "reveal") {
      runReveal();
    }
  }, [phase, runReveal]);

  // Never render anything on non-home routes
  if (phase === "done") return null;

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-9999 bg-foreground"
      style={{
        overflow: "visible",
        pointerEvents: "auto",
        transform: "translate3d(0, 0, 0)",
      }}
    >
      {/* Centered word */}
      <div className="flex items-center justify-center w-full h-full">
        <span
          ref={wordRef}
          className="font-medium text-4xl sm:text-5xl md:text-6xl text-background select-none"
          style={{
            opacity: phase === "fadein" ? 0 : 1,
            fontFamily:
              "'Inter', 'Noto Sans', 'Noto Sans JP', 'Noto Sans KR', 'Noto Sans SC', 'Noto Sans Arabic', 'Noto Sans Devanagari', 'Noto Sans Bengali', 'Noto Sans Gujarati', 'Noto Sans Oriya', 'Noto Sans Gurmukhi', 'Noto Sans Telugu', sans-serif",
          }}
        >
          {hellos[index]}
        </span>
      </div>

      {/* Curve hanging below the container — visible as it peels up */}
      <div
        className="absolute left-0 w-full"
        style={{
          bottom: 0,
          height: "clamp(60px, 10vw, 120px)",
          transform: "translateY(100%)",
        }}
      >
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <path
            d="M0,0 C360,120 1080,120 1440,0 L1440,0 L0,0 Z"
            className="fill-foreground"
          />
        </svg>
      </div>
    </div>
  );
}
