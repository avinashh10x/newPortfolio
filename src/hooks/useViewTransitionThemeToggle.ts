"use client";

import { useTheme } from "next-themes";
import { useCallback, type MouseEvent, type RefObject } from "react";


export const THEME_TOGGLE_TRANSITION_MS = 550;

const ORIGIN_MARKER_NAME = "theme-ripple-origin";

/**
 * Position and size of a `::view-transition-group(name)` in the transition layer's
 * coordinates, read from the group animation the browser generates.
 */
function readGroupBox(name: string) {
  const pseudo = `::view-transition-group(${name})`;
  for (const animation of document.getAnimations()) {
    const effect = animation.effect as KeyframeEffect | null;
    if (effect?.pseudoElement !== pseudo) continue;
    const frame = effect.getKeyframes().at(-1);
    if (!frame || typeof frame.transform !== "string") return null;
    const matrix = new DOMMatrixReadOnly(frame.transform);
    const width = parseFloat(String(frame.width));
    const height = parseFloat(String(frame.height));
    return {
      x: matrix.m41 + (width || 0) / 2,
      y: matrix.m42 + (height || 0) / 2,
      width,
      height,
    };
  }
  return null;
}

type UseViewTransitionThemeToggleOptions = {
  duration?: number;
};


export function useViewTransitionThemeToggle(
  buttonRef: RefObject<HTMLButtonElement | null>,
  { duration = THEME_TOGGLE_TRANSITION_MS }: UseViewTransitionThemeToggleOptions = {}
) {
  const { setTheme, resolvedTheme } = useTheme();

  // Pass the click event so the ripple starts from the button that was actually
  // clicked. The ref alone can go stale when the navbar swaps mobile/desktop.
  const toggleTheme = useCallback((event?: MouseEvent<HTMLElement>) => {
    if (typeof window === "undefined") {
      return;
    }
    if (!resolvedTheme) {
      setTheme("dark");
      return;
    }

    const next = resolvedTheme === "dark" ? "light" : "dark";
    const el = event?.currentTarget ?? buttonRef.current;
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

    // The view-transition layer can be bigger than the visible viewport and start
    // higher up (Chrome on Android sizes it as if the URL bar were hidden), so
    // button coordinates can't be used as-is. A 1px marker with its own
    // view-transition-name lets the browser tell us where the button center lands
    // inside that layer.
    const marker = document.createElement("div");
    marker.setAttribute("aria-hidden", "true");
    Object.assign(marker.style, {
      position: "fixed",
      left: `${x}px`,
      top: `${y}px`,
      width: "1px",
      height: "1px",
      pointerEvents: "none",
      viewTransitionName: ORIGIN_MARKER_NAME,
    });
    document.body.appendChild(marker);

    const transition = document.startViewTransition(() => {
      setTheme(next);
    });

    const runClipAnimation = () => {
      const markerBox = readGroupBox(ORIGIN_MARKER_NAME);
      const rootBox = readGroupBox("root");
      const cx = markerBox ? markerBox.x : x;
      const cy = markerBox ? markerBox.y : y;
      const layerWidth = rootBox?.width ?? window.innerWidth;
      const layerHeight = rootBox?.height ?? window.innerHeight;
      const endRadius = Math.hypot(
        Math.max(cx, layerWidth - cx),
        Math.max(cy, layerHeight - cy)
      );

      // Always animate `::view-transition-new(root)`: the incoming theme expands from
      // the button. Animating `::view-transition-old(root)` for light→dark is often a
      // no-op or flashes because the old snapshot is handled differently by the engine.
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${cx}px ${cy}px)`,
            `circle(${endRadius}px at ${cx}px ${cy}px)`,
          ],
        },
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

    void transition.finished.finally(() => marker.remove());
  }, [buttonRef, duration, resolvedTheme, setTheme]);

  return toggleTheme;
}
