import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Award, ArrowUpRight, X, ExternalLink } from "lucide-react";

export function Certifications() {
  const { certifications } = PORTFOLIO_DATA;
  const [activeCert, setActiveCert] = useState<typeof certifications[number] | null>(null);

  return (
    <section id="certifications" className="py-24 md:py-32 relative z-10 border-y border-white/5 bg-white/[0.01]">
      <div className="container mx-auto px-6">
        <SectionHeader badge="Credentials" title="Certifications" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setActiveCert(cert)}
              className="bento-card p-8 group flex flex-col justify-between hover:bg-white/[0.05] cursor-pointer hover:border-white/10 transition-all"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-saas-purple/10 text-saas-purple flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Award size={24} />
                  </div>
                  <div className="text-xs font-mono text-white/40 border border-white/10 rounded-full px-3 py-1">
                    {cert.date}
                  </div>
                </div>
                
                <h4 className="text-xl font-bold text-white tracking-tight mb-2">
                  {cert.title}
                </h4>
                
                <div className="text-sm font-medium text-saas-teal mb-4">
                  {cert.issuer}
                </div>
                
                <p className="text-white/60 text-sm leading-relaxed mb-8">
                  {cert.desc}
                </p>
              </div>
              
              <div className="inline-flex items-center gap-2 text-sm font-medium text-white/70 group-hover:text-saas-teal transition-all duration-300 mt-auto w-fit bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/10 group-hover:border-saas-teal/50 group-hover:bg-saas-teal/10 overflow-hidden relative">
                <span className="absolute inset-0 bg-saas-teal/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                <span className="relative z-10 flex items-center gap-2">
                  View Details <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform duration-300" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {activeCert && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCert(null)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
            >
              <div className="relative pointer-events-auto w-full max-w-lg bg-black/90 border border-white/10 rounded-3xl shadow-2xl shadow-black/60 backdrop-blur-2xl overflow-hidden">
                {/* Gradient top accent */}
                <div className="h-1 w-full bg-gradient-to-r from-saas-blue via-saas-purple to-saas-teal" />

                <div className="p-8 md:p-10">
                  {/* Close button */}
                  <button
                    onClick={() => setActiveCert(null)}
                    className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                  >
                    <X size={18} />
                  </button>

                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-saas-purple/10 border border-saas-purple/20 flex items-center justify-center shrink-0">
                      <Award size={28} className="text-saas-purple" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white leading-tight">
                        {activeCert.title}
                      </h3>
                      <p className="text-saas-teal text-sm font-medium mt-0.5">
                        {activeCert.issuer}
                      </p>
                    </div>
                  </div>

                  {/* Date badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-full text-xs font-mono text-white/50 mb-6">
                    📅 {activeCert.date}
                  </div>

                  {/* Description */}
                  <p className="text-white/70 text-base leading-relaxed mb-8">
                    {activeCert.desc}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {activeCert.desc
                      .match(/\b[A-Z][a-zA-Z.]+\b/g)
                      ?.slice(0, 8)
                      .map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 text-xs text-white/60 bg-white/5 border border-white/10 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={activeCert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-saas-blue via-saas-purple to-saas-teal text-white text-sm font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg"
                  >
                    <ExternalLink size={16} />
                    Open Official Certificate
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
