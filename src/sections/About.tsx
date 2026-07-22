import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { GraduationCap, ArrowUpRight, Trophy, UserCheck } from "lucide-react";

/**
 * AnimatedCounter counts up smoothly from 0 to target number when scrolled into view.
 */
function AnimatedCounter({
  numericValue,
  suffix = "+",
}: {
  numericValue?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || numericValue === undefined) return;

    let startTime: number | null = null;
    const duration = 1500;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * numericValue));

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(numericValue);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isInView, numericValue]);

  if (numericValue === undefined) return <span>{suffix}</span>;

  return (
    <span ref={ref} className="font-mono">
      {isInView ? count : 0}
      {suffix}
    </span>
  );
}

/**
 * Render Markdown-style bold text (**text**) with crisp white emphasis
 */
function FormattedBioText({ text }: { text: string }) {
  const parts = text.split(/(\*\*.*?\*\*)/);

  return (
    <span>
      {parts.map((part, index) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={index} className="text-white font-semibold">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        )
      )}
    </span>
  );
}

export function About() {
  const { stats, education, achievements } = PORTFOLIO_DATA;
  const { points, techStack } = PORTFOLIO_DATA.about;

  return (
    <section id="about" className="py-24 md:py-32 relative z-10">
      <div className="container mx-auto px-6">
        <SectionHeader
          badge="About Me"
          title="Driven by logic. Designed with care."
          description="I'm a full-stack developer who loves building products that solve real problems while delivering exceptional user experiences."
          align="center"
        />

        {/* ─── MAIN 2-COLUMN LAYOUT: BIO & STATS ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto mb-8">
          {/* LEFT: Sleek Bio Card (Spans 7 cols on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bento-card p-8 md:p-10 flex flex-col justify-between group border border-white/10 bg-white/[0.02] backdrop-blur-xl relative overflow-hidden"
          >
            {/* Subtle glow accent on hover */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-saas-purple/10 via-saas-blue/5 to-transparent blur-3xl pointer-events-none group-hover:opacity-100 transition-opacity duration-700 opacity-40" />

            <div>
              {/* Header Badge */}
              <div className="flex items-center gap-2 text-xs font-mono text-saas-blue tracking-wider uppercase mb-8">
                <UserCheck size={16} />
                <span>Background & Focus</span>
              </div>

              {/* Bio Points */}
              <div className="space-y-6 text-white/70 text-base md:text-lg leading-relaxed">
                {points.map((point, i) => {
                  const Icon = point.icon;
                  return (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-saas-purple shrink-0 mt-0.5 group-hover:border-saas-purple/40 transition-colors duration-300">
                        <Icon size={18} />
                      </div>
                      <div className="pt-0.5">
                        <FormattedBioText text={point.text} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tech Stack Chips at bottom of Bio */}
            {techStack && (
              <div className="pt-8 mt-8 border-t border-white/10 flex flex-wrap gap-2">
                {techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-white/70 hover:text-white hover:border-saas-purple/40 hover:bg-saas-purple/10 transition-all duration-300 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* RIGHT: 2x2 Sleek Stats Grid (Spans 5 cols on desktop) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 + 0.1 }}
                  className="bento-card p-6 md:p-8 flex flex-col justify-between border border-white/10 bg-white/[0.02] backdrop-blur-xl group hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500 relative overflow-hidden"
                >
                  {/* Top indicator bar */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-0.5 w-10 bg-gradient-to-r from-saas-purple to-saas-blue rounded-full group-hover:w-16 transition-all duration-500" />
                    {Icon && (
                      <div className="text-white/30 group-hover:text-saas-purple transition-colors duration-300">
                        <Icon size={20} />
                      </div>
                    )}
                  </div>

                  <div>
                    {/* Stat Number */}
                    <div className="text-4xl md:text-5xl font-extrabold tracking-tighter text-white mb-2 group-hover:scale-105 transition-transform duration-300 origin-left">
                      <AnimatedCounter
                        numericValue={stat.numericValue}
                        suffix="+"
                      />
                    </div>
                    {/* Stat Label */}
                    <div className="text-white/80 text-sm font-semibold tracking-tight">
                      {stat.label}
                    </div>
                    {/* Subtext */}
                    {stat.subtext && (
                      <div className="text-white/40 text-xs font-mono mt-1">
                        {stat.subtext}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ─── ACHIEVEMENTS CARD ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bento-card p-8 md:p-12 max-w-6xl mx-auto mb-8 border border-white/10 bg-white/[0.02]"
        >
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Trophy className="text-saas-purple" />
            Achievements & Recognition
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] hover:border-saas-purple/30 transition-all duration-300 relative overflow-hidden"
              >
                <div className="w-12 h-12 rounded-xl bg-saas-purple/10 border border-saas-purple/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-saas-purple/50 transition-all duration-300">
                  <item.icon size={22} className="text-saas-purple" />
                </div>

                <h4 className="text-lg font-bold text-white mb-2 tracking-tight">
                  {item.title}
                </h4>
                <p className="text-white/55 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── EDUCATION TIMELINE ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bento-card p-8 md:p-12 max-w-6xl mx-auto border border-white/10 bg-white/[0.02]"
        >
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <GraduationCap className="text-saas-purple" />
              Education Path
            </h3>
            <a
              href="https://linkedin.com/in/mostafa-tamer-zahran"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-white/50 hover:text-white flex items-center gap-1 transition-colors"
            >
              View Full LinkedIn <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {education.map((item, i) => (
              <div key={i} className="relative group">
                <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center mb-6 group-hover:border-saas-purple/50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-saas-purple opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Connection Line (Desktop) */}
                {i < education.length - 1 && (
                  <div className="hidden md:block absolute top-5 left-10 w-[calc(100%-1rem)] h-px bg-white/10" />
                )}

                <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                <div className="text-saas-blue text-sm font-medium mb-2">{item.org}</div>
                <div className="text-white/40 text-xs font-mono mb-4">{item.date}</div>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
