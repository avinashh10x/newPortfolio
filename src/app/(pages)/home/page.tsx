import { Metadata } from "next";
import AboutContent from "@/components/sections/AboutContent";
import Hero from "@/components/sections/Hero";
import Hero2 from "@/components/sections/Hero2";

export const metadata: Metadata = {
  title: "Avi | Best Full-Stack Developer in India - Mumbai & Punjab",
  description:
    "Welcome to Avi's portfolio. India's best full-stack developer specializing in React, Next.js, GSAP animations, and backend development. Based in Mumbai & Punjab, building modern web experiences.",
  keywords: [
    "Avi Portfolio",
    "Best Developer India",
    "Full Stack Developer Mumbai",
    "React Developer Punjab",
    "Next.js Expert India",
    "GSAP Animation Developer",
    "Web Developer Mumbai",
    "Frontend Developer India",
    "Backend Developer Mumbai",
    "Hire Developer India",
    "Top Programmer Mumbai",
    "Best Coder Punjab",
  ],
  openGraph: {
    title: "Avi | India's Best Full-Stack Developer Portfolio",
    description:
      "Explore Avi's portfolio - Top full-stack developer in Mumbai & Punjab. Expert in React, Next.js, GSAP & modern web technologies.",
    url: "https://byavi.in",
    type: "website",
  },
  twitter: {
    title: "Avi | Best Full-Stack Developer in India",
    description:
      "India's top full-stack developer portfolio. React, Next.js, GSAP expert based in Mumbai & Punjab.",
  },
  alternates: {
    canonical: "https://byavi.in",
  },
};

function HomePage() {
  return (
    <div>
      <Hero2 />
    </div>
  );
}

export default HomePage;
