import { motion } from "motion/react";
import { PREMIUM_EASE } from "../constants/animation";
import { useLanguage } from "../i18n/LanguageContext";

import aboutImage from "@/assets/about.png";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: PREMIUM_EASE }}
        className="grid lg:grid-cols-12 gap-12 lg:gap-32 items-center"
      >
        <div className="lg:col-span-5">
          <h2
            className="text-5xl lg:text-6xl tracking-tight text-[#F5F5F5] mb-8"
            style={{ fontWeight: 600 }}
          >
            {t.about.title}
          </h2>
          <p className="text-lg lg:text-xl text-[#D4D4D4] leading-relaxed">
            {t.about.content}
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: PREMIUM_EASE }}
          className="lg:col-span-7 w-full max-w-[450px] mx-auto lg:justify-self-end lg:-translate-x-20"
        >
          <img
            src={aboutImage}
            alt={t.a11y.aboutPhotoAlt}
            className="w-full h-auto rounded-[18px] object-cover shadow-xl border border-[#262626]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
