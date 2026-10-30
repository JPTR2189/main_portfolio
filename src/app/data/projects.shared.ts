import type { Project } from "../types";

import shiroIcon from "@/assets/shiro.png";
import coffeeOverflowIcon from "@/assets/coffee_overflow.png";
import ohMyGrillIcon from "@/assets/oh_my_grill.png";
import apiRequestIcon from "@/assets/api_request.png";
import concursAiIcon from "@/assets/concursAI.png";
import portalRunesIcon from "@/assets/portal_runes.png";
import clarusIcon from "@/assets/clarus.png";
import freelaOnTapIcon from "@/assets/freela_ontap.png";
import freelaOnTapBusinessIcon from "@/assets/freela_ontap_business.png";
import coffeeOverflowDemo from "@/assets/projects/coffee-overflow/demo.mp4";
import coffeeOverflowDemoPoster from "@/assets/projects/coffee-overflow/demo-poster.webp";

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

// App Store screenshots live in `src/assets/projects/<project id>/` as numbered files
// (`01.webp`, `02.webp`…), shown in file-name order. Other files there, like a demo's
// poster, are left out by the leading digit.
const screenshotFiles = import.meta.glob<string>("../../assets/projects/*/[0-9]*.webp", {
  eager: true,
  import: "default",
});

function screenshotsOf(projectId: string): string[] {
  return Object.keys(screenshotFiles)
    .filter((path) => path.includes(`/projects/${projectId}/`))
    .sort()
    .map((path) => screenshotFiles[path]);
}

export const projectBases = {
  freelaOnTap: {
    id: "freela-ontap",
    title: "Freela onTap",
    date: "2026",
    technologies: [
      "SwiftUI",
      "Supabase",
      "StoreKit",
      "MapKit",
      "Foundation Models",
      "Core AI",
    ],
    // Labels are localized in each language file.
    storeLinks: [
      {
        platform: "App Store",
        url: "https://apps.apple.com/br/app/freela-ontap-vagas-e-turnos/id6818288726",
        icon: freelaOnTapIcon,
      },
      {
        platform: "App Store",
        url: "https://apps.apple.com/br/app/freela-ontap-empresas/id6818285624",
        icon: freelaOnTapBusinessIcon,
      },
    ],
    screenshots: screenshotsOf("freela-ontap"),
    icon: freelaOnTapIcon,
    accentColor: "#F25C1F",
    secondary: {
      icon: freelaOnTapBusinessIcon,
      accentColor: "#4A74F0",
      titlePart: "onTap",
    },
  },
  clarus: {
    id: "clarus",
    title: "Clarus",
    date: "2026",
    technologies: ["SwiftUI", "MapKit", "Foundation Models", "Core Location"],
    storeLinks: [
      {
        platform: "App Store",
        url: "https://apps.apple.com/br/app/clarus-explorar-%C3%A9-a-chave/id6796148867",
      },
    ],
    screenshots: screenshotsOf("clarus"),
    icon: clarusIcon,
    accentColor: "#06B6D4",
  },
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
    screenshots: screenshotsOf("shiro"),
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
    screenshots: screenshotsOf("coffee-overflow"),
    demo: { video: coffeeOverflowDemo, poster: coffeeOverflowDemoPoster },
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
    screenshots: screenshotsOf("oh-my-grill"),
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
    hidden: true,
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
    screenshots: screenshotsOf("concursai"),
    icon: concursAiIcon,
    accentColor: "#10B981",
  },
} satisfies Record<string, ProjectBase>;
