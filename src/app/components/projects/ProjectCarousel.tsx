import { useEffect, useRef, useState, type TouchEvent } from "react";
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

/** Neighbor distance on wide screens, where both side cards show in full. */
const DESKTOP_SPREAD = 340;
/**
 * On narrow screens the neighbors move in until this many pixels of them peek past
 * the active card: half the viewport, plus half a neighbor (288px card at 0.85 scale),
 * minus the visible strip.
 */
const NEIGHBOR_HALF_WIDTH = 122;
const NEIGHBOR_PEEK = 40;
/** Horizontal finger travel, in pixels, that counts as a swipe. */
const SWIPE_THRESHOLD = 40;

function getSpread(viewportWidth: number): number {
  return Math.min(
    DESKTOP_SPREAD,
    Math.round(viewportWidth / 2 + NEIGHBOR_HALF_WIDTH - NEIGHBOR_PEEK),
  );
}

export function ProjectCarousel({ projects }: { projects: Project[] }) {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];
  const [spread, setSpread] = useState(() => getSpread(window.innerWidth));
  const touchStartX = useRef<number | null>(null);

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

  useEffect(() => {
    const handleResize = () => setSpread(getSpread(window.innerWidth));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Swipe navigation on touch screens
  const handleTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: TouchEvent) => {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (distance <= -SWIPE_THRESHOLD) {
      goToNext();
    } else if (distance >= SWIPE_THRESHOLD) {
      goToPrevious();
    }
  };

  return (
    <div className="space-y-12">
      <div className="relative">
        {/* Carousel Track */}
        <div
          className="relative mx-auto h-[350px] flex items-center justify-center"
          style={{ perspective: "2000px" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
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
                spread={spread}
                onClick={handleClick}
              />
            );
          })}
        </div>

        {/* Carousel Indicators. Each button pads its dot into a 44px-tall touch area;
            the padding replaces the 8px gap and 32px top margin the dots had. */}
        <div className="flex items-center justify-center mt-[14px] -mb-[18px]">
          {projects.map((project, index) => (
            <motion.button
              key={project.id}
              onClick={() => goToProject(index)}
              className="px-1 py-[18px]"
              initial={false}
              whileHover="hover"
              aria-label={`${t.a11y.goToProject} ${index + 1}`}
            >
              <motion.span
                className="block rounded-full"
                initial={false}
                animate={{
                  width: index === activeIndex ? 32 : 8,
                  height: 8,
                  backgroundColor:
                    index === activeIndex ? project.accentColor : "#262626",
                }}
                variants={{
                  hover: {
                    backgroundColor:
                      index === activeIndex ? project.accentColor : "#525252",
                    scale: 1.1,
                  },
                }}
                transition={{ duration: 0.3, ease: PREMIUM_EASE }}
              />
            </motion.button>
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
