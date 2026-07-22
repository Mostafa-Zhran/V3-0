import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Navigation,
  FileText,
  Mail,
  Globe,
  CornerDownLeft,
  Palette,
} from "lucide-react";

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Navigation" | "Shortcuts" | "Socials" | "Actions";
  icon: React.ComponentType<{ className?: string; size?: number }>;
  action: () => void;
  shortcut?: string[];
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Toggle command palette on Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Listen for navbar click trigger event
  useEffect(() => {
    const handleOpenTrigger = () => setIsOpen(true);
    window.addEventListener("open-command-palette", handleOpenTrigger);
    return () => window.removeEventListener("open-command-palette", handleOpenTrigger);
  }, []);

  // Reset scroll and search on open/close
  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const items: CommandItem[] = useMemo(() => [
    // Navigation
    {
      id: "nav-home",
      title: "Go to Home",
      subtitle: "Intro, stats, and role preview",
      category: "Navigation",
      icon: Navigation,
      action: () => {
        document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "nav-about",
      title: "Go to About Me",
      subtitle: "Bio, personal stats, and recognition",
      category: "Navigation",
      icon: Navigation,
      action: () => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "nav-journey",
      title: "Go to Journey Timeline",
      subtitle: "My path from CS freshman to developer",
      category: "Navigation",
      icon: Navigation,
      action: () => {
        document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "nav-skills",
      title: "Go to Technical Arsenal",
      subtitle: "Languages, framework and tools I use",
      category: "Navigation",
      icon: Navigation,
      action: () => {
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "nav-cp",
      title: "Go to CP Stats",
      subtitle: "Codeforces and Codewars solves progress",
      category: "Navigation",
      icon: Navigation,
      action: () => {
        document.getElementById("cp-stats")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "nav-projects",
      title: "Go to Featured Projects",
      subtitle: "Review my portfolio of live platforms",
      category: "Navigation",
      icon: Navigation,
      action: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "nav-certs",
      title: "Go to Certifications",
      subtitle: "Pioneers Initiative, NTI, NVIDIA certifications",
      category: "Navigation",
      icon: Navigation,
      action: () => {
        document.getElementById("certifications")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "nav-contact",
      title: "Go to Contact",
      subtitle: "Email form, mail address, and social handles",
      category: "Navigation",
      icon: Navigation,
      action: () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    // Shortcuts
    {
      id: "resume",
      title: "Download Resume",
      subtitle: "Open PDF CV in a new tab",
      category: "Shortcuts",
      icon: FileText,
      shortcut: ["R"],
      action: () => {
        window.open(
          "https://drive.google.com/file/d/19d23YXlQVDZ_TvJMGYu_xuQYeF5TrtaV/view?usp=sharing",
          "_blank"
        );
        setIsOpen(false);
      },
    },
    {
      id: "email",
      title: "Send an Email",
      subtitle: "Open mailto: link in native client",
      category: "Shortcuts",
      icon: Mail,
      shortcut: ["E"],
      action: () => {
        window.location.href = "mailto:mostafazahran724@gmail.com";
        setIsOpen(false);
      },
    },
    // Socials
    {
      id: "soc-github",
      title: "GitHub Profile",
      subtitle: "Review my public repositories and contributions",
      category: "Socials",
      icon: Globe,
      action: () => {
        window.open("https://github.com/Mostafa-Zhran", "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "soc-linkedin",
      title: "LinkedIn Profile",
      subtitle: "Connect and expand our professional network",
      category: "Socials",
      icon: Globe,
      action: () => {
        window.open("https://www.linkedin.com/in/mostafa-tamer-zahran/", "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "soc-codeforces",
      title: "Codeforces Handle",
      subtitle: "Check out my profile statistics and rating on CF",
      category: "Socials",
      icon: Globe,
      action: () => {
        window.open("https://codeforces.com/profile/mostafazahran724", "_blank");
        setIsOpen(false);
      },
    },
    // Theme Customizer Toggle
    {
      id: "action-theme",
      title: "Change Theme Accents",
      subtitle: "Open the Floating Accent Panel to adjust colors",
      category: "Actions",
      icon: Palette,
      shortcut: ["T"],
      action: () => {
        // Find customizer and click button or dispatcher
        const customizerBtn = document.querySelector('[aria-label="Theme Settings"]') as HTMLButtonElement | null;
        if (customizerBtn) {
          customizerBtn.click();
        } else {
          // Fallback or dispatch events
          window.dispatchEvent(new CustomEvent("toggle-theme-customizer"));
        }
        setIsOpen(false);
      },
    },
  ], []);

  // Filter items by search text
  const filteredItems = useMemo(() => {
    if (!search) return items;
    const query = search.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.subtitle.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
  }, [search, items]);

  // Adjust selection range
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Handle arrow navigations & enter select
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[110] flex items-start justify-center pt-24 px-4 md:px-0">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl bg-[#090909] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[500px]"
              onKeyDown={handleKeyDown}
            >
              {/* Header/Input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5 bg-white/[0.01]">
                <Search className="text-white/40" size={18} />
                <input
                  ref={inputRef}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none w-full border-none focus:ring-0"
                />
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-bold text-white/45 bg-white/5 border border-white/10 px-2 py-0.5 rounded uppercase font-mono">
                    ESC
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div
                ref={containerRef}
                className="flex-1 overflow-y-auto p-2 space-y-4 max-h-[350px] min-h-[100px]"
              >
                {filteredItems.length === 0 ? (
                  <div className="py-8 text-center text-white/40 text-sm">
                    No results found for "{search}"
                  </div>
                ) : (
                  // Group items by category
                  Object.entries(
                    filteredItems.reduce((acc, item) => {
                      if (!acc[item.category]) acc[item.category] = [];
                      acc[item.category].push(item);
                      return acc;
                    }, {} as Record<string, CommandItem[]>)
                  ).map(([category, catItems]) => (
                    <div key={category} className="space-y-1">
                      <div className="px-3 text-[10px] font-bold text-white/30 uppercase tracking-widest py-1">
                        {category}
                      </div>

                      {catItems.map((item) => {
                        // Find the index in the flat list for style checks
                        const flatIndex = filteredItems.findIndex((x) => x.id === item.id);
                        const isSelected = flatIndex === selectedIndex;
                        const Icon = item.icon;

                        return (
                          <div
                            key={item.id}
                            onClick={item.action}
                            onMouseEnter={() => setSelectedIndex(flatIndex)}
                            className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                              isSelected
                                ? "bg-white/5 text-white"
                                : "text-white/60 hover:text-white"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                                  isSelected
                                    ? "bg-saas-purple/20 border-saas-purple/40 text-saas-purple"
                                    : "bg-white/[0.02] border-white/5 text-white/40"
                                }`}
                              >
                                <Icon size={16} />
                              </div>
                              <div>
                                <div className="text-sm font-bold text-white leading-tight">
                                  {item.title}
                                </div>
                                <div className="text-xs text-white/40 mt-0.5 leading-none">
                                  {item.subtitle}
                                </div>
                              </div>
                            </div>

                            {/* Enter / Shortcut Labels */}
                            <div className="flex items-center gap-1.5">
                              {item.shortcut && (
                                <div className="flex items-center gap-1">
                                  {item.shortcut.map((scKey) => (
                                    <kbd
                                      key={scKey}
                                      className="text-[10px] font-bold text-white/40 bg-white/5 border border-white/5 px-1.5 py-0.5 rounded font-mono"
                                    >
                                      {scKey}
                                    </kbd>
                                  ))}
                                </div>
                              )}
                              {isSelected && (
                                <span className="text-[10px] font-bold text-white/30 flex items-center gap-0.5">
                                  Enter
                                  <CornerDownLeft size={10} />
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 border-t border-white/5 bg-white/[0.01] flex items-center justify-between text-[11px] text-white/40">
                <div className="flex items-center gap-3">
                  <span>
                    Use <span className="font-mono text-white/60">↑↓</span> to navigate
                  </span>
                  <span>
                    <span className="font-mono text-white/60">Enter</span> to select
                  </span>
                </div>
                <div>
                  Press <kbd className="font-mono text-white/60">Ctrl + K</kbd> to toggle
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
