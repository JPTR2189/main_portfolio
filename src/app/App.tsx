import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "motion/react";
import {
  Github,
  Linkedin,
  Mail,
  Globe,
  X,
  ExternalLink,
  Code2,
  Smartphone,
  Box,
  Layers,
  Zap,
  Database,
  Cloud,
  Cpu,
  Users,
} from "lucide-react";

// Project Icons
import nebulaIcon from "../assets/c923a8797bb400d90800c73d44f98a528db3fb34.png";
import quantumIcon from "../assets/9178d559386a393b1a4ba755bc48409a3487bb51.png";
import horizonIcon from "../assets/96614771b7cf9c5da3113a14b58209c860545b95.png";
import stellarIcon from "../assets/51c67b8d40789472fc95cea60ca05ecf454ec961.png";
import auroraIcon from "../assets/63b1fb1e029170e2e88ad93dfd186e9a5e9a49f8.png";

// Hero Profile Photo
import heroPhoto from "../assets/photo.png";
import appStoreBadge from "../assets/app_store_badge.png";
import githubIcon from "../assets/github.png";
import aboutImage from "../assets/about.png";

// Types
type Language = "pt-BR" | "en-US";

interface TeamMember {
  name: string;
  role: string;
  profileUrl?: string;
}

interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  detailedDescription: string;
  tag: string[];
  date: string;
  role: string;
  technologies: string[];
  skills?: string[];
  storeLinks?: { platform: string; url: string }[];
  team: TeamMember[];
  screenshots?: string[];
  coverImage?: string;
  icon?: string;
  color?: string;
}

const techIcons: Record<string, any> = {
  React: Code2,
  TypeScript: Code2,
  "Next.js": Layers,
  SwiftUI: Smartphone,
  Figma: Box,
  "Node.js": Cpu,
  PostgreSQL: Database,
  Tailwind: Zap,
  Firebase: Cloud,
  SpriteKit: Smartphone,
  Swift: Smartphone,
  Kotlin: Smartphone,
};

const translations = {
  "pt-BR": {
    nav: {
      about: "Sobre",
      projects: "Projetos",
      contact: "Contato",
    },
    hero: {
      greeting: "Olá, sou",
      name: "Jean Pierre",
      role: "Desenvolvedor iOS & Mobile",
      description:
        "Transformando ideias em aplicativos, com foco total no usuário.",
      viewWork: "Ver Projetos",
      getInTouch: "Entrar em Contato",
    },
    projects: {
      title: "Projetos",
      viewDetails: "Ver detalhes",
      closeModal: "Fechar",
      myRole: "Meu Papel",
      team: "Equipe",
      technologies: "Stack Tecnológica",
      skills: "Competências Trabalhadas",
      screenshots: "Screenshots",
      visitStore: "Visitar",
      availableOn: "Disponível em",
      items: [
        {
          id: "quantum",
          title: "Shiro.",
          subtitle: "Arcade Game",
          description:
            "Dashboard de dados em tempo real processando 50M+ eventos diários com visualizações interativas.",
          detailedDescription:
            "Plataforma de analytics em tempo real desenvolvida para processar e visualizar grandes volumes de dados. Implementa gráficos interativos customizados, filtros avançados e exportação de relatórios. A arquitetura otimizada permite análise de 50 milhões de eventos por dia com latência inferior a 100ms.",
          tag: ["iOS App", "Game"],
          date: "2025",
          role: "Desenvolvedor iOS & Scrum Master",
          technologies: [
            "Next.js",
            "TypeScript",
            "Node.js",
            "PostgreSQL",
          ],
          skills: [
            "Game Development",
            "Performance Optimization",
            "Scrum",
            "Team Leadership",
          ],
          storeLinks: [
            {
              platform: "App Store",
              url: "https://apps.apple.com/br/app/shiro/id6752502968",
            },
          ],
          team: [
            { name: "Jean Pierre", role: "Desenvolvedor iOS e Scrum Master" },
            { name: "Vicenzo Masera", role: "Desenvolvedor iOS" },
            { name: "Enzo Tonatto", role: "Desenvolvedor iOS" },
            { name: "Bernardo Garcia", role: "Desenvolvedor iOS" },
            { name: "Pedro Lima", role: "Designer de UI/UX e PO" },
          ],
          screenshots: [],
          icon: quantumIcon,
          color: "#FACC15",
        },
        {
          id: "nebula",
          title: "Coffee Overflow",
          subtitle: "Game",
          description:
            "Sistema completo com 120+ componentes, usado por equipes de produto em 3 continentes.",
          detailedDescription:
            "Sistema de design completo desenvolvido do zero para unificar a experiência de produto em uma empresa de tecnologia global. Inclui biblioteca de componentes React, tokens de design, documentação interativa e ferramentas de automação. O sistema é usado por mais de 200 designers e desenvolvedores em 15 times diferentes, resultando em 60% de redução no tempo de desenvolvimento de novas features.",
          tag: ["iOS App", "Game"],
          date: "2025",
          role: "Desenvolvedor iOS & Scrum Master",
          technologies: [
            "React",
            "TypeScript",
            "Figma",
            "Tailwind",
          ],
          skills: [
            "UI/UX Design",
            "Component Architecture",
            "Design Systems",
            "Agile Methodology",
          ],
          storeLinks: [
            {
              platform: "App Store",
              url: "https://apps.apple.com/br/app/coffee-overflow-neon-rhythm/id6760731874",
            },
          ],
          team: [
            { name: "Jean Pierre", role: "Desenvolvedor iOS e Scrum Master" },
            { name: "Pablo Garcia", role: "Desenvolvedor iOS" },
            { name: "Eduardo Ferrari", role: "Desenvolvedor iOS e Engenheiro de Áudio" },
            { name: "Guilherme Ghise", role: "Desenvolvedor iOS e PO" },
            { name: "Leonardo Monteiro", role: "Designer de UI/UX" },
          ],
          screenshots: [],
          icon: nebulaIcon,
          color: "#A855F7",
        },
        {
          id: "horizon",
          title: "Oh My Grill!",
          subtitle: "Simulator Game",
          description:
            "Experiência mobile-first para gestão financeira pessoal com IA, 4.8★ na App Store.",
          detailedDescription:
            "Aplicativo mobile de gestão financeira pessoal com recursos de IA para categorização automática de gastos, previsões inteligentes e insights personalizados. Disponível para iOS e Android, com mais de 100 mil usuários ativos e avaliação média de 4.8 estrelas. A interface foi projetada para tornar a gestão financeira simples e acessível.",
          tag: ["iOS App", "Game"],
          date: "2025",
          role: "PO & Desenvolvedor iOS",
          technologies: [
            "SwiftUI",
            "SpriteKIT",
            "GameplayKit",
            "Multipeer Connectivity",
          ],
          skills: [
            "Product Management",
            "iOS Development",
            "UI/UX Design",
            "Game Design",
          ],
          storeLinks: [
            {
              platform: "App Store",
              url: "https://apps.apple.com/br/app/oh-my-grill/id6756377473?l=en-GBOh My Grill!",
            },
          ],
          team: [
            {
              name: "Jean Pierre",
              role: "Desenvolvedor iOS & PO",
            },
            {
              name: "Bárbara Dapper",
              role: "Desenvolvedor iOS e Scrum Master",
            },
            {
              name: "João Carvalho",
              role: "Desenvolvedor iOS",
            },
            {
              name: "Maria Eduarda",
              role: "Desenvolvedor iOS",
            },
            {
              name: "Vitor Martins",
              role: "Designer de UI/UX",
            },
          ],
          screenshots: [],
          icon: horizonIcon,
          color: "#EF4444",
        },
        {
          id: "stellar",
          title: "API Request",
          subtitle: "API App",
          description:
            "Plataforma SaaS completa com analytics em tempo real e gestão de dados para empresas modernas.",
          detailedDescription:
            "Dashboard completo para gestão empresarial com módulos de analytics, relatórios customizáveis e integrações com ferramentas populares. Interface intuitiva desenvolvida para escalar com o crescimento da empresa, processando milhões de transações diárias com performance otimizada.",
          tag: ["iOS App"],
          date: "2025",
          role: "Desenvolvedor iOS",
          technologies: [
            "React",
            "TypeScript",
            "Node.js",
            "MongoDB",
          ],
          skills: [
            "iOS Development",
            "API Integration",
            "Networking",
            "Problem Solving",
          ],
          team: [
            { name: "Jean Pierre", role: "Desenvolvedor iOS" },
            { name: "Bruna Marschner", role: "Desenvolvedor iOS" },
          ],
          screenshots: [],
          icon: stellarIcon,
          color: "#3B82F6",
        },
        {
          id: "aurora",
          title: "ConcursAI",
          subtitle: "Study App",
          description:
            "Rede social moderna focada em criadores de conteúdo com ferramentas de monetização integradas.",
          detailedDescription:
            "Plataforma social inovadora que conecta criadores de conteúdo com suas comunidades. Recursos incluem live streaming, marketplace integrado, sistema de assinaturas e ferramentas de analytics para creators. Mais de 500 mil usuários ativos mensalmente.",
          tag: ["iOS App"],
          date: "2025",
          role: "Desenvolvedor iOS",
          technologies: [
            "React",
            "Next.js",
            "PostgreSQL",
            "Redis",
          ],
          skills: [
            "iOS Development",
            "Educational Technology",
            "Data Management",
            "User Research",
          ],
          storeLinks: [
            {
              platform: "App Store",
              url: "https://apps.apple.com/br/app/concursai/id6747597258",
            },
          ],
          team: [
            { name: "Jean Pierre", role: "Desenvolvedor iOS" },
            { name: "Endrew Soares", role: "Desenvolvedor iOS" },
            { name: "Fernando Sulzbach", role: "Desenvolvedor iOS" },
            { name: "Leonel Ferraz", role: "Desenvolvedor iOS" },
            { name: "Rafa Julianotte", role: "Designer de UI/UX" },
          ],
          screenshots: [],
          icon: auroraIcon,
          color: "#10B981",
        },
      ],
    },
    about: {
      title: "Sobre Mim",
      content:
        "Prazer, me chamo Jean Pierre. Tenho 20 anos e moro na região metropolitana de Porto Alegre/RS. Sou apaixonado por tecnologia, música e por aprender coisas novas que me impulsionem a me desenvolver cada vez mais. Sou aluno da  Apple Developer Academy | PUCRS e possuo experiência de 2 anos na construção de aplicativos iOS.",
      skills: [
        "Interface Design",
        "React & TypeScript",
        "Design Systems",
        "Motion Design",
        "Acessibilidade",
        "Prototipagem",
      ],
    },
    skillsSection: {
      title: "Habilidades",
      hardTitle: "Habilidades Técnicas",
      softTitle: "Habilidades Comportamentais",
      hardSkills: [
        "Desenvolvimento iOS",
        "Swift / SwiftUI",
        "Integração de APIs",
        "Otimização de Performance",
        "Arquitetura (MVVM/Clean)",
        "Gerenciamento de Banco de Dados",
      ],
      softSkills: [
        "Comunicação",
        "Trabalho em equipe",
        "Liderança",
        "Pensamento crítico",
        "Organização",
        "Resolução de problemas",
      ],
    },
    contact: {
      title: "Vamos Conversar?",
      description:
        "Entre em contato comigo através das minhas redes:",
      email: "developerjeanpierre@gmail.com",
    },
    footer: {
      // text: "Feito com atenção aos detalhes",
    },
  },
  "en-US": {
    nav: {
      about: "About",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      greeting: "Hi, I'm",
      name: "Jean Pierre",
      role: "Desenvolvedor iOS e Mobile",
      description:
        "Turning ideas into apps, with full focus on the user.",
      viewWork: "View Work",
      getInTouch: "Get in Touch",
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
      items: [
        {
          id: "quantum",
          title: "Shiro.",
          subtitle: "Arcade Game",
          description:
            "Real-time data dashboard processing 50M+ daily events with interactive visualizations.",
          detailedDescription:
            "Real-time analytics platform developed to process and visualize large data volumes. Implements custom interactive charts, advanced filters, and report exports. The optimized architecture enables analysis of 50 million daily events with sub-100ms latency.",
          tag: ["iOS App", "Game"],
          date: "2025",
          role: "iOS Developer & Scrum Master",
          technologies: [
            "Next.js",
            "TypeScript",
            "Node.js",
            "PostgreSQL",
          ],
          skills: [
            "Game Development",
            "Game Design",
            "Scrum",
            "Team Leadership",
          ],
          storeLinks: [
            {
              platform: "App Store",
              url: "https://apps.apple.com/br/app/shiro/id6752502968",
            },
          ],
          team: [
            { name: "Jean Pierre", role: "iOS Developer & Scrum Master" },
            { name: "Vicenzo Masera", role: "iOS Developer" },
            { name: "Enzo Tonatto", role: "iOS Developer" },
            { name: "Bernardo Garcia", role: "iOS Developer" },
            { name: "Pedro Lima", role: "UI/UX Designer & PO" },
          ],
          screenshots: [],
          icon: quantumIcon,
          color: "#FACC15",
        },
        {
          id: "nebula",
          title: "Coffee Overflow",
          subtitle: "Game",
          description:
            "Complete system with 120+ components, used by product teams across 3 continents.",
          detailedDescription:
            "Complete design system built from scratch to unify product experience across a global tech company. Includes React component library, design tokens, interactive documentation, and automation tools. The system is used by over 200 designers and developers across 15 different teams, resulting in a 60% reduction in feature development time.",
          tag: ["iOS App", "Game"],
          date: "2025",
          role: "iOS Developer & Scrum Master",
          technologies: [
            "React",
            "TypeScript",
            "Figma",
            "Tailwind",
          ],
          skills: [
            "UI/UX Design",
            "Component Architecture",
            "Design Systems",
            "Agile Methodology",
          ],
          storeLinks: [
            {
              platform: "App Store",
              url: "https://apps.apple.com/br/app/coffee-overflow-neon-rhythm/id6760731874",
            },
          ],
          team: [
            { name: "Jean Pierre", role: "iOS Developer & Scrum Master" },
            { name: "Pablo Garcia", role: "iOS Developer" },
            { name: "Eduardo Ferrari", role: "iOS Developer & Audio Engineer" },
            { name: "Guilherme Ghise", role: "iOS Developer & PO" },
            { name: "Leonardo Monteiro", role: "UI/UX Designer" },
          ],
          screenshots: [],
          icon: nebulaIcon,
          color: "#A855F7",
        },
        {
          id: "horizon",
          title: "Oh My Grill!",
          subtitle: "Simulator Game",
          description:
            "Mobile-first experience for personal finance management with AI, 4.8★ on App Store.",
          detailedDescription:
            "Personal finance management mobile app with AI-powered features for automatic expense categorization, smart predictions, and personalized insights. Available for iOS and Android, with over 100k active users and 4.8-star average rating. The interface was designed to make financial management simple and accessible.",
          tag: ["iOS App", "Game"],
          date: "2025",
          role: "PO & iOS Developer",
          technologies: ["SwiftUI", "SpriteKit", "GameplayKit", "Multipeer Connectivity"],
          skills: [
            "Product Management",
            "iOS Development",
            "UI/UX Design",
            "Game Design",
          ],
          storeLinks: [
            {
              platform: "App Store",
              url: "https://apps.apple.com/br/app/oh-my-grill/id6756377473?l=en-GBOh My Grill!",
            },
          ],
          team: [
            {
              name: "Jean Pierre",
              role: "iOS Developer & PO",
            },
            {
              name: "Bárbara Dapper",
              role: "iOS Developer & Scrum Master",
            },
            {
              name: "João Carvalho",
              role: "iOS Developer",
            },
            {
              name: "Maria Eduarda",
              role: "iOS Developer",
            },
            {
              name: "Vitor Martins",
              role: "UI/UX Designer",
            },
          ],
          screenshots: [],
          icon: horizonIcon,
          color: "#EF4444",
        },
        {
          id: "stellar",
          title: "API Request",
          subtitle: "API App",
          description:
            "Complete SaaS platform with real-time analytics and data management for modern businesses.",
          detailedDescription:
            "Comprehensive business management dashboard with analytics modules, customizable reports, and integrations with popular tools. Intuitive interface designed to scale with company growth, processing millions of daily transactions with optimized performance.",
          tag: ["iOS App"],
          date: "2025",
          role: "iOS Developer",
          technologies: [
            "React",
            "TypeScript",
            "Node.js",
            "MongoDB",
          ],
          skills: [
            "iOS Development",
            "API Integration",
            "Networking",
            "Problem Solving",
          ],
          team: [
            { name: "Jean Pierre", role: "iOS Developer" },
            { name: "Bruna Marschner", role: "iOS Developer" },
          ],
          screenshots: [],
          icon: stellarIcon,
          color: "#3B82F6",
        },
        {
          id: "aurora",
          title: "ConcursAI",
          subtitle: "Study App",
          description:
            "Modern social network focused on content creators with integrated monetization tools.",
          detailedDescription:
            "Innovative social platform connecting content creators with their communities. Features include live streaming, integrated marketplace, subscription system, and analytics tools for creators. Over 500k monthly active users.",
          tag: ["iOS App"],
          date: "2025",
          role: "iOS Developer",
          technologies: [
            "React",
            "Next.js",
            "PostgreSQL",
            "Redis",
          ],
          skills: [
            "iOS Development",
            "Educational Technology",
            "Data Management",
            "User Research",
          ],
          storeLinks: [
            {
              platform: "App Store",
              url: "https://apps.apple.com/br/app/concursai/id6747597258",
            },
          ],
          team: [
            { name: "Jean Pierre", role: "iOS Developer" },
            { name: "Endrew Soares", role: "iOS Developer" },
            { name: "Fernando Sulzbach", role: "iOS Developer" },
            { name: "Leonel Ferraz", role: "iOS Developer" },
            { name: "Rafa Julianotte", role: "UI/UX Designer" },
          ],
          screenshots: [],
          icon: auroraIcon,
          color: "#10B981",
        },
      ],
    },
    about: {
      title: "About Me",
      content:
        "Nice to meet you, my name is Jean Pierre. I am 20 years old and live in the metropolitan region of Porto Alegre/RS, Brazil. I am passionate about technology, music, and learning new things that help me continuously grow. I am a student at the  Apple Developer Academy | PUCRS and have 2 years of experience building iOS applications.",
      skills: [
        "Interface Design",
        "React & TypeScript",
        "Design Systems",
        "Motion Design",
        "Accessibility",
        "Prototyping",
      ],
    },
    skillsSection: {
      title: "Skills",
      hardTitle: "Hard Skills",
      softTitle: "Soft Skills",
      hardSkills: [
        "iOS Development",
        "Swift / SwiftUI",
        "API Integration",
        "Performance Optimization",
        "Architecture (MVVM/Clean)",
        "Database Management",
      ],
      softSkills: [
        "Communication",
        "Teamwork",
        "Leadership",
        "Critical Thinking",
        "Organization",
        "Problem Solving",
      ],
    },
    contact: {
      title: "Let's Talk?",
      description:
        "Get in touch with me through my networks",
      email: "developerjeanpierre@gmail.com",
    },
    footer: {
      // text: "Crafted with attention to detail",
    },
  },
};

// Tech Tag Component
function TechTag({ tech }: { tech: string }) {
  return (
    <div
      className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#171717] border border-[#262626] text-xs text-[#A3A3A3]"
      style={{ fontWeight: 500 }}
    >
      <span>{tech}</span>
    </div>
  );
}

// Role Tag Component
function RoleTag({ role }: { role: string }) {
  return (
    <div
      className="inline-flex items-center px-4 py-2 rounded-full text-sm"
      style={{
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "rgba(59, 130, 246, 0.3)",
        color: "#93C5FD",
      }}
    >
      <span>{role}</span>
    </div>
  );
}

// Project Card Component
function ProjectCard({
  project,
  onClick,
  t,
}: {
  project: ProjectData;
  onClick: () => void;
  t: any;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="group relative p-10 lg:p-12 rounded-3xl bg-[#111111] border border-[#262626] hover:border-[#FACC15] transition-all duration-500 hover:scale-[1.01] cursor-pointer"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-2">
                {project.tag.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-block px-4 py-1.5 rounded-full bg-[#FACC15]/10 text-[#FACC15] text-xs uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {project.storeLinks &&
                project.storeLinks.length > 0 && (
                  <div className="flex gap-2">
                    {project.storeLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
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
            <p className="text-sm text-[#737373] mb-4">
              {project.subtitle}
            </p>
            <p className="text-lg text-[#A3A3A3] leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <TechTag key={idx} tech={tech} />
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

// Project Modal Component
function ProjectModal({
  project,
  onClose,
  t,
}: {
  project: ProjectData;
  onClose: () => void;
  t: any;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = "hidden";

    // Focus trap
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
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
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
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
          {/* Cover Image Placeholder */}
          {project.coverImage && (
            <div className="w-full h-64 rounded-2xl bg-gradient-to-br from-[#262626] via-[#171717] to-[#0A0A0A] mb-8" />
          )}

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-2">
                {project.tag.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-block px-4 py-1.5 rounded-full text-xs uppercase tracking-wider"
                    style={{
                      backgroundColor: `${project.color || "#FACC15"}10`,
                      color: project.color || "#FACC15",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-sm text-[#737373]">
                {project.date}
              </span>
            </div>
            <h2
              className="text-4xl lg:text-5xl tracking-tight text-[#F5F5F5] mb-2"
              style={{ fontWeight: 600 }}
            >
              {project.title}
            </h2>
            <p className="text-xl text-[#A3A3A3]">
              {project.subtitle}
            </p>
          </div>

          {/* Store Links */}
          {project.storeLinks &&
            project.storeLinks.length > 0 && (
              <div className="flex gap-3 mb-8">
                {project.storeLinks.map((link, idx) => (
                  <a
                    key={idx}
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
              {project.role
                .split(/\s*[&,]\s*/)
                .filter((r) => r.trim())
                .map((role, idx) => (
                  <RoleTag key={idx} role={role.trim()} />
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
              {project.technologies.map((tech, idx) => (
                <TechTag key={idx} tech={tech} />
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
                {project.skills.map((skill, idx) => (
                  <TechTag key={idx} tech={skill} />
                ))}
              </div>
            </div>
          )}

          {/* Team Section */}
          <div className="mb-8">
            <h3
              className="text-sm uppercase tracking-wider text-[#FFFFFF] mb-4"
              style={{ fontWeight: 500 }}
            >
              {t.projects.team}
            </h3>
            <div className="grid gap-3">
              {project.team.map((member, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#0A0A0A] border border-[#262626]"
                >
                  <div>
                    <p
                      className="text-base text-[#F5F5F5]"
                      style={{ fontWeight: 500 }}
                    >
                      {member.name}
                    </p>
                    <p className="text-sm text-[#A3A3A3]">
                      {member.role}
                    </p>
                  </div>
                  {member.profileUrl && (
                    <a
                      href={member.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full hover:bg-[#262626] transition-colors duration-300"
                    >
                      <ExternalLink
                        size={16}
                        className="text-[#A3A3A3]"
                      />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Screenshots (if available) */}
          {project.screenshots &&
            project.screenshots.length > 0 && (
              <div>
                <h3
                  className="text-sm uppercase tracking-wider text-[#FFFFFF] mb-4"
                  style={{ fontWeight: 500 }}
                >
                  {t.projects.screenshots}
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {project.screenshots.map(
                    (screenshot, idx) => (
                      <div
                        key={idx}
                        className="aspect-video rounded-2xl bg-[#0A0A0A] border border-[#262626]"
                      />
                    ),
                  )}
                </div>
              </div>
            )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Project Carousel Component
function ProjectCarousel({
  projects,
  t,
}: {
  projects: ProjectData[];
  t: any;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];

  // Navigate to project with infinite loop support
  const navigateToProject = (index: number) => {
    // Use modulo to create infinite loop behavior
    const normalizedIndex =
      ((index % projects.length) + projects.length) %
      projects.length;
    setActiveIndex(normalizedIndex);
  };

  // Navigate to next/previous project
  const navigateNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const navigatePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + projects.length) % projects.length,
    );
  };

  // Premium easing curve
  const premiumEase = [0.22, 1, 0.36, 1];

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveIndex(
          (prev) =>
            (prev - 1 + projects.length) % projects.length,
        );
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % projects.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [projects.length]);

  // Calculate position and styling for each card based on position relative to active
  const getCardTransform = (index: number) => {
    let position = index - activeIndex;

    // Handle wrap-around for infinite loop
    // If distance is more than half the array, it's closer going the other way
    const totalProjects = projects.length;
    if (position > totalProjects / 2) {
      position -= totalProjects;
    } else if (position < -totalProjects / 2) {
      position += totalProjects;
    }

    const isActive = position === 0;
    const isLeft = position === -1;
    const isRight = position === 1;

    // Only show cards in range: previous, current, next
    if (Math.abs(position) > 1) {
      return {
        x: position < 0 ? -800 : 800,
        scale: 0.7,
        opacity: 0,
        rotateY: 0,
        zIndex: 0,
        visible: false,
      };
    }

    if (isActive) {
      return {
        x: 0,
        scale: 1.1,
        opacity: 1,
        rotateY: 0,
        zIndex: 20,
        visible: true,
      };
    }

    if (isLeft) {
      return {
        x: -340,
        scale: 0.85,
        opacity: 0.45,
        rotateY: 12,
        zIndex: 10,
        visible: true,
      };
    }

    if (isRight) {
      return {
        x: 340,
        scale: 0.85,
        opacity: 0.45,
        rotateY: -12,
        zIndex: 10,
        visible: true,
      };
    }

    return {
      x: 0,
      scale: 0.7,
      opacity: 0,
      rotateY: 0,
      zIndex: 0,
      visible: false,
    };
  };

  return (
    <div className="space-y-12">
      {/* Centered Projects Carousel */}
      <div className="relative">
        {/* Carousel Track */}
        <div
          className="relative mx-auto h-[350px] flex items-center justify-center"
          style={{ perspective: "2000px" }}
        >
          {projects.map((project, index) => {
            const transform = getCardTransform(index);
            const isActive = index === activeIndex;

            // Determine position for click handler
            let position = index - activeIndex;
            const totalProjects = projects.length;
            if (position > totalProjects / 2) {
              position -= totalProjects;
            } else if (position < -totalProjects / 2) {
              position += totalProjects;
            }

            const handleCardClick = () => {
              if (position === -1) {
                // Left card - go to previous
                navigatePrev();
              } else if (position === 1) {
                // Right card - go to next
                navigateNext();
              } else if (position === 0) {
                // Active card - could trigger modal or do nothing
                // For now, do nothing (user can click detail panel to open modal)
              }
            };

            const projectColor = project.color || "#FACC15";

            return (
              <motion.button
                key={project.id}
                onClick={handleCardClick}
                className="absolute w-72 h-80 rounded-2xl border-2"
                animate={{
                  x: transform.x,
                  scale: transform.scale,
                  opacity: transform.opacity,
                  rotateY: transform.rotateY,
                  zIndex: transform.zIndex,
                  borderColor: isActive
                    ? projectColor
                    : "#262626",
                }}
                whileHover={{
                  scale: transform.visible
                    ? transform.scale + (isActive ? 0 : 0.03)
                    : transform.scale,
                  borderColor: isActive
                    ? projectColor
                    : "#525252",
                }}
                transition={{
                  duration: 0.7,
                  ease: premiumEase,
                }}
                style={{
                  transformStyle: "preserve-3d",
                  pointerEvents: transform.visible
                    ? "auto"
                    : "none",
                }}
              >
                {/* Card Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#171717] via-[#111111] to-[#0A0A0A] rounded-2xl" />

                {/* Subtle glow for active card */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute -inset-[3px] rounded-2xl -z-10 blur-xl"
                      style={{
                        backgroundColor: `${projectColor}10`,
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Card Content */}
                <div className="relative h-full p-8 flex flex-col items-center justify-center gap-6">
                  <motion.div
                    className="relative w-32 h-32 rounded-2xl overflow-hidden"
                    animate={{
                      opacity: isActive ? 1 : 0.7,
                      scale: isActive ? 1 : 0.9,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: premiumEase,
                    }}
                  >
                    {project.icon && (
                      <img
                        src={project.icon}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </motion.div>

                  <motion.h3
                    className="text-xl text-center tracking-tight"
                    style={{ fontWeight: 600 }}
                    animate={{
                      color: isActive
                        ? projectColor
                        : "#F5F5F5",
                      opacity: isActive ? 1 : 0.7,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: premiumEase,
                    }}
                  >
                    {project.title}
                  </motion.h3>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Carousel Indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {projects.map((project, index) => {
            const projectColor = project.color || "#FACC15";
            return (
              <motion.button
                key={index}
                onClick={() => navigateToProject(index)}
                className="rounded-full"
                animate={{
                  width: index === activeIndex ? 32 : 8,
                  height: 8,
                  backgroundColor:
                    index === activeIndex
                      ? projectColor
                      : "#262626",
                }}
                whileHover={{
                  backgroundColor:
                    index === activeIndex
                      ? projectColor
                      : "#525252",
                  scale: 1.1,
                }}
                transition={{
                  duration: 0.3,
                  ease: premiumEase,
                }}
                aria-label={`Go to project ${index + 1}`}
              />
            );
          })}
        </div>
      </div>

      {/* Project Detail Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: premiumEase }}
          className="relative p-10 lg:p-12 rounded-3xl bg-[#111111] border transition-all duration-500 group"
          style={{
            borderColor: "#262626",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor =
              activeProject.color || "#FACC15";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#262626";
          }}
        >
          {/* Project Badge - Top Right Corner */}
          {activeProject.id === "stellar" ? (
            <motion.a
              href="https://github.com/JPTR2189/API_Request"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.1,
                duration: 0.4,
                ease: premiumEase,
              }}
              whileHover={{ scale: 1.05 }}
              className="absolute top-6 right-6 lg:top-8 lg:right-8 z-20 inline-flex items-center gap-3.5 rounded-[10px] bg-white px-3 lg:px-3.5 py-5 h-[42px] shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:opacity-95 transition duration-200 ease-out cursor-pointer"
            >
              <img
                src={githubIcon}
                alt="GitHub"
                className="h-8 w-auto object-contain"
              />
              <div className="flex flex-col leading-[1.1]">
                <span className="text-[11px] font-medium text-black">
                  Available on the
                </span>
                <span className="text-[20px] font-semibold text-black">
                  GitHub
                </span>
              </div>
            </motion.a>
          ) : activeProject.storeLinks && activeProject.storeLinks.length > 0 ? (
            <motion.a
              href={activeProject.storeLinks[0].url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.1,
                duration: 0.4,
                ease: premiumEase,
              }}
              whileHover={{ scale: 1.05 }}
              className="absolute top-6 right-6 lg:top-8 lg:right-8 z-20 w-32 lg:w-36 hover:opacity-80 transition-opacity duration-200"
            >
              <img
                src={appStoreBadge}
                alt="Download on App Store"
                className="w-full h-auto object-contain"
              />
            </motion.a>
          ) : null}

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.1,
                  duration: 0.4,
                  ease: premiumEase,
                }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="flex gap-2">
                  {activeProject.tag.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-block px-4 py-1.5 rounded-full text-xs uppercase tracking-wider"
                      style={{
                        backgroundColor: `${activeProject.color || "#FACC15"}10`,
                        color: activeProject.color || "#FACC15",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-sm text-[#737373]">
                  {activeProject.date}
                </span>
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.15,
                  duration: 0.5,
                  ease: premiumEase,
                }}
                className="text-4xl lg:text-5xl tracking-tight text-[#F5F5F5] mb-2 transition-colors duration-300"
                style={{
                  fontWeight: 600,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color =
                    activeProject.color || "#FACC15";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#F5F5F5";
                }}
              >
                {activeProject.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.4,
                  ease: premiumEase,
                }}
                className="text-lg text-[#737373] mb-6"
              >
                {activeProject.subtitle}
              </motion.p>
            </div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.5,
              ease: premiumEase,
            }}
            className="text-lg text-[#D4D4D4] leading-relaxed mb-8"
          >
            {activeProject.detailedDescription}
          </motion.p>

          {/* Role */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.35,
              duration: 0.4,
              ease: premiumEase,
            }}
            className="mb-8"
          >
            <h4
              className="text-sm uppercase tracking-wider mb-4"
              style={{
                fontWeight: 500,
                color: "#FFFFFF",
              }}
            >
              {t.projects.myRole}
            </h4>
            <div className="flex flex-wrap gap-2">
              {activeProject.role
                .split(/\s*[&,]\s*/)
                .filter((r) => r.trim())
                .map((role, idx) => (
                  <RoleTag key={idx} role={role.trim()} />
                ))}
            </div>
          </motion.div>

          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.4,
              ease: premiumEase,
            }}
            className="mb-8"
          >
            <h4
              className="text-sm uppercase tracking-wider mb-4"
              style={{
                fontWeight: 500,
                color: "#FFFFFF",
              }}
            >
              {t.projects.technologies}
            </h4>
            <div className="flex flex-wrap gap-2">
              {activeProject.technologies.map((tech, idx) => (
                <motion.div
                  key={`${activeProject.id}-${tech}-${idx}`}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    delay: 0.45 + idx * 0.05,
                    duration: 0.3,
                    ease: premiumEase,
                  }}
                >
                  <TechTag tech={tech} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          {activeProject.skills &&
            activeProject.skills.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay:
                    0.45 +
                    activeProject.technologies.length * 0.05,
                  duration: 0.4,
                  ease: premiumEase,
                }}
                className="mb-8"
              >
                <h4
                  className="text-sm uppercase tracking-wider mb-4"
                  style={{
                    fontWeight: 500,
                    color: "#FFFFFF",
                  }}
                >
                  {t.projects.skills}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.skills.map((skill, idx) => (
                    <motion.div
                      key={`${activeProject.id}-skill-${idx}`}
                      initial={{
                        opacity: 0,
                        scale: 0.8,
                        y: 10,
                      }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        delay:
                          0.5 +
                          activeProject.technologies.length *
                            0.05 +
                          idx * 0.05,
                        duration: 0.3,
                        ease: premiumEase,
                      }}
                    >
                      <TechTag tech={skill} />
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
              delay:
                0.5 +
                activeProject.technologies.length * 0.05 +
                (activeProject.skills?.length || 0) * 0.05,
              duration: 0.4,
              ease: premiumEase,
            }}
          >
            <h4
              className="text-sm uppercase tracking-wider mb-4"
              style={{
                fontWeight: 500,
                color: "#FFFFFF",
              }}
            >
              {t.projects.team}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {activeProject.team.map((member, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay:
                      0.65 +
                      activeProject.technologies.length * 0.05 +
                      (activeProject.skills?.length || 0) *
                        0.05 +
                      idx * 0.06,
                    duration: 0.3,
                    ease: premiumEase,
                  }}
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#0A0A0A] border border-[#262626]"
                >
                  <div>
                    <p
                      className="text-sm text-[#F5F5F5]"
                      style={{ fontWeight: 500 }}
                    >
                      {member.name}
                    </p>
                    <p className="text-xs text-[#737373]">
                      {member.role}
                    </p>
                  </div>
                  {member.profileUrl && (
                    <a
                      href={member.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-full hover:bg-[#262626] transition-colors duration-300"
                    >
                      <ExternalLink
                        size={14}
                        className="text-[#737373]"
                      />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Click to view more hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay:
                0.7 +
                activeProject.technologies.length * 0.05 +
                (activeProject.skills?.length || 0) * 0.05 +
                activeProject.team.length * 0.06,
              duration: 0.4,
            }}
            className="absolute bottom-6 right-6 text-xs transition-colors duration-300"
            style={{
              color: "#525252",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color =
                activeProject.color || "#FACC15";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#525252";
            }}
          >
            {/* {t.projects.clickForMore ||
              "Click for full details"} */}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [language, setLanguage] = useState<Language>("pt-BR");
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<ProjectData | null>(null);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(
    scrollYProgress,
    [0, 0.5],
    [0, 100],
  );
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1, 0],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) =>
      prev === "pt-BR" ? "en-US" : "pt-BR",
    );
  };

  const t = translations[language];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0A0A0A] transition-colors duration-500 relative scroll-snap-y-mandatory overflow-y-scroll">
      {/* Accessibility: Disable scroll snapping for reduced motion */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media (prefers-reduced-motion: reduce) {
            .scroll-snap-y-mandatory {
              scroll-snap-type: none !important;
            }
          }
          @media (max-width: 767px) {
            .scroll-snap-y-mandatory {
              scroll-snap-type: y proximity;
            }
          }
        `
      }} />
      {/* Background Grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #262626 1px, transparent 1px), linear-gradient(to bottom, #262626 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* Fixed Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-[#262626]"
      >
        <div className="max-w-[88rem] mx-auto pl-6 pr-4 lg:pl-12 lg:pr-6 h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg tracking-tight text-[#F5F5F5] font-semibold"
          >
            JP
          </motion.div>

          <nav className="ml-auto flex items-center gap-8">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => scrollToSection("about")}
              className="text-sm text-[#A3A3A3] hover:text-[#FACC15] transition-colors duration-300"
            >
              {t.nav.about}
            </motion.button>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              onClick={() => scrollToSection("projects")}
              className="text-sm text-[#A3A3A3] hover:text-[#FACC15] transition-colors duration-300"
            >
              {t.nav.projects}
            </motion.button>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => scrollToSection("contact")}
              className="text-sm text-[#A3A3A3] hover:text-[#FACC15] transition-colors duration-300"
            >
              {t.nav.contact}
            </motion.button>

            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-[#262626]">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                onClick={toggleLanguage}
                className="p-2 rounded-lg hover:bg-[#171717] transition-colors duration-300"
                aria-label="Toggle language"
              >
                <Globe size={18} className="text-[#A3A3A3]" />
              </motion.button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-32 pb-24 lg:pt-44 lg:pb-32 px-6 lg:px-12 max-w-7xl mx-auto relative overflow-visible">
        {/* Decorative Elements */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            delay: 0.5,
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute top-32 left-0 w-16 h-px bg-[#262626] origin-left"
        />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{
            delay: 0.6,
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute top-32 left-0 w-px h-16 bg-[#262626] origin-top"
        />

        <div className="relative">
          {/* Main Content */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column - Text */}
            <div className="lg:col-span-7 relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.6,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-flex items-center gap-2 mb-8"
              >
                <div className="w-2 h-2 rounded-full bg-[#FACC15]" />
                <span className="text-xs uppercase tracking-[0.2em] text-[#737373]">
                  {t.hero.greeting}
                </span>
              </motion.div>

              {/* Oversized Editorial Title */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.7,
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mb-10"
              >
                <h1
                  className="text-[clamp(3.5rem,12vw,10rem)] leading-[0.88] tracking-[-0.02em] text-[#F5F5F5] mb-2"
                  style={{ fontWeight: 700 }}
                >
                  Jean
                </h1>
                <h1
                  className="text-[clamp(3.5rem,12vw,10rem)] leading-[0.88] tracking-[-0.02em] text-[#FACC15] mb-2"
                  style={{ fontWeight: 700 }}
                >
                  Pierre
                </h1>
              </motion.div>

              {/* Role with Yellow Accent */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.85,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mb-8"
              >
                <p
                  className="text-2xl lg:text-3xl xl:text-4xl tracking-tight leading-tight"
                  style={{ fontWeight: 500 }}
                >
                  <span className="text-[#FACC15]">iOS</span>
                  <span className="text-[#D4D4D4]">
                    {" "}
                    & Mobile Developer
                  </span>
                </p>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.95,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-base lg:text-lg text-[#A3A3A3] mb-12 max-w-lg leading-relaxed"
              >
                {t.hero.description}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.05,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-wrap gap-4 mb-12"
              >
                <button
                  onClick={() => scrollToSection("projects")}
                  className="px-8 py-4 bg-[#FACC15] text-[#0A0A0A] rounded-full hover:bg-[#FDE047] transition-all duration-300 font-medium"
                >
                  {t.hero.viewWork}
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-8 py-4 bg-transparent border-2 border-[#262626] text-[#F5F5F5] rounded-full hover:border-[#FACC15] hover:text-[#FACC15] transition-all duration-300 font-medium"
                >
                  {t.hero.getInTouch}
                </button>
              </motion.div>
            </div>

            {/* Right Column - Visual & Floating Cards */}
            <div className="lg:col-span-5 relative">
              {/* Main Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 0.8,
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative"
              >
                <div className="aspect-[4/5] rounded-2xl overflow-hidden relative border border-[#262626] shadow-xl">
                  <img src={heroPhoto} alt="Jean Pierre" className="w-full h-full object-cover object-center" />
                  {/* Light dark overlay */}
                  <div className="absolute inset-0 bg-black/20" />
                  {/* Yellow accent corner */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 bg-[#FACC15]"
                    style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }}
                  />
                </div>

                {/* Decorative line extending from image */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    delay: 1.2,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute -bottom-4 left-0 right-0 h-px bg-gradient-to-r from-[#262626] via-[#262626]/50 to-transparent origin-left"
                />
              </motion.div>


            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-24 px-6 lg:px-12 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <h2
            className="text-5xl lg:text-6xl tracking-tight text-[#F5F5F5] mb-20"
            style={{ fontWeight: 600 }}
          >
            {t.projects.title}
          </h2>
          <ProjectCarousel
            projects={t.projects.items}
            t={t}
          />
        </motion.div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-32 px-6 lg:px-12 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="grid lg:grid-cols-12 gap-12 lg:gap-32 items-center"
        >
          <div className="lg:col-span-5">
            <h2
              className="text-5xl lg:text-6xl tracking-tight text-[#F5F5F5] mb-8"
              style={{ fontWeight: 600 }}
            >
              {t.about.title}
            </h2>
            <p className="text-lg lg:text-xl text-[#D4D4D4] leading-relaxed">
              {t.about.content}
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-7 w-full max-w-[450px] mx-auto lg:justify-self-end lg:-translate-x-20"
          >
            <img
              src={aboutImage}
              alt="About Jean Pierre"
              className="w-full h-auto rounded-[18px] object-cover shadow-xl border border-[#262626]"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="py-20 lg:py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <h2
            className="text-4xl lg:text-5xl tracking-tight text-[#F5F5F5] mb-12"
            style={{ fontWeight: 600 }}
          >
            {t.skillsSection.title}
          </h2>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Hard Skills */}
            <div>
              <h3
                className="text-xl lg:text-2xl tracking-tight text-[#F5F5F5] mb-8"
                style={{ fontWeight: 600 }}
              >
                {t.skillsSection.hardTitle}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {t.skillsSection.hardSkills.map((skill: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.05,
                      duration: 0.4,
                    }}
                    className="inline-block px-4 py-2 rounded-full bg-[#171717] border border-[#262626] text-sm text-[#A3A3A3] hover:border-[#525252] transition-all duration-300"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div>
              <h3
                className="text-xl lg:text-2xl tracking-tight text-[#F5F5F5] mb-8"
                style={{ fontWeight: 600 }}
              >
                {t.skillsSection.softTitle}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {t.skillsSection.softSkills.map((skill: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.05,
                      duration: 0.4,
                    }}
                    className="inline-block px-4 py-2 rounded-full bg-[#171717] border border-[#262626] text-sm text-[#A3A3A3] hover:border-[#525252] transition-all duration-300"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-32 px-6 lg:px-12 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative p-16 lg:p-20 rounded-3xl bg-gradient-to-br from-[#171717] via-[#111111] to-[#0A0A0A] overflow-hidden border border-[#262626]"
        >
          <div className="relative z-10 max-w-2xl">
            <h2
              className="text-5xl lg:text-6xl tracking-tight text-[#F5F5F5] mb-6"
              style={{ fontWeight: 700 }}
            >
              {t.contact.title}
            </h2>
            <p className="text-xl text-[#D4D4D4] mb-12 leading-relaxed">
              {t.contact.description}
            </p>
            <div className="flex flex-col gap-6">
              <a
                href={`mailto:${t.contact.email}`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#FACC15] text-[#0A0A0A] rounded-full hover:bg-[#FDE047] transition-all duration-300 w-fit"
                style={{ fontWeight: 500 }}
                aria-label="Send email"
              >
                <Mail size={20} />
                {t.contact.email}
              </a>
              <div className="flex flex-wrap gap-4 items-center">
                <a
                  href="https://www.linkedin.com/in/jeanpierrerodrigues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-[#262626] text-[#F5F5F5] rounded-full hover:border-[#FACC15] hover:text-[#FACC15] transition-all duration-300"
                  style={{ fontWeight: 500 }}
                  aria-label="Visit LinkedIn profile"
                >
                  <Linkedin size={20} />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/JPTR2189"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-[#262626] text-[#F5F5F5] rounded-full hover:border-[#FACC15] hover:text-[#FACC15] transition-all duration-300"
                  style={{ fontWeight: 500 }}
                  aria-label="Visit GitHub profile"
                >
                  <Github size={20} />
                  GitHub
                </a>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FACC15]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-[#262626]/20 rounded-full blur-3xl" />
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-12 border-t border-[#262626]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <p className="text-sm text-[#525252]">
            © {new Date().getFullYear()} Jean Pierre
          </p>
          <p className="text-sm text-[#525252]">
            {t.footer.text}
          </p>
        </div>
      </footer>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            t={t}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
