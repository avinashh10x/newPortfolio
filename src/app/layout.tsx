import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import Preloader2 from "@/components/shared/Preloader2";


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
    images: [
      {
        url: "https://byavi.in/og.png",
        width: 1200,
        height: 630,
        alt: "Avi - Creative Developer in India | Mumbai & Punjab",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Avi - Creative Developer | React, Next.js, GSAP",
    description:
      "Creative Developer in Mumbai & Punjab. Expert in React, Next.js, GSAP animations & interactive web experiences.",
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
    image: "https://byavi.in/og.png",
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
      "https://www.linkedin.com/in/avinash-kumar-%F0%9F%8C%9F-519616249/",
    ],
  });

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin=""
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-poppins`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Preloader2 />
          {children}
          <Navbar />

        </ThemeProvider>
      </body>
    </html>
  );
}
