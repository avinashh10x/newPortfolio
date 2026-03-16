import { Metadata } from "next";
import About2 from "@/components/sections/About2";

export const metadata: Metadata = {
  title: "About Avi | Creative Developer in Mumbai & Punjab, India",
  description:
    "Learn about Avi (Avinash Kumar), a Creative Developer specializing in interactive web experiences, React, Next.js, and GSAP animations. Based in Mumbai & Punjab building modern web applications.",
  keywords: [
    "About Avi Developer",
    "Avinash Kumar Developer",
    "Creative Developer Mumbai",
    "Best Frontend Developer Punjab",
    "React Expert India",
    "Next.js Developer Mumbai",
    "GSAP Animation Developer India",
    "Creative Web Portfolio India",
    "Hire Creative Developer Mumbai",
    "Frontend Interactive Developer India",
  ],
  openGraph: {
    title: "About Avi | Creative Developer",
    description:
      "Meet Avi - A top-tier Creative Developer in Mumbai & Punjab, India. Expert in React, Next.js, GSAP, and interactive web technologies.",
    url: "https://byavi.in/about",
    type: "profile",
  },
  twitter: {
    title: "About Avi | Creative Developer in India",
    description:
      "Discover Avi's journey as a Creative Developer. Expert in React, Next.js, GSAP animations & interactive web development.",
  },
  alternates: {
    canonical: "https://byavi.in/about",
  },
};

function About() {
  return <About2 />;
}

export default About;
