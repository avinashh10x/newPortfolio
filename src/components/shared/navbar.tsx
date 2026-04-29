"use client";

import React, { useEffect, useRef, useState, type RefObject } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
  AnimatePresence,
} from "framer-motion";
import {
  BriefcaseBusinessIcon,
  LightbulbIcon,
  Settings2,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useViewTransitionThemeToggle } from "@/hooks/useViewTransitionThemeToggle";
import SoundLink from "./SoundLink";
import { TwitterIcon } from "../TwitterIcon";
import { HouseIcon } from "../HouseIcon";
import { MailIcon } from "../MailIcon";
import { MoonIcon } from "../MoonIcon";
import { SunIcon } from "../SunIcon";
import { LinkedInIcon } from "../LinkedinIcon";

// --- Types & nav config

type MenuLink =
  | { name: string; asButton: true; icon: React.ReactNode }
  | {
      name: string;
      href: string;
      icon: React.ReactNode;
      target?: string;
    };

const DETAIL_LINKS: MenuLink[] = [
  { name: "Home", href: "/", icon: <HouseIcon size={22} />, target: "_self" },
  {
    name: "About",
    href: "/about",
    icon: <LightbulbIcon size={22} strokeWidth={1.5} />,
    target: "_self",
  },
  {
    name: "Work",
    href: "/work",
    icon: <BriefcaseBusinessIcon size={22} strokeWidth={1.5} />,
    target: "_self",
  },
];

const CONTACT_LINKS: MenuLink[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/avinash10x/",
    icon: <LinkedInIcon size={22} />,
    target: "_blank",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/avinash10x",
    icon: <TwitterIcon size={22} />,
    target: "_blank",
  },
  {
    name: "Mail",
    href: "mailto:Avinashbuilds@gmail.com",
    icon: <MailIcon size={22} />,
  },
];

function themeMenuLink(icon: React.ReactNode): MenuLink {
  return { name: "Theme", asButton: true, icon };
}

// --- Route highlight: internal Next.js routes only (not mailto, http, theme button)

function internalPathForActive(link: MenuLink): string | null {
  if ("asButton" in link) return null;
  const h = link.href;
  if (h === "#" || h.startsWith("http") || h.startsWith("mailto")) return null;
  return h;
}

function isPathActive(pathname: string, route: string | null): boolean {
  if (!route) return false;
  if (route === "/") return pathname === "/";
  return pathname.startsWith(route);
}

function useMenuLinkActive(link: MenuLink): boolean {
  const pathname = usePathname();
  return isPathActive(pathname, internalPathForActive(link));
}

// --- SoundLink: shared wiring for all nav items

type NavItemButtonProps = {
  link: MenuLink;
  className: string;
  onThemeClick?: () => void;
  /** For theme: ref on the &lt;button&gt; (view transition origin) */
  themeButtonRef?: RefObject<HTMLButtonElement | null>;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children: React.ReactNode;
};

function NavItemButton({
  link,
  className,
  onThemeClick,
  themeButtonRef,
  onMouseEnter,
  onMouseLeave,
  children,
}: NavItemButtonProps) {
  if ("asButton" in link) {
    return (
      <SoundLink
        asButton
        buttonRef={themeButtonRef}
        ariaLabel="Toggle color theme"
        className={className}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onThemeClick}
      >
        {children}
      </SoundLink>
    );
  }

  const isMailto = link.href.startsWith("mailto");

  return (
    <SoundLink
      href={link.href}
      className={className}
      target={isMailto ? undefined : link.target}
      rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </SoundLink>
  );
}

// --- Mobile item (static sizing, ring when active)

const MOBILE_ITEM_CLASS =
  "group w-9 h-9 max-[410px]:w-8 max-[410px]:h-8 flex items-center justify-center rounded-full bg-transparent hover:bg-foreground/5 transition-colors duration-300 relative";

const ICON_CLASS =
  "transition-colors duration-300 flex items-center justify-center [&_svg]:stroke-[1.5px]";

function iconToneClass(active: boolean) {
  return active
    ? "text-foreground"
    : "text-foreground/40 group-hover:text-foreground/80";
}

function MobileNavItem({
  link,
  onThemeClick,
  themeButtonRef,
}: {
  link: MenuLink;
  onThemeClick?: () => void;
  themeButtonRef?: RefObject<HTMLButtonElement | null>;
}) {
  const active = useMenuLinkActive(link);
  return (
    <li className="flex-shrink-0">
      <NavItemButton
        link={link}
        onThemeClick={onThemeClick}
        themeButtonRef={
          "asButton" in link ? themeButtonRef : undefined
        }
        className={
          active
            ? `${MOBILE_ITEM_CLASS} ring-1 ring-foreground/20`
            : MOBILE_ITEM_CLASS
        }
      >
        <span className={`${ICON_CLASS} ${iconToneClass(active)}`}>
          {link.icon}
        </span>
      </NavItemButton>
    </li>
  );
}

// --- Desktop dock item (magnify + label + active dot)

const DOCK_ITEM_CLASS =
  "group w-full h-full flex items-center justify-center rounded-full bg-transparent hover:bg-foreground/5 transition-colors duration-300 relative";

function DockItem({
  link,
  mouseX,
  onThemeClick,
  themeButtonRef,
}: {
  link: MenuLink;
  mouseX: MotionValue<number>;
  onThemeClick?: () => void;
  themeButtonRef?: RefObject<HTMLButtonElement | null>;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const active = useMenuLinkActive(link);

  const distance = useTransform(mouseX, (v) => {
    const b = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return v - b.x - b.width / 2;
  });
  const width = useSpring(
    useTransform(distance, [-150, 0, 150], [40, 80, 40]),
    { mass: 0.1, stiffness: 150, damping: 12 }
  );
  const iconScale = useSpring(
    useTransform(distance, [-150, 0, 150], [0.8, 1.1, 0.8]),
    { mass: 0.1, stiffness: 150, damping: 12 }
  );

  return (
    <motion.li ref={ref} style={{ width }} className="aspect-square">
      <NavItemButton
        link={link}
        onThemeClick={onThemeClick}
        themeButtonRef={
          "asButton" in link ? themeButtonRef : undefined
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={DOCK_ITEM_CLASS}
      >
        <motion.span
          style={{ scale: iconScale }}
          className={`${ICON_CLASS} ${iconToneClass(active)}`}
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
              className="pointer-events-none absolute -top-9 px-2 py-1 text-[10px] rounded-sm bg-foreground/90 text-background whitespace-nowrap shadow-md font-medium"
            >
              {link.name}
            </motion.span>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {active && (
            <motion.span
              initial={{ opacity: 1, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: -5, scale: 1 }}
              exit={{ opacity: 1, y: 6, scale: 0.96 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="pointer-events-none absolute -bottom-2 h-1 w-1 rounded-full bg-foreground text-[10px]"
            />
          )}
        </AnimatePresence>
      </NavItemButton>
    </motion.li>
  );
}

// --- Layout chrome

const NAV_MOTION = {
  hidden: {
    opacity: 0,
    y: 24,
    scaleX: 0.72,
    scaleY: 0.8,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    filter: "blur(0px)",
  },
} as const;

function useViewportBelowWidth(maxWidth: number) {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidth - 1}px)`);
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [maxWidth]);
  return narrow;
}

function useAdminVisible() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const check = () => {
      const cookie = document.cookie.includes("admin_session=authenticated");
      const local = localStorage.getItem("adminAuth") === "true";
      setOn(cookie || local);
    };
    check();
    const t = setInterval(check, 5000);
    return () => clearInterval(t);
  }, []);
  return on;
}

// Tracks the `data-page` attribute on <html> so the navbar can hide on 404.
function useIsNotFoundPage() {
  const [isNotFound, setIsNotFound] = useState(false);
  useEffect(() => {
    const update = () => {
      setIsNotFound(
        document.documentElement.getAttribute("data-page") === "404"
      );
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-page"],
    });
    return () => observer.disconnect();
  }, []);
  return isNotFound;
}

// ---

export default function Navbar() {
  const mouseX = useMotionValue(Infinity);
  const isMobile = useViewportBelowWidth(768);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isAdmin = useAdminVisible();
  const isNotFound = useIsNotFoundPage();
  const isDark = resolvedTheme !== "light";
  const themeButtonRef = useRef<HTMLButtonElement | null>(null);
  // Speed: change `THEME_TOGGLE_TRANSITION_MS` in `@/hooks/useViewTransitionThemeToggle`, or pass `{ duration: 600 }` here.
  const toggleTheme = useViewTransitionThemeToggle(themeButtonRef);

  useEffect(() => {
    setMounted(true);
  }, []);

  const mobileThemeIcon = isDark ? <MoonIcon size={20} /> : <SunIcon size={20} />;
  const desktopThemeIcon = isDark ? <MoonIcon size={22} /> : <SunIcon size={22} />;

  return (
    <div className="pointer-events-none fixed bottom-0 z-50 flex w-full items-end justify-center pb-5 md:pb-8">
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 -z-10 h-32 backdrop-blur-md md:hidden"
        style={{
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
        }}
      />
      <div className="pointer-events-auto flex items-end">
        <AnimatePresence>
          {mounted && !isNotFound &&
            (isMobile ? (
            <motion.nav
              key="mobile-navbar"
              variants={NAV_MOTION}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "center bottom" }}
              className="mx-4 max-[410px]:mx-2 rounded-full border border-foreground/10 bg-background/80 px-[10px] py-[10px] shadow-lg backdrop-blur-xl max-[410px]:px-1.5 max-[410px]:py-1.5"
            >
              <ul className="flex h-10 max-[410px]:h-8 items-center gap-2 max-[410px]:gap-1">
                {DETAIL_LINKS.map((link) => (
                  <MobileNavItem key={link.name} link={link} />
                ))}
                <span className="mx-1 my-auto h-5 w-px bg-foreground/10" />
                <MobileNavItem
                  link={themeMenuLink(mobileThemeIcon)}
                  onThemeClick={toggleTheme}
                  themeButtonRef={themeButtonRef}
                />
                {isAdmin && (
                  <MobileNavItem
                    key="admin"
                    link={{
                      name: "Admin CMS",
                      href: "/admin",
                      icon: <Settings2 size={20} />,
                      target: "_self",
                    }}
                  />
                )}
                <span className="mx-1 my-auto h-5 w-px bg-foreground/10" />
                {CONTACT_LINKS.map((link) => (
                  <MobileNavItem key={link.name} link={link} />
                ))}
              </ul>
            </motion.nav>
            ) : (
            <motion.nav
              key="desktop-navbar"
              variants={NAV_MOTION}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "center bottom" }}
              onMouseMove={(e) => mouseX.set(e.pageX)}
              onMouseLeave={() => mouseX.set(Infinity)}
              className="rounded-full border border-foreground/10 bg-background/80 px-3 py-2 shadow-xl backdrop-blur-2xl"
            >
              <ul className="flex h-11 items-end gap-1">
                {DETAIL_LINKS.map((link) => (
                  <DockItem
                    key={link.name}
                    link={link}
                    mouseX={mouseX}
                  />
                ))}
                <motion.span className="mx-2 my-auto h-6 w-[1px] bg-foreground/10" />
                <DockItem
                  key="theme"
                  link={themeMenuLink(desktopThemeIcon)}
                  mouseX={mouseX}
                  onThemeClick={toggleTheme}
                  themeButtonRef={themeButtonRef}
                />
                {isAdmin && (
                  <DockItem
                    key="admin"
                    link={{
                      name: "Admin CMS",
                      href: "/admin",
                      icon: <Settings2 size={22} />,
                      target: "_self",
                    }}
                    mouseX={mouseX}
                  />
                )}
                <motion.span className="mx-2 my-auto h-6 w-[1px] bg-foreground/10" />
                {CONTACT_LINKS.map((link) => (
                  <DockItem key={link.name} link={link} mouseX={mouseX} />
                ))}
              </ul>
            </motion.nav>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
