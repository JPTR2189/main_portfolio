import { Fragment, useState } from "react";
import { AnimatePresence } from "motion/react";
import type { Project } from "./types";
import { LanguageProvider } from "./i18n/LanguageContext";
import { BackgroundGrid } from "./components/layout/BackgroundGrid";
import { Header } from "./components/layout/Header";
import { LumiAssistant, shouldPlayAssistantIntro } from "./components/assistant/LumiAssistant";
import { Footer } from "./components/layout/Footer";
import { ProjectModal } from "./components/projects/ProjectModal";
import { HeroSection } from "./sections/HeroSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { AboutSection } from "./sections/AboutSection";
import { SkillsSection } from "./sections/SkillsSection";
import { RecommendationsSection } from "./sections/RecommendationsSection";
import { ContactSection } from "./sections/ContactSection";

function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [playIntro] = useState(shouldPlayAssistantIntro);
  // Visitors who prefer reduced motion get the page without the island.
  const [showIsland] = useState(() => !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [revealed, setRevealed] = useState(!playIntro);

  return (
    <div className="min-h-screen bg-[#0A0A0A] transition-colors duration-500 relative scroll-snap-y-mandatory overflow-y-scroll overflow-x-hidden">
      <BackgroundGrid />
      {showIsland && <LumiAssistant playIntro={playIntro} onReveal={() => setRevealed(true)} />}

      {/* The page loads behind the intro, then remounts on reveal so its entrance animations play in view. */}
      <Fragment key={revealed ? "revealed" : "behind-intro"}>
        <Header />

        <main>
          <HeroSection />
          <ProjectsSection />
          <AboutSection />
          <SkillsSection />
          <RecommendationsSection />
          <ContactSection />
        </main>

        <Footer />

        {/* On narrow screens the island docks at the bottom; this room lets the footer clear it. */}
        {showIsland && (
          <div aria-hidden="true" className="lg:hidden" style={{ height: "calc(84px + env(safe-area-inset-bottom))" }} />
        )}
      </Fragment>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <PortfolioPage />
    </LanguageProvider>
  );
}
