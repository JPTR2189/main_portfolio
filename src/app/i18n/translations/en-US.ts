import type { Translation } from "./pt-BR";

export const enUS: Translation = {
  nav: {
    about: "About",
    projects: "Projects",
    contact: "Contact",
  },
  hero: {
    greeting: "Hi, I'm",
    description: "Turning ideas into apps.",
    viewWork: "View Work",
    getInTouch: "Get in Touch",
  },
  assistant: {
    greeting: "Hi! I'm Lumi, the intelligence Jean built to introduce you to his work.",
    runCall: "To show you his portfolio, I need to build it first. Hit Run?",
    run: "Run",
    runHint: "or press Enter",
    bugCall: "Uh-oh… a bug escaped mid-build. Can you help me catch it before Jean notices?",
    bugHunt: "There it goes! Catch the little red one.",
    miss1: "So close! It's faster than it looks.",
    miss2: "This bug is well trained… try again!",
    miss3: "It's getting tired. Now's your chance!",
    bugCaught: "Nice! Now let me try rebuilding the project.",
    outro: "Perfect, all set. Compiling the portfolio…",
    build: {
      running: "Building portfolio…",
      issue: "1 bug escaped at Portfolio.swift:42",
      launching: "Launching Portfolio.app…",
    },
    skip: "Skip",
  },
  projects: {
    title: "Featured Projects",
    viewDetails: "View details",
    closeModal: "Close",
    myRole: "My Role",
    team: "Team",
    technologies: "Tech Stack",
    skills: "Skills Developed",
    screenshots: "Screenshots",
    visitStore: "Visit",
    availableOn: "Available On",
  },
  about: {
    title: "About Me",
    content:
      "Nice to meet you, my name is Jean Pierre. I am 20 years old and live in the metropolitan region of Porto Alegre/RS, Brazil. I am a communicative person, passionate about technology, music, and understanding how things work. Today I am an iOS developer with 2 years of experience at the Apple Developer Academy | PUCRS, where I have built and published apps on the App Store, working in teams and applying industry-aligned practices to the projects. Currently, I study Systems Analysis and Development at PUCRS and Software Engineering at UNINTER. My curiosity and eagerness to learn drive me toward new challenges and to keep improving as a future Software Engineer. I am excited to contribute my energy and creativity to new teams and projects.",
  },
  skillsSection: {
    title: "Skills",
    groups: {
      development: {
        title: "Development",
        skills: [
          "iOS Development",
          "MVVM",
          "TCA",
          "MVC",
          "API Integration",
          "Back-end",
          "Software Testing",
          "Machine Learning",
          "Data Analysis",
        ],
      },
      languages: {
        title: "Languages",
        skills: ["Swift", "Python", "Java", "JavaScript", "SQL", "Flutter"],
      },
      tools: {
        title: "Tools & Processes",
        skills: ["Git", "Scrum", "Linux", "AI-Assisted Development"],
      },
      soft: {
        title: "Soft Skills",
        skills: [
          "Communication",
          "Teamwork",
          "Leadership",
          "Critical Thinking",
          "Organization",
          "Problem Solving",
        ],
      },
    },
  },
  contact: {
    title: "Let's Talk?",
    description: "Get in touch with me through my networks:",
    email: "developerjeanpierre@gmail.com",
  },
  meta: {
    title: "Jean Pierre — iOS Developer",
  },
  a11y: {
    catchBug: "Catch the bug",
    toggleLanguage: "Toggle language",
    sendEmail: "Send email",
    visitLinkedin: "Visit LinkedIn profile",
    visitGithub: "Visit GitHub profile",
    goToProject: "Go to project",
    aboutPhotoAlt: "Photo of Jean Pierre",
    appStoreBadgeAlt: "Download on the App Store",
  },
};
