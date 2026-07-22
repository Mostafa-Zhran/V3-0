import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Mail, ArrowRight, X } from "lucide-react";

export function OpenToWorkBanner() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      // Hide at the top (within 250px of scroll)
      const isAtTop = scrollY < 250;

      // Hide at the bottom (within 400px of footer)
      const isAtBottom = windowHeight + scrollY >= docHeight - 400;

      setShowBanner(!isAtTop && !isAtBottom);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-[80] pointer-events-none">
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
            className="pointer-events-auto"
          >
          {/* Expanded Card */}
          {isExpanded ? (
            <motion.div
              layoutId="work-banner"
              className="w-72 glass-card bg-black/90 rounded-2xl border border-emerald-500/30 p-5 shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col relative overflow-hidden"
            >
              {/* Green glow background */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />

              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-3 right-3 text-white/40 hover:text-white transition-colors"
              >
                <X size={15} />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Open to Work
                </span>
              </div>

              <h4 className="text-sm font-bold text-white mb-1.5 leading-snug">
                Actively looking for Full-Stack .NET & Software Roles
              </h4>
              <p className="text-xs text-white/50 mb-4 leading-relaxed">
                Available for full-time junior positions, freelance, or remote projects.
              </p>

              <div className="flex gap-2">
                <a
                  href="mailto:mostafazahran724@gmail.com"
                  className="flex-1 py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                  <Mail size={12} />
                  Email Me
                </a>
                <a
                  href="#contact"
                  onClick={() => setIsExpanded(false)}
                  className="py-2 px-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-bold flex items-center justify-center gap-1 transition-all"
                >
                  Contact
                  <ArrowRight size={12} />
                </a>
              </div>
            </motion.div>
          ) : (
            /* Miniature Floating Bubble Badge */
            <motion.button
              layoutId="work-banner"
              onClick={() => setIsExpanded(true)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-4 py-3 rounded-full glass-card bg-black/80 hover:bg-black/90 border border-emerald-500/20 hover:border-emerald-500/40 shadow-[0_4px_20px_rgba(16,185,129,0.1)] transition-all duration-300 group"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>

              <div className="flex items-center gap-2">
                <Briefcase size={14} className="text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-xs font-bold text-white/90 tracking-wide uppercase">
                  Open to Opportunities
                </span>
              </div>
            </motion.button>
          )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
