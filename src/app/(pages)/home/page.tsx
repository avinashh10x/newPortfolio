import { Metadata } from "next";
import AboutContent from "@/components/sections/AboutContent";
import Hero from "@/components/sections/Hero";
import Hero2 from "@/components/sections/Hero2";
import Hero3 from "@/components/sections/Hero3";

export const metadata: Metadata = {
  title: "Avi | Creative Developer in India - Mumbai & Punjab",
  description:
    "Welcome to Avi's portfolio. Creative developer specializing in interactive web experiences, React, Next.js, and GSAP animations. Based in Mumbai & Punjab.",
  keywords: [
    "Avi Portfolio",
    "Creative Developer India",
    "Frontend Developer Mumbai",
    "React Developer Punjab",
    "Next.js Expert India",
    "GSAP Animation Developer",
    "Interactive Web Developer Mumbai",
    "Creative Frontend Developer India",
    "UI UX Developer Mumbai",
    "Hire Creative Developer India",
    "Web Animator Mumbai",
    "WebGL Developer Punjab",
  ],
  openGraph: {
    title: "Avi | Creative Developer Portfolio India",
    description:
      "Explore Avi's portfolio - Creative developer in Mumbai & Punjab. Expert in React, Next.js, GSAP & interactive web technologies.",
    url: "https://byavi.in",
    type: "website",
  },
  twitter: {
    title: "Avi | Creative Developer in India",
    description:
      "Creative developer portfolio. React, Next.js, GSAP expert based in Mumbai & Punjab.",
  },
  alternates: {
    canonical: "https://byavi.in",
  },
};

function HomePage() {
  return (
    <div>
      <Hero3 />
    </div>
  );
}

export default HomePage;
