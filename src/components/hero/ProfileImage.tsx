import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { FloatingParticles } from "./FloatingParticles";

export function ProfileImage() {
  const { x, y } = useMouseParallax({ intensity: 15 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ x, y, willChange: "transform" }}
    >
      {/* Animated gradient halo */}
      <motion.div
        className="absolute w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] lg:w-[480px] lg:h-[480px] rounded-full blur-[80px] opacity-40"
        style={{
          background:
            "conic-gradient(from 0deg, rgb(var(--accent-blue)), rgb(var(--accent-purple)), rgb(var(--accent-teal)), rgb(var(--accent-pink)), rgb(var(--accent-blue)))",
        }}
        animate={
          isMobile
            ? undefined
            : {
                rotate: [0, 360],
                scale: [1, 1.05, 1],
              }
        }
        transition={{
          rotate: { duration: 12, repeat: Infinity, ease: "linear" },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Animated rotating ring (outer) */}
      <motion.div
        className="absolute w-[310px] h-[310px] sm:w-[370px] sm:h-[370px] lg:w-[440px] lg:h-[440px] rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent, rgb(var(--accent-blue)), transparent, rgb(var(--accent-purple)), transparent, rgb(var(--accent-teal)), transparent)",
          maskImage: "radial-gradient(transparent 65%, black 66%, black 70%, transparent 71%)",
          WebkitMaskImage: "radial-gradient(transparent 65%, black 66%, black 70%, transparent 71%)",
          willChange: "transform",
        }}
        animate={isMobile ? undefined : { rotate: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Animated rotating ring (inner, reverse) */}
      <motion.div
        className="absolute w-[290px] h-[290px] sm:w-[350px] sm:h-[350px] lg:w-[420px] lg:h-[420px] rounded-full opacity-50"
        style={{
          background:
            "conic-gradient(from 180deg, transparent, rgb(var(--accent-pink)), transparent, rgb(var(--accent-teal)), transparent)",
          maskImage: "radial-gradient(transparent 68%, black 69%, black 72%, transparent 73%)",
          WebkitMaskImage: "radial-gradient(transparent 68%, black 69%, black 72%, transparent 73%)",
          willChange: "transform",
        }}
        animate={isMobile ? undefined : { rotate: [360, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating animation wrapper */}
      <motion.div
        className="relative"
        animate={isMobile ? undefined : { y: [0, -12, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Glassmorphism frame */}
        <motion.div
          className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[400px] lg:h-[400px] rounded-full"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{ scale: 1.03 }}
        >
          {/* Gradient border */}
          <div className="absolute inset-0 rounded-full p-[3px] hero-gradient-border">
            <div className="w-full h-full rounded-full bg-black/80 backdrop-blur-sm" />
          </div>

          {/* Image container */}
          <div className="absolute inset-[6px] rounded-full overflow-hidden">
            {/* Glass overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent z-10 rounded-full pointer-events-none" />

            <img
              src="/images/Profile.jpeg"
              alt="Mostafa Zahran — Full Stack .NET Developer"
              className="w-full h-full object-cover object-center rounded-full"
              loading="eager"
            />
          </div>

          {/* Inner glow */}
          <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(59,130,246,0.1)] pointer-events-none" />
        </motion.div>

        {/* Outer glow / depth shadow */}
        <div className="absolute inset-0 rounded-full shadow-[0_0_80px_rgba(139,92,246,0.15),0_0_40px_rgba(59,130,246,0.1)] pointer-events-none" />

        {/* Glow pulse */}
        <motion.div
          className="absolute -inset-4 rounded-full pointer-events-none"
          style={{
            boxShadow:
              "0 0 60px rgba(59,130,246,0.08), 0 0 120px rgba(139,92,246,0.05)",
          }}
          animate={isMobile ? undefined : {
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Floating particles */}
      <FloatingParticles isMobile={isMobile} />
    </motion.div>
  );
}
