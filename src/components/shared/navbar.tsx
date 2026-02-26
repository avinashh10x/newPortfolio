"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
  AnimatePresence,
} from "framer-motion";
import {
  BriefcaseBusinessIcon,
  ClipboardIcon,
  ClipboardMinusIcon,
  LightbulbIcon,
  Paperclip,
  PaperclipIcon,
} from "lucide-react";
import Link from "next/link";
import { GithubIcon } from "../GithubIcon";
import { usePathname } from "next/navigation";
import { TwitterIcon } from "../TwitterIcon";
import { HouseIcon } from "../HouseIcon";
import { MailIcon } from "../MailIcon";
import { MoonIcon } from "../MoonIcon";
import { SunIcon } from "../SunIcon";
import { LinkedInIcon } from "../LinkedinIcon";
import { useTheme } from "next-themes";

type MenuLink = {
  name: string;
  href: string;
  icon: React.ReactNode;
  target?: string;
};

const THEME_LINK: MenuLink[] = [
  { name: "Theme", icon: <MoonIcon size={24} />, href: "#", target: "_self" },
];

const DETAIL_LINKS: MenuLink[] = [
  {
    name: "Home",
    icon: <HouseIcon size={24} />,
    href: "/",
    target: "_self",
  },
  {
    name: "About",
    icon: <LightbulbIcon size={24} />,
    href: "/about",
    target: "_self",
  },
  {
    name: "Work",
    icon: <BriefcaseBusinessIcon size={24} />,
    href: "/work",
    target: "_self",
  },
];

const CONTACT_LINKS: MenuLink[] = [
  // {
  //   name: "Resume",
  //   icon: <ClipboardMinusIcon size={24} />,
  //   href: "/aviResume.pdf",
  //   target: "_blank",
  // },
  {
    name: "LinkedIn",
    icon: <LinkedInIcon size={24} />,
    href: "https://www.linkedin.com/in/avinash-kumar-%F0%9F%8C%9F-519616249/",
    target: "_blank",
  },

  {
    name: "Twitter",
    icon: <TwitterIcon size={24} />,
    href: "https://twitter.com/avinash10x",
    target: "_blank",
  },
  {
    name: "Mail",
    icon: <MailIcon size={24} />,
    href: "mailto:thissideavinash@gmail.com",
  },
];

function DockItem({
  link,
  mouseX,
  onThemeClick,
  isActive,
}: {
  link: MenuLink;
  mouseX: MotionValue<number>;
  onThemeClick?: () => void;
  isActive: boolean;
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

  const isExternal =
    link.href === "#" ||
    link.href.startsWith("http") ||
    link.href.startsWith("mailto");
  const isMailto = link.href.startsWith("mailto");

  const content = (
    <>
      <motion.span
        style={{ scale: iconScale }}
        className={`text-foreground/80 flex items-center justify-center ${isActive ? "text-primary" : ""}`}
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
            className="pointer-events-none absolute -top-8 px-2 py-1 text-[10px] rounded-sm bg-background text-foreground whitespace-nowrap"
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
              : link.href;

          const isActive = hrefPath
            ? hrefPath === "/"
              ? path === "/"
              : path.startsWith(hrefPath)
            : false;

          return (
            isActive && (
              <motion.span
                initial={{ opacity: 1, y: 6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 1, y: 6, scale: 0.96 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="pointer-events-none absolute -bottom-1.5 text-primary text-[10px] rounded-full bg-primary h-[3px] w-[3px] "
              ></motion.span>
            )
          );
        })()}
      </AnimatePresence>
    </>
  );

  return (
    <motion.li ref={ref} style={{ width }} className="aspect-square">
      {isExternal ? (
        <a
          href={link.href}
          target={isMailto ? undefined : link.target}
          rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={(e) => {
            if (link.name === "Theme" && onThemeClick) {
              e.preventDefault();
              onThemeClick();
            }
            // Don't interfere with mailto links - let browser handle them
          }}
          className="w-full h-full flex items-center justify-center rounded-full bg-foreground/20 border border-foreground/30 relative backdrop-blur-lg hover"
        >
          {content}
        </a>
      ) : (
        <Link
          href={link.href}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={(e) => {
            if (link.name === "Theme" && onThemeClick) {
              e.preventDefault();
              onThemeClick();
            }
          }}
          className="w-full h-full flex items-center justify-center rounded-full bg-foreground/20 border border-foreground/30 relative backdrop-blur-lg"
        >
          {content}
        </Link>
      )}
    </motion.li>
  );
}

// Simple mobile nav item without animations
function MobileNavItem({
  link,
  onThemeClick,
}: {
  link: MenuLink;
  onThemeClick?: () => void;
}) {
  const path = usePathname();

  const isExternal =
    link.href === "#" ||
    link.href.startsWith("http") ||
    link.href.startsWith("mailto");
  const isMailto = link.href.startsWith("mailto");

  const hrefPath =
    link.href === "#" || link.href.startsWith("http") ? null : link.href;

  const isActive = hrefPath
    ? hrefPath === "/"
      ? path === "/"
      : path.startsWith(hrefPath)
    : false;

  const content = (
    <span className="text-foreground/80 flex items-center justify-center">
      {link.icon}
    </span>
  );

  const className = `w-10 h-10 flex items-center justify-center rounded-full bg-foreground/20 border border-foreground/30 relative backdrop-blur-lg ${isActive ? "ring-2 ring-foreground/50" : ""}`;

  return (
    <li className="flex-shrink-0">
      {isExternal ? (
        <a
          href={link.href}
          target={isMailto ? undefined : link.target}
          rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
          onClick={(e) => {
            if (link.name === "Theme" && onThemeClick) {
              e.preventDefault();
              onThemeClick();
            }
          }}
          className={className}
        >
          {content}
        </a>
      ) : (
        <Link
          href={link.href}
          onClick={(e) => {
            if (link.name === "Theme" && onThemeClick) {
              e.preventDefault();
              onThemeClick();
            }
          }}
          className={className}
        >
          {content}
        </Link>
      )}
    </li>
  );
}

function Navbar() {
  const mouseX = useMotionValue(Infinity);
  const [isMobile, setIsMobile] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const path = usePathname();

  const isActive = (hrefPath: string) => {
    return hrefPath
      ? hrefPath === "/"
        ? path === "/"
        : path.startsWith(hrefPath)
      : false;
  };

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isDark = mounted ? theme === "dark" : false;

  return (
    <div className="w-full flex justify-center items-end pb-5 fixed bottom-0 z-50">
      {isMobile ? (
        // Mobile: Simple nav without dock animations
        <nav className="bg-background/40 backdrop-blur-xl rounded-full px-3 py-2 border border-foreground/20 shadow-2xl">
          <ul className="flex gap-2 h-10 items-center">
            {DETAIL_LINKS.map((link) => {
              const renderedLink =
                link.name === "Theme"
                  ? {
                      ...link,
                      icon: isDark ? (
                        <SunIcon size={20} />
                      ) : (
                        <MoonIcon size={20} />
                      ),
                    }
                  : link;

              return (
                <MobileNavItem
                  key={renderedLink.name}
                  link={renderedLink}
                  onThemeClick={toggleTheme}
                />
              );
            })}
            <span className="w-px h-6 bg-foreground/20 my-auto" />
            {THEME_LINK.map((link) => (
              <MobileNavItem
                key={link.name}
                link={{
                  ...link,
                  icon: isDark ? <SunIcon size={20} /> : <MoonIcon size={20} />,
                }}
                onThemeClick={toggleTheme}
              />
            ))}
            <span className="w-px h-6 bg-foreground/20 my-auto" />
            {CONTACT_LINKS.map((link) => (
              <MobileNavItem key={link.name} link={link} />
            ))}
          </ul>
        </nav>
      ) : (
        // Desktop: iOS dock-style animation
        <motion.nav
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="bg-background/40 backdrop-blur-xl rounded-full px-2 py-2 border border-foreground/20 shadow-2xl "
        >
          <ul className="flex  gap-2 h-10 items-end">
            {DETAIL_LINKS.map((link) => {
              const renderedLink =
                link.name === "Theme"
                  ? {
                      ...link,
                      icon: isDark ? (
                        <SunIcon size={24} />
                      ) : (
                        <MoonIcon size={24} />
                      ),
                    }
                  : link;

              return (
                <DockItem
                  key={renderedLink.name}
                  link={renderedLink}
                  mouseX={mouseX}
                  onThemeClick={toggleTheme}
                  isActive={isActive(link.href)}
                />
              );
            })}
            <motion.span className="w-px h-6 bg-foreground/20   my-auto" />
            {THEME_LINK.map((link) => (
              <DockItem
                key={link.name}
                link={link}
                mouseX={mouseX}
                isActive={isActive(link.href)}
                onThemeClick={toggleTheme}
              />
            ))}
            <motion.span className="w-px h-6 bg-foreground/20 my-auto" />
            {CONTACT_LINKS.map((link) => (
              <DockItem
                key={link.name}
                link={link}
                mouseX={mouseX}
                isActive={isActive(link.href)}
              />
            ))}
          </ul>
        </motion.nav>
      )}
    </div>
  );
}

export default Navbar;
