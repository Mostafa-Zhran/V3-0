import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ArrowUpRight, ArrowUp, Mail, MapPin, Terminal } from "lucide-react";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Journey", href: "#timeline" },
  { label: "Skills", href: "#skills" },
  { label: "CP Stats", href: "#cp-stats" },
  { label: "Projects", href: "#projects" },
  { label: "Certs", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_ICONS: Record<string, string> = {
  GitHub: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
  LinkedIn: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  Codeforces: "M2 19h4V5H2v14zm6 0h4V9H8v10zm6 0h4v-8h-4v8z",
  Codewars: "M2 4v16h20V4H2zm10 13H6v-2h6v2zm6-4H6V11h12v2zm0-4H6V7h12v2z",
  Facebook: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
};

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-white/[0.06] bg-black overflow-hidden">

      {/* ── Ambient glow ── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-saas-purple/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">

        {/* ══════════════════════════════════════════════════
            TOP BAND — CTA
        ══════════════════════════════════════════════════ */}
        <div className="py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/[0.06]">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
              Have a project in mind?
            </h2>
            <p className="text-white/45 text-base max-w-md">
              Let's build something remarkable together — from a startup idea to an enterprise solution.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <motion.a
              href="mailto:mostafazahran724@gmail.com"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-bold rounded-full shadow-[0_0_0_rgba(255,255,255,0)] hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] transition-all duration-300 group overflow-hidden relative"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Mail size={15} />
              <span className="relative">Let's Talk</span>
            </motion.a>

            <motion.a
              href="https://drive.google.com/file/d/19d23YXlQVDZ_TvJMGYu_xuQYeF5TrtaV/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-semibold rounded-full transition-all duration-300"
            >
              <ArrowUpRight size={15} />
              Resume
            </motion.a>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            MIDDLE — Brand / Nav / Socials / Info
        ══════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-16 border-b border-white/[0.06]">

          {/* Brand column */}
          <div className="md:col-span-5">
            <a href="#home" className="inline-block text-2xl font-extrabold tracking-tighter text-white mb-4">
              Mostafa Zahran.
            </a>
            <p className="text-white/45 text-sm leading-relaxed max-w-xs mb-6">
              CS student & Full Stack .NET developer crafting scalable web apps, competitive algorithms, and intelligent systems.
            </p>

            {/* Info chips */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-xs text-white/40">
                <MapPin size={13} className="text-saas-blue flex-shrink-0" />
                <span>Menoufia - Sirs El-Layyan , Egypt</span>
              </div>
              <a
                href="mailto:mostafazahran724@gmail.com"
                className="flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors w-fit"
              >
                <Mail size={13} className="text-saas-blue flex-shrink-0" />
                <span>mostafazahran724@gmail.com</span>
              </a>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <Terminal size={13} className="text-saas-blue flex-shrink-0" />
                <span>Open to: Full-time &amp; Remote roles</span>
              </div>
            </div>
          </div>

          {/* Nav links */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-5 opacity-50">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/45 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-saas-blue opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="md:col-span-2 md:col-start-11">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-5 opacity-50">
              Socials
            </h4>
            <div className="flex flex-col gap-3">
              {PORTFOLIO_DATA.socials.filter(s => s.name !== "Email").map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-sm text-white/45 hover:text-white transition-colors group"
                >
                  {SOCIAL_ICONS[social.name] && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0"
                    >
                      <path d={SOCIAL_ICONS[social.name]} />
                    </svg>
                  )}
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            BOTTOM BAR
        ══════════════════════════════════════════════════ */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-white/30">
            <span>© {new Date().getFullYear()} Mostafa Zahran</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>Built with a lot of love ❤️ & Coffee ☕</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Available for work dot */}
            <div className="flex items-center gap-1.5 text-xs text-emerald-400/80">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              Available for work
            </div>

            <span className="w-px h-4 bg-white/10" />

            {/* Keyboard shortcut hint */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
              className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors group"
              title="Open Command Palette"
            >
              <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] font-mono group-hover:border-white/20 transition-colors">⌘K</kbd>
              Command Palette
            </button>

            <span className="w-px h-4 bg-white/10" />

            {/* Back to top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white transition-colors group"
            >
              <span>Back to top</span>
              <ArrowUp size={12} className="group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          </div>
        </div>

      </div>
    </footer>
  );
}
