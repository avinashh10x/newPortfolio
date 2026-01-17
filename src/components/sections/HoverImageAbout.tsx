"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

export default function HoverImageAbout() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  const incrRef = useRef(0);

  useEffect(() => {
    if (!rootRef.current) return;

    const root = rootRef.current;
    const imgSrc = "/projects/p1.webp";

    const displayImages = (x: number, y: number) => {
      intervalRef.current = window.setInterval(() => {
        const img = document.createElement("img");
        img.src = imgSrc;
        img.className =
          "pointer-events-none absolute top-0 left-0 w-[20vw] h-[20vw] object-contain";

        root.appendChild(img);

        gsap.fromTo(
          img,
          {
            xPercent: -50,
            yPercent: -50,
            x: x + (Math.random() - 0.5) * 50,
            y: y + 50,
            rotation: (Math.random() - 0.5) * 10,
          },
          {
            y,
            rotation: (Math.random() - 0.5) * 10,
            ease: "back.out(3)",
            duration: 0.4,
          },
        );

        gsap.to(img, {
          scale: 0.9,
          delay: 0.5,
          duration: 0.2,
          ease: "back.in(2)",
          onComplete: () => {
            root.removeChild(img);
          },
        });

        incrRef.current++;
      }, 150);
    };

    const stopImages = () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const hovers = root.querySelectorAll(".hover");
    hovers.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        const rect = el.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2 + window.scrollY;
        displayImages(x, y);
      });

      el.addEventListener("mouseleave", stopImages);
    });

    return () => {
      stopImages();
      hovers.forEach((el) => {
        el.replaceWith(el.cloneNode(true));
      });
    };
  }, []);

  useEffect(() => {
    const splitText = SplitText.create(".testTXT", { type: "lines" }) ?? null;

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
    <section
      ref={rootRef}
      className="relative h-screen bg-background text-foreground  flex flex-col justify-center items-center gap-[4vw] overflow-hidden"
    >
      {/* <p className="text-lg uppercase tracking-tight opacity-70 absolute top-5">About</p> */}

      <p className="w-[50%] text-center font-medium text-[2vw] leading-none tracking-[-0.05em] testTXT">
        We create bold and{" "}
        {/* <span className="hover underline underline-offset-[0.1em] decoration-[0.06em] cursor-pointer"> */}
          audacious{" "}
        {/* </span>{" "} */}
         clothing that empowers{" "}
        {/* <span className="hover underline underline-offset-[0.1em] decoration-[0.06em] cursor-pointer"> */}
          individuality {" "}
        {/* </span> */}
        , blending modern fashion with{" "}
        {/* <span className="hover underline underline-offset-[0.1em] decoration-[0.06em] cursor-pointer"> */}
          timeless{" "}
        {/* </span>{" "} */}
        style—crafted for confidence, expression, and everyday impact.
      </p>
    </section>
  );
}
