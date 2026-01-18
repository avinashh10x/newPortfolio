import { GithubIcon } from "@/components/GithubIcon";
import { TwitterIcon } from "@/components/TwitterIcon";
import { LinkedInIcon } from "@/components/LinkedinIcon";

export const heroText =
  // "Hi, I’m Avi, a full-stack developer who designs and builds thoughtful digital products. I turn ideas into reliable, scalable software, and real-world  systems.";
  // "Hi, I’m Avi, a full-stack developer and Computer Science graduate (2025). I build tools, platforms, and interactive experiences that turn ideas into dependable, real-world systems. I enjoy experimenting through code—exploring concepts, shaping ideas, and creating meaningful things on the internet while steadily building my presence on the web.";

  // "Hi, I’m Avinash, a full-stack developer and CS'25 graduate. I design and build tools, platforms, and interactive experiences that bring ideas to life as reliable, real-world systems. I enjoy experimenting through code—using it to explore ideas, refine concepts, and create meaningful work on the internet.";

  "Hi, I’m Avi, a full-stack developer and CS'25 graduate. I build tools, platforms, and interactive experiences that turn ideas into reliable systems. I enjoy experimenting through code—shaping ideas and creating meaningful things on the web.";


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