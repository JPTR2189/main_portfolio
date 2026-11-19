import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SkipForward } from "lucide-react";
import { PREMIUM_EASE } from "../../constants/animation";
import { useLanguage } from "../../i18n/LanguageContext";
import type { Translation } from "../../i18n/translations";
import { LumiIsland, type BuildState, type IslandPhase, type IslandPlacement } from "./LumiIsland";
import { LooseBug } from "./LooseBug";

const SEEN_KEY = "jp-assistant-seen";

// How long the island takes to travel between the middle and the top, in milliseconds.
const MOVE_TIME = 800;
// When the island first opens, in milliseconds from page load.
const INTRO_AT = 1300;
// After the catch, a beat to see the bug pop before the island comes back.
const CATCH_PAUSE = 400;
// If the visitor doesn't press Run, the build starts on its own after this long.
const AUTO_RUN_AFTER = 10000;
// The pretend build: where it breaks, and how long each stretch of the bar takes.
const FAIL_AT = 87;
const BUILD_TIME = 3200;
const FINISH_BUILD_TIME = 1400;
// How long "Build Failed" and "Build Succeeded" stay before the conversation goes on.
const BUILD_RESULT_TIME = 1600;
// Below this width the header has no room for the island, so after the intro it docks at the bottom.
const DOCK_BELOW_WIDTH = 640;
const isPhone = () => window.innerWidth < DOCK_BELOW_WIDTH;
// How long the island shows a section's name before resting again.
const LIVE_TIME = 2400;

type MessageKey =
  | "greeting"
  | "runCall"
  | "bugCall"
  | "bugHunt"
  | "miss1"
  | "miss2"
  | "miss3"
  | "bugCaught"
  | "outro";
// `intro` talks and builds in the middle of the screen, `game` is the bug hunt with the island
// at the top, `outro` finishes the build in the middle; the page stays hidden until `done`.
type Stage = "intro" | "game" | "outro" | "done";
type BugState = "hidden" | "loose" | "caught" | "gone";

const MISS_MESSAGES: MessageKey[] = ["miss1", "miss2", "miss3"];

/**
 * Short name of a page section for the island: the header's navigation label when it has
 * one (e.g. "Contato"), otherwise its heading (e.g. "Habilidades"). Empty for the hero.
 */
function sectionLabel(section: Element, t: Translation) {
  const navLabels: Record<string, string> = t.nav;
  return navLabels[section.id] ?? section.querySelector("h2")?.textContent?.trim() ?? "";
}

/** How long a message stays, in milliseconds: time to write it out and to read it. */
function readingTime(text: string) {
  return 900 + text.split(" ").length * 230;
}

/**
 * Whether this visit gets the intro: once per browser session, and never for visitors who
 * prefer reduced motion.
 */
export function shouldPlayAssistantIntro(): boolean {
  try {
    if (sessionStorage.getItem(SEEN_KEY) === "1") {
      return false;
    }
  } catch {
    // Storage blocked: play it, which is harmless.
  }
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function markAssistantSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    // Storage blocked: the intro may play again on reload, which is harmless.
  }
}

/**
 * Lumi, the site's guide, which tells the opening as an app build. The page waits behind a
 * dark screen while an island like the iPhone's Dynamic Island slides down to the middle and
 * asks the visitor to press Run. The build stops at 87% when a bug escapes; the island rises
 * to the top and the red bug runs loose for the visitor to catch (it escapes the first three
 * tries). Then the island comes back, the build succeeds, and the dark screen folds into the
 * island, showing the page (`onReveal`). "Skip" or Escape jumps straight to the page at any point.
 */
export function LumiAssistant({ onReveal }: { onReveal: () => void }) {
  const { t } = useLanguage();
  const [stage, setStage] = useState<Stage>("intro");
  const [phase, setPhase] = useState<IslandPhase | "gone">("island");
  const [placement, setPlacement] = useState<IslandPlacement>("center");
  const [messageKey, setMessageKey] = useState<MessageKey>("greeting");
  const [bug, setBug] = useState<BugState>("hidden");
  const [build, setBuild] = useState<BuildState>({ progress: 0, status: "running" });
  // Whether the Run button is waiting for the visitor.
  const [awaitingRun, setAwaitingRun] = useState(false);
  const awaitingRunRef = useRef(awaitingRun);
  awaitingRunRef.current = awaitingRun;
  // Title of the section the visitor scrolled to, shown while the island is `live`.
  const [liveLabel, setLiveLabel] = useState("");
  const timers = useRef<number[]>([]);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  // The section observer is set up once, so it reads the current language through a ref.
  const tRef = useRef(t);
  tRef.current = t;
  const stageRef = useRef(stage);
  stageRef.current = stage;

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const after = (ms: number, action: () => void) => {
    timers.current.push(window.setTimeout(action, ms));
  };

  /** Shows the message, replacing the current one in place. */
  const say = (key: MessageKey, delay = 0) => {
    after(delay, () => {
      setMessageKey(key);
      setPhase("speaking");
    });
  };

  /** Says each message in turn, for its reading time; returns when the last one ends. */
  const sayInOrder = (keys: MessageKey[], delay: number) => {
    let at = delay;
    for (const key of keys) {
      say(key, at);
      at += readingTime(t.assistant[key]);
    }
    return at;
  };

  /** Shrinks to a pill and travels to `target`; the next message should wait `MOVE_TIME`. */
  const moveTo = (target: IslandPlacement, delay = 0) => {
    after(delay, () => {
      setPhase("moving");
      setPlacement(target);
    });
  };

  const rest = () => {
    clearTimers();
    setPhase("resting");
  };

  /** Moves the build bar from `from` to `to` over `duration` ms, easing out, then calls `done`. */
  const runProgress = (from: number, to: number, duration: number, done: () => void) => {
    const start = performance.now();
    const interval = window.setInterval(() => {
      const k = Math.min(1, (performance.now() - start) / duration);
      const progress = Math.round(from + (to - from) * (1 - (1 - k) ** 2));
      setBuild((current) => ({ ...current, progress }));
      if (k >= 1) {
        clearInterval(interval);
        done();
      }
    }, 50);
    // Cleared with the other timers; browsers share one id pool for timeouts and intervals.
    timers.current.push(interval);
  };

  /** Starts the build: it breaks at `FAIL_AT`, then the bug hunt begins. */
  const run = () => {
    if (!awaitingRunRef.current) {
      return;
    }
    clearTimers();
    setAwaitingRun(false);
    setBuild({ progress: 0, status: "running" });
    setPhase("build");
    runProgress(0, FAIL_AT, BUILD_TIME, () => {
      setBuild((current) => ({ ...current, status: "failed" }));
      say("bugCall", BUILD_RESULT_TIME);
      after(BUILD_RESULT_TIME + readingTime(t.assistant.bugCall), startGame);
    });
  };

  const startGame = () => {
    clearTimers();
    setStage("game");
    moveTo("top");
    say("bugHunt", MOVE_TIME);
    after(600, () => setBug("loose"));
  };

  /** Ends the intro: the island rises, the page shows. */
  const finish = () => {
    if (stageRef.current === "done") {
      return;
    }
    setStage("done");
    setAwaitingRun(false);
    onReveal();
    setPlacement(isPhone() ? "bottom" : "top");
    setBug((current) => (current === "caught" ? current : "gone"));
    rest();
  };

  useEffect(() => {
    markAssistantSeen();
    moveTo("center", INTRO_AT);
    const runCallAt = INTRO_AT + MOVE_TIME + readingTime(t.assistant.greeting);
    sayInOrder(["greeting", "runCall"], INTRO_AT + MOVE_TIME);
    after(runCallAt, () => setAwaitingRun(true));
    // `run` checks the ref, which is only set once the timer above has fired.
    after(runCallAt + AUTO_RUN_AFTER, run);

    const skipOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Enter" && awaitingRunRef.current) {
        run();
      }
      if (event.key === "Escape") {
        finish();
      }
    };
    window.addEventListener("keydown", skipOnEscape);

    return () => {
      clearTimers();
      window.removeEventListener("keydown", skipOnEscape);
    };
    // Runs once: the script above drives every later change.
  }, []);

  // The hidden page should not scroll behind the intro.
  const pageHidden = stage !== "done";
  useEffect(() => {
    if (!pageHidden) {
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [pageHidden]);

  // Once the page shows, the resting island briefly announces each section scrolled into view.
  useEffect(() => {
    if (stage !== "done") {
      return;
    }
    let lastLabel = "";
    let liveTimer = 0;
    let observer: IntersectionObserver | undefined;

    // Waits a frame for the page, which remounts when it is revealed.
    const frameId = requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) {
              continue;
            }
            const label = sectionLabel(entry.target, tRef.current);
            if (label === lastLabel) {
              continue;
            }
            lastLabel = label;
            const current = phaseRef.current;
            if (!label || (current !== "resting" && current !== "live")) {
              continue;
            }
            setLiveLabel(label);
            setPhase("live");
            clearTimeout(liveTimer);
            // Only settles back if nothing else (like a click reopening the chat) took over.
            liveTimer = window.setTimeout(() => {
              if (phaseRef.current === "live") {
                setPhase("resting");
              }
            }, LIVE_TIME);
          }
        },
        // A thin band across the middle of the screen: the section crossing it is the current one.
        { rootMargin: "-45% 0px -50% 0px" },
      );
      document.querySelectorAll("main > section").forEach((section) => observer?.observe(section));
    });

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(liveTimer);
      observer?.disconnect();
    };
  }, [stage]);

  // Every tap on the bug counts, so it is caught by the fourth at most. A miss line stays up for
  // its reading time: a quicker miss waits its turn, and the catch line waits for the last miss.
  // When the last queued miss will have been read, and when the one on screen will have been.
  const missQueueEnd = useRef(0);
  const missReadAt = useRef(0);

  const handleEscape = (escapes: number) => {
    const key = MISS_MESSAGES[escapes - 1];
    const now = Date.now();
    const start = Math.max(now, missQueueEnd.current);
    const read = readingTime(t.assistant[key]);
    missQueueEnd.current = start + read;
    after(start - now, () => {
      setMessageKey(key);
      missReadAt.current = Date.now() + read;
    });
  };

  const handleCatch = () => {
    // Drops a miss still waiting its turn; the one on screen gets read before the island moves on.
    clearTimers();
    const hold = Math.max(0, missReadAt.current - Date.now() - CATCH_PAUSE - MOVE_TIME);
    setStage("outro");
    setBug("caught");
    setTimeout(() => setBug("gone"), 900);
    moveTo("center", CATCH_PAUSE + hold);
    say("bugCaught", CATCH_PAUSE + MOVE_TIME + hold);
    // Then the build picks up where it broke and succeeds.
    after(CATCH_PAUSE + MOVE_TIME + hold + readingTime(t.assistant.bugCaught), () => {
      setBuild({ progress: FAIL_AT, status: "running" });
      setPhase("build");
      runProgress(FAIL_AT, 100, FINISH_BUILD_TIME, () => {
        setBuild((current) => ({ ...current, status: "succeeded" }));
        after(sayInOrder(["outro"], BUILD_RESULT_TIME), finish);
      });
    });
  };

  const handleIslandClick = () => {
    if (stage !== "done") {
      return;
    }
    // On phones the docked island is a shortcut back to the top.
    if (isPhone()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (phase === "resting" || phase === "live") {
      say("greeting");
      after(6000, rest);
    } else {
      rest();
    }
  };

  return (
    <>
      <AnimatePresence>{pageHidden && <IntroBackdrop key="backdrop" />}</AnimatePresence>

      <AnimatePresence>
        {phase !== "gone" && (
          <LumiIsland
            // Docking at the bottom is a new island: the one up top leaves and this one rises from below.
            key={placement === "bottom" ? "dock" : "island"}
            phase={phase}
            placement={placement}
            message={phase === "live" ? liveLabel : t.assistant[messageKey]}
            build={build}
            action={
              awaitingRun && messageKey === "runCall"
                ? { label: t.assistant.run, hint: t.assistant.runHint, onClick: run }
                : undefined
            }
            onClick={handleIslandClick}
          />
        )}
      </AnimatePresence>

      {(bug === "loose" || bug === "caught") && (
        <LooseBug
          onEscape={handleEscape}
          onCatch={handleCatch}
        />
      )}

      <AnimatePresence>
        {stage !== "done" && (
          <motion.button
            key="skip"
            type="button"
            onClick={finish}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.5, ease: PREMIUM_EASE } }}
            exit={{ opacity: 0, y: 12, transition: { duration: 0.25 } }}
            className="fixed bottom-6 left-1/2 -ml-[52px] z-[61] w-[104px] flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#171717]/80 backdrop-blur-md border border-[#262626] text-sm text-[#A3A3A3] hover:text-[#F5F5F5] hover:border-[#404040] transition-colors"
          >
            {t.assistant.skip}
            <SkipForward size={14} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

/** The dark screen that hides the page during the intro. It leaves by folding into the island. */
function IntroBackdrop() {
  // Folds toward where the island will rest: the top, or the bottom on phones.
  const origin = isPhone() ? "50% 100%" : "50% 0%";
  return (
    <motion.div
      aria-hidden="true"
      initial={{ clipPath: `circle(150% at ${origin})` }}
      exit={{ clipPath: `circle(0% at ${origin})`, transition: { duration: 1, ease: PREMIUM_EASE } }}
      className="fixed inset-0 z-[55] bg-[#0A0A0A]"
    />
  );
}
