import { MetadataRoute } from "next";
import { PROJECTS } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://byavi.in";
  const lastModified = new Date();

  // Create sitemap entries for dynamic project routes
  const projectEntries: MetadataRoute.Sitemap = PROJECTS.filter((p) => p.slug).map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/work`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/home`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...projectEntries,
  ];
}
