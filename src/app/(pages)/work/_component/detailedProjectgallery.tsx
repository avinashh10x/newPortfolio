"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { project } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const DetailedProjectGallery = ({ Project }: { Project: project }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Initialize Lenis for smooth horizontal scrolling
    const lenis = new Lenis({
      orientation: "horizontal",
      infinite: true,
      autoRaf: true,
      wrapper: section,
      content: section.querySelector(".gallery-container") as HTMLElement,
    });

    // Update ScrollTrigger on scroll
    lenis.on("scroll", ScrollTrigger.update);

    // Force scroll to beginning
    lenis.scrollTo(0, { immediate: true });

    // Get all media elements
    const mediaElements = section.querySelectorAll(".media");

    mediaElements.forEach((el) => {
      const img = el.querySelector("img");
      if (!img) return;

      // Image appearance animation
      gsap.fromTo(
        img,
        {
          transformOrigin: "0% 50%",
        },
        {
          transformOrigin: "0% 50%",
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            horizontal: true,
            trigger: el,
            start: "left 100%",
            end: "left 80%",
            scrub: true,
            scroller: section,
          },
        },
      );

      // Image disappearance animation
      gsap.fromTo(
        img,
        {
          transformOrigin: "100% 50%",
        },
        {
          transformOrigin: "100% 50%",
          scaleX: 0,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            horizontal: true,
            trigger: el,
            start: "right 20%",
            end: "right 0%",
            scrub: true,
            scroller: section,
          },
        },
      );
    });

    // Cleanup
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="mb-10 overflow-x-hidden">
      {/* Header */}
      <div className="px-4 md:px-8 max-w-7xl mx-auto pt-16 pb-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl md:text-4xl font-bold text-foreground">
            Project Gallery
          </h3>
          <div className="flex items-center gap-2 text-foreground/60">
            <span className="text-sm hidden sm:block">Scroll horizontally</span>
            <svg
              className="w-6 h-6 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </div>

      <section
        ref={sectionRef}
        className="gallery-section relative w-full overflow-x-auto overflow-y-hidden bg-background"
        style={{
          height: "auto",
        }}
      >
        {/* Gallery Container */}
        <div
          className="gallery-container flex items-end pb-16"
          style={{ width: "max-content" }}
        >
          {/* Main list */}
          <ul className="flex items-end gap-4 px-4 md:px-8 -translate-x-20">
            {Project.image.map((src, index) => (
              <li
                key={index}
                className="media relative flex-shrink-0"
                style={{ width: "20vw", minWidth: "250px" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  className="block w-full h-auto object-cover rounded-lg"
                  style={{
                    transform: "scaleX(0)",
                    transformOrigin: "0% 50%",
                    willChange: "transform",
                  }}
                />
              </li>
            ))}
          </ul>

          {/* Clone list for infinite effect */}
          <ul
            className="flex items-end gap-4 -translate-x-24 "
            aria-hidden="true"
            style={{ width: "100vw" }}
          >
            {Project.image.map((src, index) => (
              <li
                key={`clone-${index}`}
                className="media relative flex-shrink-0"
                style={{ width: "20vw", minWidth: "250px" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  className="block w-full h-auto object-cover rounded-lg"
                  style={{
                    transform: "scaleX(0)",
                    transformOrigin: "0% 50%",
                    willChange: "transform",
                  }}
                />
              </li>
            ))}
          </ul>
        </div>

        <style jsx>{`
          .gallery-section::-webkit-scrollbar {
            display: none;
            width: 0;
            height: 0;
            background: transparent;
          }
          .gallery-section {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </section>
    </div>
  );
};

export default DetailedProjectGallery;
