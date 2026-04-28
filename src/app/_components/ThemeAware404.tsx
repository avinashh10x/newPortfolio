"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeAware404() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme !== "light";
  const background = isDark ? "#111" : "#f5f5f5";
  const textPrimary = isDark ? "#f0f0f0" : "#111111";
  const textMuted = isDark ? "#666" : "#999";

  const filterStyle = isDark
    ? "invert(1) contrast(6) brightness(0.9)"
    : "contrast(6) brightness(1.05)";
  const blendMode = isDark ? "screen" : "multiply";

  return (
    <div
      className="w-full h-screen  flex flex-col items-center justify-center"
      style={{ background }}
    >
      {/* Cat image — no mask, no circle, just clean blend */}
      <div className="relative h-1/2 mb-30 w-full  flex flex-col items-center justify-center">
        <img
          src="/img/404-cat.gif"
          alt="404 cat"
          style={{
            objectFit: "contain",
            objectPosition: "bottom",
            filter: filterStyle,
            mixBlendMode: blendMode,
            display: "block",
          }}
          className="h-full w-auto  absolute"
        />

        {/* Text block — sits naturally below the cat */}
        <div
          style={{
            // marginTop: "32px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
          }}
          className="absolute h-full justify-between "
        >
          {/* Eyebrow — small, muted */}

          <span
            style={{
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: textMuted,
            }}
            className="h-1/3 flex items-end"
          >
            Error 404
          </span>

          <div className="flex flex-col h-1/4  items-center justify-center">
            {/* Headline */}
            <p
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: textPrimary,
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Seems like you are lost
            </p>

            {/* Subtext */}
            <p
              style={{
                fontSize: "13px",
                color: textMuted,
                margin: 0,
                marginTop: "2px",
              }}
            >
              This page doesn't exist or was moved.
            </p>

            {/* CTA */}
            <Link
              href="/"
              style={{
                marginTop: "20px",
                fontSize: "13px",
                fontWeight: 600,
                color: isDark ? "#f0f0f0" : "#111",
                textDecoration: "none",
                border: `1px solid ${isDark ? "#333" : "#ddd"}`,
                borderRadius: "8px",
                padding: "8px 20px",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
