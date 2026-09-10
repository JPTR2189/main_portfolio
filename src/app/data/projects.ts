import type { Language, Project } from "../types";
import { projectsPtBR } from "./projects.pt-BR";
import { projectsEnUS } from "./projects.en-US";

export const projectsByLanguage: Record<Language, Project[]> = {
  "pt-BR": projectsPtBR,
  "en-US": projectsEnUS,
};
