import type { Metadata } from "next";

export const SITE_URL = "https://byavi.in";

/** Default OG image — used for Open Graph, Twitter, LinkedIn, etc. */
export const OG_IMAGE = {
  path: "/og-image.webp",
  width: 1200,
  height: 630,
  alt: "Avinash Kumar - Creative Developer building fast, immersive web products",
} as const;

export const ogImageOpenGraph = [
  {
    url: OG_IMAGE.path,
    width: OG_IMAGE.width,
    height: OG_IMAGE.height,
    alt: OG_IMAGE.alt,
    type: "image/webp",
  },
] as const;

export const ogImageTwitter = [OG_IMAGE.path] as const;

export const ogImageAbsoluteUrl = `${SITE_URL}${OG_IMAGE.path}`;

/** Reusable Open Graph + Twitter image fields for page metadata. */
export const sharedSocialImages: Pick<Metadata, "openGraph" | "twitter"> = {
  openGraph: {
    images: [...ogImageOpenGraph],
  },
  twitter: {
    card: "summary_large_image",
    images: [...ogImageTwitter],
  },
};
