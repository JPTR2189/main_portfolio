import type { Project } from "../types";
import { projectBases } from "./projects.shared";

export const projectsEnUS: Project[] = [
  {
    ...projectBases.portalRunes,
    tags: ["Vision Pro", "Mixed Reality"],
    subtitle: "Immersive Experience for Apple Vision Pro",
    description:
      "A mixed-reality ritual where gestures, 3D elements, and spatial audio turn your environment into a challenge filled with portals and runes.",
    detailedDescription:
      "An immersive experience built for Apple Vision Pro, where the user transforms their surroundings into a ritual space in which a mysterious stone portal comes to life. The app uses hand tracking for natural magical interactions, room scanning to integrate the experience with the user's real environment, interactive runes and gesture-based fireball mechanics, plus spatial audio and atmospheric visual effects guided by an interactive tutorial.",
    role: "iOS Developer",
    skills: [
      "Augmented Reality",
      "Hand Tracking",
      "Spatial Audio",
      "3D Modeling",
    ],
    team: [
      { name: "Jean Pierre", role: "iOS Developer" },
      { name: "Vinicius Cadore", role: "UI/UX Designer" },
      { name: "Gabriel Kowaleski", role: "iOS Developer" },
      { name: "Bruna Marschner", role: "iOS Developer" },
    ],
  },
  {
    ...projectBases.shiro,
    tags: ["iOS App", "Game"],
    subtitle: "Arcade Game",
    description:
      "A classic arcade game where you take on the role of a climber on a relentless vertical journey.",
    detailedDescription:
      "In this classic arcade game, you take on the role of a climber on a relentless vertical journey. With precise controls and a fast pace, the player must dodge avalanches and logs strategically placed to block their progress. Can you guide our hero through the dangers of the snow and conquer the top of the mountain?",
    role: "iOS Developer & Scrum Master",
    skills: [
      "Game Development",
      "Game Design",
      "Performance Optimization",
      "Scrum",
      "Team Leadership",
    ],
    team: [
      { name: "Jean Pierre", role: "iOS Developer & Scrum Master" },
      { name: "Vicenzo Masera", role: "iOS Developer" },
      { name: "Enzo Tonatto", role: "iOS Developer" },
      { name: "Bernardo Garcia", role: "iOS Developer" },
      { name: "Pedro Lima", role: "UI/UX Designer & PO" },
    ],
  },
  {
    ...projectBases.coffeeOverflow,
    tags: ["iOS App", "Game"],
    subtitle: "Rhythm & Coordination",
    description:
      "An unusual blend of coffee, music, and technology, set to a frantic soundtrack.",
    detailedDescription:
      "An unusual blend of coffee, music, and technology. The game puts you in the role of a barista who must satisfy programmers' insatiable craving for coffee while balancing a tray with cups falling from a techno dance globe. All of this must be done in sync with dance steps set to a frantic, upbeat soundtrack. Keep the rhythm, balance the coffee, and enjoy the party!",
    role: "iOS Developer & Scrum Master",
    skills: [
      "UI/UX Design",
      "Component Architecture",
      "Design Systems",
      "Scrum",
    ],
    team: [
      { name: "Jean Pierre", role: "iOS Developer & Scrum Master" },
      { name: "Pablo Garcia", role: "iOS Developer" },
      { name: "Eduardo Ferrari", role: "iOS Developer & Audio Engineer" },
      { name: "Guilherme Ghise", role: "iOS Developer & PO" },
      { name: "Leonardo Monteiro", role: "UI/UX Designer" },
    ],
  },
  {
    ...projectBases.ohMyGrill,
    tags: ["iOS App", "Game"],
    subtitle: "Burger Joint Simulator",
    description:
      "A chaotic and fun burger joint simulator where teamwork is the key.",
    detailedDescription:
      "A chaotic and fun burger joint simulator where teamwork is the key. Manage a kitchen with up to four players, coordinating tasks under pressure: frying fries, prepping ingredients, and assembling orders with precision. Can you and your team deliver the perfect burger before time runs out?",
    role: "PO & iOS Developer",
    skills: [
      "Product Management",
      "iOS Development",
      "UI/UX Design",
      "Game Design",
    ],
    team: [
      { name: "Jean Pierre", role: "iOS Developer & PO" },
      { name: "Bárbara Dapper", role: "iOS Developer & Scrum Master" },
      { name: "João Carvalho", role: "iOS Developer" },
      { name: "Maria Eduarda", role: "iOS Developer" },
      { name: "Vitor Martins", role: "UI/UX Designer" },
    ],
  },
  {
    ...projectBases.apiRequest,
    tags: ["iOS App"],
    subtitle: "Integration & E-commerce",
    description:
      "App focused on the modern shopping experience, showcasing seamless consumption of external APIs.",
    detailedDescription:
      "App focused on the modern shopping experience, built to showcase seamless consumption of external APIs. The project manages the complete user flow, from browsing dynamic catalogs to advanced features such as a favorites system, data persistence for saving items, and a simulated, intuitive checkout.",
    role: "iOS Developer",
    skills: ["iOS Development", "API Integration", "Networking", "Problem Solving"],
    team: [
      { name: "Jean Pierre", role: "iOS Developer" },
      { name: "Bruna Marschner", role: "iOS Developer" },
    ],
  },
  {
    ...projectBases.concursAi,
    tags: ["iOS App"],
    subtitle: "Education & Technology",
    description:
      "Smart platform focused on optimizing studies for public service exams.",
    detailedDescription:
      "Smart platform focused on optimizing studies for public service exams. The app solves the pain of reviewing extensive content through the generation of personalized quizzes, allowing students to identify learning gaps and reinforce knowledge in an active, dynamic way.",
    role: "iOS Developer",
    skills: [
      "iOS Development",
      "Educational Technology",
      "Data Management",
      "User Research",
    ],
    team: [
      { name: "Jean Pierre", role: "iOS Developer" },
      { name: "Endrew Soares", role: "iOS Developer" },
      { name: "Fernando Sulzbach", role: "iOS Developer" },
      { name: "Leonel Ferraz", role: "iOS Developer" },
      { name: "Rafa Julianotte", role: "UI/UX Designer" },
    ],
  },
];
