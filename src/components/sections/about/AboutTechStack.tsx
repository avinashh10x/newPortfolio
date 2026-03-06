"use client";

import { useRef, useCallback } from "react";
import SectionTag from "./SectionTag";

type TechItem = {
  name: string;
  category: string;
  color: string;
  icon: string;
};

const TECH: TechItem[] = [
  {
    name: "React",
    category: "Frontend",
    color: "#61DAFB",
    icon: "/stack/react-svgrepo-com.svg",
  },
  {
    name: "Next.js",
    category: "Frontend",
    color: "#ffffff",
    icon: "/stack/nextjs-svgrepo-com.svg",
  },
  {
    name: "TypeScript",
    category: "Frontend",
    color: "#3178C6",
    icon: "/stack/typescript-svgrepo-com.svg",
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    color: "#06B6D4",
    icon: "/stack/tailwind-svgrepo-com.svg",
  },
  {
    name: "GSAP",
    category: "Frontend",
    color: "#88CE02",
    icon: "/stack/gsap-svgrepo-com.svg",
  },
  {
    name: "Framer Motion",
    category: "Frontend",
    color: "#FF0055",
    icon: "/stack/framer-motion-svgrepo-com.svg",
  },
  {
    name: "React Native",
    category: "Mobile",
    color: "#61DAFB",
    icon: "/stack/react-svgrepo-com.svg",
  },
  {
    name: "Expo",
    category: "Mobile",
    color: "#4630EB",
    icon: "/stack/expo-svgrepo-com.svg",
  },
  {
    name: "Node.js",
    category: "Backend",
    color: "#339933",
    icon: "/stack/node-js-svgrepo-com.svg",
  },
  // {
  //   name: "Express",
  //   category: "Backend",
  //   color: "#ffffff",
  //   icon: "/stack/express-svgrepo-com.svg",
  // },
  {
    name: "Python",
    category: "Backend",
    color: "#3776AB",
    icon: "/stack/python-svgrepo-com.svg",
  },
  {
    name: "PostgreSQL",
    category: "Backend",
    color: "#4169E1",
    icon: "/stack/postgresql-svgrepo-com.svg",
  },
  {
    name: "MongoDB",
    category: "Backend",
    color: "#47A248",
    icon: "/stack/mongodb-svgrepo-com.svg",
  },
  {
    name: "Redis",
    category: "Backend",
    color: "#DC382D",
    icon: "/stack/redis-svgrepo-com.svg",
  },
  {
    name: "Prisma",
    category: "Backend",
    color: "#2D3748",
    icon: "/stack/prisma-svgrepo-com.svg",
  },
  // {
  //   name: "Vercel",
  //   category: "Infra",
  //   color: "#ffffff",
  //   icon: "/stack/vercel-svgrepo-com.svg",
  // },
  {
    name: "Git",
    category: "Infra",
    color: "#F05032",
    icon: "/stack/git-svgrepo-com.svg",
  },
  {
    name: "Figma",
    category: "Infra",
    color: "#F24E1E",
    icon: "/stack/figma-svgrepo-com.svg",
  },
];

/* ─── Single tech card with mouse-follow glow ─── */
function TechCard({ item, index }: { item: TechItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      const glow = glowRef.current;
      if (!card || !glow) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.background = `radial-gradient(120px circle at ${x}px ${y}px, ${item.color}20, transparent 70%)`;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      card.style.transform = `perspective(600px) rotateX(${((y - cy) / cy) * -4}deg) rotateY(${((x - cx) / cx) * 4}deg) scale(1.05)`;
    },
    [item.color],
  );

  const handleLeave = useCallback(() => {
    if (cardRef.current)
      cardRef.current.style.transform =
        "perspective(600px) rotateX(0) rotateY(0) scale(1)";
    if (glowRef.current) glowRef.current.style.background = "transparent";
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative flex flex-col items-center justify-center gap-2 rounded-2xl border border-foreground/[0.06] bg-foreground/[0.03] p-5 transition-all duration-300 hover:border-foreground/[0.12] hover:bg-foreground/[0.05] "
      style={{
        willChange: "transform",
        animationDelay: `${index * 60}ms`,
      }}
    >
      {/* mouse-follow glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl transition-[background] duration-200"
      />

      {/* icon */}
      <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/[0.05] transition-colors duration-300 group-hover:bg-foreground/[0.08]">
        <img
          src={item.icon}
          alt={item.name}
          className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* name */}
      <span className="relative z-10 text-center font-poppins text-[11px] font-medium leading-tight text-foreground/60 transition-colors duration-300 group-hover:text-foreground/90 md:text-xs">
        {/* {item.name} */}
      </span>

      {/* category badge */}
      <span
        className="relative z-10 rounded-full px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          color: item.color,
          backgroundColor: `${item.color}12`,
        }}
      >
           {item.name}
      </span>
    </div>
  );
}

export default function AboutTechStack() {
  return (
    <section className="px-6 py-10 md:py-16">
      <div className="mx-auto max-w-5xl space-y-10">
        {/* Header */}
        <div className="space-y-5 text-center">
          <div>
            <SectionTag>Stack</SectionTag>
          </div>
          <h2 className="font-erode text-3xl font-semibold md:text-5xl">
            Tools I <span className="text-primary">think in.</span>
          </h2>
          <p className="mx-auto max-w-xl font-poppins text-base text-foreground/50 md:text-lg">
            The technologies I reach for daily — from frontend to backend,
            mobile to infra.
          </p>
        </div>

        {/* Grid */}
        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {TECH.map((item, i) => (
            <TechCard key={item.name} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
