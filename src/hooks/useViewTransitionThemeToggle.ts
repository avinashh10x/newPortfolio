"use client";

import { useTheme } from "next-themes";
import { useCallback, type RefObject } from "react";


export const THEME_TOGGLE_TRANSITION_MS = 400;

type UseViewTransitionThemeToggleOptions = {
  duration?: number;
};


export function useViewTransitionThemeToggle(
  buttonRef: RefObject<HTMLButtonElement | null>,
  { duration = THEME_TOGGLE_TRANSITION_MS }: UseViewTransitionThemeToggleOptions = {}
) {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (!resolvedTheme) {
      setTheme("dark");
      return;
    }

    const next = resolvedTheme === "dark" ? "light" : "dark";
    const el = buttonRef.current;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const hasVt = typeof document.startViewTransition === "function";

    if (!el || prefersReduced || !hasVt) {
      setTheme(next);
      return;
    }

    const { top, left, width, height } = el.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const fromCircle = `circle(0px at ${x}px ${y}px)`;
    const toCircle = `circle(${endRadius}px at ${x}px ${y}px)`;
    const expandClip: [string, string] = [fromCircle, toCircle];

    const transition = document.startViewTransition(() => {
      setTheme(next);
    });

    const runClipAnimation = () => {
      // Always animate `::view-transition-new(root)`: the incoming theme expands from
      // the button. Animating `::view-transition-old(root)` for light→dark is often a
      // no-op or flashes because the old snapshot is handled differently by the engine.
      document.documentElement.animate(
        { clipPath: expandClip },
        {
          duration,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    };

    void transition
      .ready
      .then(runClipAnimation)
      .catch(() => {
        // View transition was skipped or failed
      });
  }, [buttonRef, duration, resolvedTheme, setTheme]);

  return toggleTheme;
}
