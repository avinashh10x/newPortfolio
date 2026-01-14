"use client";
import { heroText, ICON_MAP } from "@/data/profile";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/all";

function HomePage() {
  const parts = heroText.split(
    /(\{\{github\}\}|\{\{twitter\}\}|\{\{linkedin\}\})/
  );

  useEffect(() => {
    const splitText = SplitText.create(".testTXT", { type: "lines" }) ?? null;

    if (splitText) {
      gsap.from(splitText.lines, {
        duration: .5,
        y: 10,
        opacity: 0,
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
    <div className="w-full h-screen flex items-center justify-center">
      <div className="max-w-3xl px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl max-sm:text-lg leading-tight font-recia font-extralight testTXT"
        >
          {parts.map((part, index) => {
            const icon = ICON_MAP[part as keyof typeof ICON_MAP];

            if (!icon) {
              return <span key={index}>{part}</span>;
            }

            return (
              <Link
                key={index}
                href={icon.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={icon.label}
                className="inline-flex items-center mx-1 align-middle"
              >
                <icon.Icon />
              </Link>
            );
          })}
        </motion.h1>
      </div>
    </div>
  );
}

export default HomePage;
