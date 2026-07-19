import { motion } from "framer-motion";
import { Code2, GraduationCap, Rocket } from "lucide-react";

interface InfoCard {
  icon: React.ElementType;
  text: string;
  iconColor: string;
  iconBg: string;
  position: string;
  delay: number;
  floatDelay: string;
}

const INFO_CARDS: InfoCard[] = [
  {
    icon: Code2,
    text: ".NET Backend Developer",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/20",
    position: "top-[5%] right-[5%] lg:top-[10%] lg:-right-[5%]",
    delay: 1.0,
    floatDelay: "0s",
  },
  {
    icon: GraduationCap,
    text: "Computer Science Student",
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/20",
    position: "bottom-[15%] left-[2%] lg:bottom-[15%] lg:-left-[8%]",
    delay: 1.2,
    floatDelay: "1.5s",
  },
  {
    icon: Rocket,
    text: "Open to Opportunities",
    iconColor: "text-teal-400",
    iconBg: "bg-teal-500/20",
    position: "bottom-[3%] right-[8%] lg:bottom-[5%] lg:-right-[3%]",
    delay: 1.4,
    floatDelay: "3s",
  },
];

export function GlassInfoCards() {
  return (
    <div
      className="absolute inset-0 pointer-events-none hidden md:block"
      aria-hidden="true"
    >
      {INFO_CARDS.map((card) => (
        <motion.div
          key={card.text}
          className={`absolute ${card.position} pointer-events-auto`}
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: card.delay,
            type: "spring",
            stiffness: 150,
            damping: 20,
          }}
        >
          <motion.div
            className="flex items-center gap-3 px-4 py-3 rounded-2xl glass-card shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:bg-white/[0.06] transition-colors duration-300"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: parseFloat(card.floatDelay),
            }}
          >
            <div
              className={`w-9 h-9 rounded-xl ${card.iconBg} flex items-center justify-center ${card.iconColor} shrink-0`}
            >
              <card.icon size={18} />
            </div>
            <span className="text-white/80 text-sm font-medium whitespace-nowrap">
              {card.text}
            </span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
