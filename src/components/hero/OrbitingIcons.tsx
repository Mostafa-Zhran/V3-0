import { motion } from "framer-motion";

interface OrbitIcon {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}

const TECH_ICONS: OrbitIcon[] = [
  { label: "C#", icon: "C#", color: "text-purple-400", bgColor: "bg-purple-500/15" },
  { label: "ASP.NET", icon: ".NET", color: "text-blue-400", bgColor: "bg-blue-500/15" },
  { label: "SQL Server", icon: "SQL", color: "text-red-400", bgColor: "bg-red-500/15" },
  { label: "React", icon: "⚛", color: "text-cyan-400", bgColor: "bg-cyan-500/15" },
  { label: "Docker", icon: "🐳", color: "text-blue-300", bgColor: "bg-blue-400/15" },
];

export function OrbitingIcons() {
  const orbitRadius = 260; // px, responsive via scale

  return (
    <div
      className="absolute inset-0 pointer-events-none hidden lg:flex items-center justify-center"
      aria-hidden="true"
    >
      {/* Orbit path hint */}
      <div
        className="absolute rounded-full border border-white/[0.03] border-dashed"
        style={{ width: orbitRadius * 2, height: orbitRadius * 2 }}
      />

      {/* Spinning container */}
      <motion.div
        className="absolute"
        style={{ width: orbitRadius * 2, height: orbitRadius * 2 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {TECH_ICONS.map((tech, i) => {
          const angle = (i / TECH_ICONS.length) * 360;
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * orbitRadius;
          const y = Math.sin(rad) * orbitRadius;

          return (
            <motion.div
              key={tech.label}
              className="absolute left-1/2 top-1/2"
              style={{
                x: x - 24,
                y: y - 24,
              }}
              // Counter-rotate so text stays upright
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                className={`flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md ${tech.bgColor} border border-white/10 shadow-lg`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.8 + i * 0.15,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{ scale: 1.15 }}
              >
                <span className={`text-sm font-bold ${tech.color}`}>
                  {tech.icon}
                </span>
                <span className="text-white/80 text-xs font-medium whitespace-nowrap">
                  {tech.label}
                </span>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
