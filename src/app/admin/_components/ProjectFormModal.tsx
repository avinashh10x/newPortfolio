"use client";
import { useState } from "react";
import { Project } from "./types";

export default function ProjectFormModal({
  project,
  onSave,
  onClose,
}: {
  project: Project | null;
  onSave: (project: Project) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Project>(
    project || {
      title: "",
      slug: "",
      subtitle: "",
      description: "",
      article: "",
      image: [""],
      video: [],
      link: "",
      github: "",
      time: "",
      tag: [],
      isFeatured: false,
    }
  );
  const [tagInput, setTagInput] = useState("");
  const [uploadingState, setUploadingState] = useState<Record<string, boolean>>({});

  const updateField = (field: keyof Project, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "video", index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const key = `${type}-${index}`;
    setUploadingState((prev) => ({ ...prev, [key]: true }));

    try {
      const formData = new FormData();
      formData.append("file", file);
      // Optional: you can define a folder based on project title/slug if you want
      formData.append("folder", form.slug || "portfolio_projects");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      
      if (data.url) {
        if (type === "image") {
          updateImage(index, data.url);
        } else {
          updateVideo(index, data.url);
        }
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload file. Please try again.");
    } finally {
      setUploadingState((prev) => ({ ...prev, [key]: false }));
      // Reset input so they can upload the same file again if needed
      e.target.value = "";
    }
  };

  const addImage = () => {
    setForm((prev) => ({ ...prev, image: [...prev.image, ""] }));
  };

  const updateImage = (index: number, value: string) => {
    const newImages = [...form.image];
    newImages[index] = value;
    setForm((prev) => ({ ...prev, image: newImages }));
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index),
    }));
  };

  const addVideo = () => {
    setForm((prev) => ({ ...prev, video: [...(prev.video || []), ""] }));
  };

  const updateVideo = (index: number, value: string) => {
    const newVideos = [...(form.video || [])];
    newVideos[index] = value;
    setForm((prev) => ({ ...prev, video: newVideos }));
  };

  const removeVideo = (index: number) => {
    setForm((prev) => ({
      ...prev,
      video: (prev.video || []).filter((_, i) => i !== index),
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !(form.tag || []).includes(tagInput.trim())) {
      setForm((prev) => ({
        ...prev,
        tag: [...(prev.tag || []), tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setForm((prev) => ({
      ...prev,
      tag: (prev.tag || []).filter((t) => t !== tag),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Clean up empty strings
    const cleaned: Project = {
      ...form,
      image: form.image.filter((img) => img.trim() !== ""),
      video: (form.video || []).filter((v) => v.trim() !== ""),
    };
    if (cleaned.image.length === 0) cleaned.image = [""];
    onSave(cleaned);
  };

  const generateSlug = () => {
    const slug = form.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    updateField("slug", slug);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 backdrop-blur-sm overflow-y-auto p-4 pt-8 pb-8">
      <div className="relative w-full max-w-2xl">
        {/* Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/10 via-blue-600/10 to-cyan-500/10 rounded-2xl blur-xl" />

        <form
          onSubmit={handleSubmit}
          className="relative bg-foreground/[0.02] backdrop-blur-xl border border-foreground/[0.06] rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-foreground/[0.06]">
            <h2 className="text-lg font-semibold text-foreground">
              {project ? "Edit Project" : "New Project"}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-foreground/[0.06] text-foreground/40 hover:text-foreground transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-5 space-y-5 max-h-[70vh] overflow-y-auto scrollbar-thin">
            {/* Title + Slug row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-foreground/50 mb-1.5 uppercase tracking-wider">
                  Title *
                </label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="w-full px-3 py-2.5 bg-foreground/[0.04] border border-foreground/[0.08] rounded-lg text-foreground text-sm placeholder:text-foreground/20 focus:outline-none focus:border-violet-500/50 transition-colors"
                  placeholder="Project Name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground/50 mb-1.5 uppercase tracking-wider">
                  Slug
                </label>
                <div className="flex gap-2">
                  <input
                    value={form.slug || ""}
                    onChange={(e) => updateField("slug", e.target.value)}
                    className="flex-1 px-3 py-2.5 bg-foreground/[0.04] border border-foreground/[0.08] rounded-lg text-foreground text-sm placeholder:text-foreground/20 focus:outline-none focus:border-violet-500/50 transition-colors"
                    placeholder="project-slug"
                  />
                  <button
                    type="button"
                    onClick={generateSlug}
                    className="px-3 py-2.5 bg-foreground/[0.06] border border-foreground/[0.08] rounded-lg text-foreground/50 hover:text-foreground hover:bg-foreground/10 transition-colors text-xs font-medium"
                    title="Auto-generate from title"
                  >
                    Gen
                  </button>
                </div>
              </div>
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-xs font-medium text-foreground/50 mb-1.5 uppercase tracking-wider">
                Subtitle
              </label>
              <input
                value={form.subtitle || ""}
                onChange={(e) => updateField("subtitle", e.target.value)}
                className="w-full px-3 py-2.5 bg-foreground/[0.04] border border-foreground/[0.08] rounded-lg text-foreground text-sm placeholder:text-foreground/20 focus:outline-none focus:border-violet-500/50 transition-colors"
                placeholder="A short tagline"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-medium text-foreground/50 mb-1.5 uppercase tracking-wider">
                Description *
              </label>
              <textarea
                required
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                rows={3}
                className="w-full px-3 py-2.5 bg-foreground/[0.04] border border-foreground/[0.08] rounded-lg text-foreground text-sm placeholder:text-foreground/20 focus:outline-none focus:border-violet-500/50 transition-colors resize-none"
                placeholder="Brief project description..."
              />
            </div>

            {/* Article */}
            <div>
              <label className="block text-xs font-medium text-foreground/50 mb-1.5 uppercase tracking-wider">
                Article / Case Study
              </label>
              <textarea
                value={form.article || ""}
                onChange={(e) => updateField("article", e.target.value)}
                rows={5}
                className="w-full px-3 py-2.5 bg-foreground/[0.04] border border-foreground/[0.08] rounded-lg text-foreground text-sm placeholder:text-foreground/20 focus:outline-none focus:border-violet-500/50 transition-colors resize-none"
                placeholder="Detailed write-up (supports HTML like <br/> for line breaks)..."
              />
            </div>

            {/* Links row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-foreground/50 mb-1.5 uppercase tracking-wider">
                  Live Link *
                </label>
                <input
                  required
                  value={form.link}
                  onChange={(e) => updateField("link", e.target.value)}
                  className="w-full px-3 py-2.5 bg-foreground/[0.04] border border-foreground/[0.08] rounded-lg text-foreground text-sm placeholder:text-foreground/20 focus:outline-none focus:border-violet-500/50 transition-colors"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground/50 mb-1.5 uppercase tracking-wider">
                  GitHub
                </label>
                <input
                  value={form.github || ""}
                  onChange={(e) => updateField("github", e.target.value)}
                  className="w-full px-3 py-2.5 bg-foreground/[0.04] border border-foreground/[0.08] rounded-lg text-foreground text-sm placeholder:text-foreground/20 focus:outline-none focus:border-violet-500/50 transition-colors"
                  placeholder="https://github.com/..."
                />
              </div>
            </div>

            {/* Time & Featured */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div>
                <label className="block text-xs font-medium text-foreground/50 mb-1.5 uppercase tracking-wider">
                  Time Period
                </label>
                <input
                  value={form.time || ""}
                  onChange={(e) => updateField("time", e.target.value)}
                  className="w-full px-3 py-2.5 bg-foreground/[0.04] border border-foreground/[0.08] rounded-lg text-foreground text-sm placeholder:text-foreground/20 focus:outline-none focus:border-violet-500/50 transition-colors"
                  placeholder="e.g. Jan 2026"
                />
              </div>

              <div className="flex items-center gap-3 pt-6">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={form.isFeatured || false}
                    onChange={(e) => updateField("isFeatured", !!e.target.checked)}
                    className="peer sr-only"
                  />
                  <label
                    htmlFor="isFeatured"
                    className="block h-6 w-11 cursor-pointer rounded-full bg-foreground/10 transition-colors peer-checked:bg-violet-500 peer-focus:outline-none"
                  ></label>
                  <div className="absolute left-[2px] top-[2px] h-5 w-5 rounded-full bg-foreground transition-transform peer-checked:translate-x-full pointer-events-none"></div>
                </div>
                <label htmlFor="isFeatured" className="text-sm font-medium text-foreground/80 cursor-pointer select-none">
                  Featured Project
                </label>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-medium text-foreground/50 mb-1.5 uppercase tracking-wider">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {(form.tag || []).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full text-xs text-violet-300"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-red-400 transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  className="flex-1 px-3 py-2 bg-foreground/[0.04] border border-foreground/[0.08] rounded-lg text-foreground text-sm placeholder:text-foreground/20 focus:outline-none focus:border-violet-500/50 transition-colors"
                  placeholder="Add tag and press Enter"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-3 py-2 bg-violet-500/10 border border-violet-500/20 rounded-lg text-violet-300 text-sm hover:bg-violet-500/20 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Images */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-foreground/50 uppercase tracking-wider">
                  Images
                </label>
                <button
                  type="button"
                  onClick={addImage}
                  className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
                >
                  + Add Image
                </button>
              </div>
              <div className="space-y-2">
                {form.image.map((img, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input
                      value={img}
                      onChange={(e) => updateImage(i, e.target.value)}
                      className="flex-1 px-3 py-2 bg-foreground/[0.04] border border-foreground/[0.08] rounded-lg text-foreground text-sm placeholder:text-foreground/20 focus:outline-none focus:border-violet-500/50 transition-colors"
                      placeholder="Image URL or upload..."
                    />
                    
                    <div className="relative">
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" 
                        disabled={uploadingState[`image-${i}`]}
                        onChange={(e) => handleUpload(e, "image", i)}
                        title="Upload Image to Cloudinary"
                      />
                      <button
                        type="button"
                        disabled={uploadingState[`image-${i}`]}
                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 hover:bg-violet-500/20 transition-colors disabled:opacity-50"
                      >
                        {uploadingState[`image-${i}`] ? (
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                        )}
                      </button>
                    </div>

                    {form.image.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors flex-shrink-0"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Videos */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-foreground/50 uppercase tracking-wider">
                  Videos
                </label>
                <button
                  type="button"
                  onClick={addVideo}
                  className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
                >
                  + Add Video
                </button>
              </div>
              <div className="space-y-2">
                {(form.video || []).map((vid, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input
                      value={vid}
                      onChange={(e) => updateVideo(i, e.target.value)}
                      className="flex-1 px-3 py-2 bg-foreground/[0.04] border border-foreground/[0.08] rounded-lg text-foreground text-sm placeholder:text-foreground/20 focus:outline-none focus:border-violet-500/50 transition-colors"
                      placeholder="Video URL or upload..."
                    />

                    <div className="relative">
                      <input 
                        type="file" 
                        accept="video/*" 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" 
                        disabled={uploadingState[`video-${i}`]}
                        onChange={(e) => handleUpload(e, "video", i)}
                        title="Upload Video to Cloudinary"
                      />
                      <button
                        type="button"
                        disabled={uploadingState[`video-${i}`]}
                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 hover:bg-violet-500/20 transition-colors disabled:opacity-50 flex-shrink-0"
                      >
                        {uploadingState[`video-${i}`] ? (
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                        )}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeVideo(i)}
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors flex-shrink-0"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
                {(form.video || []).length === 0 && (
                  <p className="text-xs text-foreground/20 italic">No videos added</p>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-foreground/[0.06]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-foreground/[0.04] border border-foreground/[0.08] rounded-lg text-foreground/60 text-sm hover:bg-foreground/[0.08] hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-blue-600 text-foreground font-medium rounded-lg text-sm hover:from-violet-500 hover:to-blue-500 transition-all shadow-lg shadow-violet-500/20 active:scale-[0.98]"
            >
              {project ? "Save Changes" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


