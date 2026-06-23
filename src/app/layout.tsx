import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/navbar";
import WordPreloader from "@/components/shared/WordPreloader";
import { ThemeProvider } from "@/components/theme-provider";
import {
  ogImageAbsoluteUrl,
  ogImageOpenGraph,
  ogImageTwitter,
} from "@/lib/seo";
import { Analytics } from "@vercel/analytics/next";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://byavi.in"),

  title: {
    default: "Avi - Creative Developer | Mumbai & Punjab, India",
    template: "%s | Avi - Creative Developer",
  },

  description:
    "Hi, I'm Avi , a Creative Developer based in Mumbai & Punjab. Expert in React, Next.js, GSAP animations, and interactive web experiences.",

  keywords: [
    "Avi",
    "Avinash",
    "Avinash Kumar",
    "Creative Developer India",
    "Creative Web Developer",
    "Frontend Developer Mumbai",
    "React Developer Mumbai",
    "Next.js Developer India",
    "GSAP Animation Developer",
    "Interactive Developer India",
    "Creative Developer Punjab",
    "WebGL Developer India",
    "Best Frontend Developer Mumbai",
    "Web Animation Expert",
    "hire creative developer india",
    "hire gsap developer",
    "interactive web designer india",
  ],

  authors: [{ name: "Avi ", url: "https://byavi.in" }],
  creator: "Avi - Creative Developer India",
  publisher: "Avi - Creative Developer",

  openGraph: {
    title:
      "Avi - Creative Developer | React, Next.js, GSAP Expert",
    description:
      "Creative Developer in Mumbai & Punjab, India. Specializing in interactive web experiences, GSAP animations, and modern frontend development.",
    url: "https://byavi.in",
    siteName: "Avi - Creative Developer Portfolio",
    locale: "en_IN",
    type: "website",
    images: [...ogImageOpenGraph],
  },

  twitter: {
    card: "summary_large_image",
    title: "Avi - Creative Developer | React, Next.js, GSAP",
    description:
      "Creative Developer in Mumbai & Punjab. Expert in React, Next.js, GSAP animations & interactive web experiences.",
    creator: "@avinash10x",
    images: [...ogImageTwitter],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://byavi.in",
  },

  applicationName: "Avi - Creative Developer Portfolio",

  // Uncomment and add your Google Search Console verification code:
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_CODE",
  // },

  other: {
    "revisit-after": "7 days",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ldJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Avi ",
    alternateName: ["Avinash", "Avinash Kumar", "Avi Developer"],
    description:
      "A Creative Developer specializing in interactive web experiences, React, Next.js, and GSAP animations. Based in Mumbai & Punjab.",
    url: "https://byavi.in",
    image: ogImageAbsoluteUrl,
    jobTitle: "Creative Developer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance / Independent",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      addressCountry: "India",
    },
    knowsAbout: [
      "React",
      "Next.js",
      "GSAP",
      "Creative Development",
      "TypeScript",
      "Frontend Development",
      "Three.js",
      "Web Animation",
      "Interactive Design",
    ],
    alumniOf: "Computer Science Graduate 2025",
    sameAs: [
      "https://twitter.com/avinash10x",
      "https://github.com/avinashh10x",
      "https://www.linkedin.com/in/avinash10x/",
    ],
  });

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-title" content="byAvi" />
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Mumbai" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ldJson }}
        />
      </head>
      <body
        className={`${geistMono.variable} font-sans`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>
            <WordPreloader />
          </Suspense>
          {children}
          <Navbar />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
