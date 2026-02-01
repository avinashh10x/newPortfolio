import { Metadata } from "next";
import InfiniteMediaGrid from "@/components/sections/InfiniteMediaGrid";

export const metadata: Metadata = {
  title: "Gallery | Avi - Best Full-Stack Developer in India",
  description:
    "Browse Avi's creative gallery showcasing design work, UI/UX projects, and visual experiments. A curated collection by India's top full-stack developer based in Mumbai & Punjab.",
  keywords: [
    "Avi Gallery",
    "Developer Portfolio Gallery",
    "Design Work India",
    "UI UX Portfolio Mumbai",
    "Creative Developer Work",
    "Web Design Gallery Punjab",
    "Visual Portfolio India",
    "Frontend Design Mumbai",
    "Creative Web Showcase",
    "Developer Art Gallery",
  ],
  openGraph: {
    title: "Gallery | Avi - India's Best Full-Stack Developer",
    description:
      "Explore Avi's creative gallery - showcasing design, UI/UX, and visual experiments by India's top developer.",
    url: "https://byavi.in/gallery",
    type: "website",
    images: [
      {
        url: "https://byavi.in/og.png",
        width: 1200,
        height: 630,
        alt: "Avi's Creative Gallery - Full-Stack Developer India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | Avi - Best Developer in India",
    description:
      "Browse creative work and design projects by India's best full-stack developer. Based in Mumbai & Punjab.",
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
