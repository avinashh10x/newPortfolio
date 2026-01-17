import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { gsap } from "gsap";
    
import { TextPlugin } from "gsap/TextPlugin";
import Navbar from "@/components/shared/navbar";

gsap.registerPlugin(TextPlugin);

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
    default: "Avi — Full-Stack Developer",
    template: "%s | byAvi",
  },

  description:
    "Hi, I’m Avi, a Full-Stack Developer who builds and ships products on the internet. I turn ideas into working software, build useful tools, and refine how things work.",

  keywords: [
    "Avi",
    "Avinash",
    "Full Stack Developer",
    "Web Developer",
    "Software Developer",
    "Indie Developer",
    "Product Builder",
    "JavaScript Developer",
    "React Developer",
    "Next.js Developer",
  ],

  authors: [{ name: "Avi", url: "https://byavi.in" }],
  creator: "Avi",
  publisher: "Avi",

  openGraph: {
    title: "Avi — Full-Stack Developer",
    description:
      "Full-Stack Developer building and shipping useful products on the internet. I turn ideas into working software and share my progress publicly.",
    url: "https://byavi.in",
    siteName: "byAvi",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://byavi.in/og.png",
        alt: "Avi — Full-Stack Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Avi — Full-Stack Developer building products on the internet",
    description:
      "I build and ship products on the internet. Full-Stack Developer focused on turning ideas into working software.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ldJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Avi",
    url: "https://byavi.in",
    sameAs: [
      "https://twitter.com/avinash10x",
      "https://github.com/avinashh10x",
      "https://www.linkedin.com/in/avinash-kumar-%F0%9F%8C%9F-519616249/",
    ],
  });

  return (
    <html lang="en" className="dark">
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ldJson }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-recia`}
      >
        {children}
        <Navbar/>
      </body>
    </html>
  );
}