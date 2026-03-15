"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollUpHint() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let startY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = startY - currentY;

      // User swiped UP (positive delta = finger moved upward)
      if (deltaY > 15) {
        setVisible(false);
      }
    };

    // Also handle wheel for desktop preview
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 10) {
        setVisible(false);
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1.5 md:hidden"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-foreground/30"
            >
              <path
                d="M8 12V4M8 4L4 8M8 4L12 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
          <span className="text-[10px] font-sans text-foreground/30 tracking-widest uppercase">
            Scroll
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
