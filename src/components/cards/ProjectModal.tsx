import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, CheckCircle2, Lightbulb } from "lucide-react";
import { type Project } from "@/data/portfolio";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  /* Close on Escape key */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (project) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, handleKeyDown]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* ── Modal Panel ── */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.93, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 30 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 pointer-events-none"
          >
            <div
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto pointer-events-auto rounded-3xl bg-[#0a0a0a] border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Close button ── */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200"
              >
                <X size={16} />
              </button>

              {/* ── Project Image ── */}
              <div className="relative h-56 md:h-72 bg-white/[0.02] flex items-center justify-center overflow-hidden rounded-t-3xl flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
                <img
                  src={project.img}
                  alt={project.title}
                  className="max-w-full max-h-full object-contain p-6 relative z-0"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.src =
                      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop";
                  }}
                />
                {/* Gradient border top */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>

              {/* ── Content ── */}
              <div className="p-8 md:p-10 flex flex-col gap-8">
                {/* Title + links */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                    {project.title}
                  </h2>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 hover:text-white rounded-full text-sm font-medium transition-all"
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="relative"
                        >
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                        Code
                      </motion.a>
                    )}
                    {project.link && project.link !== "#" && (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-saas-purple text-white rounded-full text-sm font-bold shadow-[0_4px_0_0_#4c1d95] hover:shadow-[0_6px_0_0_#4c1d95,0_0_20px_rgba(139,92,246,0.4)] transition-all"
                      >
                        <ExternalLink size={15} />
                        Live Demo
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/60 text-base leading-relaxed">{project.desc}</p>

                {/* Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-saas-teal" />
                      Key Highlights
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.highlights.map((hl, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07 + 0.2 }}
                          className="flex items-start gap-3 p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-saas-teal mt-2 flex-shrink-0" />
                          <span className="text-white/70 text-sm leading-relaxed">{hl}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Challenge */}
                {project.challenge && (
                  <div className="p-5 bg-saas-purple/[0.07] border border-saas-purple/20 rounded-2xl flex gap-4">
                    <Lightbulb size={20} className="text-saas-purple flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-saas-purple uppercase tracking-widest mb-1.5">
                        Main Challenge
                      </div>
                      <p className="text-white/65 text-sm leading-relaxed">{project.challenge}</p>
                    </div>
                  </div>
                )}

                {/* Tech Stack */}
                <div>
                  <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-4">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 text-xs font-medium text-white/80 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
