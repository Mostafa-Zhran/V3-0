import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ExternalLink, Code2, Target, Flame, Swords } from "lucide-react";

/* ─── Animated Counter ─── */
function AnimatedCounter({
  value,
  suffix = "",
  duration = 2000,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplayed(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
      else setDisplayed(value);
    };
    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {displayed}
      {suffix}
    </span>
  );
}

/* ─── SVG Ring Progress ─── */
function RingProgress({
  value,
  max,
  size = 200,
  strokeWidth = 14,
}: {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true });
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference - (value / max) * circumference;

  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      className="drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]"
    >
      <defs>
        <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
        <filter id="ring-glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth={strokeWidth}
      />

      {/* Progress */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="url(#ring-gradient)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={isInView ? { strokeDashoffset: targetOffset } : {}}
        transition={{ duration: 2.2, ease: "easeOut", delay: 0.3 }}
        style={{
          transformOrigin: "center",
          transform: "rotate(-90deg)",
          filter: "url(#ring-glow)",
        }}
      />

      {/* Center text */}
      <text
        x="50%"
        y="46%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize="32"
        fontWeight="800"
        fontFamily="Inter, sans-serif"
      >
        {value}+
      </text>
      <text
        x="50%"
        y="62%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="rgba(255,255,255,0.5)"
        fontSize="11"
        fontWeight="500"
        fontFamily="Inter, sans-serif"
        letterSpacing="2"
      >
        PROBLEMS
      </text>
    </svg>
  );
}

/* ─── Difficulty Bar ─── */
function DifficultyBar({
  label,
  sublabel,
  count,
  total,
  color,
  delay,
}: {
  label: string;
  sublabel: string;
  count: number;
  total: number;
  color: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-white">{label}</span>
          <span className="text-xs text-white/40 font-mono">{sublabel}</span>
        </div>
        <AnimatedCounter value={count} />
      </div>
      <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${(count / total) * 100}%` } : {}}
          transition={{ duration: 1.5, ease: "easeOut", delay }}
        />
      </div>
    </div>
  );
}

/* ─── Platform Card ─── */
function PlatformCard({
  platform,
  delay,
}: {
  platform: (typeof PORTFOLIO_DATA.cpStats.platforms)[number];
  delay: number;
}) {
  const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    Codeforces: Code2,
    Codewars: Target,
  };
  const Icon = iconMap[platform.name] ?? Code2;

  return (
    <motion.a
      href={platform.link}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`bento-card p-6 flex flex-col gap-4 group border ${platform.borderColor} hover:shadow-[0_0_30px_var(--platform-glow)] transition-all duration-300 cursor-pointer`}
      style={{ "--platform-glow": platform.glowColor } as React.CSSProperties}
    >
      <div className="flex items-center justify-between">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center`}
        >
          <Icon size={22} className="text-white" />
        </div>
        <ExternalLink
          size={16}
          className="text-white/30 group-hover:text-white/70 transition-colors"
        />
      </div>

      <div>
        <div className="text-lg font-bold text-white">{platform.name}</div>
        <div className="text-white/40 text-sm font-mono">@{platform.handle}</div>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <div className="text-3xl font-extrabold text-white tracking-tight">
            <AnimatedCounter value={platform.solved} suffix="+" />
          </div>
          <div className="text-white/50 text-xs font-medium mt-0.5">Problems Solved</div>
        </div>
        <div
          className={`px-3 py-1 rounded-full bg-gradient-to-r ${platform.color} text-white text-xs font-bold`}
        >
          {platform.rank}
        </div>
      </div>

      {platform.rating && (
        <div className="pt-3 border-t border-white/[0.06] flex items-center gap-2">
          <Flame size={14} className="text-orange-400" />
          <span className="text-white/60 text-sm">
            Peak Rating:{" "}
            <span className="text-white font-bold">{platform.rating}</span>
          </span>
        </div>
      )}
    </motion.a>
  );
}

/* ─── Main Section ─── */
export function CPStats() {
  const { cpStats } = PORTFOLIO_DATA;
  const totalMax = 300; // visual ceiling for the ring

  return (
    <section id="cp-stats" className="py-24 md:py-32 relative z-10">
      <div className="container mx-auto px-6">
        <SectionHeader
          badge="Competitive Programming"
          title="Code & Compete"
          description="Sharpening algorithmic thinking through 250+ solved problems across Codeforces and Codewars."
        />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ── Left: Ring + quick stats ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 bento-card p-8 flex flex-col items-center justify-center gap-8 glow-effect"
          >
            <RingProgress value={cpStats.totalSolved} max={totalMax} size={200} strokeWidth={14} />

            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="text-center p-4 bg-white/[0.03] rounded-2xl border border-white/[0.05]">
                <div className="text-2xl font-extrabold text-white mb-1">
                  <AnimatedCounter value={cpStats.contestsParticipated} suffix="+" />
                </div>
                <div className="text-white/50 text-xs font-medium">Contests</div>
              </div>
              <div className="text-center p-4 bg-white/[0.03] rounded-2xl border border-white/[0.05]">
                <div className="text-2xl font-extrabold text-white mb-1">
                  <AnimatedCounter value={cpStats.maxRating} />
                </div>
                <div className="text-white/50 text-xs font-medium">Peak Rating</div>
              </div>
            </div>

            {/* Live badge */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.07]">
              <Swords size={14} className="text-cyan-400" />
              <span className="text-white/60 text-xs font-medium">Active competitor</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
            </div>
          </motion.div>

          {/* ── Center: Difficulty Breakdown ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-4 bento-card p-8 flex flex-col justify-between"
          >
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-1">Difficulty Breakdown</h3>
              <p className="text-white/40 text-sm">Codeforces problems by difficulty tier</p>
            </div>

            <div className="flex flex-col gap-5 flex-1 justify-center">
              {cpStats.byDifficulty.map((item, i) => (
                <DifficultyBar
                  key={item.label}
                  label={item.label}
                  sublabel={item.sublabel}
                  count={item.count}
                  total={cpStats.totalSolved}
                  color={item.color}
                  delay={i * 0.15 + 0.4}
                />
              ))}
            </div>

            {/* Total bar */}
            <div className="mt-6 pt-5 border-t border-white/[0.06]">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/50">Total Progress</span>
                <span className="text-white font-bold">
                  {cpStats.totalSolved} / {totalMax}
                </span>
              </div>
              <div className="mt-2 h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(cpStats.totalSolved / totalMax) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeOut", delay: 0.8 }}
                />
              </div>
            </div>
          </motion.div>

          {/* ── Right: Platform Cards ── */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            {cpStats.platforms.map((platform, i) => (
              <PlatformCard key={platform.name} platform={platform} delay={i * 0.12 + 0.2} />
            ))}

            {/* ECPC badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bento-card p-5 flex items-center gap-4 border border-saas-purple/20 hover:border-saas-purple/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-saas-purple/10 border border-saas-purple/20 flex items-center justify-center flex-shrink-0">
                <Swords size={18} className="text-saas-purple" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">ECPC Preparation</div>
                <div className="text-white/45 text-xs mt-0.5">
                  Preparing for Egyptian Collegiate Programming Contest
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
