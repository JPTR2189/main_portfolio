import { motion, AnimatePresence } from "motion/react";
import type { Project } from "../../types";
import { PREMIUM_EASE } from "../../constants/animation";

interface CardTransform {
  x: number;
  scale: number;
  opacity: number;
  rotateY: number;
  zIndex: number;
  visible: boolean;
}

/**
 * Computes position and styling for a card given its offset relative to the
 * active card. Only the active card and its immediate neighbors are visible.
 */
function getCardTransform(offset: number): CardTransform {
  if (Math.abs(offset) > 1) {
    return {
      x: offset < 0 ? -800 : 800,
      scale: 0.7,
      opacity: 0,
      rotateY: 0,
      zIndex: 0,
      visible: false,
    };
  }

  if (offset === 0) {
    return { x: 0, scale: 1.1, opacity: 1, rotateY: 0, zIndex: 20, visible: true };
  }

  if (offset === -1) {
    return { x: -340, scale: 0.85, opacity: 0.45, rotateY: 12, zIndex: 10, visible: true };
  }

  return { x: 340, scale: 0.85, opacity: 0.45, rotateY: -12, zIndex: 10, visible: true };
}

interface CarouselCardProps {
  project: Project;
  /** Signed distance from the active card (-1 = left neighbor, 0 = active, 1 = right neighbor). */
  offset: number;
  onClick?: () => void;
}

export function CarouselCard({ project, offset, onClick }: CarouselCardProps) {
  const transform = getCardTransform(offset);
  const isActive = offset === 0;

  return (
    <motion.button
      onClick={onClick}
      className="absolute w-72 h-80 rounded-2xl border-2"
      animate={{
        x: transform.x,
        scale: transform.scale,
        opacity: transform.opacity,
        rotateY: transform.rotateY,
        zIndex: transform.zIndex,
        borderColor: isActive ? project.accentColor : "#262626",
      }}
      whileHover={{
        scale: transform.visible
          ? transform.scale + (isActive ? 0 : 0.03)
          : transform.scale,
        borderColor: isActive ? project.accentColor : "#525252",
      }}
      transition={{ duration: 0.7, ease: PREMIUM_EASE }}
      style={{
        transformStyle: "preserve-3d",
        pointerEvents: transform.visible ? "auto" : "none",
      }}
    >
      {/* Card Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#171717] via-[#111111] to-[#0A0A0A] rounded-2xl" />

      {/* Subtle glow for the active card */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute -inset-[3px] rounded-2xl -z-10 blur-xl"
            style={{ backgroundColor: `${project.accentColor}10` }}
          />
        )}
      </AnimatePresence>

      {/* Card Content */}
      <div className="relative h-full p-8 flex flex-col items-center justify-center gap-6">
        <motion.div
          className="relative w-32 h-32 rounded-2xl overflow-hidden"
          animate={{
            opacity: isActive ? 1 : 0.7,
            scale: isActive ? 1 : 0.9,
          }}
          transition={{ duration: 0.6, ease: PREMIUM_EASE }}
        >
          <img
            src={project.icon}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.h3
          className="text-xl text-center tracking-tight"
          style={{ fontWeight: 600 }}
          animate={{
            color: isActive ? project.accentColor : "#F5F5F5",
            opacity: isActive ? 1 : 0.7,
          }}
          transition={{ duration: 0.5, ease: PREMIUM_EASE }}
        >
          {project.title}
        </motion.h3>
      </div>
    </motion.button>
  );
}
