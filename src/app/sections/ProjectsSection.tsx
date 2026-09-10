import { motion } from "motion/react";
import { PREMIUM_EASE } from "../constants/animation";
import { projectsByLanguage } from "../data/projects";
import { useLanguage } from "../i18n/LanguageContext";
import { ProjectCarousel } from "../components/projects/ProjectCarousel";

export function ProjectsSection() {
  const { language, t } = useLanguage();
  const projects = projectsByLanguage[language];

  return (
    <section id="projects" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: PREMIUM_EASE }}
      >
        <h2
          className="text-5xl lg:text-6xl tracking-tight text-[#F5F5F5] mb-20"
          style={{ fontWeight: 600 }}
        >
          {t.projects.title}
        </h2>
        <ProjectCarousel projects={projects} />
      </motion.div>
    </section>
  );
}
