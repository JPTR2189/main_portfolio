import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bug, Play } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { SiriWave } from "./SiriWave";

/**
 * - `island`: the iPhone's Dynamic Island, sliding down from the top edge.
 * - `moving`: a black pill with a Siri wave, while it travels between the middle and the top.
 * - `speaking`: a card that reveals `message` word by word over a voice wave.
 * - `build`: the same card as an Xcode-like build panel, showing `build`.
 * - `resting`: a small island that stays at the top and reopens on click.
 * - `live`: the resting island widened for a moment, like a Live Activity, to show `message`
 *   (the section the visitor just scrolled to).
 */
export type IslandPhase = "island" | "moving" | "speaking" | "build" | "resting" | "live";

/** Progress of the portfolio's pretend build, from 0 to 100. */
export type BuildState = { progress: number; status: "running" | "failed" | "succeeded" };

/** A button shown under a message, like "Run". */
export type IslandAction = { label: string; hint: string; onClick: () => void };

/** `center` while the intro covers the page; `top` once the page shows, or `bottom` on phones. */
export type IslandPlacement = "center" | "top" | "bottom";

// One gentle spring, like Apple's, for every move and resize so they stay in step.
const FLUID = { type: "spring", visualDuration: 0.7, bounce: 0.15 } as const;

/** Apple Intelligence-like colors, for the glow around the island. */
const IRIDESCENT = "conic-gradient(from 210deg, #60A5FA, #A855F7, #F472B6, #FB923C, #FACC15, #60A5FA)";

function cardWidth(placement: IslandPlacement) {
  return placement === "center" ? Math.min(620, window.innerWidth - 32) : Math.min(560, window.innerWidth - 24);
}

// Seconds before the first word shows, and between words.
const WORD_DELAY = 0.2;
const WORD_STAGGER = 0.06;

/** Seconds until the last word of `message` has faded in: how long the voice wave talks. */
function speechDuration(message: string) {
  return WORD_DELAY + message.split(" ").length * WORD_STAGGER + 0.5;
}

/**
 * The pill's size: large in the middle of the screen, about 30% of its width with the
 * Dynamic Island's proportions; small at the top, out of the way of the bug hunt.
 */
function pillSize(placement: IslandPlacement) {
  if (placement !== "center") {
    return { width: 200, height: 38 };
  }
  const width = Math.round(Math.min(340, Math.max(220, window.innerWidth * 0.3)));
  const height = Math.round(width / 3.4);
  return { width, height, borderRadius: height / 2 };
}

/**
 * Distance from the top of the screen to the island's top edge while it is in the middle:
 * places a typical card around the center, and stays fixed while the island resizes.
 */
function centerTop() {
  return Math.max(72, window.innerHeight / 2 - 110);
}

/**
 * When a glyph of the live label comes and goes: it comes in left to
 * right once the island has started widening, and leaves from the edges inward, in step with
 * the island closing around it.
 */
function liveGlyphTiming(index: number, count: number) {
  const fromEdge = Math.min(index, count - 1 - index);
  return { enter: 0.22 + index * 0.03, exit: fromEdge * 0.05 };
}

const liveGlyph = {
  hidden: { opacity: 0, filter: "blur(4px)", y: 2 },
  visible: ({ enter }: { enter: number }) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { delay: enter, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: ({ exit }: { exit: number }) => ({
    opacity: 0,
    filter: "blur(4px)",
    transition: { delay: exit, duration: 0.35, ease: "easeIn" },
  }),
} as const;

// The wave rises with the island and is the last thing to fade as it closes.
const liveWave = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.15, duration: 0.5 } },
  exit: { opacity: 0, transition: { delay: 0.2, duration: 0.45 } },
} as const;

let measureContext: CanvasRenderingContext2D | null = null;

/** Rendered width of a label in the live font, measured rather than guessed from its length. */
function labelWidth(label: string) {
  measureContext ??= document.createElement("canvas").getContext("2d");
  if (!measureContext) {
    return label.length * 7.5;
  }
  measureContext.font = `500 14px ${getComputedStyle(document.body).fontFamily}`;
  return measureContext.measureText(label).width;
}

/**
 * Width of the Live Activity: the label with even padding on both sides; short labels share one width.
 */
function liveWidth(label: string) {
  return Math.min(300, Math.max(176, Math.ceil(labelWidth(label)) + 64));
}

/** `contentHeight` is the measured card content, so the card resizes smoothly between messages. */
function shapeOf(phase: IslandPhase, placement: IslandPlacement, contentHeight: number, message: string) {
  switch (phase) {
    case "island":
    case "moving":
      return { borderRadius: 19, ...pillSize(placement) };
    case "speaking":
    case "build":
      return {
        width: cardWidth(placement),
        height: contentHeight || "auto",
        borderRadius: placement === "center" ? 32 : 26,
      };
    case "resting":
      return { width: placement === "bottom" ? 110 : 126, height: 36, borderRadius: 18 };
    case "live":
      return { width: liveWidth(message), height: 56, borderRadius: 26 };
  }
}

export function LumiIsland({
  phase,
  placement,
  message,
  build,
  action,
  onClick,
}: {
  phase: IslandPhase;
  placement: IslandPlacement;
  message: string;
  build: BuildState;
  action?: IslandAction;
  onClick?: () => void;
}) {
  const isCenter = placement === "center";
  const isBottom = placement === "bottom";
  const active = isCenter ? 0.6 : 0.35;
  // Strongest while it talks in the middle of the screen; faint while it rests at the top.
  const glowOpacity = { island: 0, resting: 0.15, live: 0.35, moving: active, speaking: active, build: active }[phase];
  const isSpeaking = phase === "speaking";
  // Speaking and building share one card, which resizes between them.
  const isCard = isSpeaking || phase === "build";

  // The wave talks while the words appear, then calms down.
  const [talking, setTalking] = useState(false);
  useEffect(() => {
    if (!isSpeaking) {
      setTalking(false);
      return;
    }
    setTalking(true);
    const timer = setTimeout(() => setTalking(false), speechDuration(message) * 1000);
    return () => clearTimeout(timer);
  }, [isSpeaking, message]);

  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  useEffect(() => {
    const content = contentRef.current;
    if (!isCard || !content) {
      setContentHeight(0);
      return;
    }
    const observer = new ResizeObserver(() => setContentHeight(content.offsetHeight));
    observer.observe(content);
    return () => observer.disconnect();
  }, [isCard]);

  return (
    // Positions the island: slides down from above the top edge to the middle of the screen,
    // later rises to the top. Its top edge is what moves, so resizing never shifts it. Docked at
    // the bottom it rises from below instead and grows upward, clear of the browser bar.
    <motion.div
      initial={{ y: isBottom ? 140 : -140 }}
      animate={{ y: isCenter ? centerTop() : 0 }}
      exit={{ y: isBottom ? 140 : -140, opacity: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
      transition={FLUID}
      className={`fixed inset-x-0 z-[60] flex justify-center pointer-events-none ${isBottom ? "bottom-0" : "top-0 pt-3"}`}
      style={isBottom ? { paddingBottom: "calc(12px + env(safe-area-inset-bottom))" } : undefined}
    >
      <div className="relative">
        {/* Siri-like halo whose colors drift slowly. */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: glowOpacity, filter: ["blur(22px) hue-rotate(0deg)", "blur(22px) hue-rotate(360deg)"] }}
          transition={{ opacity: { duration: 0.6 }, filter: { duration: 8, repeat: Infinity, ease: "linear" } }}
          className="absolute -inset-2 rounded-[40px]"
          style={{ background: IRIDESCENT }}
        />
        <motion.div
          role="status"
          aria-live="polite"
          onClick={onClick}
          initial={shapeOf("island", placement, 0, message)}
          animate={shapeOf(phase, placement, contentHeight, message)}
          transition={FLUID}
          className={`relative overflow-hidden ${onClick ? "cursor-pointer" : ""} ${onClick || action ? "pointer-events-auto" : ""} shadow-[0_14px_40px_rgba(0,0,0,0.55)]`}
        >
          {/* Black layer: the island itself. Fades toward the bottom when it is a card. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 ring-1 ring-inset ring-white/10"
            style={{
              borderRadius: "inherit",
              background:
                isCard ? "linear-gradient(to bottom, #000 45%, rgba(0,0,0,0.82))" : "#000",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
          />

          {phase === "moving" && (
            <SiriWave speaking className="absolute left-3 bottom-0 w-[calc(100%-24px)] h-[70%] opacity-80" />
          )}

          {/* The resting sparkle comes back once the live label has finished leaving. */}
          <AnimatePresence>
            {phase === "resting" && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.35 } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="absolute left-4 top-1/2 -mt-[7px] flex"
              >
                <AiSparkle />
              </motion.span>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {phase === "live" && (
              <motion.div
                key={message}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute inset-0 flex flex-col"
              >
                <div className="flex justify-center pt-3">
                  <span className="text-[14px] leading-none font-medium text-[#F5F5F5] whitespace-nowrap">
                    {[...message].map((char, index) => (
                      <motion.span
                        key={index}
                        variants={liveGlyph}
                        custom={liveGlyphTiming(index, message.length)}
                        className="inline-block"
                      >
                        {char === " " ? " " : char}
                      </motion.span>
                    ))}
                  </span>
                </div>
                <motion.div variants={liveWave} className="mt-auto">
                  <SiriWave speaking className="block w-full h-6" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* The card's content fades in as it opens and out as it shrinks back to a pill. */}
          <AnimatePresence>
            {isCard && (
              <motion.div
                ref={contentRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1, duration: 0.3 } }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="relative"
                style={{ width: cardWidth(placement) }}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  {phase === "build" ? (
                    <motion.div
                      key="build"
                      initial={{ opacity: 0, filter: "blur(6px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)", transition: { duration: 0.3 } }}
                      exit={{ opacity: 0, filter: "blur(6px)", transition: { duration: 0.2 } }}
                    >
                      <BuildPanel build={build} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="talk"
                      initial={{ opacity: 0, filter: "blur(6px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)", transition: { duration: 0.3 } }}
                      exit={{ opacity: 0, filter: "blur(6px)", transition: { duration: 0.2 } }}
                    >
                      {/* Each message replaces the last in place; the wave below stays and keeps talking. */}
                      <AnimatePresence mode="popLayout">
                        <motion.p
                          key={message}
                          exit={{ opacity: 0, filter: "blur(6px)", transition: { duration: 0.2 } }}
                          className={
                            isCenter
                              ? "px-7 pt-6 text-xl sm:text-2xl leading-snug text-[#F5F5F5] font-medium"
                              : "px-6 pt-4 text-[15px] sm:text-base leading-snug text-[#F5F5F5] font-medium"
                          }
                        >
                          {message.split(" ").map((word, index) => (
                            <motion.span
                              key={index}
                              className="inline-block mr-[0.28em]"
                              initial={{ opacity: 0, y: 4, filter: "blur(8px)" }}
                              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                              transition={{ delay: WORD_DELAY + index * WORD_STAGGER, duration: 0.4 }}
                            >
                              {word}
                            </motion.span>
                          ))}
                        </motion.p>
                      </AnimatePresence>
                      <AnimatePresence>
                        {action && (
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: speechDuration(message), duration: 0.4 } }}
                            exit={{ opacity: 0, transition: { duration: 0.15 } }}
                            className="flex flex-col items-center gap-2 px-7 pt-5"
                          >
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                action.onClick();
                              }}
                              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#F5F5F5] text-[#0A0A0A] text-base font-semibold hover:bg-white active:scale-[0.98] transition"
                            >
                              <Play size={16} fill="currentColor" />
                              {action.label}
                            </button>
                            {/* Keyboard hint, only where there is likely a keyboard. */}
                            <span className="hidden [@media(hover:hover)]:inline text-xs text-[#8C8C8C]">
                              {action.hint}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <SiriWave
                        speaking={talking}
                        className={isCenter ? "block w-full h-24 mt-1" : "block w-full h-14"}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

/**
 * Lumi's mark: a four-point sparkle, the common sign for AI, in the site's yellow.
 * It breathes slowly with a soft glow.
 */
function AiSparkle({ className = "relative shrink-0" }: { className?: string }) {
  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: [0.75, 1, 0.75], scale: [0.92, 1.06, 0.92] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className={`${className} block w-3.5 h-3.5 drop-shadow-[0_0_6px_rgba(250,204,21,0.55)]`}
    >
      <path
        d="M12 1.5c.5 5.6 4.9 10 10.5 10.5-5.6.5-10 4.9-10.5 10.5-.5-5.6-4.9-10-10.5-10.5C7.1 11.5 11.5 7.1 12 1.5Z"
        fill="#FACC15"
      />
    </motion.svg>
  );
}

// Files the pretend build walks through, by the progress at which each one starts.
const BUILD_LOG: [number, string][] = [
  [0, "Compiling HeroSection.swift"],
  [18, "Compiling ProjectCarousel.swift"],
  [40, "Compiling Lumi.swift"],
  [62, "Compiling ContactSection.swift"],
  [80, "Linking Portfolio"],
  [92, "Signing Portfolio.app"],
];

const BUILD_COLORS = { running: "#3B82F6", failed: "#EF4444", succeeded: "#22C55E" };

/** The card as an Xcode-like build panel: status, progress bar and the current log line. */
function BuildPanel({ build }: { build: BuildState }) {
  const { t } = useLanguage();
  const labels = t.assistant.build;
  const color = BUILD_COLORS[build.status];
  const title = { running: labels.running, failed: "Build Failed", succeeded: "Build Succeeded" }[build.status];
  const logLine = [...BUILD_LOG].reverse().find(([from]) => build.progress >= from)?.[1] ?? "";

  return (
    <div className="px-7 pt-6 pb-7">
      <div className="flex items-baseline justify-between gap-4">
        <motion.span
          key={build.status}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl sm:text-2xl font-medium"
          style={{ color: build.status === "running" ? "#F5F5F5" : color }}
        >
          {title}
        </motion.span>
        <span className="text-sm tabular-nums text-[#A3A3A3]">{build.progress}%</span>
      </div>

      <div className="mt-4 h-1.5 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          animate={{ width: `${build.progress}%`, backgroundColor: color }}
          transition={{ width: { duration: 0.1, ease: "linear" }, backgroundColor: { duration: 0.3 } }}
          style={{ boxShadow: `0 0 12px ${color}` }}
        />
      </div>

      <p className="mt-3 flex items-center gap-2 font-mono text-xs truncate">
        {build.status === "failed" ? (
          <>
            <Bug size={14} className="shrink-0 text-[#EF4444]" />
            <span className="text-[#EF4444]">{labels.issue}</span>
          </>
        ) : (
          <span className="text-[#8C8C8C]">{build.status === "succeeded" ? labels.launching : logLine}</span>
        )}
      </p>
    </div>
  );
}
