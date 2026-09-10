import { motion } from "motion/react";
import { PREMIUM_EASE, STAGGER_DELAY } from "../constants/animation";
import { useLanguage } from "../i18n/LanguageContext";

function SkillGroup({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div>
      <h3
        className="text-xl lg:text-2xl tracking-tight text-[#F5F5F5] mb-8"
        style={{ fontWeight: 600 }}
      >
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {skills.map((skill, index) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * STAGGER_DELAY, duration: 0.4 }}
            className="inline-block px-4 py-2 rounded-full bg-[#171717] border border-[#262626] text-sm text-[#A3A3A3] hover:border-[#525252] transition-all duration-300"
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function SkillsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 lg:py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: PREMIUM_EASE }}
      >
        <h2
          className="text-4xl lg:text-5xl tracking-tight text-[#F5F5F5] mb-12"
          style={{ fontWeight: 600 }}
        >
          {t.skillsSection.title}
        </h2>
        <div className="grid lg:grid-cols-2 gap-12">
          <SkillGroup
            title={t.skillsSection.hardTitle}
            skills={t.skillsSection.hardSkills}
          />
          <SkillGroup
            title={t.skillsSection.softTitle}
            skills={t.skillsSection.softSkills}
          />
        </div>
      </motion.div>
    </section>
  );
}
