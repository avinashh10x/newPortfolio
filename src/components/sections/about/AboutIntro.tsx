"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-anim='about']", {
        y: 30,
        opacity: 0,
        filter: "blur(6px)",
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const isAnyHovered = hoveredLink !== null;

  return (
    <section ref={ref} className="w-full min-h-[100svh] flex flex-col justify-center items-center px-4 md:px-6 relative overflow-hidden">
      <div className="flex flex-col items-center justify-center text-center w-full max-w-[800px] mx-auto z-10 space-y-8 py-20">

        {/* Section Header */}
        {/* <div data-anim="about">
          <h2 className="font-erode text-[3rem] sm:text-[4.5rem] md:text-[5.5rem] font-[800] tracking-[-0.05em] sm:tracking-[-0.06em] leading-[0.9] text-foreground drop-shadow-sm">
            I don&apos;t write code.<br />
            <span className="text-primary/90">I ship products.</span>
          </h2>
        </div> */}

        {/* Editorial Bio Paragraph */}
        <div data-anim="about" className="w-full max-w-[95%] md:max-w-[85%] mx-auto mt-6">
          <p className={`font-sans text-[16px] sm:text-[18px] md:text-[22px] leading-[1.65] font-medium tracking-[-0.01em] transition-colors duration-500 ${isAnyHovered ? 'text-foreground/20' : 'text-foreground/60'}`}>
            23yo CSE Graduate ('25) building full-stack products for the web.
            Currently working on <ClickableText text="Plingo" id="plingo" hoveredId={hoveredLink} onSetHover={setHoveredLink} href="https://plingo.byavi.in" />, an all-in-one social media scheduler, and{" "}
            <ClickableText text="Tingy" id="tingy" hoveredId={hoveredLink} onSetHover={setHoveredLink} href="https://tingy.byavi.in" />, an image compression tool reducing file sizes by up to 80%.
            I design scalable systems and turn ideas into shipped products.
            Follow my work on <ClickableText text="X" id="x" hoveredId={hoveredLink} onSetHover={setHoveredLink} href="https://twitter.com/avinashh10x" /> or explore the code on{" "}
            <ClickableText text="GitHub" id="github" hoveredId={hoveredLink} onSetHover={setHoveredLink} href="https://github.com/avinashh10x" /> — and if you'd like to collaborate, reach out via{" "}
            <ClickableText text="Email" id="email" hoveredId={hoveredLink} onSetHover={setHoveredLink} href="mailto:Avinashbuilds@gmail.com" />.
            {" "}
            Or get a quick overview through my <ClickableText text="resume" id="resume" hoveredId={hoveredLink} onSetHover={setHoveredLink} href="/aviResume.pdf" />.
          </p>
        </div>

      </div>
    </section>
  );
}

const ClickableText = ({
  text,
  href,
  id,
  hoveredId,
  onSetHover
}: {
  text: string,
  href: string,
  id: string,
  hoveredId: string | null,
  onSetHover: (id: string | null) => void
}) => {
  const isHovered = hoveredId === id;
  const isOthersHovered = hoveredId !== null && !isHovered;

  return (
    <Link
      href={href}
      onMouseEnter={() => onSetHover(id)}
      onMouseLeave={() => onSetHover(null)}
      className={`relative z-20 font-semibold underline decoration-foreground/20 underline-offset-4 hover:decoration-primary transition-all duration-300 inline-block
        ${isHovered ? 'text-primary  !opacity-100' : ''}
        ${isOthersHovered ? 'text-foreground/20 !opacity-100' : 'text-foreground/90 '}
      `}
    >
      {text}
    </Link>
  );
}
