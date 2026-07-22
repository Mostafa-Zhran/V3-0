import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Scroll lock on mount
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
    }, 2000); // 2 seconds total loading

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] },
          }}
          className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center"
        >
          {/* Ambient center light */}
          <div className="absolute w-[400px] h-[400px] bg-saas-purple/5 rounded-full blur-3xl" />

          <div className="relative flex flex-col items-center">
            {/* SVG Logo drawing animation */}
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              className="mb-6 drop-shadow-[0_0_20px_rgba(139,92,246,0.5)]"
            >
              <defs>
                <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="50%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#f472b6" />
                </linearGradient>
              </defs>

              {/* M path */}
              <motion.path
                d="M 15 75 L 15 25 L 35 60 L 55 25 L 55 75"
                stroke="url(#logo-grad)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />

              {/* Z path */}
              <motion.path
                d="M 50 75 L 85 75 L 55 25 L 85 25"
                stroke="url(#logo-grad)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
              />
            </svg>

            {/* Glowing Text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-center"
            >
              <h3 className="text-xl font-extrabold tracking-[0.2em] text-white">
                Mostafa Zahran
              </h3>
              <p className="text-[9px] font-bold text-white/30 tracking-[0.4em] uppercase mt-2">
                Developer Portfolio
              </p>
            </motion.div>
          </div>

          {/* Bottom loader bar indicator */}
          <div className="absolute bottom-16 w-48 h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.7, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-saas-blue via-saas-purple to-saas-teal"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
