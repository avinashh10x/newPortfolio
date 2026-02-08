import { Metadata } from "next";
import AboutContent from "@/components/sections/AboutContent";
import About2 from "@/components/sections/About2";

export const metadata: Metadata = {
  title: "About Avi | Best Full-Stack Developer in Mumbai & Punjab, India",
  description:
    "Learn about Avi (Avinash Kumar), India's top full-stack developer specializing in React, Next.js, GSAP animations, and backend development. CS'25 graduate based in Mumbai & Punjab building modern web applications.",
  keywords: [
    "About Avi Developer",
    "Avinash Kumar Developer",
    "Full Stack Developer Mumbai",
    "Best Developer Punjab",
    "React Expert India",
    "Next.js Developer Mumbai",
    "GSAP Animation Developer India",
    "Web Developer Portfolio India",
    "Hire Developer Mumbai",
    "Frontend Backend Developer India",
  ],
  openGraph: {
    title: "About Avi | India's Best Full-Stack Developer",
    description:
      "Meet Avi - A top-tier full-stack developer in Mumbai & Punjab, India. Expert in React, Next.js, GSAP, and modern web technologies.",
    url: "https://byavi.in/about",
    type: "profile",
  },
  twitter: {
    title: "About Avi | Best Full-Stack Developer in India",
    description:
      "Discover Avi's journey as India's best full-stack developer. Expert in React, Next.js, GSAP animations & backend development.",
  },
  alternates: {
    canonical: "https://byavi.in/about",
  },
};

function About() {
  return (
    <>
      <AboutContent />
      <About2 />
    </>
  );
}

export default About;
