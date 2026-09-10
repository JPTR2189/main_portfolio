import { motion } from "motion/react";
import { PREMIUM_EASE } from "../constants/animation";
import { useLanguage } from "../i18n/LanguageContext";
import { scrollToSection } from "../utils/scrollToSection";

import heroPhoto from "@/assets/photo.png";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="pt-32 pb-24 lg:pt-44 lg:pb-32 px-6 lg:px-12 max-w-7xl mx-auto relative overflow-visible">
      {/* Decorative Elements */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: PREMIUM_EASE }}
        className="absolute top-32 left-0 w-16 h-px bg-[#262626] origin-left"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.6, duration: 1, ease: PREMIUM_EASE }}
        className="absolute top-32 left-0 w-px h-16 bg-[#262626] origin-top"
      />

      <div className="relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column - Text */}
          <div className="lg:col-span-7 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: PREMIUM_EASE }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-[#FACC15]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#737373]">
                {t.hero.greeting}
              </span>
            </motion.div>

            {/* Oversized Editorial Title */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.9, ease: PREMIUM_EASE }}
              className="mb-10"
            >
              <h1
                className="text-[clamp(3.5rem,12vw,10rem)] leading-[0.88] tracking-[-0.02em] text-[#F5F5F5] mb-2"
                style={{ fontWeight: 700 }}
              >
                Jean
              </h1>
              <h1
                className="text-[clamp(3.5rem,12vw,10rem)] leading-[0.88] tracking-[-0.02em] text-[#FACC15] mb-2"
                style={{ fontWeight: 700 }}
              >
                Pierre
              </h1>
            </motion.div>

            {/* Role with Yellow Accent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.8, ease: PREMIUM_EASE }}
              className="mb-8"
            >
              <p
                className="text-2xl lg:text-3xl xl:text-4xl tracking-tight leading-tight"
                style={{ fontWeight: 500 }}
              >
                <span className="text-[#FACC15]">iOS Developer</span>
                <span className="text-[#D4D4D4]"> & Software Engineer</span>
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.8, ease: PREMIUM_EASE }}
              className="text-base lg:text-lg text-[#A3A3A3] mb-12 max-w-lg leading-relaxed"
            >
              {t.hero.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.8, ease: PREMIUM_EASE }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <button
                onClick={() => scrollToSection("projects")}
                className="px-8 py-4 bg-[#FACC15] text-[#0A0A0A] rounded-full hover:bg-[#FDE047] transition-all duration-300 font-medium"
              >
                {t.hero.viewWork}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-8 py-4 bg-transparent border-2 border-[#262626] text-[#F5F5F5] rounded-full hover:border-[#FACC15] hover:text-[#FACC15] transition-all duration-300 font-medium"
              >
                {t.hero.getInTouch}
              </button>
            </motion.div>
          </div>

          {/* Right Column - Photo */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: PREMIUM_EASE }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative border border-[#262626] shadow-xl">
                <img
                  src={heroPhoto}
                  alt="Jean Pierre"
                  className="w-full h-full object-cover object-center"
                />
                {/* Light dark overlay */}
                <div className="absolute inset-0 bg-black/20" />
                {/* Yellow accent corner */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 bg-[#FACC15]"
                  style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }}
                />
              </div>

              {/* Decorative line extending from image */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.8, ease: PREMIUM_EASE }}
                className="absolute -bottom-4 left-0 right-0 h-px bg-gradient-to-r from-[#262626] via-[#262626]/50 to-transparent origin-left"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
