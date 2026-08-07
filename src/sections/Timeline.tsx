import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PORTFOLIO_DATA, type TimelineEntry } from "@/data/portfolio";

/* ══════════════════════════════════════════════════════════════════════════
   GEOMETRY — DNA double helix math
   ══════════════════════════════════════════════════════════════════════════
   Strands:  xa(y) = CX − AMP·cos(π·(y−PAD)/GAP)
             xb(y) = CX + AMP·cos(π·(y−PAD)/GAP)

   Crossings (xa = xb → cos=0):  y = PAD + (i+0.5)·GAP  → NODE positions
   Max-spread (|cos|=1):          y = PAD + i·GAP         → RUNG positions
   ══════════════════════════════════════════════════════════════════════════*/
const GAP  = 240;        // px per milestone row
const AMP  = 82;         // helix amplitude from center-line
const SW   = 204;        // SVG element width
const CX   = SW / 2;    // center-x = 102
const PAD  = 28;         // SVG top padding before first node
const CGAP = 38;         // gap between SVG edge and card

const nodeY = (i: number) => PAD + (i + 0.5) * GAP;
const rungY = (i: number) => PAD + (i + 1) * GAP;
const xA    = (y: number) => CX - AMP * Math.cos((Math.PI * (y - PAD)) / GAP);
const xB    = (y: number) => CX + AMP * Math.cos((Math.PI * (y - PAD)) / GAP);

function strandPath(getX: (y: number) => number, totalH: number): string {
  const steps = Math.ceil(totalH / 2);
  let d = "";
  for (let s = 0; s <= steps; s++) {
    const y = (s / steps) * totalH;
    const x = getX(y).toFixed(1);
    d += s === 0 ? `M${x},${y.toFixed(1)}` : `L${x},${y.toFixed(1)}`;
  }
  return d;
}

/* ══════════════════════════════════════════════════════════════════════════
   CATEGORY STYLES
   ══════════════════════════════════════════════════════════════════════════*/
const CAT = {
  education:     { c: "#3b82f6", rgb: "59,130,246",  lab: "Education",     border: "border-blue-500/30 hover:border-blue-500/60",   badge: "bg-blue-500/10 text-blue-400 border border-blue-500/20"    },
  achievement:   { c: "#8b5cf6", rgb: "139,92,246",  lab: "Achievement",   border: "border-purple-500/30 hover:border-purple-500/60", badge: "bg-purple-500/10 text-purple-400 border border-purple-500/20" },
  certification: { c: "#14b8a6", rgb: "20,184,166",  lab: "Certification", border: "border-teal-500/30 hover:border-teal-500/60",   badge: "bg-teal-500/10 text-teal-400 border border-teal-500/20"    },
  project:       { c: "#ec4899", rgb: "236,72,153",  lab: "Project",       border: "border-pink-500/30 hover:border-pink-500/60",   badge: "bg-pink-500/10 text-pink-400 border border-pink-500/20"    },
} satisfies Record<TimelineEntry["category"], unknown>;

/* ══════════════════════════════════════════════════════════════════════════
   HELIX SVG
   ══════════════════════════════════════════════════════════════════════════*/
function HelixSVG({ count }: { count: number }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { once: true, margin: "-60px" });
  const { timeline } = PORTFOLIO_DATA;
  const totalH = PAD + count * GAP + 52;

  const pathA = useMemo(() => strandPath(xA, totalH), [totalH]);
  const pathB = useMemo(() => strandPath(xB, totalH), [totalH]);

  const rungs = useMemo(
    () =>
      Array.from({ length: count - 1 }, (_, i) => {
        const y = rungY(i);
        return { y, x1: Math.min(xA(y), xB(y)), x2: Math.max(xA(y), xB(y)) };
      }),
    [count],
  );

  const particles = useMemo(() => {
    const FRAC = [0.18, 0.4, 0.63, 0.82];
    return timeline.flatMap((item, i) =>
      FRAC.map((f, j) => {
        const y   = PAD + (i + f) * GAP;
        const ang = (Math.PI * (y - PAD)) / GAP;
        const sx  = j % 2 === 0 ? 1 : -1;
        return {
          x:     CX + sx * AMP * 0.55 * Math.abs(Math.sin(ang)),
          y,
          c:     CAT[item.category].c,
          delay: i * 0.9 + j * 0.22,
          dur:   1.8 + j * 0.45,
        };
      }),
    );
  }, [timeline]);

  return (
    <svg ref={svgRef} width={SW} height={totalH} className="overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="tlGradA" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#3b82f6" stopOpacity="0.9" />
          <stop offset="48%"  stopColor="#8b5cf6" stopOpacity="1"   />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.85"/>
        </linearGradient>
        <linearGradient id="tlGradB" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#14b8a6" stopOpacity="0.9" />
          <stop offset="48%"  stopColor="#6366f1" stopOpacity="1"   />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.85"/>
        </linearGradient>
        <filter id="tlGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="tlNG" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Start cap */}
      <motion.circle cx={CX} cy={PAD / 2} r={3} fill="rgba(255,255,255,0.12)"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }} />

      {/* Base-pair rungs */}
      {rungs.map((r, i) => (
        <motion.line key={`rung-${i}`}
          x1={r.x1} y1={r.y} x2={r.x2} y2={r.y}
          stroke="rgba(255,255,255,0.07)" strokeWidth="1.5"
          strokeDasharray="3 4" strokeLinecap="round"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 1.2 + i * 0.07, duration: 0.4, ease: "easeOut" }}
          style={{ transformOrigin: `${CX}px ${r.y}px` }}
        />
      ))}

      {/* Strand B — teal/indigo (back) */}
      <motion.path d={pathB} fill="none" stroke="url(#tlGradB)"
        strokeWidth="2.2" strokeLinecap="round" filter="url(#tlGlow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 2.6, ease: "easeInOut", delay: 0.15 }}
      />

      {/* Strand A — blue/purple/pink (front) */}
      <motion.path d={pathA} fill="none" stroke="url(#tlGradA)"
        strokeWidth="2.2" strokeLinecap="round" filter="url(#tlGlow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 2.6, ease: "easeInOut" }}
      />

      {/* Particle trails */}
      {particles.map((p, i) => (
        <motion.circle key={`pt-${i}`} cx={p.x} cy={p.y} r={1.6} fill={p.c}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: [0, 0.95, 0], cy: [p.y, p.y - 18, p.y - 42] } : {}}
          transition={{ duration: p.dur, delay: p.delay + 1.8, repeat: Infinity, repeatDelay: 3.5, ease: "easeOut" }}
        />
      ))}

      {/* Crossing-point nodes */}
      {timeline.map((item, i) => {
        const y   = nodeY(i);
        const cat = CAT[item.category];
        return (
          <g key={`node-${i}`}>
            {/* Pulsing ring */}
            <motion.circle cx={CX} cy={y} r={14} fill="none"
              stroke={cat.c} strokeWidth="0.6"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 0.3 } : {}}
              transition={{ delay: 1.4 + i * 0.14, duration: 0.5 }}
              style={{ transformOrigin: `${CX}px ${y}px` }}
            >
              <animateTransform attributeName="transform" type="scale"
                values="1;1.7;1" dur={`${2.8 + (i % 3) * 0.4}s`}
                begin={`${i * 0.45 + 2}s`} repeatCount="indefinite" additive="sum" />
            </motion.circle>

            {/* Glow halo */}
            <motion.circle cx={CX} cy={y} r={9}
              fill={`rgba(${cat.rgb},0.22)`} filter="url(#tlNG)"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.4 + i * 0.14 }}
            />

            {/* Main dot */}
            <motion.circle cx={CX} cy={y} r={6} fill={cat.c}
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 1.4 + i * 0.14, type: "spring", stiffness: 320, damping: 18 }}
              style={{ transformOrigin: `${CX}px ${y}px` }}
            />

            {/* Specular highlight */}
            <motion.circle cx={CX - 1.8} cy={y - 2} r={2} fill="rgba(255,255,255,0.5)"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.6 + i * 0.14 }}
            />
          </g>
        );
      })}
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   DESKTOP CARD — glassmorphism + 3-D perspective tilt on hover
   ══════════════════════════════════════════════════════════════════════════*/
function DesktopCard({ item, index, isLeft }: { item: TimelineEntry; index: number; isLeft: boolean }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const cat    = CAT[item.category];
  const Icon   = item.icon;

  return (
    <div style={{ perspective: "900px" }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: isLeft ? -55 : 55 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.025, rotateY: isLeft ? -5 : 5 }}
        className={`relative p-5 rounded-2xl group cursor-default bg-white/[0.025] border ${cat.border}
          backdrop-blur-sm transition-colors duration-500 hover:bg-white/[0.05]
          shadow-[0_8px_40px_rgba(0,0,0,0.3)]`}
      >
        {/* Edge glow on hover */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(ellipse at ${isLeft ? "110%" : "-10%"} 50%, rgba(${cat.rgb},0.12) 0%, transparent 65%)` }}
        />

        {/* Connector nub */}
        <div className="absolute top-1/2 hidden md:block h-px w-8 pointer-events-none"
          style={{
            [isLeft ? "right" : "left"]: "-1px",
            transform: "translateY(-50%)",
            background: `linear-gradient(to ${isLeft ? "right" : "left"}, transparent, rgba(${cat.rgb},0.45))`,
          }}
        />

        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0
                          group-hover:scale-110 transition-transform duration-300"
            style={{ background: `rgba(${cat.rgb},0.12)`, border: `1px solid rgba(${cat.rgb},0.25)`, color: cat.c }}
          >
            <Icon size={14} />
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${cat.badge}`}>
            {cat.lab}
          </span>
          <span className="ml-auto text-[10px] text-white/35 font-mono whitespace-nowrap">{item.date}</span>
        </div>

        <h3 className="text-sm font-bold text-white mb-1 leading-snug">{item.title}</h3>
        <div className="text-[11px] font-semibold mb-2.5" style={{ color: cat.c }}>{item.org}</div>
        <p className="text-white/50 text-xs leading-relaxed line-clamp-3">{item.desc}</p>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MOBILE CARD
   ══════════════════════════════════════════════════════════════════════════*/
function MobileCard({ item, index }: { item: TimelineEntry; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const cat    = CAT[item.category];
  const Icon   = item.icon;

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className={`relative p-4 rounded-xl bg-white/[0.025] border ${cat.border} transition-all duration-300`}
    >
      <div className="absolute -left-[2.15rem] top-4 w-3.5 h-3.5 rounded-full ring-4 ring-black"
        style={{ background: cat.c, boxShadow: `0 0 10px rgba(${cat.rgb},0.65)` }}
      />
      <div className="flex items-center gap-2 mb-2.5">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `rgba(${cat.rgb},0.12)`, border: `1px solid rgba(${cat.rgb},0.22)`, color: cat.c }}>
          <Icon size={12} />
        </div>
        <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${cat.badge}`}>{cat.lab}</span>
        <span className="ml-auto text-[9px] text-white/35 font-mono">{item.date}</span>
      </div>
      <h3 className="text-sm font-bold text-white mb-0.5">{item.title}</h3>
      <div className="text-[10px] font-semibold mb-1.5" style={{ color: cat.c }}>{item.org}</div>
      <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MAIN SECTION
   ══════════════════════════════════════════════════════════════════════════*/
export function Timeline() {
  const { timeline } = PORTFOLIO_DATA;
  const n      = timeline.length;
  const totalH = PAD + n * GAP + 52;

  return (
    <section id="timeline" className="py-24 md:py-32 relative z-10 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <div className="absolute top-1/4  left-1/3  w-[480px] h-[480px] bg-blue-600/[0.04]   rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-[480px] h-[480px] bg-purple-600/[0.04] rounded-full blur-3xl" />
        <div className="absolute top-1/2  left-1/2  -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-teal-600/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative">
        <SectionHeader
          badge="My Journey"
          title="From Freshman to Developer"
          description="A timeline of key milestones — education, certifications, competitions, and shipped products."
        />

        {/* ── Desktop: DNA Helix ── */}
        <div className="hidden md:block relative max-w-5xl mx-auto">
          <div className="relative" style={{ height: totalH }}>

            {/* Helix SVG — absolutely centered */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none">
              <HelixSVG count={n} />
            </div>

            {/* Cards — alternating left / right */}
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              const cy     = nodeY(i);
              return (
                <div key={i} className="absolute -translate-y-1/2"
                  style={{
                    top:   cy,
                    width: `calc(50% - ${SW / 2 + CGAP + 14}px)`,
                    ...(isLeft
                      ? { right: `calc(50% + ${SW / 2 + CGAP}px)` }
                      : { left:  `calc(50% + ${SW / 2 + CGAP}px)` }),
                  }}
                >
                  <DesktopCard item={item} index={i} isLeft={isLeft} />
                </div>
              );
            })}

            {/* "Present" end cap */}
            <motion.div
              initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              style={{ top: totalH - 6 }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-white/15 ring-4 ring-black" />
              <span className="text-white/25 text-[10px] font-mono tracking-widest">Present</span>
            </motion.div>
          </div>
        </div>

        {/* ── Mobile: Single strand ── */}
        <div className="md:hidden relative pl-9">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/30 to-transparent" />
          <div className="flex flex-col gap-7">
            {timeline.map((item, i) => (
              <MobileCard key={i} item={item} index={i} />
            ))}
          </div>
          <div className="absolute left-[calc(1rem-0.25rem)] -bottom-3 w-2 h-2 rounded-full bg-white/15 ring-2 ring-black" />
        </div>
      </div>
    </section>
  );
}
