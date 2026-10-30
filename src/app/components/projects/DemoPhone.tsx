import { useReducedMotion } from "motion/react";
import type { Project } from "../../types";

// Ratio of the screen recordings (886×1920 App Store previews).
const SCREEN_ASPECT_RATIO = "886 / 1920";

/**
 * A project's demo video inside an iPhone frame drawn in CSS. Plays muted on a loop,
 * like a GIF; visitors who prefer reduced motion get the poster and play controls instead.
 * Its outer height matches the screenshots it sits next to (288px, 440px on large screens).
 */
export function DemoPhone({ project }: { project: Project }) {
  const prefersReducedMotion = useReducedMotion();

  if (!project.demo) {
    return null;
  }

  return (
    <div className="relative shrink-0 snap-start rounded-[26px] lg:rounded-[36px] bg-[#1C1C1E] p-2 border border-[#3A3A3C] shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
      {/* Side buttons: action and volume on the left, power on the right. */}
      <span className="absolute -left-[3px] top-[18%] w-[3px] h-[5%] rounded-l-sm bg-[#3A3A3C]" />
      <span className="absolute -left-[3px] top-[27%] w-[3px] h-[9%] rounded-l-sm bg-[#3A3A3C]" />
      <span className="absolute -left-[3px] top-[38%] w-[3px] h-[9%] rounded-l-sm bg-[#3A3A3C]" />
      <span className="absolute -right-[3px] top-[30%] w-[3px] h-[13%] rounded-r-sm bg-[#3A3A3C]" />

      <video
        src={project.demo.video}
        poster={project.demo.poster}
        aria-label={`${project.title} — demo`}
        autoPlay={!prefersReducedMotion}
        controls={!!prefersReducedMotion}
        muted
        loop
        playsInline
        preload="metadata"
        className="block h-[272px] lg:h-[424px] w-auto rounded-[18px] lg:rounded-[28px] bg-black"
        style={{ aspectRatio: SCREEN_ASPECT_RATIO }}
      />
    </div>
  );
}
