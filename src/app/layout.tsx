import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import type { Metadata } from "next";

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
  },

  twitter: {
    card: "summary_large_image",
    title: "Avi — Full-Stack Developer building products on the internet",
    description:
      "I build and ship products on the internet. Full-Stack Developer focused on turning ideas into working software.",
    creator: "@avinash10x",
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
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=recia@400&f[]=erode@600&display=swap"
          rel="stylesheet"
        />
        <meta name="apple-mobile-web-app-title" content="byAvi" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-recia`}
      >
        {children}
      </body>
    </html>
  );
}
