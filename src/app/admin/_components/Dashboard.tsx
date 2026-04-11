"use client";
import { useState, useEffect, useCallback } from "react";
import { Project } from "./types";
import ProjectFormModal from "./ProjectFormModal";

export default function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/projects");
      if (res.status === 401) {
        onLogout();
        return;
      }
      const data = await res.json();
      setProjects(data.projects || []);
    } catch {
      showToast("Failed to load projects", "error");
    } finally {
      setLoading(false);
    }
  }, [onLogout]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const saveProjects = async (updated: Project[]) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projects: updated }),
      });

      if (res.status === 401) {
        onLogout();
        return;
      }

      if (res.ok) {
        setProjects(updated);
        showToast("Projects saved successfully");
      } else {
        showToast("Failed to save", "error");
      }
    } catch {
      showToast("Connection error", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleCreate = (project: Project) => {
    const updated = [project, ...projects];
    saveProjects(updated);
    setIsCreating(false);
  };

  const handleEdit = (project: Project) => {
    const index = projects.indexOf(editingProject!);
    if (index === -1) return;
    const updated = [...projects];
    updated[index] = project;
    saveProjects(updated);
    setEditingProject(null);
  };

  const handleDelete = (index: number) => {
    const updated = projects.filter((_, i) => i !== index);
    saveProjects(updated);
    setDeleteConfirm(null);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...projects];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    saveProjects(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index === projects.length - 1) return;
    const updated = [...projects];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    saveProjects(updated);
  };

  const handleDuplicate = (index: number) => {
    const dupe = { ...projects[index], title: projects[index].title + " (copy)" };
    const updated = [...projects];
    updated.splice(index + 1, 0, dupe);
    saveProjects(updated);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    onLogout();
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.subtitle || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.tag || []).some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex items-center gap-3 text-foreground/40">
          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading projects...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Subtle bg grain */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-foreground/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/web-app-manifest-512x512.png"
              alt="Logo"
              className="w-8 h-8 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-base font-semibold text-foreground tracking-tight">Projects CMS</h1>
              <p className="text-xs text-foreground/30">{projects.length} projects</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saving && (
              <span className="flex items-center gap-1.5 text-xs text-violet-400">
                <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Saving...
              </span>
            )}
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-blue-600 text-foreground text-sm font-medium rounded-lg hover:from-violet-500 hover:to-blue-500 transition-all shadow-lg shadow-violet-500/20 active:scale-[0.97]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              New Project
            </button>
            <button
              onClick={handleLogout}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-foreground/[0.04] border border-foreground/[0.08] text-foreground/40 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-all"
              title="Logout"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-foreground/[0.03] border border-foreground/[0.06] rounded-xl text-foreground text-sm placeholder:text-foreground/20 focus:outline-none focus:border-violet-500/30 transition-colors"
            placeholder="Search projects by name, subtitle, or tag..."
          />
        </div>
      </div>

      {/* Project Cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-foreground/[0.03] border border-foreground/[0.06] flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-foreground/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-foreground/30 text-sm">
              {searchQuery ? "No projects match your search" : "No projects yet"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredProjects.map((project, filteredIndex) => {
              // Find the real index in the full projects array
              const realIndex = projects.indexOf(project);

              return (
                <div
                  key={realIndex}
                  className="group relative bg-foreground/[0.02] backdrop-blur-xl border border-foreground/[0.06] rounded-xl hover:border-foreground/10 transition-all duration-200"
                >
                  {/* Card content — thumbnail + info side by side */}
                  <div className="flex items-start gap-4 p-4 pb-2">
                    {/* Thumbnail */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-foreground/[0.03] border border-foreground/[0.06] flex-shrink-0">
                      {project.image[0] ? (
                        <img
                          src={project.image[0]}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-foreground/10">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Info — takes full remaining width */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="text-sm font-semibold text-foreground truncate flex items-center gap-2">
                            {project.title}
                            {project.isFeatured && (
                              <span className="bg-yellow-500/20 text-yellow-400 text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider font-bold">
                                Featured
                              </span>
                            )}
                          </h3>
                          {project.subtitle && (
                            <p className="text-xs text-foreground/40 mt-0.5 truncate">
                              {project.subtitle}
                            </p>
                          )}
                        </div>
                        {project.time && (
                          <span className="text-[10px] text-foreground/30 bg-foreground/[0.04] px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
                            {project.time}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-foreground/30 mt-1 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Footer row — tags left, actions right */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 pb-3 pt-1">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 min-w-0 flex-1">
                      {project.tag && project.tag.length > 0 && (
                        <>
                          {project.tag.slice(0, 5).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] px-1.5 py-0.5 bg-violet-500/8 text-violet-300/60 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                          {project.tag.length > 5 && (
                            <span className="text-[10px] text-foreground/20">
                              +{project.tag.length - 5}
                            </span>
                          )}
                        </>
                      )}
                    </div>

                    {/* Actions — compact row */}
                    <div className="flex items-center gap-0.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex-shrink-0 self-end sm:self-auto w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t border-white/[0.04] sm:border-0 mt-1 sm:mt-0">
                      <button
                        onClick={() => handleMoveUp(realIndex)}
                        disabled={realIndex === 0}
                        className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-foreground/[0.06] text-foreground/30 hover:text-foreground disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                        title="Move up"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleMoveDown(realIndex)}
                        disabled={realIndex === projects.length - 1}
                        className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-foreground/[0.06] text-foreground/30 hover:text-foreground disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                        title="Move down"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDuplicate(realIndex)}
                        className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-foreground/[0.06] text-foreground/30 hover:text-foreground transition-colors"
                        title="Duplicate"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setEditingProject(project)}
                        className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-violet-500/10 text-foreground/30 hover:text-violet-400 transition-colors"
                        title="Edit"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(realIndex)}
                        className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-500/10 text-foreground/30 hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-foreground/[0.06] text-foreground/30 hover:text-foreground transition-colors"
                          title="Visit site"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Delete confirmation */}
                  {deleteConfirm === realIndex && (
                    <div className="flex items-center justify-between px-4 py-3 bg-red-500/5 border-t border-red-500/10">
                      <p className="text-xs text-red-300/80">
                        Delete &quot;{project.title}&quot;?
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="px-3 py-1.5 text-xs text-foreground/50 hover:text-foreground bg-foreground/[0.04] rounded-md transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleDelete(realIndex)}
                          className="px-3 py-1.5 text-xs text-red-300 bg-red-500/15 rounded-md hover:bg-red-500/25 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create Modal */}
      {isCreating && (
        <ProjectFormModal
          project={null}
          onSave={handleCreate}
          onClose={() => setIsCreating(false)}
        />
      )}

      {/* Edit Modal */}
      {editingProject && (
        <ProjectFormModal
          project={editingProject}
          onSave={handleEdit}
          onClose={() => setEditingProject(null)}
        />
      )}

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl border shadow-2xl text-sm font-medium transition-all animate-in fade-in slide-in-from-bottom-4 duration-300 ${
            toast.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
              : "bg-red-500/10 border-red-500/20 text-red-300"
          }`}
        >
          {toast.type === "success" ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {toast.message}
        </div>
      )}

      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}


