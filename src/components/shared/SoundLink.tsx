"use client";

import React, { useRef, useCallback } from "react";
import Link from "next/link";

type SoundLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  /** Use Next.js Link for internal routes (default: auto-detect) */
  external?: boolean;
  /** Sound file path for hover */
  hoverSound?: string;
  /** Sound file path for click */
  clickSound?: string;
  /** Volume 0-1 */
  volume?: number;
};

export default function SoundLink({
  href,
  children,
  className,
  target,
  rel,
  onClick,
  onMouseEnter,
  onMouseLeave,
  external,
  hoverSound = "/sfx/tap_05.wav",
  clickSound = "/sfx/tap_03.wav",
  volume = 0.4,
}: SoundLinkProps) {
  const hoverAudioRef = useRef<HTMLAudioElement | null>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedHover = useRef(false);
  const hasPlayedClick = useRef(false);

  const getOrCreateAudio = useCallback(
    (ref: React.MutableRefObject<HTMLAudioElement | null>, src: string) => {
      if (!ref.current) {
        ref.current = new Audio(src);
        ref.current.volume = volume;
        ref.current.load();
      }
      return ref.current;
    },
    [volume]
  );

  const playSound = useCallback(
    (
      ref: React.MutableRefObject<HTMLAudioElement | null>,
      src: string,
      guardRef: React.MutableRefObject<boolean>
    ) => {
      if (guardRef.current) return;
      guardRef.current = true;
      const audio = getOrCreateAudio(ref, src);
      audio.currentTime = 0;
      audio.play().catch(() => {});
    },
    [getOrCreateAudio]
  );

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      hasPlayedHover.current = false;
      hasPlayedClick.current = false;
      playSound(hoverAudioRef, hoverSound, hasPlayedHover);
      onMouseEnter?.(e);
    },
    [hoverSound, playSound, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent) => {
      hasPlayedHover.current = false;
      hasPlayedClick.current = false;
      onMouseLeave?.(e);
    },
    [onMouseLeave]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      playSound(clickAudioRef, clickSound, hasPlayedClick);
      onClick?.(e);
    },
    [clickSound, playSound, onClick]
  );

  const isExternal =
    external ??
    (href === "#" ||
      href.startsWith("http") ||
      href.startsWith("mailto"));

  const sharedProps = {
    className,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
    "data-sound-link": "true", // marker to exclude from GlobalHoverSound
  };

  if (isExternal) {
    return (
      <a
        href={href}
        target={href.startsWith("mailto") ? undefined : target}
        rel={rel}
        {...sharedProps}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} target={target} {...sharedProps}>
      {children}
    </Link>
  );
}
