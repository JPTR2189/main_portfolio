import type { Project } from "../types";

import shiroIcon from "@/assets/shiro.png";
import coffeeOverflowIcon from "@/assets/coffee_overflow.png";
import ohMyGrillIcon from "@/assets/oh_my_grill.png";
import apiRequestIcon from "@/assets/api_request.png";
import concursAiIcon from "@/assets/concursAI.png";
import portalRunesIcon from "@/assets/portal_runes.png";

/**
 * Language-independent fields of each project (links, colors, stack, assets).
 * The localized text lives in `projects.pt-BR.ts` and `projects.en-US.ts`,
 * which spread these bases so the shared data has a single source of truth.
 */
export type ProjectBase = Omit<
  Project,
  | "subtitle"
  | "description"
  | "detailedDescription"
  | "role"
  | "skills"
  | "team"
  | "tags"
>;

export const projectBases = {
  portalRunes: {
    id: "portal-runes",
    title: "Portal Runes",
    date: "2026",
    technologies: ["SwiftUI", "RealityKit", "ARKit"],
    storeLinks: [
      {
        platform: "App Store",
        url: "https://apps.apple.com/br/app/portal-runes/id6797600759",
      },
    ],
    screenshots: [],
    icon: portalRunesIcon,
    accentColor: "#A855F7",
  },
  shiro: {
    id: "shiro",
    title: "Shiro.",
    date: "2025",
    technologies: ["SwiftUI", "SpriteKit", "GameplayKit"],
    storeLinks: [
      {
        platform: "App Store",
        url: "https://apps.apple.com/br/app/shiro/id6752502968",
      },
    ],
    screenshots: [],
    icon: shiroIcon,
    accentColor: "#FACC15",
  },
  coffeeOverflow: {
    id: "coffee-overflow",
    title: "Coffee Overflow",
    date: "2026",
    technologies: ["SwiftUI", "SpriteKit", "GameplayKit"],
    storeLinks: [
      {
        platform: "App Store",
        url: "https://apps.apple.com/br/app/coffee-overflow-neon-rhythm/id6760731874",
      },
    ],
    screenshots: [],
    icon: coffeeOverflowIcon,
    accentColor: "#A855F7",
  },
  ohMyGrill: {
    id: "oh-my-grill",
    title: "Oh My Grill!",
    date: "2025",
    technologies: ["SwiftUI", "SpriteKit", "GameplayKit", "Multipeer Connectivity"],
    storeLinks: [
      {
        platform: "App Store",
        url: "https://apps.apple.com/br/app/oh-my-grill/id6756377473?l=en-GB",
      },
    ],
    screenshots: [],
    icon: ohMyGrillIcon,
    accentColor: "#EF4444",
  },
  apiRequest: {
    id: "api-request",
    title: "API Request",
    date: "2025",
    technologies: ["SwiftUI", "SwiftData"],
    githubUrl: "https://github.com/JPTR2189/API_Request",
    screenshots: [],
    icon: apiRequestIcon,
    accentColor: "#3B82F6",
  },
  concursAi: {
    id: "concursai",
    title: "ConcursAI",
    date: "2025",
    technologies: ["UIKit", "CoreData"],
    storeLinks: [
      {
        platform: "App Store",
        url: "https://apps.apple.com/br/app/concursai/id6747597258",
      },
    ],
    screenshots: [],
    icon: concursAiIcon,
    accentColor: "#10B981",
  },
} satisfies Record<string, ProjectBase>;
