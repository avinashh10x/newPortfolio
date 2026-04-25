"use client";

import { useEffect, useRef, useState } from "react";
import gsap, { ScrollTrigger, SplitText } from "gsap/all";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export default function AboutIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    let splitText: SplitText | null = null;

    const ctx = gsap.context(() => {
      splitText = SplitText.create(".about-intro-copy", {
        type: "lines",
        linesClass: "about-intro-line",
      });

      gsap.from(splitText.lines, {
        y: 24,
        opacity: 0,
        filter: "blur(5px)",
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);

    return () => {
      splitText?.revert();
      ctx.revert();
    };
  }, []);

  const isAnyHovered = hoveredLink !== null;

  return (
    <section ref={ref} className="w-full min-h-[100svh] flex flex-col justify-center items-center px-4 md:px-6 relative overflow-hidden">
      <div className="flex flex-col items-center justify-center text-center w-full max-w-[800px] mx-auto z-10 space-y-8 py-20">

        {/* Section Header */}
        {/* <div data-anim="about">
          <h2 className="font-heading text-[3rem] sm:text-[4.5rem] md:text-[5.5rem] font-normal tracking-[-0.05em] sm:tracking-[-0.06em] leading-[0.9] text-foreground drop-shadow-sm">
            I don&apos;t write code.<br />
            <span className="text-primary/90">I ship products.</span>
          </h2>
        </div> */}

        {/* Editorial Bio Paragraph */}
        <div data-anim="about" className="w-full max-w-[92vw] sm:max-w-[680px] md:max-w-[85%] mx-auto mt-6">
          <p className={`about-intro-copy font-sans text-[16px] sm:text-[18px] md:text-[22px] leading-[1.75] sm:leading-[1.7] md:leading-[1.65] font-medium tracking-[-0.01em] text-justify sm:text-center [text-wrap:pretty] [text-align-last:center] sm:[text-align-last:center] transition-colors duration-500 ${isAnyHovered ? 'text-foreground/20' : 'text-foreground/60'}`}>
            23yo CSE Graduate (&apos;25) building products with real traction.
            Currently - <ClickableText text="DZINR" id="dzinr" hoveredId={hoveredLink} onSetHover={setHoveredLink} href="https://www.dzinr.in/" />, a Branding Studio platform handles 10K+ monthly visitors, and{" "}
            <ClickableText text="Tingy" id="tingy" hoveredId={hoveredLink} onSetHover={setHoveredLink} href="https://tingy.byavi.in" />, an intelligent image compression tool reducing file sizes by up to 99% with near-zero quality loss.
            I ship fast, solve real user problems, and turn ideas into scalable products.
            Explore my work and follow along on{" "}
            <ClickableText text="X" id="x" hoveredId={hoveredLink} onSetHover={setHoveredLink} href="https://x.com/avinash10x" />, or explore my {" "}
            <ClickableText text="GitHub" id="github" hoveredId={hoveredLink} onSetHover={setHoveredLink} href="https://github.com/avinashh10x" />
            
            {/* , reach out via{" "}
            <ClickableText text="Email" id="email" hoveredId={hoveredLink} onSetHover={setHoveredLink} href="mailto:Avinashbuilds@gmail.com" /> */}
            
            {/* , or get a quick overview through my{" "}
            <ClickableText text="resume" id="resume" hoveredId={hoveredLink} onSetHover={setHoveredLink} href="/aviResume.docx" />. */}
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
      className={`relative z-20 font-semibold decoration-foreground/20 hover:decoration-primary transition-all duration-300 inline-block
        ${isHovered ? 'text-primary  !opacity-100' : ''}
        ${isOthersHovered ? 'text-foreground/20 !opacity-100' : 'text-foreground/90 '}
      `}
    >
      {text}
    </Link>
  );
}
