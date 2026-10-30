export type Language = "pt-BR" | "en-US";

export interface TeamMember {
  name: string;
  role: string;
  profileUrl?: string;
}

export interface StoreLink {
  platform: string;
  url: string;
  /** Audience shown above the badge when a project ships more than one app. */
  label?: string;
  /** Icon of that specific app, shown next to its label. */
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  detailedDescription: string;
  tags: string[];
  date: string;
  role: string;
  technologies: string[];
  skills?: string[];
  storeLinks?: StoreLink[];
  githubUrl?: string;
  team: TeamMember[];
  screenshots?: string[];
  icon: string;
  accentColor: string;
  /** Keeps the project's data but leaves it out of the portfolio. */
  hidden?: boolean;
  /**
   * Optional second brand, for projects made of two apps: the icon stacked
   * behind `icon`, the color blended with `accentColor`, and the trailing part
   * of the title painted with it (e.g. "onTap" in "Freela onTap").
   */
  secondary?: {
    icon: string;
    accentColor: string;
    titlePart: string;
  };
}
