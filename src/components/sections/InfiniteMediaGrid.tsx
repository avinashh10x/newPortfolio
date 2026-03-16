"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Observer } from "gsap/all";
import { PROJECTS } from "@/data/projects";
import Link from "next/link";

gsap.registerPlugin(Observer);

export default function InfiniteMediaGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Mutable refs for wrap functions to be used inside modifiers
    let wrapX = gsap.utils.wrap(0, 1);
    let wrapY = gsap.utils.wrap(0, 1);

    let xTo: gsap.QuickToFunc;
    let yTo: gsap.QuickToFunc;
    let incrX = 0;
    let incrY = 0;

    const ctx = gsap.context(() => {
      // Initialize quickTo with dynamic modifiers
      xTo = gsap.quickTo(container, "x", {
        duration: 1.5,
        ease: "power4",
        modifiers: {
          x: (value) => {
            return `${wrapX(parseFloat(value))}px`;
          },
        },
      });

      yTo = gsap.quickTo(container, "y", {
        duration: 1.5,
        ease: "power4",
        modifiers: {
          y: (value) => {
            return `${wrapY(parseFloat(value))}px`;
          },
        },
      });
    }, containerRef);

    const updateDimensions = () => {
      const halfX = container.clientWidth / 2;
      const halfY = container.clientHeight / 2;

      // Update the wrapper functions
      wrapX = gsap.utils.wrap(-halfX, 0);
      wrapY = gsap.utils.wrap(-halfY, 0);
    };

    // Initial calculation
    updateDimensions();

    const observer = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onChangeX(self) {
        if (self.event.type === "wheel") incrX += self.deltaX;
        else incrX += self.deltaX * 2;
        xTo(incrX);
      },
      onChangeY(self) {
        if (self.event.type === "wheel") incrY += self.deltaY;
        else incrY += self.deltaY * 2;
        yTo(incrY);
      },
    });

    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      observer.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section className="h-screen w-full overflow-hidden bg-background text-foreground">
      <div
        ref={containerRef}
        className="grid grid-cols-2 w-max will-change-transform"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            aria-hidden={i !== 0}
            className="grid w-max  grid-cols-3 md:grid-cols-5 gap-[6vw] md:gap-[5vw] p-[3vw] md:p-[2vw]"
          >
            {PROJECTS.map((project, idx) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: (typeof PROJECTS)[0] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-[30vw] md:w-[20vw] aspect-video select-none rounded-md overflow-hidden relative group bg-foreground/5 border border-foreground/5 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10"
    >
      <Link href={`/work/${project.slug}`} className="block w-full h-full">
        {/* Static Image */}
        <img
          src={project.image[0]}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover block transition-opacity duration-500 ${
            isHovered && project.video?.[0] ? "opacity-0" : "opacity-100"
          }`}
          draggable={false}
        />

        {/* Hover Video */}
        {project.video?.[0] && (
          <video
            ref={videoRef}
            src={project.video[0]}
            preload="none"
            poster={project.image[0]}
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 pointer-events-none ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
        
        {/* Subtle overlay for better contrast if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </Link>
    </div>
  );
}
