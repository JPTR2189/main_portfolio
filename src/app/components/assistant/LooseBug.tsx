import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Bug } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

const BUG_COLOR = "#EF4444";
// Pixels per second while wandering; it dashes faster when escaping.
const WALK_SPEED = 140;
const ESCAPE_SPEED = 680;
// Attempts it dodges before letting itself be caught.
export const MAX_ESCAPES = 3;
// Keeps it clear of the island at the top.
const TOP_MARGIN = 110;
const SIDE_MARGIN = 40;

function randomPoint() {
  return {
    x: SIDE_MARGIN + Math.random() * (window.innerWidth - SIDE_MARGIN * 2 - 64),
    y: TOP_MARGIN + Math.random() * (window.innerHeight - TOP_MARGIN - 96),
  };
}

/** A point on the far side of the screen from (x, y), to run away to. */
function escapePoint(x: number, y: number) {
  const target = randomPoint();
  return {
    x: x < window.innerWidth / 2 ? Math.max(target.x, window.innerWidth * 0.6) : Math.min(target.x, window.innerWidth * 0.3),
    y: target.y,
  };
}

/**
 * A red bug that crawls around the viewport. The first `MAX_ESCAPES` clicks or taps on it
 * make it dash away (reported through `onEscape`); the next one catches it. While `canProgress`
 * says no (the last miss is still being read), a tap only makes it dodge, without counting.
 */
export function LooseBug({
  onEscape,
  onCatch,
  canProgress,
}: {
  onEscape: (escapes: number) => void;
  onCatch: () => void;
  canProgress: () => boolean;
}) {
  const { t } = useLanguage();
  const bodyRef = useRef<HTMLButtonElement>(null);
  const state = useRef({
    x: -60,
    y: window.innerHeight * 0.6,
    angle: 0,
    target: randomPoint(),
    speed: WALK_SPEED,
    pause: 0,
    escapes: 0,
    stopped: false,
  });
  const [caughtAt, setCaughtAt] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    let frameId = 0;
    let last = performance.now();

    const frame = (now: number) => {
      const bug = state.current;
      if (bug.stopped) {
        return;
      }
      const dt = Math.min(now - last, 50) / 1000;
      last = now;

      if (bug.pause > 0) {
        bug.pause -= dt;
      } else {
        const dx = bug.target.x - bug.x;
        const dy = bug.target.y - bug.y;
        const distance = Math.hypot(dx, dy);

        if (distance < 4) {
          bug.target = randomPoint();
          bug.speed = WALK_SPEED;
          bug.pause = 0.2 + Math.random() * 0.8;
        } else {
          const step = Math.min(distance, bug.speed * dt);
          bug.x += (dx / distance) * step;
          bug.y += (dy / distance) * step;
          // Turn toward the heading smoothly instead of snapping.
          const heading = Math.atan2(dy, dx);
          const turn = Math.atan2(Math.sin(heading - bug.angle), Math.cos(heading - bug.angle));
          bug.angle += turn * Math.min(1, dt * 12);
        }
      }

      const walking = bug.pause <= 0;
      const wiggle = walking ? Math.sin(now / 45) * 7 : 0;
      // The icon faces up, so add 90° to point it along the heading.
      const degrees = (bug.angle * 180) / Math.PI + 90 + wiggle;
      if (bodyRef.current) {
        bodyRef.current.style.transform = `translate(${bug.x}px, ${bug.y}px) rotate(${degrees}deg)`;
      }
      frameId = requestAnimationFrame(frame);
    };

    frameId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const handleAttempt = () => {
    const bug = state.current;
    if (bug.stopped) {
      return;
    }
    if (!canProgress()) {
      bug.target = escapePoint(bug.x, bug.y);
      bug.speed = ESCAPE_SPEED;
      bug.pause = 0;
      return;
    }
    if (bug.escapes < MAX_ESCAPES) {
      bug.escapes += 1;
      bug.target = escapePoint(bug.x, bug.y);
      bug.speed = ESCAPE_SPEED;
      bug.pause = 0;
      onEscape(bug.escapes);
      return;
    }
    bug.stopped = true;
    setCaughtAt({ x: bug.x, y: bug.y });
    onCatch();
  };

  if (caughtAt) {
    return <CatchBurst x={caughtAt.x} y={caughtAt.y} />;
  }

  return (
    <button
      ref={bodyRef}
      type="button"
      aria-label={t.a11y.catchBug}
      onPointerDown={handleAttempt}
      className="fixed left-0 top-0 z-[57] w-16 h-16 flex items-center justify-center cursor-crosshair touch-none"
      style={{ transform: "translate(-60px, -60px)" }}
    >
      <Bug size={34} strokeWidth={2.2} style={{ color: BUG_COLOR }} className="drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
    </button>
  );
}

/** The bug pops and a ring of sparks flies out where it was caught. */
function CatchBurst({ x, y }: { x: number; y: number }) {
  const sparks = Array.from({ length: 10 });

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[57] w-16 h-16 pointer-events-none"
      style={{ transform: `translate(${x}px, ${y}px)` }}
    >
      <motion.div
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: [1, 1.5, 0], opacity: [1, 1, 0] }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Bug size={34} strokeWidth={2.2} style={{ color: BUG_COLOR }} />
      </motion.div>
      {sparks.map((_, index) => {
        const angle = (index / sparks.length) * Math.PI * 2;
        return (
          <motion.span
            key={index}
            className="absolute left-1/2 top-1/2 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full"
            style={{ background: BUG_COLOR }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{ x: Math.cos(angle) * 46, y: Math.sin(angle) * 46, opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        );
      })}
    </div>
  );
}
