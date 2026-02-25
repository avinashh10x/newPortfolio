import { notFound } from "next/navigation";
import { PROJECTS } from "@/data/projects";
import DetailedHeader from "../_component/detailedHeader";
import Image from "next/image";
import DetailedContent from "../_component/detailedContent";
import DetailedProjectGallery from "../_component/detailedProjectgallery";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Avi's Work`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground ">
      <DetailedHeader project={project} />

      {/* Video Section */}
      {project.video && project.video.length > 0 ? (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-16 md:mb-24">
          <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-foreground/10 bg-foreground/5 shadow-2xl shadow-purple-900/10">
            <video
              autoPlay
              muted
              loop
              controls={false}
              src={project.video[0]}
              className="w-full h-full object-cover"
              poster={
                project.image && project.image.length > 0
                  ? project.image[0]
                  : undefined
              }
            />
          </div>
        </div>
      ) : (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-16 md:mb-24">
          <div className="relative w-full h-auto rounded-lg overflow-hidden border border-foreground/10 bg-foreground/5 shadow-2xl shadow-purple-900/10">
            <Image
              src={project.image[0]}
              alt={project.title}
              width={1920}
              height={1080}
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Content Grid */}
      <DetailedContent project={project} />

      {/* Horizontal Scroll Gallery */}
      <DetailedProjectGallery Project={project} />
    </main>
  );
}
