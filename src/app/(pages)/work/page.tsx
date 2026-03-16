import { Metadata } from "next";
import KaraScroll from "@/components/sections/karaScroll";

export const metadata: Metadata = {
  title: "Work & Projects | Avi - Creative Developer in India",
  description:
    "Explore Avi's portfolio of projects and work. See real-world applications built with React, Next.js, GSAP animations, and interactive frontend technologies by India's Creative Developer in Mumbai & Punjab.",
  keywords: [
    "Avi Projects",
    "Creative Developer Portfolio India",
    "React Projects Mumbai",
    "Next.js Projects India",
    "GSAP Animation Projects",
    "Interactive Web Development Punjab",
    "Creative Projects India",
    "Creative Developer Work Mumbai",
    "Web Experiences India",
    "Modern Web Projects",
    "Creative Web Development",
    "Interactive Web Experiences",
  ],
  openGraph: {
    title: "Work & Projects | Avi - Creative Developer",
    description:
      "Browse Avi's impressive portfolio of React, Next.js & GSAP projects. See why Avi is a top Creative Developer in India.",
    url: "https://byavi.in/work",
    type: "website",
  },
  twitter: {
    title: "Work & Projects by Avi | Creative Developer in India",
    description:
      "Explore projects by India's Creative Developer. React, Next.js, GSAP expert based in Mumbai & Punjab.",
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
