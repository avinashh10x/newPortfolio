"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import { project } from "@/data/projects";

function DetailedHeader({ project }: { project: project }) {
  return (
    <div className="w-full relative pt-32 pb-10 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-2"
        >
          <h1 className=" text-[5vw] font-medium tracking-tight text-foreground">
            {project.title}
          </h1>

          {project.subtitle && (
            <h2 className="text-xl md:text-2xl text-foreground/70  max-w-2xl mt-2">
              {project.subtitle}
            </h2>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-4 mt-4"
        >
          {project.link && (
            <Link
              href={project.link}
              target="_blank"
              className="group flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium sm:text-lg hover:bg-foreground/80 transition-colors"
            >
              Visit Live Site
              <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}
          {project.github && project.github !== "#" && (
            <Link
              href={project.github}
              target="_blank"
              className="group flex items-center gap-2 px-6 py-3 border border-foreground/20 text-foreground rounded-full font-medium sm:text-lg hover:bg-foreground/10 transition-colors"
            >
              <Github className="w-5 h-5" />
              Source Code
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default DetailedHeader;
