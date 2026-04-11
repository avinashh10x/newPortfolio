"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { project } from "@/data/projects";

function DetailedHeader({ project }: { project: project }) {
  const router = useRouter();

  return (
    <div className="w-full relative pt-16 lg:pt-32 lg:pb-10 px-4 md:px-8 max-w-7xl mx-auto space-y-5">
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        onClick={() => router.back()}
        className="group mb-6 flex items-center gap-2 font-sans text-sm text-foreground/60 hover:text-foreground transition-colors duration-300 cursor-pointer font-medium"
      >
        <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform duration-300" />
        Back
      </motion.button>

      <div className="py-6 sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 sm:gap-12 w-full"
        >
          {/* Text Content */}
          <div className="flex flex-col gap-3 sm:gap-4 max-w-3xl">
            <h1 className="font-erode text-[2.5rem] md:text-[4.5rem] tracking-[-0.05em] leading-[1.1] text-foreground drop-shadow-sm">
              {project.title} 
            </h1>
            {project.subtitle && (
              <h2 className="font-sans text-lg sm:text-xl md:text-2xl text-foreground/50 font-normal tracking-[-0.01em]">
                {project.subtitle}
              </h2>
            )}
          </div>

          {/* Action Links */}
          <ProjectLinks className="w-full sm:w-auto" project={project} />
        </motion.div>
      </div>
    </div>
  );
}

export default DetailedHeader;

const ProjectLinks = ({ project, className }: { project: project, className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`flex flex-row justify-stretch sm:justify-end gap-3 h-fit ${className || ""}`}
    >
      {project.github && project.github !== "#" && (
        <Link
          href={project.github}
          target="_blank"
          className="group flex-1 sm:flex-none flex justify-center items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 border border-primary/30 text-foreground rounded-full font-sans font-medium text-[13px] sm:text-sm hover:bg-primary/10 transition-all duration-300 active:scale-95"
        >
          <Github className="size-4 group-hover:-rotate-6 transition-transform duration-300" />
          <span>Source Code</span>
        </Link>
      )}
      {project.link && (
        <Link
          href={project.link}
          target="_blank"
          className="group flex-1 sm:flex-none flex justify-center items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-foreground text-background rounded-full font-sans font-medium text-[13px] sm:text-sm hover:bg-foreground/90 transition-all duration-300 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.3)] active:scale-95"
        >
          <span>Visit Live Site</span>
          <ArrowUpRight className="size-4 group-hover:rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
        </Link>
      )}
    </motion.div>
  );
};