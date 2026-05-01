import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjects, getProjectBySlug, getAllProjectSlugs } from "@/data/projects";
import DetailedHeader from "../_component/detailedHeader";
import DetailedContent from "../_component/detailedContent";
import ProjectNavigation from "../_component/ProjectNavigation";

// ISR: serve from cache, revalidate in background every 60s
export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Pre-render all known project slugs at build time
 * so each project page is instantly available without waiting for DB.
 */
export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const title = `${project.title} | Avi - Creative Developer`;
  const description =
    project.description.length > 160
      ? project.description.slice(0, 157) + "..."
      : project.description;
  const url = `https://byavi.in/work/${project.slug}`;
  const imageUrl = project.image?.[0];

  return {
    title,
    description,
    keywords: [
      project.title,
      ...(project.tag ?? []),
      "Avi",
      "Creative Developer India",
      "Portfolio Project",
    ],
    openGraph: {
      title,
      description,
      url,
      type: "article",
      ...(imageUrl && {
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: `${project.title} - Avi | Creative Developer Portfolio`,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@avinash10x",
      ...(imageUrl && { images: [imageUrl] }),
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const [project, projects] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
  ]);

  if (!project) {
    notFound();
  }

  // JSON-LD structured data for the project page
  const ldJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `https://byavi.in/work/${project.slug}`,
    image: project.image?.[0],
    author: {
      "@type": "Person",
      name: "Avi",
      url: "https://byavi.in",
    },
    ...(project.tag && { keywords: project.tag.join(", ") }),
    ...(project.time && { datePublished: project.time }),
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson }}
      />

      <DetailedHeader project={project} />

      {/* Content Grid */}
      <DetailedContent project={project} />

      {/* Project Navigation */}
      <ProjectNavigation currentProject={project} projects={projects} />
    </main>
  );
}
