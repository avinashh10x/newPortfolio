import { notFound } from "next/navigation";
import { getProjects } from "@/data/projects";
import DetailedHeader from "../_component/detailedHeader";
import Image from "next/image";
import DetailedContent from "../_component/detailedContent";
import DetailedProjectGallery from "../_component/detailedProjectgallery";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);

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

import ProjectNavigation from "../_component/ProjectNavigation";

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
     
      <DetailedHeader project={project} />

      {/* Video Section */}

      {/* Content Grid */}
      <DetailedContent project={project} />

      {/* Project Navigation */}
      <ProjectNavigation currentProject={project} projects={projects} />

      {/* Horizontal Scroll Gallery */}
      {/* <DetailedProjectGallery Project={project} /> */}
    </main>
  );
}
