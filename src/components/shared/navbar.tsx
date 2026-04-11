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
  LightbulbIcon,
  Settings2,
} from "lucide-react";
import SoundLink from "./SoundLink";
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
  { name: "Theme", icon: <MoonIcon size={22} />, href: "#", target: "_self" },
];

const DETAIL_LINKS: MenuLink[] = [
  {
    name: "Home",
    icon: <HouseIcon size={22} />,
    href: "/",
    target: "_self",
  },
  {
    name: "About",
    icon: <LightbulbIcon size={22} strokeWidth={1.5} />,
    href: "/about",
    target: "_self",
  },
  {
    name: "Work",
    icon: <BriefcaseBusinessIcon size={22} strokeWidth={1.5} />,
    href: "/work",
    target: "_self",
  },
];

const CONTACT_LINKS: MenuLink[] = [
  // {
  //   name: "Resume",
  //   icon: <ClipboardMinusIcon size={22} strokeWidth={1.5} />,
  //   href: "/aviResume.pdf",
  //   target: "_blank",
  // },
  {
    name: "LinkedIn",
    icon: <LinkedInIcon size={22} />,
    href: "https://www.linkedin.com/in/avinash-kumar-%F0%9F%8C%9F-519616249/",
    target: "_blank",
  },

  {
    name: "Twitter",
    icon: <TwitterIcon size={22} />,
    href: "https://twitter.com/avinash10x",
    target: "_blank",
  },
  {
    name: "Mail",
    icon: <MailIcon size={22} />,
    href: "mailto:Avinashbuilds@gmail.com",
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

  const isMailto = link.href.startsWith("mailto");

  const content = (
    <>
      <motion.span
        style={{ scale: iconScale }}
        className={`transition-colors duration-300 flex items-center justify-center [&_svg]:stroke-[1.5px] ${isActive ? "text-foreground" : "text-foreground/40 group-hover:text-foreground/80"}`}
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
                animate={{ opacity: 1, y: -5, scale: 1 }}
                exit={{ opacity: 1, y: 6, scale: 0.96 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="pointer-events-none absolute -bottom-2 text-foreground text-[10px] rounded-full bg-foreground h-1 w-1 "
              ></motion.span>
            )
          );
        })()}
      </AnimatePresence>
    </>
  );

  return (
    <motion.li ref={ref} style={{ width }} className="aspect-square">
      <SoundLink
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
        }}
        className="group w-full h-full flex items-center justify-center rounded-full bg-transparent hover:bg-foreground/5 transition-colors duration-300 relative"
      >
        {content}
      </SoundLink>
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

  const isMailto = link.href.startsWith("mailto");

  const hrefPath =
    link.href === "#" || link.href.startsWith("http") ? null : link.href;

  const isActive = hrefPath
    ? hrefPath === "/"
      ? path === "/"
      : path.startsWith(hrefPath)
    : false;

  const content = (
    <span className={`transition-colors duration-300 flex items-center justify-center [&_svg]:stroke-[1.5px] ${isActive ? "text-foreground" : "text-foreground/40 group-hover:text-foreground/80"}`}>
      {link.icon}
    </span>
  );

  const className = `group w-9 h-9 max-[410px]:w-8 max-[410px]:h-8 flex items-center justify-center rounded-full bg-transparent hover:bg-foreground/5 transition-colors duration-300 relative ${isActive ? "ring-1 ring-foreground/20" : ""}`;

  return (
    <li className="flex-shrink-0">
      <SoundLink
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
      </SoundLink>
    </li>
  );
}

function Navbar() {
  const path = usePathname();
  const mouseX = useMotionValue(Infinity);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      const hasCookie = document.cookie.includes("admin_session=authenticated");
      const hasLocal = typeof window !== "undefined" && localStorage.getItem("adminAuth") === "true";
      setIsAdmin(hasCookie || hasLocal);
    };
    checkAuthStatus();
    // Re-check periodically in case they log in/out in another tab
    const interval = setInterval(checkAuthStatus, 5000);
    return () => clearInterval(interval);
  }, []);


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
    checkMobile(); // Check immediately on mount
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);



  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const isDark = resolvedTheme !== "light";
  const showNavbar = true;
  const navAnimation = {
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
  };

  return (
    <div className="w-full flex justify-center items-end pb-5 md:pb-8 fixed bottom-0 z-50 pointer-events-none">
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 -z-10 backdrop-blur-md pointer-events-none md:hidden"
        style={{
          maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)'
        }}
      />
      <div className="pointer-events-auto flex items-end">
        <AnimatePresence>
        {showNavbar && mounted && (
          isMobile ? (
            <motion.nav
              key="mobile-navbar"
              variants={navAnimation}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{
                duration: 0.62,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ transformOrigin: "center bottom" }}
              className="mx-4 max-[410px]:mx-2 rounded-full border border-foreground/10 bg-background/80 px-[10px] py-[10px] max-[410px]:px-1.5 max-[410px]:py-1.5 shadow-lg backdrop-blur-xl"
            >
              <ul className="flex gap-2 max-[410px]:gap-1 h-10 max-[410px]:h-8 items-center">
                {DETAIL_LINKS.map((link) => {
                  const renderedLink =
                    link.name === "Theme"
                      ? {
                        ...link,
                        icon: isDark ? (
                          <MoonIcon size={20} />
                        ) : (
                          <SunIcon size={20} />
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
                <span className="w-px h-5 bg-foreground/10 my-auto mx-1" />
                {THEME_LINK.map((link) => (
                  <MobileNavItem
                    key={link.name}
                    link={{
                      ...link,
                      icon: isDark ? <MoonIcon size={20} /> : <SunIcon size={20} />,
                    }}
                    onThemeClick={toggleTheme}
                  />
                ))}
                {isAdmin && (
                  <MobileNavItem
                    key="Admin"
                    link={{
                      name: "Admin CMS",
                      icon: <Settings2 size={20} />,
                      href: "/admin",
                      target: "_self",
                    }}
                  />
                )}
                <span className="w-px h-5 bg-foreground/10 my-auto mx-1" />
                {CONTACT_LINKS.map((link) => (
                  <MobileNavItem key={link.name} link={link} />
                ))}
              </ul>
            </motion.nav>
          ) : (
            <motion.nav
              key="desktop-navbar"
              variants={navAnimation}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{
                duration: 0.68,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ transformOrigin: "center bottom" }}
              onMouseMove={(e) => mouseX.set(e.pageX)}
              onMouseLeave={() => mouseX.set(Infinity)}
              className="rounded-full border border-foreground/10 bg-background/80 px-3 py-2 shadow-xl backdrop-blur-2xl"
            >
              <ul className="flex gap-1 h-11 items-end">
                {DETAIL_LINKS.map((link) => {
                  const renderedLink =
                    link.name === "Theme"
                      ? {
                        ...link,
                        icon: isDark ? (
                          <SunIcon size={22} />
                        ) : (
                          <MoonIcon size={22} />
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
                <motion.span className="w-[1px] h-6 bg-foreground/10 my-auto mx-2" />
                {THEME_LINK.map((link) => (
                  <DockItem
                    key={link.name}
                    link={{
                      ...link,
                      icon: isDark ? <MoonIcon size={22} /> : <SunIcon size={22} />,
                    }}
                    mouseX={mouseX}
                    isActive={isActive(link.href)}
                    onThemeClick={toggleTheme}
                  />
                ))}
                {isAdmin && (
                  <DockItem
                    key="Admin"
                    link={{
                      name: "Admin CMS",
                      icon: <Settings2 size={22} />,
                      href: "/admin",
                      target: "_self",
                    }}
                    mouseX={mouseX}
                    isActive={isActive("/admin")}
                  />
                )}
                <motion.span className="w-[1px] h-6 bg-foreground/10 my-auto mx-2" />
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
          )
        )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Navbar;
