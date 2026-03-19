import { Metadata } from "next";
import InfiniteMediaGrid from "@/components/sections/InfiniteMediaGrid";

export const metadata: Metadata = {
  title: "Gallery | Avi - Creative Developer in India",
  description:
    "Browse Avi's creative gallery showcasing design work, UI/UX projects, and visual experiments. A curated collection by a Creative Developer based in Mumbai & Punjab.",
  keywords: [
    "Avi Gallery",
    "Creative Developer Portfolio Gallery",
    "Interactive Design Work India",
    "UI UX Portfolio Mumbai",
    "Creative Developer Work",
    "Web Design Gallery Punjab",
    "Visual Portfolio India",
    "Frontend Design Mumbai",
    "Creative Web Showcase",
    "Creative Developer Art Gallery",
  ],
  openGraph: {
    title: "Gallery | Avi - Creative Developer",
    description:
      "Explore Avi's creative gallery - showcasing design, UI/UX, and visual experiments by a top Creative Developer.",
    url: "https://byavi.in/gallery",
    type: "website",
    images: [
      {
        url: "https://byavi.in/og.png",
        width: 1200,
        height: 630,
        alt: "Avi's Creative Gallery - Creative Developer India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | Avi - Creative Developer",
    description:
      "Browse creative work and design projects by a Creative Developer. Based in Mumbai & Punjab.",
    images: ["https://byavi.in/og.png"],
  },
  alternates: {
    canonical: "https://byavi.in/gallery",
  },
};

export default function GalleryPage() {
  return (
    <div>
      <InfiniteMediaGrid />
    </div>
  );
}
