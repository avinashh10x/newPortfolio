import { GithubIcon } from "@/components/GithubIcon";
import { TwitterIcon } from "@/components/TwitterIcon";
import { LinkedInIcon } from "@/components/LinkedinIcon";

export const heroText =
  "Hi, I’m Avi, a Full-Stack Developer who builds and ships products on the internet. I turn ideas into working software and spend most of my time building tools and refining how things work. I share my code on {{github}}, document my progress on {{twitter}}, and connect professionally on {{linkedin}}.";


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