import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ArrowUpRight, ChevronDown } from "lucide-react";

const getProjectCategory = (tags: string[]) => {
  const lowercaseTags = tags.map((t) => t.toLowerCase());
  if (
    lowercaseTags.some(
      (t) =>
        t.includes(".net") ||
        t.includes("c#") ||
        t.includes("sql server") ||
        t.includes("winforms") ||
        t.includes("dapper")
    )
  ) {
    return "Full-Stack / .NET";
  }
  if (
    lowercaseTags.some(
      (t) =>
        t.includes("machine learning") ||
        t.includes("flask") ||
        t.includes("fastapi") ||
        t.includes("ai") ||
        t.includes("python") ||
        t.includes("tf-idf") ||
        t.includes("algorithms")
    )
  ) {
    return "Machine Learning / Python";
  }
  return "Frontend / Web";
};

export function Projects() {
  const { projects } = PORTFOLIO_DATA;
  const categories = ["All", "Full-Stack / .NET", "Machine Learning / Python", "Frontend / Web"] as const;
  
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>("All");
  const [isExpanded, setIsExpanded] = useState(false);
  
  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter((p) => getProjectCategory(p.tags) === selectedCategory);

  const INITIAL_COUNT = 4;
  const displayedProjects = isExpanded ? filteredProjects : filteredProjects.slice(0, INITIAL_COUNT);
  const hasMore = filteredProjects.length > INITIAL_COUNT;

  return (
    <section id="projects" className="py-24 md:py-32 relative z-10">
      <div className="container mx-auto px-6">
        <SectionHeader 
          badge="Selected Work" 
          title="Featured Projects" 
          description="A showcase of full-stack applications and tools I've built, focusing on performance and user experience."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-16 max-w-3xl mx-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setIsExpanded(false);
              }}
              className={`relative px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? "text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5 border border-white/5"
              }`}
            >
              {selectedCategory === category && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-gradient-to-r from-saas-blue via-saas-purple to-saas-teal rounded-full -z-10 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-12 max-w-6xl mx-auto">
          <motion.div layout className="flex flex-col gap-12">
            <AnimatePresence mode="popLayout">
              {displayedProjects.map((project, i) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bento-card group glow-effect grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden"
                >
                  {/* Project Image Area */}
                  <div className={`lg:col-span-7 relative h-64 lg:h-[400px] overflow-hidden bg-white/[0.02] flex items-center justify-center p-8 ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 lg:hidden" />
                    <img 
                      src={project.img} 
                      alt={project.title} 
                      className="max-w-full max-h-full object-contain rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] relative z-20 m-auto"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop`;
                      }}
                    />
                  </div>
                  
                  {/* Project Content Area */}
                  <div className={`lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center bg-black/40 backdrop-blur-md z-20 ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 tracking-tight">
                      {project.title}
                    </h3>
                    
                    <p className="text-white/60 text-base leading-relaxed mb-8 flex-1">
                      {project.desc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-10">
                      {project.tags.map((tag, j) => (
                        <span 
                          key={j}
                          className="px-3 py-1.5 text-xs font-medium text-white/80 bg-white/5 border border-white/10 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-6 mt-auto">
                      {/* 3D Gamified Arcade Button for View Project */}
                      <motion.a 
                        href={project.link} 
                        whileHover={{ y: -4 }}
                        whileTap={{ y: 2, scale: 0.98 }}
                        className="relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-saas-purple text-white text-sm font-bold rounded-xl shadow-[0_6px_0_0_#4c1d95] hover:shadow-[0_8px_0_0_#4c1d95,0_0_20px_rgba(139,92,246,0.5)] transition-all duration-200 group"
                      >
                        <span className="absolute inset-0 w-full h-full bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        <span className="relative flex items-center gap-2">
                          View Project <ArrowUpRight size={16} className="group-hover:rotate-45 group-hover:scale-125 transition-transform" />
                        </span>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Show More Button */}
          {hasMore && (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex justify-center mt-8"
            >
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full overflow-hidden group hover:bg-white/10 transition-colors"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
                <span className="relative z-10">
                  {isExpanded ? "Show Less" : `View All Projects (${filteredProjects.length})`}
                </span>
                <ChevronDown 
                  size={20} 
                  className={`relative z-10 transition-transform duration-500 ${isExpanded ? "rotate-180" : "group-hover:translate-y-1"}`} 
                />
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
