import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { X, ExternalLink, Smartphone } from "lucide-react";
import type { Project } from "../../types";
import { PREMIUM_EASE } from "../../constants/animation";
import { useLanguage } from "../../i18n/LanguageContext";
import { splitRoles } from "../../utils/splitRoles";
import { Chip } from "../common/Chip";
import { RoleTag } from "../common/RoleTag";
import { TagLabel } from "../common/TagLabel";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t } = useLanguage();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape or click outside; lock page scroll while open.
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8 bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: PREMIUM_EASE }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#111111] rounded-3xl shadow-2xl border border-[#262626] overflow-hidden flex flex-col"
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 rounded-full bg-[#171717] hover:bg-[#262626] transition-colors duration-300"
          aria-label={t.projects.closeModal}
        >
          <X size={20} className="text-[#F5F5F5]" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-8 lg:p-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
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
            </div>
            <h2
              className="text-4xl lg:text-5xl tracking-tight text-[#F5F5F5] mb-2"
              style={{ fontWeight: 600 }}
            >
              {project.title}
            </h2>
            <p className="text-xl text-[#A3A3A3]">{project.subtitle}</p>
          </div>

          {/* Store Links */}
          {project.storeLinks && project.storeLinks.length > 0 && (
            <div className="flex gap-3 mb-8">
              {project.storeLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F5F5F5] text-[#0A0A0A] hover:scale-105 transition-transform duration-300"
                >
                  <Smartphone size={16} />
                  <span>
                    {t.projects.visitStore} {link.platform}
                  </span>
                  <ExternalLink size={14} />
                </a>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="mb-8">
            <p className="text-lg text-[#D4D4D4] leading-relaxed">
              {project.detailedDescription}
            </p>
          </div>

          {/* My Role */}
          <div className="mb-8">
            <h3
              className="text-sm uppercase tracking-wider text-[#FFFFFF] mb-4"
              style={{ fontWeight: 500 }}
            >
              {t.projects.myRole}
            </h3>
            <div className="flex flex-wrap gap-2">
              {splitRoles(project.role).map((role) => (
                <RoleTag key={role} role={role} />
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-8">
            <h3
              className="text-sm uppercase tracking-wider text-[#FFFFFF] mb-4"
              style={{ fontWeight: 500 }}
            >
              {t.projects.technologies}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <Chip key={technology} label={technology} />
              ))}
            </div>
          </div>

          {/* Skills */}
          {project.skills && project.skills.length > 0 && (
            <div className="mb-8">
              <h3
                className="text-sm uppercase tracking-wider text-[#FFFFFF] mb-4"
                style={{ fontWeight: 500 }}
              >
                {t.projects.skills}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <Chip key={skill} label={skill} />
                ))}
              </div>
            </div>
          )}

          {/* Team */}
          <div className="mb-8">
            <h3
              className="text-sm uppercase tracking-wider text-[#FFFFFF] mb-4"
              style={{ fontWeight: 500 }}
            >
              {t.projects.team}
            </h3>
            <div className="grid gap-3">
              {project.team.map((member) => (
                <div
                  key={member.name}
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#0A0A0A] border border-[#262626]"
                >
                  <div>
                    <p className="text-base text-[#F5F5F5]" style={{ fontWeight: 500 }}>
                      {member.name}
                    </p>
                    <p className="text-sm text-[#A3A3A3]">{member.role}</p>
                  </div>
                  {member.profileUrl && (
                    <a
                      href={member.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full hover:bg-[#262626] transition-colors duration-300"
                    >
                      <ExternalLink size={16} className="text-[#A3A3A3]" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Screenshots (if available) */}
          {project.screenshots && project.screenshots.length > 0 && (
            <div>
              <h3
                className="text-sm uppercase tracking-wider text-[#FFFFFF] mb-4"
                style={{ fontWeight: 500 }}
              >
                {t.projects.screenshots}
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {project.screenshots.map((screenshot) => (
                  <div
                    key={screenshot}
                    className="aspect-video rounded-2xl bg-[#0A0A0A] border border-[#262626]"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
