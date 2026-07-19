import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, X, Check } from "lucide-react";

interface Theme {
  id: string;
  name: string;
  emoji: string;
  blue: string;
  purple: string;
  teal: string;
  pink: string;
  preview: string[];
}

const THEMES: Theme[] = [
  {
    id: "nebula",
    name: "Indigo Nebula",
    emoji: "🌌",
    blue: "59 130 246",
    purple: "139 92 246",
    teal: "20 184 166",
    pink: "236 72 153",
    preview: ["#3b82f6", "#8b5cf6", "#14b8a6"],
  },
  {
    id: "sunset",
    name: "Sunset Gold",
    emoji: "🌅",
    blue: "251 146 60",
    purple: "239 68 68",
    teal: "250 204 21",
    pink: "244 63 94",
    preview: ["#fb923c", "#ef4444", "#facc15"],
  },
  {
    id: "emerald",
    name: "Emerald Mint",
    emoji: "🌿",
    blue: "16 185 129",
    purple: "6 182 212",
    teal: "52 211 153",
    pink: "14 165 233",
    preview: ["#10b981", "#06b6d4", "#34d399"],
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk Pink",
    emoji: "⚡",
    blue: "232 121 249",
    purple: "167 139 250",
    teal: "34 211 238",
    pink: "251 113 133",
    preview: ["#e879f9", "#a78bfa", "#22d3ee"],
  },
];

const STORAGE_KEY = "portfolio-theme";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.style.setProperty("--accent-blue", theme.blue);
  root.style.setProperty("--accent-purple", theme.purple);
  root.style.setProperty("--accent-teal", theme.teal);
  root.style.setProperty("--accent-pink", theme.pink);
}

export function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<string>("nebula");

  // On mount, load the saved theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const theme = THEMES.find((t) => t.id === saved) ?? THEMES[0];
    setActiveTheme(theme.id);
    applyTheme(theme);
  }, []);

  const handleThemeSelect = (theme: Theme) => {
    setActiveTheme(theme.id);
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme.id);
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-20 right-6 z-50 p-3.5 bg-black/60 hover:bg-black/80 text-white rounded-full border border-white/10 hover:border-white/30 shadow-lg shadow-black/30 backdrop-blur-md transition-colors"
        aria-label="Open theme customizer"
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.95 }}
      >
        <Palette size={20} className="text-white/70 hover:text-white transition-colors" />
      </motion.button>

      {/* Theme Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              className="fixed bottom-36 right-6 z-50 w-64 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-4 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Palette size={16} className="text-white/50" />
                  <span className="text-sm font-semibold text-white">Theme</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Theme Options */}
              <div className="flex flex-col gap-2">
                {THEMES.map((theme) => {
                  const isActive = theme.id === activeTheme;
                  return (
                    <motion.button
                      key={theme.id}
                      onClick={() => handleThemeSelect(theme)}
                      className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl transition-all text-left ${
                        isActive
                          ? "bg-white/10 border border-white/20"
                          : "bg-white/[0.03] border border-white/5 hover:bg-white/[0.07]"
                      }`}
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        {/* Color dots preview */}
                        <div className="flex gap-1 shrink-0">
                          {theme.preview.map((color, i) => (
                            <div
                              key={i}
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <div>
                          <div className="text-xs font-medium text-white leading-tight">
                            {theme.emoji} {theme.name}
                          </div>
                        </div>
                      </div>
                      {isActive && (
                        <Check size={14} className="text-white/70 shrink-0" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <p className="text-white/30 text-[10px] text-center mt-3">
                Accent colors update instantly
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
