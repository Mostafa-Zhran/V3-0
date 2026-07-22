import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Background } from "@/components/ui/Background";
import { ScrollIndicator } from "@/components/layout/ScrollIndicator";
import { ThemeCustomizer } from "@/components/layout/ThemeCustomizer";

import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Timeline } from "@/sections/Timeline";
import { Skills } from "@/sections/Skills";
import { CPStats } from "@/sections/CPStats";
import { Projects } from "@/sections/Projects";
import { Certifications } from "@/sections/Certifications";
import { Contact } from "@/sections/Contact";

import { SplashScreen } from "@/components/ui/SplashScreen";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { OpenToWorkBanner } from "@/components/ui/OpenToWorkBanner";

function App() {
  return (
    <>
      <SplashScreen />
      <CommandPalette />
      <OpenToWorkBanner />
      
      <div className="min-h-screen font-sans selection:bg-saas-blue/30 selection:text-white">
        <ScrollIndicator />
        <ThemeCustomizer />
        <Background />
        <Navbar />

        <main>
          <Hero />
          <About />
          <Timeline />
          <Skills />
          <CPStats />
          <Projects />
          <Certifications />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
