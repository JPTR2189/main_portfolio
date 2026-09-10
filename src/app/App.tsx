import { useState } from "react";
import { AnimatePresence } from "motion/react";
import type { Project } from "./types";
import { LanguageProvider } from "./i18n/LanguageContext";
import { BackgroundGrid } from "./components/layout/BackgroundGrid";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { ProjectModal } from "./components/projects/ProjectModal";
import { HeroSection } from "./sections/HeroSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { AboutSection } from "./sections/AboutSection";
import { SkillsSection } from "./sections/SkillsSection";
import { ContactSection } from "./sections/ContactSection";

function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] transition-colors duration-500 relative scroll-snap-y-mandatory overflow-y-scroll">
      <BackgroundGrid />
      <Header />

      <main>
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <SkillsSection />
        <ContactSection />
      </main>

      <Footer />

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
