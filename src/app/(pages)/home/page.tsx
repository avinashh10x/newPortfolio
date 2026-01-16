"use client";

import { useEffect } from "react";
import gsap from "gsap";
// If you need text splitting, install split-type: npm install split-type
// import SplitType from "split-type";

function HomePage() {
  useEffect(() => {
    // const splitText = SplitText.create(".testTXT", { type: "lines" }) ?? null;

    // if (splitText) {
    //   gsap.from(splitText.lines, {
    //     duration: .5,
    //     y: 15,
    //     opacity: 0,
    //     filter: "blur(3px)",
    //     stagger: 0.1,
    //     ease: "power2.out",
    //   });
    // }

    return () => {
      // if (splitText) {
      //   splitText.revert();
      // }
    };
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="max-w-3xl px-6 text-center">
        <h1 className="text-2xl max-sm:text-lg leading-tight font-recia font-extralight testTXT">
          Hello World!
        </h1>
      </div>
    </div>
  );
}

export default HomePage;
