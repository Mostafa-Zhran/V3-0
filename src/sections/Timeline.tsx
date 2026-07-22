import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PORTFOLIO_DATA, type TimelineEntry } from "@/data/portfolio";

const CATEGORY_STYLES = {
  education: {
    dot: "bg-saas-blue shadow-[0_0_12px_rgba(59,130,246,0.6)]",
    border: "border-saas-blue/30 hover:border-saas-blue/60",
    badge: "bg-saas-blue/10 text-saas-blue border border-saas-blue/20",
    icon: "text-saas-blue bg-saas-blue/10 border-saas-blue/20",
    label: "Education",
  },
  achievement: {
    dot: "bg-saas-purple shadow-[0_0_12px_rgba(139,92,246,0.6)]",
    border: "border-saas-purple/30 hover:border-saas-purple/60",
    badge: "bg-saas-purple/10 text-saas-purple border border-saas-purple/20",
    icon: "text-saas-purple bg-saas-purple/10 border-saas-purple/20",
    label: "Achievement",
  },
  certification: {
    dot: "bg-saas-teal shadow-[0_0_12px_rgba(20,184,166,0.6)]",
    border: "border-saas-teal/30 hover:border-saas-teal/60",
    badge: "bg-saas-teal/10 text-saas-teal border border-saas-teal/20",
    icon: "text-saas-teal bg-saas-teal/10 border-saas-teal/20",
    label: "Certification",
  },
  project: {
    dot: "bg-saas-pink shadow-[0_0_12px_rgba(236,72,153,0.6)]",
    border: "border-saas-pink/30 hover:border-saas-pink/60",
    badge: "bg-saas-pink/10 text-saas-pink border border-saas-pink/20",
    icon: "text-saas-pink bg-saas-pink/10 border-saas-pink/20",
    label: "Project",
  },
} satisfies Record<TimelineEntry["category"], unknown>;

/* ─── Individual Timeline Card ─── */
function TimelineCard({
  item,
  index,
  isLeft,
}: {
  item: TimelineEntry;
  index: number;
  isLeft: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const styles = CATEGORY_STYLES[item.category];
  const Icon = item.icon;

  return (
    <div
      ref={ref}
      className={`relative flex items-center gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}
    >
      {/* ── Card ── */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 10 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.08 }}
        className={`
          relative w-full md:w-[calc(50%-2.5rem)] ml-14 md:ml-0
          bento-card p-6 border ${styles.border} transition-all duration-300 group
        `}
      >
        {/* Connector line to dot (desktop) */}
        <div
          className={`
            hidden md:block absolute top-1/2 -translate-y-1/2 w-10 h-px bg-gradient-to-r
            ${isLeft
              ? "right-0 translate-x-full from-white/10 to-transparent"
              : "left-0 -translate-x-full from-transparent to-white/10"
            }
          `}
        />

        {/* Category badge */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${styles.icon} flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
            <Icon size={16} />
          </div>
          <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${styles.badge}`}>
            {styles.label}
          </span>
          <span className="ml-auto text-xs text-white/40 font-mono">{item.date}</span>
        </div>

        <h3 className="text-base font-bold text-white mb-1 leading-snug">{item.title}</h3>
        <div className="text-saas-blue text-xs font-semibold mb-3">{item.org}</div>
        <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
      </motion.div>

      {/* ── Center Dot (desktop) ── */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.08 + 0.2 }}
          className={`w-4 h-4 rounded-full ${styles.dot} ring-4 ring-black`}
        />
      </div>

      {/* ── Mobile Dot (left side) ── */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.08 + 0.2 }}
        className={`md:hidden absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${styles.dot} ring-4 ring-black flex-shrink-0`}
      />

      {/* Spacer for the other half (desktop) */}
      <div className="hidden md:block w-[calc(50%-2.5rem)]" />
    </div>
  );
}

/* ─── Main Section ─── */
export function Timeline() {
  const { timeline } = PORTFOLIO_DATA;

  return (
    <section id="timeline" className="py-24 md:py-32 relative z-10">
      <div className="container mx-auto px-6">
        <SectionHeader
          badge="My Journey"
          title="From Freshman to Developer"
          description="A timeline of key milestones — education, certifications, competitions, and shipped products."
        />

        <div className="relative max-w-4xl mx-auto">
          {/* ── Vertical center line (desktop) ── */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          </div>

          {/* ── Mobile left border ── */}
          <div className="md:hidden absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          <div className="flex flex-col gap-8 md:gap-10">
            {timeline.map((item, i) => (
              <TimelineCard key={i} item={item} index={i} isLeft={i % 2 === 0} />
            ))}
          </div>

          {/* ── End cap dot ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden md:flex absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full mt-4 flex-col items-center gap-2 pt-6"
          >
            <div className="w-3 h-3 rounded-full bg-white/20 ring-4 ring-black" />
            <span className="text-white/30 text-xs font-mono mt-1">Present</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
