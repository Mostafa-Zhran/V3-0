import { motion } from "framer-motion";

interface AvailableBadgeProps {
  name: string;
}

export function AvailableBadge({ name }: AvailableBadgeProps) {
  const firstName = name.split(" ")[0];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-white/80 text-sm font-medium border border-white/10 hover:bg-white/[0.05] transition-colors cursor-default"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
      </span>
      Hi, I'm {firstName} — Available for new opportunities
    </motion.div>
  );
}
