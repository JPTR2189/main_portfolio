import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import type { Project } from "../../types";
import { PREMIUM_EASE, STAGGER_DELAY } from "../../constants/animation";
import { useLanguage } from "../../i18n/LanguageContext";
import { splitRoles } from "../../utils/splitRoles";
import { Chip } from "../common/Chip";
import { RoleTag } from "../common/RoleTag";
import { TagLabel } from "../common/TagLabel";

import appStoreBadge from "@/assets/app_store_badge.png";
import githubIcon from "@/assets/github.png";

function SectionLabel({ children }: { children: string }) {
  return (
    <h4
      className="text-sm uppercase tracking-wider mb-4"
      style={{ fontWeight: 500, color: "#FFFFFF" }}
    >
      {children}
    </h4>
  );
}

/** Badge linking to the project's GitHub repository or App Store page. */
function ProjectLinkBadge({ project }: { project: Project }) {
  const { t } = useLanguage();

  if (project.githubUrl) {
    return (
      <motion.a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4, ease: PREMIUM_EASE }}
        whileHover={{ scale: 1.05 }}
        className="absolute top-6 right-6 lg:top-8 lg:right-8 z-20 inline-flex items-center gap-3.5 rounded-[10px] bg-white px-3 lg:px-3.5 py-5 h-[42px] shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:opacity-95 transition duration-200 ease-out cursor-pointer"
      >
        <img src={githubIcon} alt="GitHub" className="h-8 w-auto object-contain" />
        <div className="flex flex-col leading-[1.1]">
          <span className="text-[11px] font-medium text-black">
            {t.projects.availableOn}
          </span>
          <span className="text-[20px] font-semibold text-black">GitHub</span>
        </div>
      </motion.a>
    );
  }

  if (project.storeLinks && project.storeLinks.length > 0) {
    return (
      <motion.a
        href={project.storeLinks[0].url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4, ease: PREMIUM_EASE }}
        whileHover={{ scale: 1.05 }}
        className="absolute top-6 right-6 lg:top-8 lg:right-8 z-20 w-32 lg:w-36 hover:opacity-80 transition-opacity duration-200"
      >
        <img
          src={appStoreBadge}
          alt={t.a11y.appStoreBadgeAlt}
          className="w-full h-auto object-contain"
        />
      </motion.a>
    );
  }

  return null;
}

/** Expanded details (description, roles, stack, skills and team) of the active project. */
export function ProjectDetailPanel({ project }: { project: Project }) {
  const { t } = useLanguage();

  // Later sections wait for the staggered items of the previous ones.
  const techStaggerTotal = project.technologies.length * STAGGER_DELAY;
  const skillsStaggerTotal = (project.skills?.length ?? 0) * STAGGER_DELAY;
  const skillsSectionDelay = 0.45 + techStaggerTotal;
  const teamSectionDelay = 0.5 + techStaggerTotal + skillsStaggerTotal;
  const teamMemberBaseDelay = 0.65 + techStaggerTotal + skillsStaggerTotal;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: PREMIUM_EASE }}
      className="relative p-10 lg:p-12 rounded-3xl bg-[#111111] border transition-all duration-500 group"
      style={{ borderColor: "#262626" }}
      onMouseEnter={(event) => {
        event.currentTarget.style.borderColor = project.accentColor;
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.borderColor = "#262626";
      }}
    >
      <ProjectLinkBadge project={project} />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4, ease: PREMIUM_EASE }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="flex gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-4 py-1.5 rounded-full text-xs uppercase tracking-wider"
                  style={{
                    backgroundColor: `${project.accentColor}10`,
                    color: project.accentColor,
                  }}
                >
                  <TagLabel tag={tag} />
                </span>
              ))}
            </div>
            <span className="text-sm text-[#737373]">{project.date}</span>
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: PREMIUM_EASE }}
            className="text-4xl lg:text-5xl tracking-tight text-[#F5F5F5] mb-2 transition-colors duration-300"
            style={{ fontWeight: 600 }}
            onMouseEnter={(event) => {
              event.currentTarget.style.color = project.accentColor;
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.color = "#F5F5F5";
            }}
          >
            {project.title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4, ease: PREMIUM_EASE }}
            className="text-lg text-[#737373] mb-6"
          >
            {project.subtitle}
          </motion.p>
        </div>
      </div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: PREMIUM_EASE }}
        className="text-lg text-[#D4D4D4] leading-relaxed mb-8"
      >
        {project.detailedDescription}
      </motion.p>

      {/* My Role */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4, ease: PREMIUM_EASE }}
        className="mb-8"
      >
        <SectionLabel>{t.projects.myRole}</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {splitRoles(project.role).map((role) => (
            <RoleTag key={role} role={role} />
          ))}
        </div>
      </motion.div>

      {/* Technologies */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4, ease: PREMIUM_EASE }}
        className="mb-8"
      >
        <SectionLabel>{t.projects.technologies}</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((technology, index) => (
            <motion.div
              key={`${project.id}-tech-${index}`}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: 0.45 + index * STAGGER_DELAY,
                duration: 0.3,
                ease: PREMIUM_EASE,
              }}
            >
              <Chip label={technology} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Skills */}
      {project.skills && project.skills.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: skillsSectionDelay,
            duration: 0.4,
            ease: PREMIUM_EASE,
          }}
          className="mb-8"
        >
          <SectionLabel>{t.projects.skills}</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill, index) => (
              <motion.div
                key={`${project.id}-skill-${index}`}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: skillsSectionDelay + 0.05 + index * STAGGER_DELAY,
                  duration: 0.3,
                  ease: PREMIUM_EASE,
                }}
              >
                <Chip label={skill} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Team */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: teamSectionDelay,
          duration: 0.4,
          ease: PREMIUM_EASE,
        }}
      >
        <SectionLabel>{t.projects.team}</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {project.team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: teamMemberBaseDelay + index * 0.06,
                duration: 0.3,
                ease: PREMIUM_EASE,
              }}
              className="flex items-center justify-between p-4 rounded-2xl bg-[#0A0A0A] border border-[#262626]"
            >
              <div>
                <p className="text-sm text-[#F5F5F5]" style={{ fontWeight: 500 }}>
                  {member.name}
                </p>
                <p className="text-xs text-[#737373]">{member.role}</p>
              </div>
              {member.profileUrl && (
                <a
                  href={member.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  className="p-2 rounded-full hover:bg-[#262626] transition-colors duration-300"
                >
                  <ExternalLink size={14} className="text-[#737373]" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
