import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function Skills() {
  const { skills } = PORTFOLIO_DATA;

  return (
    <section id="skills" className="py-24 md:py-32 relative z-10">
      <div className="container mx-auto px-6">
        <SectionHeader 
          badge="Expertise" 
          title="Technical Arsenal" 
          description="A curated selection of the technologies I use to bring ideas to life."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skills.map((skillGroup, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bento-card p-8 group glow-effect flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500">
                    <skillGroup.icon size={24} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h4 className="text-xl font-bold text-white tracking-tight">{skillGroup.category}</h4>
                </div>
                
                <div className="flex flex-wrap gap-2.5">
                  {skillGroup.tags.map((tagItem, j) => {
                    const isObject = typeof tagItem === "object" && tagItem !== null;
                    const tagName = isObject ? tagItem.name : String(tagItem);
                    const TagIcon = isObject ? tagItem.icon : null;

                    return (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: (i * 0.1) + (j * 0.03) }}
                        className="group/tag inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-white/80 bg-white/[0.03] border border-white/[0.08] rounded-xl hover:bg-white/[0.08] hover:border-saas-purple/40 hover:text-white transition-all duration-300 cursor-default"
                      >
                        {TagIcon && (
                          <TagIcon className="w-4 h-4 text-saas-purple group-hover/tag:scale-110 transition-transform duration-300 opacity-80 group-hover/tag:opacity-100 shrink-0" />
                        )}
                        <span>{tagName}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
