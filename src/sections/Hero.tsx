import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ProfileImage } from "@/components/hero/ProfileImage";
import { OrbitingIcons } from "@/components/hero/OrbitingIcons";
import { GlassInfoCards } from "@/components/hero/GlassInfoCards";
import { HeroBackground } from "@/components/hero/HeroBackground";
import { AvailableBadge } from "@/components/hero/AvailableBadge";
import { HeroSocialLinks } from "@/components/hero/HeroSocialLinks";

export function Hero() {
  const { name, description } = PORTFOLIO_DATA.hero;

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center justify-center pt-20 pb-12 overflow-hidden"
    >
      {/* Section-specific background effects */}
      <HeroBackground />

      <div className="container mx-auto px-6 relative z-10">
        {/* === DESKTOP LAYOUT: 3-column grid === */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_auto_auto] lg:items-center lg:gap-8 xl:gap-12">
          {/* LEFT COLUMN — Text content */}
          <div className="flex flex-col items-start text-left max-w-xl">
            <AvailableBadge name={name} />

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="text-5xl xl:text-7xl font-extrabold tracking-tighter text-white leading-[1.1] mt-8 mb-6"
            >
              Building{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-saas-blue via-saas-purple to-saas-teal">
                digital products
              </span>{" "}
              that scale.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
              className="text-lg xl:text-xl text-white/50 mb-10 font-light leading-relaxed"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
              className="flex items-center gap-5"
            >
              <CTAButton />
              <ResumeButton />
            </motion.div>
          </div>

          {/* CENTER COLUMN — Profile Image with orbiting icons & glass cards */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-[480px] h-[480px] flex items-center justify-center">
              <ProfileImage />
              <OrbitingIcons />
              <GlassInfoCards />
            </div>
          </div>

          {/* RIGHT COLUMN — Social links */}
          <div className="flex items-center justify-center pl-4">
            <HeroSocialLinks />
          </div>
        </div>

        {/* === TABLET LAYOUT (md, hidden on lg+) === */}
        <div className="hidden md:flex md:flex-col md:items-center md:text-center lg:hidden">
          {/* Image first on tablet */}
          <div className="relative w-[380px] h-[380px] flex items-center justify-center mb-10">
            <ProfileImage />
            <GlassInfoCards />
          </div>

          <AvailableBadge name={name} />

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="text-6xl font-extrabold tracking-tighter text-white leading-[1.1] mt-6 mb-6 max-w-2xl"
          >
            Building{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-saas-blue via-saas-purple to-saas-teal">
              digital products
            </span>{" "}
            that scale.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
            className="text-xl text-white/50 mb-10 font-light max-w-xl"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="flex items-center gap-5"
          >
            <CTAButton />
            <ResumeButton />
          </motion.div>
        </div>

        {/* === MOBILE LAYOUT (below md) === */}
        <div className="flex flex-col items-center text-center md:hidden">
          {/* Image first on mobile */}
          <div className="relative w-[300px] h-[300px] flex items-center justify-center mb-8">
            <ProfileImage />
          </div>

          <AvailableBadge name={name} />

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-white leading-[1.1] mt-6 mb-5"
          >
            Building{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-saas-blue via-saas-purple to-saas-teal">
              digital products
            </span>{" "}
            that scale.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
            className="text-lg text-white/50 mb-8 font-light max-w-sm"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <CTAButton />
            <ResumeButton />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Shared CTA Buttons (extracted to avoid repetition) ─── */

function CTAButton() {
  return (
    <motion.a
      href="#contact"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative p-[2px] rounded-full flex items-center justify-center group w-full sm:w-auto"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-saas-blue via-saas-purple to-saas-teal rounded-full animate-[spin_3s_linear_infinite] opacity-70 group-hover:opacity-100 blur-[2px] transition-opacity duration-500" />
      <div className="absolute inset-0 bg-gradient-to-r from-saas-blue via-saas-purple to-saas-teal rounded-full animate-[spin_3s_linear_infinite]" />
      <div className="relative px-8 py-4 bg-black rounded-full flex items-center justify-center gap-2 w-full h-full transition-all duration-300 group-hover:bg-black/40 backdrop-blur-sm overflow-hidden">
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
        <span className="text-white font-bold tracking-wide relative z-10">
          Start a project
        </span>
        <ArrowRight
          size={18}
          className="text-white group-hover:translate-x-1 group-hover:-rotate-45 transition-all duration-300 relative z-10"
        />
      </div>
    </motion.a>
  );
}

function ResumeButton() {
  return (
    <motion.a
      href="https://drive.google.com/file/d/19d23YXlQVDZ_TvJMGYu_xuQYeF5TrtaV/view?usp=sharing"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-full sm:w-auto px-8 py-4 glass-card text-white font-semibold rounded-full hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 flex items-center justify-center gap-2 group border border-white/10 relative overflow-hidden"
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      <Download
        size={18}
        className="text-white/70 group-hover:text-white group-hover:-translate-y-1 transition-all duration-300"
      />
      Download Resume
    </motion.a>
  );
}
