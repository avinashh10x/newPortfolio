"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTag from "./SectionTag";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── thematic blocks — no dates, just the vibe ── */
const CHAPTERS = [
  {
    title: "Curiosity",
    text: "Opening websites just to see how they worked, breaking things, fixing them, trying again. That phase where nothing makes sense at first.",
    accent: "var(--primary)",
  },
  {
    title: "Real Work",
    text: "Freelancing during college changed everything. Real people. Real expectations. Real pressure to deliver. That's when I stopped learning code and started building outcomes.",
    accent: "var(--primary)",
  },
  {
    title: "Industry",
    text: "First internship in Chandigarh at Novem Control. Saw how software actually moves — discussions, builds, revisions, deployments.",
    accent: "var(--primary)",
  },
  {
    title: "Forward",
    text: "More work, more experiments, and eventually Mumbai — faster pace, bigger exposure, stronger push to think in terms of products, not just code.",
    accent: "var(--primary)",
  },
];

/* ── interactive card with mouse-follow glow + 3D tilt ── */
function ChapterCard({
  item,
  index,
}: {
  item: (typeof CHAPTERS)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      const card = cardRef.current;
      const glow = glowRef.current;
      if (!card || !glow) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      glow.style.background = `radial-gradient(200px circle at ${x}px ${y}px, color-mix(in srgb, ${item.accent} 8%, transparent), transparent 70%)`;

      const cx = rect.width / 2;
      const cy = rect.height / 2;
      card.style.transform = `perspective(600px) rotateX(${((y - cy) / cy) * -4}deg) rotateY(${((x - cx) / cx) * 4}deg) translateY(-2px)`;
    },
    [item.accent],
  );

  const handleLeave = useCallback(() => {
    if (cardRef.current)
      cardRef.current.style.transform =
        "perspective(600px) rotateX(0) rotateY(0) translateY(0)";
    if (glowRef.current) glowRef.current.style.background = "transparent";
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-anim="journey"
      className="group relative overflow-hidden rounded-2xl border border-foreground/6 bg-foreground/2 p-6 transition-[border-color,box-shadow] duration-300 hover:border-primary/20 hover:shadow-[0_0_40px_-12px] hover:shadow-primary/10 md:p-8"
      style={{ willChange: "transform" }}
    >
      {/* glow layer */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 z-0 transition-[background] duration-200"
      />

      {/* watermark number */}
      <span className="pointer-events-none absolute -right-2 -top-4 z-0 select-none font-erode text-[80px] font-bold leading-none text-foreground/3 md:text-[100px]">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* accent bar */}
      <div className="mb-4 h-0.5 w-8 rounded-full bg-primary/40 transition-all duration-300 group-hover:w-12 group-hover:bg-primary" />

      <h3 className="relative z-10 font-erode text-xl font-semibold text-foreground/80 transition-colors duration-300 group-hover:text-primary md:text-2xl">
        {item.title}
      </h3>
      <p className="relative z-10 mt-2.5 font-poppins text-sm leading-relaxed text-foreground/50 md:text-base">
        {item.text}
      </p>
    </div>
  );
}

export default function AboutJourney() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-anim='journey']", {
        y: 30,
        opacity: 0,
        filter: "blur(4px)",
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl space-y-10">
        {/* Header */}
        <div className="space-y-5 text-center">
          <div data-anim="journey">
            <SectionTag>Journey</SectionTag>
          </div>
          <h2
            data-anim="journey"
            className="font-erode text-3xl font-semibold leading-snug md:text-5xl"
          >
            Built,
            <br />
            <span className="text-primary">not planned.</span>
          </h2>
          <div
            data-anim="journey"
            className="space-y-4 text-justify font-poppins text-base leading-relaxed text-foreground/60 md:text-lg"
          >
            <p>
              There was no big roadmap behind this. It started with curiosity
              &mdash; and a phase where nothing makes sense at first.
              You&apos;ve been there, right?
            </p>
            <p>
              I graduated in 2025, but most of the real learning happened
              outside the classroom. The path wasn&apos;t linear, but it kept
              moving forward. And that was enough.
            </p>
          </div>
        </div>

        {/* Chapter cards */}
        <div className="grid gap-4 sm:grid-cols-2 md:gap-5">
          {CHAPTERS.map((ch, i) => (
            <ChapterCard key={ch.title} item={ch} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
