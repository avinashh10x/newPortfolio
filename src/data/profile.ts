import { GithubIcon } from "@/components/GithubIcon";
import { TwitterIcon } from "@/components/TwitterIcon";
import { LinkedInIcon } from "@/components/LinkedinIcon";

export const heroText =
  // "Hi, I'm Avi — Full-stack developer focused on SaaS and product-driven systems.I build production-ready tools, platforms, and interactive web experiences for creators, startups, and businesses.Currently working on independent products and a design-focused UI component library.";
  "Most of my work starts with a simple idea and ends as a real product, I build SaaS tools, websites, and platforms for creators, startups, and businesses and ship my own along the way.";

export const ICON_MAP = {
  "{{github}}": {
    href: "https://github.com/avinashh10x",
    Icon: GithubIcon,
    label: "GitHub",
  },
  "{{twitter}}": {
    href: "https://x.com/avinash10x",
    Icon: TwitterIcon,
    label: "Twitter",
  },
  "{{linkedin}}": {
    href: "https://www.linkedin.com/in/avinash10x/",
    Icon: LinkedInIcon,
    label: "LinkedIn",
  },
} as const;
