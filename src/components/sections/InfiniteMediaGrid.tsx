"use client";

import { useEffect, useRef } from "react";
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
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            aria-hidden={i !== 0}
            className="grid w-max grid-cols-3 md:grid-cols-5 gap-[6vw] md:gap-[5vw] p-[3vw] md:p-[2vw]"
          >
            {PROJECTS.map((src, idx) => (
              <div
                key={idx}
                className="w-[30vw] md:w-[20vw] aspect-video select-none rounded-md overflow-hidden"
              >
                <Link href={`/work/${src.slug}`}>
                  <img
                    src={src.image[0]}
                    alt=""
                    className="w-full aspect-video object-contain block rounded-md"
                    draggable={false}
                  />
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
