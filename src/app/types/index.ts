export type Language = "pt-BR" | "en-US";

export interface TeamMember {
  name: string;
  role: string;
  profileUrl?: string;
}

export interface StoreLink {
  platform: string;
  url: string;
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
}
