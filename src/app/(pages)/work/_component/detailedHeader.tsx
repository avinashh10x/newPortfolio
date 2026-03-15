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
      <div className="flex justify-between items-end gap-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-2 w-full "
        >
          <div className="flex justify-between w-[100%] items-center">

            <h1 className="font-erode text-[2.5rem] md:text-[4.5rem] tracking-[-0.05em] leading-[1.1] text-foreground drop-shadow-sm">
              {project.title}
            </h1>
            <ProjectLinks className="sm:hidden" project={project} />
          </div>

          <div className="flex gap-2 w-full justify-between items-center">
            {project.subtitle && (
              <h2 className="font-sans text-xl md:text-2xl text-foreground/50 max-w-2xl  font-normal tracking-[-0.01em]">
                {project.subtitle}
              </h2>
            )}
            <ProjectLinks className="max-sm:hidden" project={project} />
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default DetailedHeader;


const ProjectLinks = ({ project, className }: { project: project, className?: string }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`flex flex-wrap gap-4 mt-4 h-fit ${className}`}
      >
        {project.link && (
          <Link
            href={project.link}
            target="_blank"
            className="group flex items-center gap-2 px-4 py-2 bg-foreground h-full text-primary-foreground rounded-full font-sans font-medium md:text-md text-xs hover:bg-primary duration-300 transition-colors"
          >
            <span className="max-sm:hidden">Visit Live Site</span>
            <ArrowUpRight className="size-4 group-hover:rotate-0 rotate-45 transition-transform duration-300" />
          </Link>
        )}
        {project.github && project.github !== "#" && (
          <Link
            href={project.github}
            target="_blank"
            className="group flex items-center gap-2 h-full px-4 py-2 border border-primary/30 text-foreground rounded-full font-sans font-medium md:text-md text-xs hover:bg-primary/20 transition-colors"
          >
            <Github className="size-4 group-hover:rotate-10 rotate-0 transition-transform duration-300" />
            <span className="max-sm:hidden">Source Code</span>
          </Link>
        )}
      </motion.div>
    </>
  )
}