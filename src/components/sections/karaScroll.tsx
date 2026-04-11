"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { BriefcaseBusinessIcon } from "lucide-react";
import type { project } from "@/data/projects";
import ScrollUpHint from "@/components/shared/ScrollUpHint";
import SoundLink from "../shared/SoundLink";

export default function KaraScroll({ projects }: { projects: project[] }) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLParagraphElement | null>(null);
  const isInView = useInView(numberRef, { once: true });
  const [currentTime, setCurrentTime] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isMobile) {
      return;
    }

    if (!contentRef.current || !containerRef.current) {
      return;
    }

    const content = contentRef.current;
    const container = containerRef.current;
    let incrTick = 0;
    let interactionTimeout: ReturnType<typeof setTimeout>;

    const half = content.getBoundingClientRect().height / 2;
    const wrap = gsap.utils.wrap(-half, 0);

    const yTo = gsap.quickTo(content, "y", {
      duration: 1,
      ease: "power3.out",
      modifiers: {
        y: gsap.utils.unitize(wrap),
      },
    });

    const scaleTo = gsap.quickTo(container, "scaleY", {
      duration: 0.5,
      ease: "power3.out",
    });

    const handleWheel = (e: WheelEvent) => {
      incrTick -= e.deltaY;
      const valSc = 1 - gsap.utils.clamp(-0.15, 0.15, e.deltaY / 300);
      scaleTo(valSc);

      clearTimeout(interactionTimeout);
      interactionTimeout = setTimeout(() => scaleTo(1), 80);
    };

    const tick = (_time: number, dt: number) => {
      incrTick += dt / 30;
      yTo(incrTick);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("wheel", handleWheel);
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

  const featuredProjects = projects.filter(p => p.isFeatured);

  return (
    <section className="relative flex items-center gap-6 bg-background text-foreground md:h-screen md:overflow-hidden md:px-[6vw]">
      <ScrollUpHint />

      <div className="w-full px-5 py-28 md:hidden">
        <div className="mb-10 flex items-center gap-4">
          <p className="font-erode text-[2.6rem] font-semibold leading-none tracking-[-0.05em] text-primary">
            Featured Work
          </p>
          <motion.span
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="h-px flex-1 bg-foreground/20"
          />
          <BriefcaseBusinessIcon className="size-5 text-primary" />
        </div>

        <div className="flex flex-col">
          {featuredProjects.map((project, i) => (
            <SoundLink
              key={project.slug ?? project.title}
              href={`/work/${project.slug}`}
              className="group flex items-center gap-3 border-b border-foreground/10 py-4 font-sans"
            >
              <motion.span
                initial={{ y: 18, opacity: 0, filter: "blur(4px)" }}
                whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                  delay: i * 0.06,
                }}
                className="min-w-[2.5rem] text-[0.72rem] tracking-[0.18em] text-foreground/35"
              >
                {(i + 1).toString().padStart(2, "0")}
              </motion.span>

              <div className="min-w-0 flex-1">
                <motion.p
                  initial={{ y: 18, opacity: 0, filter: "blur(4px)" }}
                  whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    ease: "easeOut",
                    delay: 0.04 + i * 0.06,
                  }}
                  className="projectTxt text-[1.1rem] font-medium tracking-[-0.03em] text-foreground"
                >
                  {project.title}
                </motion.p>
                <motion.p
                  initial={{ y: 18, opacity: 0, filter: "blur(4px)" }}
                  whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    ease: "easeOut",
                    delay: 0.08 + i * 0.06,
                  }}
                  className="mt-1 pr-2 text-[0.88rem] leading-relaxed tracking-[-0.01em] text-foreground/55"
                >
                  {project.subtitle}
                </motion.p>
              </div>

              <div className="flex items-center gap-3 self-stretch">
                <motion.span
                  initial={{ scaleY: 0, originY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.1 + i * 0.06,
                  }}
                  className="w-px flex-1 bg-foreground/10"
                />
                <motion.span
                  initial={{ y: 18, opacity: 0, filter: "blur(4px)" }}
                  whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    ease: "easeOut",
                    delay: 0.12 + i * 0.06,
                  }}
                  className="text-[0.78rem] text-foreground/45"
                >
                  {project.time}
                </motion.span>
              </div>
            </SoundLink>
          ))}

          <SoundLink
            href="/gallery"
            target="_blank"
            className="group flex items-center gap-3 border-b border-foreground/10 py-4 font-sans"
          >
            <motion.span
              initial={{ y: 18, opacity: 0, filter: "blur(4px)" }}
              whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.25 }}
              className="min-w-[2.5rem] text-[0.72rem] tracking-[0.18em] text-foreground/35"
            >
              00
            </motion.span>

            <div className="min-w-0 flex-1">
              <motion.p
                initial={{ y: 18, opacity: 0, filter: "blur(4px)" }}
                whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: "easeOut", delay: 0.29 }}
                className="text-[1.1rem] font-medium tracking-[-0.03em] text-foreground"
              >
                See All
              </motion.p>
              <motion.p
                initial={{ y: 18, opacity: 0, filter: "blur(4px)" }}
                whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: "easeOut", delay: 0.33 }}
                className="mt-1 pr-2 text-[0.88rem] leading-relaxed tracking-[-0.01em] text-foreground/55"
              >
                Explore the archive and browse the full project collection.
              </motion.p>
            </div>

            <div className="flex items-center gap-3 self-stretch">
              <motion.span
                initial={{ scaleY: 0, originY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.37,
                }}
                className="w-px flex-1 bg-foreground/10"
              />
              <motion.span
                initial={{ y: 18, opacity: 0, filter: "blur(4px)" }}
                whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: "easeOut", delay: 0.41 }}
                className="text-[0.78rem] text-foreground/45"
              >
                {currentTime}
              </motion.span>
            </div>
          </SoundLink>
        </div>
      </div>

      <div className="hidden flex-1 space-y-10 px-10 tracking-[-0.05em] md:block">
        <div className="flex items-center justify-between gap-5 px-2 font-erode text-[4vw] font-semibold leading-[1.1] tracking-[-0.05em]">
          <p className="text-primary drop-shadow-sm text-nowrap">
            Featured Work
          </p>
          <motion.span
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="h-[1px] w-[70%] bg-foreground/50"
          />
          <p ref={numberRef}>
            {isInView ? (
              <BriefcaseBusinessIcon className="size-8 text-primary" />
            ) : null}
          </p>
        </div>

        <div className="flex flex-col space-y-2 text-[1.2vw]">
          {featuredProjects.map((project, i) => (
            <SoundLink
              key={project.slug ?? project.title}
              className="flex items-center justify-between gap-2 rounded-sm px-3 py-0.5 font-sans leading-loose transition-colors duration-300 hover:bg-foreground/10"
              href={`/work/${project.slug}`}
            >
              <p className="projectTxt">
                <span className="font-sans">{project.title} </span>
                <span className="font-sans font-normal lowercase tracking-[-0.01em] text-foreground/50">
                  {project.subtitle &&
                    `${project.subtitle.length > 45
                      ? project.subtitle.slice(0, 45)
                      : project.subtitle
                    }`}
                </span>
              </p>

              <motion.span
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.2 + i * 0.1,
                }}
                className="mx-1 h-[0.5px] flex-1 bg-foreground/50"
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
                className="text-sm text-foreground/50"
              >
                {project.time}
              </motion.span>
            </SoundLink>
          ))}

          <SoundLink
            href="/gallery"
            target="_blank"
            className="flex items-center justify-between gap-2 rounded-sm px-3 py-0.5 font-sans leading-loose text-foreground/70 transition-colors duration-300 hover:bg-foreground/10 hover:text-foreground"
          >
            <p className="projectTxt">
              <span className="font-sans text-foreground">See all </span>
              <span className="font-sans font-normal lowercase tracking-[-0.01em] text-foreground/50">
                archive projects by clicking here
              </span>
            </p>
            <motion.span
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.6,
              }}
              className="mx-1 h-[0.5px] flex-1 bg-foreground/50"
            />
            <motion.span
              initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
              whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
              className="font-mono text-sm text-foreground/50"
            >
              {currentTime}
            </motion.span>
          </SoundLink>
        </div>
      </div>

      <div
        ref={containerRef}
        className="hidden h-screen w-[30vw] origin-center overflow-hidden scrollbar-none md:block"
      >
        <div
          ref={contentRef}
          className="mx-auto flex h-max w-full flex-col gap-6 pb-6"
        >
          {[0, 1].map((setIndex) => (
            <div key={setIndex} className="flex flex-col gap-6">
              {projects.map((project, i) => (
                <div key={`${setIndex}-${i}`}>
                  <Link href={project.link} target="_blank">
                    <div className="w-full overflow-hidden rounded-sm">
                      <Image
                        src={project.image[0]}
                        alt={`${project.title} - Avi | Creative Developer Portfolio`}
                        className="h-full w-full rounded-sm object-cover transition-all duration-300 hover:scale-[1.03]"
                        width={900}
                        height={500}
                        priority={setIndex === 0 && i < 3}
                      />
                    </div>
                  </Link>
                </div>
              ))}

              {/* <div>
                <Link href="/gallery">
                  <div className="pointer-events-none flex aspect-[16/8] items-center justify-center overflow-hidden rounded-sm border border-foreground/10 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent">
                    <div className="text-center">
                      <p className="text-[2vw] font-medium text-foreground/80">
                        Archive
                      </p>
                      <p className="text-sm text-foreground/60">
                        Browse the full collection
                      </p>
                    </div>
                  </div>
                </Link>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
