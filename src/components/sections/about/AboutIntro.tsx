"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTag from "./SectionTag";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutIntro() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-anim='intro']", {
        y: 40,
        opacity: 0,
        filter: "blur(6px)",
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="px-6 pt-32 pb-16 md:pt-44 md:pb-24">
      <div className="mx-auto max-w-3xl space-y-10">
        {/* tag + heading */}
        <div className="space-y-6 text-center">
          <div data-anim="intro">
            <SectionTag>About</SectionTag>
          </div>
          <h1
            data-anim="intro"
            className="font-erode text-4xl font-semibold leading-tight tracking-tight md:text-6xl"
          >
            I don&apos;t write code.
            <br />
            <span className="text-primary">I ship products.</span>
          </h1>
        </div>

        {/* paragraphs */}
        <div
          data-anim="intro"
          className="space-y-5 text-justify font-poppins text-base leading-relaxed text-foreground/60 md:text-lg"
        >
          <p>
            I&apos;m Avinash, a Computer Science graduate from 2025, originally
            from Jalandhar.
          </p>
          <p>
            I build products for the internet &mdash; SaaS tools, platforms,
            apps, experiments. Not practice projects, but things meant to be
            used.
          </p>
          <p>
            Most ideas start small.
            <br />I just like taking them to the point where they actually work.
          </p>
          <p>
            Over time I moved from web to full-stack systems, mobile apps, and
            now into automation and AI workflows. The aim hasn&apos;t changed
            though &mdash; keep building things that solve real problems and
            keep getting better at it.
          </p>
        </div>
      </div>
    </section>
  );
}
