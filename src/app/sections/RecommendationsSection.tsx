import { useEffect, useRef, useState, type TouchEvent } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Linkedin, Pause, Play } from "lucide-react";
import { PREMIUM_EASE } from "../constants/animation";
import { useLanguage } from "../i18n/LanguageContext";
import type { Translation } from "../i18n/translations/pt-BR";
import igorPhoto from "@/assets/recommendation-igor.webp";
import diegoPhoto from "@/assets/recommendation-diego.webp";
import allanPhoto from "@/assets/recommendation-allan.webp";

type Recommendation = Translation["recommendations"]["items"][number];

/** Profile photos from LinkedIn, by name; anyone without one gets their initials. */
const PHOTOS: Record<string, string> = {
  "Igor Vicente": igorPhoto,
  "Diego Breidenbach Skieresz": diegoPhoto,
  "Allan Pierre Rodrigues": allanPhoto,
};

/** How long each recommendation stays before the next one comes in. */
const AUTOPLAY_MS = 20000;
/** Horizontal finger travel, in pixels, that counts as a swipe. */
const SWIPE_THRESHOLD = 40;
/** Finger travel, in pixels, up to which a touch is a tap and not a scroll. */
const TAP_SLOP = 10;

function RecommendationSlide({ recommendation, active }: { recommendation: Recommendation; active: boolean }) {
  const { t } = useLanguage();
  const { name, initials, headline, relation, linkedin, paragraphs } = recommendation;

  return (
    // Every slide shares one grid cell, so the card is as tall as the longest and never jumps.
    <motion.figure
      initial={false}
      animate={{ opacity: active ? 1 : 0, x: active ? 0 : 24, filter: active ? "blur(0px)" : "blur(6px)" }}
      transition={{ duration: 0.7, ease: PREMIUM_EASE }}
      aria-hidden={!active}
      className={`[grid-area:1/1] flex flex-col ${active ? "" : "pointer-events-none"}`}
    >
      <blockquote className="space-y-4 text-base sm:text-lg lg:text-xl leading-relaxed text-[#E5E5E5]">
        {/* Quote marks open the first paragraph and close the last: the whole text is the person speaking. */}
        {paragraphs.map((paragraph, index) => (
          <p key={paragraph}>
            {index === 0 && "“"}
            {paragraph}
            {index === paragraphs.length - 1 && "”"}
          </p>
        ))}
      </blockquote>
      {t.recommendations.translatedNote && (
        <p className="mt-4 text-xs italic text-[#8C8C8C]">{t.recommendations.translatedNote}</p>
      )}

      <figcaption className="mt-auto pt-8 flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="flex items-center gap-4">
          {PHOTOS[name] ? (
            <img
              src={PHOTOS[name]}
              alt=""
              loading="lazy"
              className="shrink-0 w-14 h-14 rounded-full object-cover border border-[#262626]"
            />
          ) : (
            <span
              aria-hidden="true"
              className="flex items-center justify-center shrink-0 w-14 h-14 rounded-full bg-[#FACC15]/10 border border-[#FACC15]/25 text-base text-[#FACC15]"
              style={{ fontWeight: 600 }}
            >
              {initials}
            </span>
          )}
          <div className="min-w-0">
            <p className="text-lg text-[#F5F5F5]" style={{ fontWeight: 600 }}>
              {name}
            </p>
            <p className="mt-0.5 text-sm leading-snug text-[#8C8C8C]">{headline}</p>
            <p className="mt-1 text-sm text-[#A3A3A3]">{relation}</p>
          </div>
        </div>

        {/* A button of its own, apart from the author so it reads as something to tap: centered under them
            on phones, on the right at the height of their photo on wider screens. */}
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={active ? 0 : -1}
          className="self-center sm:self-auto shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#171717] border border-[#404040] text-sm text-[#F5F5F5] hover:border-[#FACC15] hover:text-[#FACC15] active:scale-[0.98] transition-all duration-300"
        >
          <Linkedin size={16} />
          {t.recommendations.viewOnLinkedIn}
          <ArrowUpRight size={14} />
        </a>
      </figcaption>
    </motion.figure>
  );
}

export function RecommendationsSection() {
  const { t } = useLanguage();
  const items = t.recommendations.items;
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [paused, setPaused] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  // Viewed once it crosses the middle of the screen, whatever its height; the count starts there.
  const inView = useInView(cardRef, { margin: "-45% 0px -50% 0px" });
  const reducedMotion = useReducedMotion();
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const playing = inView && !hovered && !paused && !reducedMotion;

  const goTo = (index: number) => setActive((index + items.length) % items.length);

  // Moves on every 20s while the card is being viewed and not being read under the pointer;
  // any manual change restarts the count.
  useEffect(() => {
    if (!playing) {
      return;
    }
    const timer = window.setTimeout(() => goTo(active + 1), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [active, playing]);

  const handleTouchStart = (event: TouchEvent) => {
    touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  };

  // A tap or a swipe means someone is reading, so it pauses; scrolling past the card doesn't.
  const handleTouchEnd = (event: TouchEvent) => {
    if (touchStart.current === null) return;
    const dx = event.changedTouches[0].clientX - touchStart.current.x;
    const dy = event.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) >= SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      setPaused(true);
      goTo(dx < 0 ? active + 1 : active - 1);
    } else if (Math.hypot(dx, dy) <= TAP_SLOP) {
      setPaused(true);
    }
  };

  return (
    <section className="py-14 sm:py-20 lg:py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: PREMIUM_EASE }}
        className="text-4xl lg:text-5xl tracking-tight text-[#F5F5F5] mb-8 sm:mb-12"
        style={{ fontWeight: 600 }}
      >
        {t.recommendations.title}
      </motion.h2>

      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: PREMIUM_EASE }}
        onPointerEnter={(event) => setHovered(event.pointerType === "mouse")}
        onPointerLeave={() => setHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative overflow-hidden max-w-4xl mx-auto p-7 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-[#171717] via-[#111111] to-[#0A0A0A] border border-[#262626]"
      >
        {/* Soft yellow light in the corner, the section's one accent */}
        <div className="absolute -right-32 -top-32 w-80 h-80 rounded-full bg-[#FACC15] blur-[120px] opacity-[0.06] pointer-events-none" />
        <div className="relative grid">
          {items.map((recommendation, index) => (
            <RecommendationSlide key={recommendation.name} recommendation={recommendation} active={index === active} />
          ))}
        </div>
      </motion.div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          aria-label={t.a11y.previousRecommendation}
          className="hidden sm:flex p-2 rounded-full border border-[#262626] text-[#A3A3A3] hover:text-[#F5F5F5] hover:border-[#404040] transition-colors duration-300"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex items-center">
          {items.map((recommendation, index) => (
            <button
              key={recommendation.name}
              type="button"
              onClick={() => goTo(index)}
              aria-label={recommendation.name}
              aria-current={index === active}
              // A small dot in a tall touch area.
              className="group flex items-center justify-center min-w-6 h-11 px-1"
            >
              <span
                className={`relative h-2 rounded-full overflow-hidden bg-[#404040] transition-all duration-300 ${index === active ? "w-10" : "w-2 group-hover:bg-[#525252]"}`}
              >
                {/* The active dot fills up as the next recommendation approaches. */}
                {index === active && (
                  <motion.span
                    key={`${active}-${playing}`}
                    initial={{ width: playing ? "0%" : "100%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: playing ? AUTOPLAY_MS / 1000 : 0, ease: "linear" }}
                    className="absolute inset-y-0 left-0 bg-[#FACC15]"
                  />
                )}
              </span>
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => goTo(active + 1)}
          aria-label={t.a11y.nextRecommendation}
          className="hidden sm:flex p-2 rounded-full border border-[#262626] text-[#A3A3A3] hover:text-[#F5F5F5] hover:border-[#404040] transition-colors duration-300"
        >
          <ChevronRight size={18} />
        </button>
        {!reducedMotion && (
          <button
            type="button"
            onClick={() => setPaused((current) => !current)}
            aria-label={paused ? t.a11y.playRecommendations : t.a11y.pauseRecommendations}
            className="flex p-3 sm:p-2 rounded-full border border-[#262626] text-[#A3A3A3] hover:text-[#F5F5F5] hover:border-[#404040] transition-colors duration-300"
          >
            {paused ? <Play size={18} /> : <Pause size={18} />}
          </button>
        )}
      </div>
    </section>
  );
}
