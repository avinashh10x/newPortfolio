"use client";

import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { SplitText } from "gsap/all";
import { Observer } from "gsap/Observer";
import Image from "next/image";
import { PROJECTS } from "@/data/projects";
import { div } from "motion/react-client";

gsap.registerPlugin(Observer);

export default function KaraScroll() {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!contentRef.current || !containerRef.current) return;

    let incrTick = 0;
    let interactionTimeout: ReturnType<typeof setTimeout>;

    const content = contentRef.current;
    const half = content.getBoundingClientRect().height / 2;
    const wrap = gsap.utils.wrap(-half, 0);

    const yTo = gsap.quickTo(content, "y", {
      duration: 1,
      ease: "power4",
      modifiers: {
        y: gsap.utils.unitize(wrap),
      },
    });

    const scaleTo = gsap.quickTo(containerRef.current, "scaleY", {
      duration: 0.6,
      ease: "power4",
    });

    const handleInteraction = (e: {
      event?: Event | WheelEvent | PointerEvent | TouchEvent | null;
      deltaY?: number;
    }) => {
      const deltaY = e.deltaY ?? 0;

      if (e.event?.type === "wheel") incrTick -= deltaY;
      else incrTick += deltaY;

      const valSc = 1 - gsap.utils.clamp(-0.2, 0.2, deltaY / 300);

      scaleTo(valSc);

      clearTimeout(interactionTimeout);
      interactionTimeout = setTimeout(() => {
        scaleTo(1);
      }, 66);
    };

    Observer.create({
      target: window,
      type: "wheel,pointer,touch",
      onChange: handleInteraction,
    });

    const tick = (_time: number, dt: number) => {
      incrTick += dt / 30;
      yTo(incrTick);
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      Observer.getAll().forEach((o) => o.kill());
    };
  }, []);


  
  useEffect(() => {
    const splitText = SplitText.create(".projectTxt", { type: "lines" }) ?? null;

    if (splitText) {
      gsap.from(splitText.lines, {
        duration: .5,
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
    <section className="relative flex items-center bg-background md:px-[9vw] text-foreground h-screen overflow-hidden ">
      {/* Texts */}
      <div className="flex-1 font-medium  tracking-[-0.05em] px-20 space-y-10 max-md:hidden">
        <div className="flex  font-medium leading-[0.8] tracking-[-0.05em] text-[5vw] items-center gap-5 justify-start">
          <p className="">Work</p>
          <span className="w-[60%] h-px bg-foreground/10 " />
          <p>{PROJECTS.length}</p>
        </div>
        <div>
          {PROJECTS.map((project, i) => (
            <div
              key={i}
              className=" flex  items-center gap-2 leading-loose justify-between"
            >
              <p className="projectTxt">
                <span className="font-medium">{project.title} </span>
                {/* <span className="w-[15px] h-[1px] " /> */}
                <span className="text-foreground/50 lowercase font-extralight ">
                  {project.subtitle &&
                    `${
                      project.subtitle.length > 45
                        ? project.subtitle.slice(0, 45) + "..."
                        : project.subtitle
                    }`}
                </span>
              </p>
            
                <span className="min-w-[30%] h-px bg-foreground/10 " />
                <span className="text-foreground/50">{project.time}</span>
          
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Container */}
      <div
        ref={containerRef}
        className="w-[30vw] h-screen  origin-center max-md:w-[90vw] max-md:mx-auto"
      >
        <div
          ref={contentRef}
          className="flex flex-col gap-6 h-max mx-auto pb-6 w-full"
        >
          {PROJECTS.map((project, i) => (
            <div key={i}>
              <div className="aspect-video rounded-lg overflow-hidden pointer-events-none">
                <Image
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover rounded-lg"
                  width={900}
                  height={500}
                  priority
                />
              </div>
              <div className=" flex items-center gap-3 mb-6 leading-loose justify-between md:hidden">
                <p className="">
                  <span className="font-medium">{project.title} </span>
                  {/* <span className="w-[15px] h-[1px] " /> */}
                  <span className="text-foreground/50 lowercase font-extralight">
                    {project.subtitle &&
                      `${
                        project.subtitle.length > 20
                          ? project.subtitle.slice(0, 25) + "..."
                          : project.subtitle
                      }`}
                  </span>
                </p>
                <span className="w-[7%] h-px bg-foreground/10 " />
                <span className="text-foreground/50">{project.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
