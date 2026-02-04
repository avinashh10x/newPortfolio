import { project } from '@/data/projects'

export default function DetailedContent({project}: {project: project}) {
  return (
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24 mb-24">
        {/* Left Column: Description & Metadata */}
        <div className="lg:col-span-1 flex flex-col gap-8 order-2 lg:order-1">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground/90">Overview</h3>
            <p className="text-foreground/70 leading-relaxed text-lg">
              {project.description}
            </p>
          </div>

          <div className="h-px bg-foreground/10 w-full" />

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground/90">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tag?.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-lg bg-foreground/5 border border-foreground/10 text-sm text-foreground/70 hover:bg-foreground/10 transition-colors"
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
              <h3 className="text-3xl font-bold text-foreground/90 mb-6">
                The Process
              </h3>
              <div
                className="prose prose-invert prose-lg max-w-none text-foreground/70 leading-loose prose-headings:text-foreground/90 prose-a:text-purple-400 hover:prose-a:text-purple-300"
                dangerouslySetInnerHTML={{ __html: project.article }}
              />
            </div>
          )}
        </div>
      </div>
  )
}

