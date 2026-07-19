import { useEffect } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";

interface UseMouseParallaxOptions {
  intensity?: number;
  damping?: number;
  stiffness?: number;
}

interface UseMouseParallaxReturn {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

export function useMouseParallax({
  intensity = 20,
  damping = 30,
  stiffness = 100,
}: UseMouseParallaxOptions = {}): UseMouseParallaxReturn {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping, stiffness, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(((e.clientX - centerX) / centerX) * intensity);
      mouseY.set(((e.clientY - centerY) / centerY) * intensity);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [intensity, mouseX, mouseY]);

  return { x, y };
}
