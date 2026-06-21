"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export default function AboutIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useLayoutEffect(() => {
    if (!ref.current || !copyRef.current) return;
    const el = copyRef.current;
    let splitText: SplitText | null = null;

    const ctx = gsap.context(() => {
      splitText = SplitText.create(el, {
        type: "lines",
        linesClass: "about-intro-line",
      });

      // Reveal the paragraph now that the lines are individually hidden,
      // so the container fades in without the un-split text flashing first.
      gsap.set(el, { opacity: 1 });
      gsap.set(splitText.lines, { y: 24, opacity: 0, filter: "blur(5px)" });

      // Each split line is its own single-line block, so the inherited
      // `text-align: justify` has nothing to stretch and falls back to the
      // centered last-line rule. Force every line but the last to justify so
      // the animating text matches the final (reverted) layout — no snap.
      const lines = splitText.lines as HTMLElement[];
      lines.forEach((line, i) => {
        line.style.textAlignLast = i === lines.length - 1 ? "center" : "justify";
      });

      gsap.to(splitText.lines, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.08,
        duration: 0.45,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        // Restore the original <p> (with justify/wrapping intact) once done,
        // so the final layout matches the server-rendered text — no shift.
        onComplete: () => splitText?.revert(),
      });
    }, ref);

    return () => {
      splitText?.revert();
      ctx.revert();
    };
  }, []);

  const isAnyHovered = hoveredLink !== null;

  return (
    <section
      ref={ref}
      className="w-full min-h-[100svh] flex flex-col justify-center items-center px-4 md:px-6 relative overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center text-center w-full max-w-[800px] mx-auto z-10 space-y-8 py-20">
        {/* Editorial Bio Paragraph */}
        <div
          data-anim="about"
          className="w-full max-w-[92vw] sm:max-w-[680px] md:max-w-[85%] mx-auto mt-6"
        >
          <p
            ref={copyRef}
            style={{ opacity: 0 }}
            className={`about-intro-copy font-sans text-[16px] sm:text-[18px] md:text-[22px] leading-[1.75] sm:leading-[1.7] md:leading-[1.65] font-medium tracking-[-0.01em] text-justify [text-wrap:pretty] [text-align-last:center] transition-colors duration-500  ${isAnyHovered ? "text-foreground/20" : "text-foreground/60"}`}
          >
            22yo CSE Graduate (&apos;25) building products with real traction.
            Currently contributing at{" "}
            <ClickableText
              text="DZINR"
              id="dzinr"
              hoveredId={hoveredLink}
              onSetHover={setHoveredLink}
              href="https://dzinrstudio.com/"
            />
            , a Branding Studio platform serving 10K+ monthly visitors, while
            independently building{" "}
            <ClickableText
              text="Gridme"
              id="gridme"
              hoveredId={hoveredLink}
              onSetHover={setHoveredLink}
              href="https://gridme.in"
            />
            , a precision layout engine for Adobe Illustrator that helps
            designers generate production-ready grids in seconds. I ship fast,
            solve real user problems, and turn ideas into scalable products.
            Explore my work and follow along on{" "}
            <ClickableText
              text="X"
              id="x"
              hoveredId={hoveredLink}
              onSetHover={setHoveredLink}
              href="https://x.com/avinash10x"
            />
            , or explore my{" "}
            <ClickableText
              text="GitHub"
              id="github"
              hoveredId={hoveredLink}
              onSetHover={setHoveredLink}
              href="https://github.com/avinashh10x"
            />
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
  onSetHover,
}: {
  text: string;
  href: string;
  id: string;
  hoveredId: string | null;
  onSetHover: (id: string | null) => void;
}) => {
  const isHovered = hoveredId === id;
  const isOthersHovered = hoveredId !== null && !isHovered;

  return (
    <Link
      href={href}
      onMouseEnter={() => onSetHover(id)}
      onMouseLeave={() => onSetHover(null)}
      className={`relative z-20 font-semibold decoration-foreground/20 hover:decoration-primary transition-all duration-300 inline-block
        ${isHovered ? "text-primary  !opacity-100" : ""}
        ${isOthersHovered ? "text-foreground/20 !opacity-100" : "text-foreground/90 "}
      `}
    >
      {text}
    </Link>
  );
};
