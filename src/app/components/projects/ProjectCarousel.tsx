import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Project } from "../../types";
import { PREMIUM_EASE } from "../../constants/animation";
import { useLanguage } from "../../i18n/LanguageContext";
import { CarouselCard } from "./CarouselCard";
import { ProjectDetailPanel } from "./ProjectDetailPanel";

/**
 * Returns the shortest signed distance between a card and the active card,
 * wrapping around the ends so the carousel behaves as an infinite loop.
 */
function getWrappedOffset(index: number, activeIndex: number, total: number): number {
  let offset = index - activeIndex;
  if (offset > total / 2) {
    offset -= total;
  } else if (offset < -total / 2) {
    offset += total;
  }
  return offset;
}

export function ProjectCarousel({ projects }: { projects: Project[] }) {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];

  const goToProject = (index: number) => {
    const wrappedIndex =
      ((index % projects.length) + projects.length) % projects.length;
    setActiveIndex(wrappedIndex);
  };

  const goToNext = () => {
    setActiveIndex((previous) => (previous + 1) % projects.length);
  };

  const goToPrevious = () => {
    setActiveIndex(
      (previous) => (previous - 1 + projects.length) % projects.length,
    );
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPrevious();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [projects.length]);

  return (
    <div className="space-y-12">
      <div className="relative">
        {/* Carousel Track */}
        <div
          className="relative mx-auto h-[350px] flex items-center justify-center"
          style={{ perspective: "2000px" }}
        >
          {projects.map((project, index) => {
            const offset = getWrappedOffset(index, activeIndex, projects.length);
            const handleClick =
              offset === -1 ? goToPrevious : offset === 1 ? goToNext : undefined;

            return (
              <CarouselCard
                key={project.id}
                project={project}
                offset={offset}
                onClick={handleClick}
              />
            );
          })}
        </div>

        {/* Carousel Indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {projects.map((project, index) => (
            <motion.button
              key={project.id}
              onClick={() => goToProject(index)}
              className="rounded-full"
              animate={{
                width: index === activeIndex ? 32 : 8,
                height: 8,
                backgroundColor:
                  index === activeIndex ? project.accentColor : "#262626",
              }}
              whileHover={{
                backgroundColor:
                  index === activeIndex ? project.accentColor : "#525252",
                scale: 1.1,
              }}
              transition={{ duration: 0.3, ease: PREMIUM_EASE }}
              aria-label={`${t.a11y.goToProject} ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Active Project Details */}
      <AnimatePresence mode="wait">
        <ProjectDetailPanel key={activeProject.id} project={activeProject} />
      </AnimatePresence>
    </div>
  );
}
