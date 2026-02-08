"use client";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { Observer } from "gsap/dist/Observer";

import Image from "next/image";
import { PROJECTS } from "@/data/projects";
import Link from "next/link";
import { SplitText } from "gsap/all";
import { motion, useInView } from "motion/react";
import NumberFlow from "@number-flow/react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer);
}

export default function KaraScroll() {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLParagraphElement | null>(null);
  const isInView = useInView(numberRef, { once: true });
  const [currentTime, setCurrentTime] = useState("");
  const [count, setCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile/touch devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.matchMedia("(max-width: 768px)").matches ||
          "ontouchstart" in window,
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isInView) {
      setCount(4);
    }
  }, [isInView]);

  // Live clock update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Unified GSAP scroll animation for both desktop and mobile
  useEffect(() => {
    if (!contentRef.current || !containerRef.current) return;

    const content = contentRef.current;
    const container = containerRef.current;

    let incrTick = 0;
    let velocity = 0;
    let interactionTimeout: ReturnType<typeof setTimeout>;

    const half = content.getBoundingClientRect().height / 2;
    const wrap = gsap.utils.wrap(-half, 0);

    // Buttery smooth animation with longer duration for mobile
    const yTo = gsap.quickTo(content, "y", {
      duration: isMobile ? 0.8 : 1,
      ease: "power3.out",
      modifiers: {
        y: gsap.utils.unitize(wrap),
      },
    });

    const scaleTo = gsap.quickTo(container, "scaleY", {
      duration: 0.5,
      ease: "power3.out",
    });

    // Touch tracking for mobile
    let touchStartY = 0;
    let lastTouchY = 0;
    let isTouching = false;
    let touchVelocity = 0;
    let lastTouchTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      isTouching = true;
      touchStartY = e.touches[0].clientY;
      lastTouchY = touchStartY;
      lastTouchTime = Date.now();
      touchVelocity = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isTouching) return;

      const currentY = e.touches[0].clientY;
      const deltaY = lastTouchY - currentY; // Positive = swiping up
      const now = Date.now();
      const dt = now - lastTouchTime;

      // Calculate velocity for momentum
      if (dt > 0) {
        touchVelocity = (deltaY / dt) * 16; // Normalize to ~60fps
      }

      // Only prevent default and handle scroll if swiping UP
      // This allows pull-to-refresh when swiping DOWN at top
      if (deltaY > 0) {
        e.preventDefault();
        incrTick -= deltaY * 1.5; // Amplify for responsiveness

        // Subtle scale effect
        const valSc = 1 - gsap.utils.clamp(-0.08, 0.08, deltaY / 500);
        scaleTo(valSc);

        clearTimeout(interactionTimeout);
        interactionTimeout = setTimeout(() => scaleTo(1), 100);
      } else if (deltaY < -5) {
        // Swiping down - allow if not too aggressive
        incrTick -= deltaY * 1.2;
      }

      lastTouchY = currentY;
      lastTouchTime = now;
    };

    const handleTouchEnd = () => {
      isTouching = false;
      // Apply momentum after touch ends
      velocity = touchVelocity * 8;
      scaleTo(1);
    };

    // Desktop wheel handler
    const handleWheel = (e: WheelEvent) => {
      incrTick -= e.deltaY;
      const valSc = 1 - gsap.utils.clamp(-0.15, 0.15, e.deltaY / 300);
      scaleTo(valSc);

      clearTimeout(interactionTimeout);
      interactionTimeout = setTimeout(() => scaleTo(1), 80);
    };

    // Animation tick
    const tick = (_time: number, dt: number) => {
      // Auto-scroll (slower on mobile for better feel)
      const autoSpeed = isMobile ? dt / 50 : dt / 30;
      incrTick += autoSpeed;

      // Apply momentum decay for mobile
      if (isMobile && Math.abs(velocity) > 0.5) {
        incrTick -= velocity;
        velocity *= 0.92; // Smooth decay
      }

      yTo(incrTick);
    };

    // Attach event listeners based on device
    if (isMobile) {
      container.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      container.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      container.addEventListener("touchend", handleTouchEnd, { passive: true });
    } else {
      window.addEventListener("wheel", handleWheel, { passive: true });
    }

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      if (isMobile) {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
      } else {
        window.removeEventListener("wheel", handleWheel);
      }
      clearTimeout(interactionTimeout);
    };
  }, [isMobile]);

  useEffect(() => {
    const splitText =
      SplitText.create(".projectTxt", { type: "lines" }) ?? null;

    if (splitText) {
      gsap.from(splitText.lines, {
        duration: 0.5,
        y: 15,
        opacity: 0,
        filter: "blur(3px)",
        stagger: 0.1,
        ease: "power2.out",
      });
    }

    return () => {
      if (splitText) {
        splitText.revert();
      }
    };
  }, []);

  return (
    <section className="relative flex items-center bg-background md:px-[6vw] text-foreground h-screen overflow-hidden gap-6">
      {/* Texts */}
      <div className="flex-1 font-medium  tracking-[-0.05em] px-10 space-y-10 max-md:hidden">
        <div className="flex  font-medium leading-[0.8] tracking-[-0.05em] text-[5vw] items-center gap-5 px-2 justify-between">
          <p className="">Work</p>
          <motion.span
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="w-[70%] h-[1px] bg-foreground/50 "
          />
          {/* <p>{PROJECTS.length}</p> */}
          <p className=" -mt-4" ref={numberRef}>
            {/* <NumberFlow value={count} /> */}#
          </p>
        </div>
        <div className="flex flex-col space-y-2 text-[1.2vw]">
          {PROJECTS.slice(0, 5).map((project, i) => (
            <Link
              key={i}
              className="flex items-center gap-2 leading-loose px-3 py-0.5 hover:bg-foreground/10 rounded-sm transition-colors duration-300 justify-between"
              href={`/work/${project.slug}`}
            >
              <p className="projectTxt">
                <span className="font-medium">{project.title} </span>
                {/* <span className="w-[15px] h-[1px] " /> */}
                <span className="text-foreground/50 lowercase font-extralight ">
                  {project.subtitle &&
                    `${
                      project.subtitle.length > 45
                        ? project.subtitle.slice(0, 45) + ""
                        : project.subtitle + ""
                    }`}
                </span>
              </p>
              {/* flexible horizontal bar that fills remaining space */}
              <motion.span
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.2 + i * 0.1,
                }}
                className="flex-1 h-[0.5px] bg-foreground/50 mx-1"
              />
              <motion.span
                initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
                whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: 0.2 + i * 0.1,
                }}
                className="text-foreground/50 text-sm"
              >
                {project.time}
              </motion.span>
            </Link>
          ))}
          <Link
            href="/gallery"
            target="_blank"
            className="flex items-center gap-2 leading-loose px-3 py-0.5 hover:bg-foreground/10 rounded-sm transition-colors duration-300 justify-between text-foreground/70 hover:text-foreground"
          >
            <p className="projectTxt">
              <span className="font-medium text-foreground">See all </span>
              <span className="text-foreground/50 lowercase font-extralight ">
                archive projects by clicking here
              </span>
            </p>
            <motion.span
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
              className="flex-1 h-[0.5px] bg-foreground/50 mx-1"
            />
            <motion.span
              initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
              whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
              className="text-foreground/50 font-mono text-sm"
            >
              {currentTime}
            </motion.span>
          </Link>
        </div>
      </div>

      {/* Scroll Container */}
      <div
        ref={containerRef}
        className="w-[30vw] h-screen origin-center max-md:w-[90vw] max-md:mx-auto overflow-hidden scrollbar-none"
      >
        <div
          ref={contentRef}
          className="flex flex-col gap-6 h-max mx-auto pb-6 w-full"
        >
          {/* Render projects twice for infinite scroll on desktop, with gallery card after each set */}
          {[0, 1].map((setIndex) => (
            <div key={setIndex} className="flex flex-col gap-6">
              {PROJECTS.map((project, i) => (
                <div key={`${setIndex}-${i}`}>
                  {/* Mobile: go to project detail, Desktop: go to external link */}
                  <Link
                    href={isMobile ? `/work/${project.slug}` : project.link}
                    target={isMobile ? undefined : "_blank"}
                  >
                    <div className="w-full rounded-sm overflow-hidden">
                      <Image
                        src={project.image[0]}
                        alt={project.title}
                        className="w-full h-full object-cover rounded-sm hover:scale-[1.03] transition-all duration-300"
                        width={900}
                        height={500}
                        priority={setIndex === 0 && i < 3}
                      />
                    </div>
                    <div className="flex items-center gap-3 mb-6 leading-loose justify-between md:hidden">
                      <p className="">
                        <span className="font-medium">{project.title} </span>
                        <span className="text-foreground/50 lowercase font-extralight">
                          {project.subtitle &&
                            `${
                              project.subtitle.length > 15
                                ? project.subtitle.slice(0, 15) + "..."
                                : project.subtitle
                            }`}
                        </span>
                      </p>
                      {/* mobile: flexible bar to fill space */}
                      <motion.span
                        initial={{ scaleX: 0, originX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="flex-1 h-px bg-foreground/10 mx-3"
                      />
                      <motion.span
                        initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
                        whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-foreground/50"
                      >
                        {project.time}
                      </motion.span>
                    </div>
                  </Link>
                </div>
              ))}

              {/* Gallery Link Card - appears after each project set */}
              <div>
                <Link href="/gallery">
                  <div className="aspect-video rounded-sm overflow-hidden pointer-events-none bg-gradient-to-br from-primary/20 via-primary/10 to-transparent flex items-center justify-center border border-foreground/10">
                    <div className="text-center">
                      <p className="text-[8vw] md:text-[2vw] font-medium text-foreground/80">
                        →
                      </p>
                      <p className="text-foreground/60 text-sm">Archive</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-6 leading-loose justify-between md:hidden">
                    <p className="">
                      <span className="font-medium">View All </span>
                      <span className="text-foreground/50 lowercase font-extralight">
                        explore archive
                      </span>
                    </p>
                    <motion.span
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      className="flex-1 h-px bg-foreground/10 mx-3"
                    />
                    <motion.span
                      initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
                      whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="text-primary"
                    >
                      {PROJECTS.length}+
                    </motion.span>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
