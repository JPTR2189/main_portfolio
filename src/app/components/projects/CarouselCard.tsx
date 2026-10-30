import { motion, AnimatePresence } from "motion/react";
import type { Project } from "../../types";
import { PREMIUM_EASE } from "../../constants/animation";
import { ProjectTitle, accentGradient, gradientRingStyle } from "./ProjectTitle";

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
  // Two-app projects draw their active border as a gradient overlay instead.
  const activeBorderColor = project.secondary ? "transparent" : project.accentColor;

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
        borderColor: isActive ? activeBorderColor : "#262626",
      }}
      whileHover={{
        scale: transform.visible
          ? transform.scale + (isActive ? 0 : 0.03)
          : transform.scale,
        borderColor: isActive ? activeBorderColor : "#525252",
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
            style={
              project.secondary
                ? { backgroundImage: accentGradient(project, "20") }
                : { backgroundColor: `${project.accentColor}10` }
            }
          />
        )}
      </AnimatePresence>

      {/* Gradient border for two-app projects, masked down to a 2px ring */}
      {project.secondary && (
        <motion.div
          className="absolute -inset-[2px] rounded-2xl p-[2px] pointer-events-none"
          initial={false}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.7, ease: PREMIUM_EASE }}
          style={gradientRingStyle(project)}
        />
      )}

      {/* Card Content */}
      <div className="relative h-full p-8 flex flex-col items-center justify-center gap-6">
        {project.secondary ? (
          <motion.div
            className="relative w-[150px] h-32"
            animate={{
              opacity: isActive ? 1 : 0.7,
              scale: isActive ? 1 : 0.9,
            }}
            transition={{ duration: 0.6, ease: PREMIUM_EASE }}
          >
            <img
              src={project.secondary.icon}
              alt=""
              className="absolute right-0 top-0 w-[104px] h-[104px] rounded-[22%] rotate-[8deg] shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
            />
            <img
              src={project.icon}
              alt={project.title}
              className="absolute left-0 bottom-0 w-[104px] h-[104px] rounded-[22%] -rotate-6 shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
            />
          </motion.div>
        ) : (
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
        )}

        <motion.h3
          className="text-xl text-center tracking-tight"
          style={{ fontWeight: 600 }}
          animate={{
            color: isActive ? project.accentColor : "#F5F5F5",
            opacity: isActive ? 1 : 0.7,
          }}
          transition={{ duration: 0.5, ease: PREMIUM_EASE }}
        >
          <ProjectTitle project={project} highlighted={isActive} />
        </motion.h3>
      </div>
    </motion.button>
  );
}
