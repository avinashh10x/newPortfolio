"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CodeIcon, LayersIcon, SmartphoneIcon, RocketIcon } from "lucide-react";
import SectionTag from "./SectionTag";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CARDS = [
  {
    icon: <CodeIcon className="h-5 w-5" />,
    title: "100+ Projects",
    desc: "Web, mobile, backend &mdash; public and private.",
  },
  {
    icon: <LayersIcon className="h-5 w-5" />,
    title: "End to End",
    desc: "Frontend to deployment. The whole stack.",
  },
  {
    icon: <SmartphoneIcon className="h-5 w-5" />,
    title: "Mobile & AI",
    desc: "React Native apps. AI-assisted workflows.",
  },
  {
    icon: <RocketIcon className="h-5 w-5" />,
    title: "Ship Fast",
    desc: "Build. Test. Improve. Repeat.",
  },
];

export default function AboutNow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-anim='now']", {
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
    <section ref={ref} className="px-6 py-10 md:py-16">
      <div className="mx-auto max-w-3xl space-y-10">
        {/* Header */}
        <div className="space-y-5 text-center">
          <div data-anim="now">
            <SectionTag>Now</SectionTag>
          </div>
          <h2
            data-anim="now"
            className="font-erode text-3xl font-semibold leading-snug md:text-5xl"
          >
            Currently <span className="text-primary">building.</span>
          </h2>
          <div
            data-anim="now"
            className="space-y-4 text-justify font-poppins text-base leading-relaxed text-foreground/60 md:text-lg"
          >
            <p>
              Right now, most of my time goes into building and shipping.
              Full-stack products, mobile apps, small tools, experiments, AI
              workflows &mdash; anything that turns an idea into something real.
            </p>
            <p>
              Freelancing taught me how to deliver for others. Now I&apos;m
              focused on building things of my own that can scale beyond one
              client or one project.
            </p>
            <p>
              Some ideas work. Some don&apos;t. But every project teaches
              something, and every shipped build moves things forward &mdash;
              because growth happens when things leave your laptop and face real
              users.
            </p>
            <p>
              I&apos;m especially interested in where development meets product
              thinking, automation, and AI &mdash; that space where speed,
              clarity, and execution matter more than perfection.
            </p>
            <p>
              The long game is simple: keep building, keep shipping, and let the
              work speak.
            </p>
          </div>
        </div>

       
      </div>
    </section>
  );
}
