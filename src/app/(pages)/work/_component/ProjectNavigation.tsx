"use client";

import React from "react";
import type { project } from "@/data/projects";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ProjectNavigationProps {
  currentProject: project;
  projects: project[];
}

const ProjectNavigation: React.FC<ProjectNavigationProps> = ({ currentProject, projects }) => {
  const uniqueProjects = projects.filter(
    (p, index, self) => index === self.findIndex((t) => t.slug === p.slug)
  );

  const currentIndex = uniqueProjects.findIndex((p) => p.slug === currentProject.slug);
  const prevProject = currentIndex > 0 ? uniqueProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < uniqueProjects.length - 1 ? uniqueProjects[currentIndex + 1] : null;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-20 border-t border-foreground/10">
      <div className="flex items-center justify-between">
        {/* Previous */}
        {prevProject ? (
          <Link
            href={`/work/${prevProject.slug}`}
            className="group flex flex-col gap-1"
          >
            <div className="flex items-center gap-2 text-xs text-foreground/40 tracking-wide uppercase">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Previous
            </div>

            <span className="text-lg md:text-xl font-medium text-foreground/80 group-hover:text-foreground transition-colors">
              {prevProject.title}
            </span>
          </Link>
        ) : (
           <Link
            href={`/gallery`}
            className="group flex flex-col gap-1 "
          >
            <div className="flex items-center gap-2 text-xs text-foreground/40 tracking-wide uppercase justify-end">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              View All
            </div>

            <span className="text-lg md:text-xl font-medium text-foreground/80 group-hover:text-foreground transition-colors">
              Gallery
            </span>
          </Link>
        )}

        {/* Divider */}
        {/* <div className="h-10 w-px bg-foreground/10 hidden md:block" /> */}

        {/* Next */}
        {nextProject ? (
          <Link
            href={`/work/${nextProject.slug}`}
            className="group flex flex-col gap-1 text-right"
          >
            <div className="flex items-center gap-2 text-xs text-foreground/40 tracking-wide uppercase justify-end">
              Next
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </div>

            <span className="text-lg md:text-xl font-medium text-foreground/80 group-hover:text-foreground transition-colors">
              {nextProject.title}
            </span>
          </Link>
        ) : (
          <Link
            href={`/gallery`}
            className="group flex flex-col gap-1 text-right"
          >
            <div className="flex items-center gap-2 text-xs text-foreground/40 tracking-wide uppercase justify-end">
              View All
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </div>

            <span className="text-lg md:text-xl font-medium text-foreground/80 group-hover:text-foreground transition-colors">
              Gallery
            </span>
          </Link>
        )}
      </div>

      {/* Bottom CTA */}
      {/* <div className="mt-16 flex justify-center mb-10">
        <Link
          href="/work"
          className="text-sm text-foreground/40 hover:text-foreground transition-colors"
        >
          View all projects
        </Link>
      </div> */}
    </section>
  );
};

export default ProjectNavigation;