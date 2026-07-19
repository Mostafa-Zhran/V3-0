import { motion } from "framer-motion";

export function HeroBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Radial spotlight behind profile image */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-radial-gradient opacity-30" />

      {/* Animated gradient blob - top left */}
      <motion.div
        className="absolute -top-32 -left-32 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] rounded-full bg-saas-purple/[0.06] lg:bg-saas-purple/10 blur-[120px]"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, 30, -20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated gradient blob - bottom right */}
      <motion.div
        className="absolute -bottom-32 -right-32 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] rounded-full bg-saas-blue/[0.06] lg:bg-saas-blue/10 blur-[120px]"
        animate={{
          x: [0, -40, 30, 0],
          y: [0, -30, 40, 0],
          scale: [1, 0.95, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated gradient blob - center */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-saas-teal/5 blur-[100px]"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Decorative geometric - rotating diamond */}
      <motion.div
        className="absolute top-[20%] right-[15%] w-20 h-20 border border-white/[0.04] rotate-45 rounded-lg hidden lg:block"
        animate={{ rotate: [45, 405] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Decorative geometric - hexagon outline */}
      <motion.div
        className="absolute bottom-[25%] left-[10%] w-16 h-16 border border-white/[0.04] rounded-full hidden lg:block"
        animate={{
          rotate: [0, -360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Subtle dotted ring */}
      <motion.div
        className="absolute top-[60%] right-[8%] w-12 h-12 border border-dashed border-saas-purple/10 rounded-full hidden lg:block"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
