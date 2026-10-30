import { motion } from "motion/react";
import { Code, GitBranch, Smartphone, Users, type LucideIcon } from "lucide-react";
import { PREMIUM_EASE } from "../constants/animation";
import { useLanguage } from "../i18n/LanguageContext";
import type { Translation } from "../i18n/translations/pt-BR";

type SkillGroupKey = keyof Translation["skillsSection"]["groups"];

/** Display order of the groups (2×2 on desktop) and the icon of each one. */
const GROUPS: { key: SkillGroupKey; icon: LucideIcon }[] = [
  { key: "development", icon: Smartphone },
  { key: "languages", icon: Code },
  { key: "tools", icon: GitBranch },
  { key: "soft", icon: Users },
];

function SkillGroupCard({
  title,
  skills,
  icon: Icon,
  index,
}: {
  title: string;
  skills: string[];
  icon: LucideIcon;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: PREMIUM_EASE }}
      className="group relative overflow-hidden p-6 lg:p-7 rounded-2xl bg-gradient-to-br from-[#171717] via-[#111111] to-[#0A0A0A] border border-[#262626] hover:border-[#404040] transition-colors duration-500"
    >
      {/* Faint glow in the corner on hover, the neutral take on the project cards' glow */}
      <div className="absolute -left-24 -top-24 w-64 h-64 rounded-full bg-white blur-[90px] opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none" />

      <div className="relative flex items-center gap-3 mb-5">
        <span className="flex items-center justify-center w-9 h-9 rounded-[10px] bg-[#1A1A1A] border border-[#262626] text-[#A3A3A3] group-hover:text-[#F5F5F5] group-hover:border-[#404040] transition-colors duration-300">
          <Icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
        </span>
        <h3
          className="text-lg tracking-tight text-[#F5F5F5]"
          style={{ fontWeight: 600 }}
        >
          {title}
        </h3>
        <span className="ml-auto text-xs text-[#525252]">{skills.length}</span>
      </div>

      <div className="relative flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3.5 py-1.5 rounded-full bg-[#171717] border border-[#262626] text-sm text-[#A3A3A3] hover:border-[#525252] hover:text-[#F5F5F5] transition-colors duration-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 lg:py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: PREMIUM_EASE }}
        className="text-4xl lg:text-5xl tracking-tight text-[#F5F5F5] mb-12"
        style={{ fontWeight: 600 }}
      >
        {t.skillsSection.title}
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-4">
        {GROUPS.map(({ key, icon }, index) => (
          <SkillGroupCard
            key={key}
            title={t.skillsSection.groups[key].title}
            skills={t.skillsSection.groups[key].skills}
            icon={icon}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
