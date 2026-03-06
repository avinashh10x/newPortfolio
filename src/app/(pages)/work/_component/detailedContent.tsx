import { project } from "@/data/projects";

export default function DetailedContent({ project }: { project: project }) {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24 mb-24">
      {/* Left Column: Description & Metadata */}
      <div className="lg:col-span-1 flex flex-col gap-8 order-2 lg:order-1">
        <div className="space-y-4">
          <h3 className="font-erode text-xl font-semibold text-foreground/90">
            Overview
          </h3>
          <p className="font-poppins text-foreground/60 leading-relaxed text-lg">
            {project.description}
          </p>
        </div>

        <div className="h-px bg-primary/20 w-full" />

        <div className="space-y-4">
          <h3 className="font-erode text-xl font-semibold text-foreground/90">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tag?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/15 font-poppins text-sm text-foreground/60 hover:bg-primary/10 hover:border-primary/30 transition-colors"
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
            <h3 className="font-erode text-3xl font-semibold text-foreground/90 mb-6">
              The Process
            </h3>
            <div
              className="prose prose-invert prose-lg max-w-none font-poppins text-foreground/60 leading-loose prose-headings:font-erode prose-headings:text-foreground/90 prose-a:text-primary hover:prose-a:text-primary/80"
              dangerouslySetInnerHTML={{ __html: project.article }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
