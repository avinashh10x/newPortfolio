import { GithubIcon } from "@/components/GithubIcon";
import { TwitterIcon } from "@/components/TwitterIcon";
import { LinkedInIcon } from "@/components/LinkedinIcon";

export const heroText =
  "Hi, I'm Avi — Full-stack developer focused on SaaS and product-driven systems.I build production-ready tools, platforms, and interactive web experiences for creators, startups, and businesses.Currently working on independent products and a design-focused UI component library.";

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
    href: "https://www.linkedin.com/in/avinash-kumar-%F0%9F%8C%9F-519616249/",
    Icon: LinkedInIcon,
    label: "LinkedIn",
  },
} as const;
