import { motion } from "motion/react";
import { ExternalLink, Smartphone } from "lucide-react";
import type { Project } from "../../types";
import { PREMIUM_EASE } from "../../constants/animation";
import { Chip } from "../common/Chip";
import { TagLabel } from "../common/TagLabel";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

/** Full-width summary card of a project. Clicking it opens the project details. */
export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: PREMIUM_EASE }}
      onClick={onClick}
      className="group relative p-10 lg:p-12 rounded-3xl bg-[#111111] border border-[#262626] hover:border-[#FACC15] transition-all duration-500 hover:scale-[1.01] cursor-pointer"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-4 py-1.5 rounded-full bg-[#FACC15]/10 text-[#FACC15] text-xs uppercase tracking-wider"
                  >
                    <TagLabel tag={tag} />
                  </span>
                ))}
              </div>
              {project.storeLinks && project.storeLinks.length > 0 && (
                <div className="flex gap-2">
                  {project.storeLinks.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5F5F5] text-[#0A0A0A] text-xs hover:scale-105 transition-transform duration-300"
                    >
                      <Smartphone size={12} />
                      <span>{link.platform}</span>
                      <ExternalLink size={10} />
                    </a>
                  ))}
                </div>
              )}
            </div>
            <h3
              className="text-3xl lg:text-4xl tracking-tight text-[#F5F5F5] mb-2 group-hover:text-[#FACC15] transition-colors duration-300"
              style={{ fontWeight: 600 }}
            >
              {project.title}
            </h3>
            <p className="text-sm text-[#737373] mb-4">{project.subtitle}</p>
            <p className="text-lg text-[#A3A3A3] leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <Chip key={technology} label={technology} />
              ))}
            </div>
          </div>
          <div className="lg:ml-12 text-[#FACC15] group-hover:translate-x-2 transition-transform duration-300 text-2xl">
            →
          </div>
        </div>
      </div>
    </motion.div>
  );
}
