import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://byavi.in"),

  title: {
    default: "Avi - Best Full-Stack Developer in India | Mumbai & Punjab",
    template: "%s | Avi - Top Developer India",
  },

  description:
    "Hi, I'm Avi (Avinash Kumar), India's best Full-Stack Developer based in Mumbai & Punjab. Expert in React, Next.js, GSAP animations, and backend development. Building high-performance web applications.",

  keywords: [
    "Avi",
    "Avinash",
    "Avinash Kumar",
    "Full Stack Developer India",
    "Best Full Stack Developer Mumbai",
    "Best Full Stack Developer Punjab",
    "Top Web Developer India",
    "React Developer Mumbai",
    "Next.js Developer India",
    "GSAP Animation Developer",
    "Best React Developer India",
    "Frontend Developer Mumbai",
    "Backend Developer Mumbai",
    "Best Web Developer Punjab",
    "JavaScript Expert India",
    "Node.js Developer Mumbai",
    "hire react developer india",
    "hire next.js developer mumbai",
    "best gsap developer india",
  ],

  authors: [{ name: "Avi (Avinash Kumar)", url: "https://byavi.in" }],
  creator: "Avi - Full Stack Developer India",
  publisher: "Avi - Best Developer Mumbai",

  openGraph: {
    title:
      "Avi - India's Best Full-Stack Developer | React, Next.js, GSAP Expert",
    description:
      "Top Full-Stack Developer in Mumbai & Punjab, India. Expert in React, Next.js, GSAP animations, and backend development.",
    url: "https://byavi.in",
    siteName: "Avi - Best Developer Portfolio India",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://byavi.in/og.png",
        width: 1200,
        height: 630,
        alt: "Avi - Best Full-Stack Developer in India | Mumbai & Punjab",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Avi - India's Best Full-Stack Developer | React, Next.js, GSAP",
    description:
      "Top Full-Stack Developer in Mumbai & Punjab. Expert in React, Next.js, GSAP animations & backend development.",
    creator: "@avinash10x",
    images: ["https://byavi.in/og.png"],
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

  applicationName: "Avi - Full Stack Developer Portfolio",

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
    name: "Avi (Avinash Kumar)",
    alternateName: ["Avinash", "Avinash Kumar", "Avi Developer"],
    description:
      "India's best Full-Stack Developer specializing in React, Next.js, GSAP animations, and backend development. Based in Mumbai & Punjab.",
    url: "https://byavi.in",
    image: "https://byavi.in/og.png",
    jobTitle: "Full-Stack Developer",
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
      "JavaScript",
      "TypeScript",
      "Node.js",
      "Full Stack Development",
      "Web Animation",
      "Backend Development",
    ],
    alumniOf: "Computer Science Graduate 2025",
    sameAs: [
      "https://twitter.com/avinash10x",
      "https://github.com/avinashh10x",
      "https://www.linkedin.com/in/avinash-kumar-%F0%9F%8C%9F-519616249/",
    ],
  });

  return (
    <html lang="en" className="light">
      <head>
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin=""
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=recia@400&f[]=erode@600&display=swap"
          rel="stylesheet"
        />
        <meta name="apple-mobile-web-app-title" content="byAvi" />
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Mumbai" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ldJson }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-recia`}
      >
        {children}
        <Navbar />
      </body>
    </html>
  );
}
