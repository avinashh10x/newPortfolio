"use client";
import { project } from "@/data/projects";
import { motion } from "motion/react";
import Image from "next/image";

export default function DetailedContent({ project }: { project: project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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
              alt={`${project.title} - Avi  | Creative Developer Portfolio`}
              width={1920}
              height={1080}
              className="object-cover"
            />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24 mb-5 lg:mb-24">
        {/* Left Column: Description & Metadata */}
        <div className="lg:col-span-1 flex flex-col gap-8 order-2 lg:order-1">
          <div className="space-y-4">
            <h3 className="font-sans text-xl font-[800] text-foreground/90 tracking-[-0.03em] uppercase text-[12px]">
              Overview
            </h3>
            <p className="font-sans text-foreground/50 leading-[1.65] text-lg font-normal tracking-[-0.01em]">
              {project.description}
            </p>
          </div>

          <div className="h-px bg-primary/20 w-full" />

          <div className="space-y-4">
            <h3 className="font-sans text-xl font-[800] text-foreground/90 tracking-[-0.03em] uppercase text-[12px]">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tag?.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/15 font-sans text-sm text-foreground/50 hover:bg-primary/10 hover:border-primary/30 transition-colors font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Article / Process */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          {project.article && (
            <div className="space-y-6">
              <h3 className="font-sans text-3xl font-[800] text-foreground/90 mb-6 tracking-[-0.03em]">
                The Process
              </h3>
              <div
                className="prose prose-invert prose-lg max-w-none font-sans text-foreground/50 leading-[1.65] font-normal tracking-[-0.01em] prose-headings:font-sans prose-headings:font-[800] prose-headings:text-foreground/90 prose-headings:tracking-[-0.03em] prose-a:text-primary hover:prose-a:text-primary/80"
                dangerouslySetInnerHTML={{ __html: project.article }}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
