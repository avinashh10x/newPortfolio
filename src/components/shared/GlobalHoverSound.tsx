"use client";

import { useEffect, useRef } from "react";

export default function GlobalHoverSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastHoveredRef = useRef<Element | null>(null);
  const isUnlocked = useRef(false);

  useEffect(() => {
    // Initialize audio instance
    const audio = new Audio("/sfx/tap_05.wav");
    audio.volume = 0.4; // Reduced by 10%
    audio.load();
    audioRef.current = audio;

    // Browsers block audio until a user interaction (gesture).
    // We unlock it on the first click anywhere on the page.
    const unlock = () => {
      if (isUnlocked.current) return;
      audio.play().then(() => {
        audio.pause();
        audio.currentTime = 0;
        isUnlocked.current = true;
        window.removeEventListener("mousedown", unlock);
        window.removeEventListener("keydown", unlock);
      }).catch(() => { });
    };

    window.addEventListener("mousedown", unlock);
    window.addEventListener("keydown", unlock);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("a, button");

      if (interactiveEl) {
        // Skip elements that use SoundLink (they handle their own sound)
        if (interactiveEl.closest("[data-sound-link]")) {
          lastHoveredRef.current = null;
          return;
        }

        // Prevent multiple sounds when moving between nested layers of the same button/link
        const isSelfOrChild = lastHoveredRef.current && (
          interactiveEl === lastHoveredRef.current ||
          lastHoveredRef.current.contains(interactiveEl) ||
          interactiveEl.contains(lastHoveredRef.current)
        );

        if (!isSelfOrChild) {
          lastHoveredRef.current = interactiveEl;

          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => {
              // Usually fails if user hasn't clicked yet - expected browser behavior
            });
          }
        }
      } else {
        lastHoveredRef.current = null;
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  return null;
}
