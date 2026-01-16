"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
  AnimatePresence,
} from "framer-motion";
import { Home, Moon, Sun, Mail, BriefcaseBusinessIcon } from "lucide-react";
import Link from "next/link";
import { GithubIcon } from "../GithubIcon";
import { usePathname } from "next/navigation";

type NavLink = {
  name: string;
  href: string;
  icon: React.ReactNode;
  target?: string;
};

const NAV_LINKS: NavLink[] = [
  { name: "Home", icon: <Home size={24} />, href: "home", target: "_self" },
  {
    name: "Work",
    icon: <BriefcaseBusinessIcon size={24} />,
    href: "work",
    target: "_self",
  },
  { name: "Theme", icon: <Moon size={24} />, href: "#", target: "_self" },
  {
    name: "Github",
    icon: <GithubIcon size={24} />,
    href: "https://github.com/avinashh10x",
    target: "_blank",
  },

  {
    name: "Contact",
    icon: <Mail size={24} />,
    href: "contact",
    target: "_self",
  },
];

function DockItem({
  link,
  mouseX,
  onThemeClick,
}: {
  link: NavLink;
  mouseX: MotionValue<number>;
  onThemeClick?: () => void;
}) {
  const ref = useRef<HTMLLIElement | null>(null);
  const [isHovered, setIsHovered] = React.useState(false);
  const path = usePathname();

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const iconScaleSync = useTransform(distance, [-150, 0, 150], [0.8, 1.1, 0.8]);
  const iconScale = useSpring(iconScaleSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.li ref={ref} style={{ width }} className="aspect-square">
      <Link
        href={link.href}
        onMouseEnter={() => setIsHovered(true)}
        target={link.target}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => {
          if (link.name === "Theme" && onThemeClick) {
            e.preventDefault();
            onThemeClick();
          }
        }}
        className="w-full h-full flex items-center justify-center rounded-full bg-foreground/20 border border-foreground/30 relative backdrop-blur-lg"
      >
        <motion.span
          style={{ scale: iconScale }}
          className="text-foreground/80 flex items-center justify-center"
        >
          {link.icon}
        </motion.span>

        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="pointer-events-none absolute -top-8 px-2 py-1 text-[10px] rounded-sm bg-background text-white whitespace-nowrap"
            >
              {link.name}
            </motion.span>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {(() => {
            const hrefPath =
              link.href === "#" || link.href.startsWith("http")
                ? null
                : link.href === "home"
                  ? "/"
                  : `/${link.href}`;

            const isActive = hrefPath ? path === hrefPath : false;

            return (
              isActive && (
                <motion.span
                  initial={{ opacity: 1, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 1, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="pointer-events-none absolute -bottom-1.5 text-[10px] rounded-full bg-foreground/50 h-[3px] w-[3px] "
                ></motion.span>
              )
            );
          })()}
        </AnimatePresence>
      </Link>
    </motion.li>
  );
}

function Navbar() {
  const mouseX = useMotionValue(Infinity);

  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      setIsDark(true);
    }
  };

  return (
    <div className="w-full flex justify-center items-end pb-12 absolute bottom-0 ">
      <motion.nav
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="bg-background/40 backdrop-blur-xl rounded-full px-2 py-2 border border-foreground/20 shadow-2xl "
      >
        <ul className="flex  gap-2 h-10 items-end">
          {NAV_LINKS.map((link) => {
            const renderedLink =
              link.name === "Theme"
                ? {
                    ...link,
                    icon: isDark ? <Sun size={24} /> : <Moon size={24} />,
                  }
                : link;

            return (
              <DockItem
                key={renderedLink.name}
                link={renderedLink}
                mouseX={mouseX}
                onThemeClick={toggleTheme}
              />
            );
          })}
        </ul>
      </motion.nav>
    </div>
  );
}

export default Navbar;
