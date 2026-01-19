import { Metadata } from "next";
import KaraScroll from "@/components/sections/karaScroll";

export const metadata: Metadata = {
  title: "Work & Projects | Avi - Best Full-Stack Developer in India",
  description:
    "Explore Avi's portfolio of projects and work. See real-world applications built with React, Next.js, GSAP animations, and modern backend technologies by India's best full-stack developer in Mumbai & Punjab.",
  keywords: [
    "Avi Projects",
    "Developer Portfolio India",
    "React Projects Mumbai",
    "Next.js Projects India",
    "GSAP Animation Projects",
    "Web Development Work Punjab",
    "Full Stack Projects India",
    "Best Developer Work Mumbai",
    "Web Applications India",
    "Modern Web Projects",
    "Creative Web Development",
    "Interactive Web Experiences",
  ],
  openGraph: {
    title: "Work & Projects | Avi - India's Best Full-Stack Developer",
    description:
      "Browse Avi's impressive portfolio of React, Next.js & GSAP projects. See why Avi is India's top full-stack developer.",
    url: "https://byavi.in/work",
    type: "website",
  },
  twitter: {
    title: "Work & Projects by Avi | Best Developer in India",
    description:
      "Explore projects by India's best full-stack developer. React, Next.js, GSAP expert based in Mumbai & Punjab.",
  },
  alternates: {
    canonical: "https://byavi.in/work",
  },
};

function WorkPage() {
  return (
    <div>
      <KaraScroll />
    </div>
  );
}

export default WorkPage;
