export const ptBR = {
  nav: {
    about: "Sobre",
    projects: "Projetos",
    contact: "Contato",
  },
  hero: {
    greeting: "Olá, sou",
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
  },
  about: {
    title: "Sobre Mim",
    content:
      "Prazer, me chamo Jean Pierre. Tenho 20 anos e moro na região metropolitana de Porto Alegre/RS. Sou apaixonado por tecnologia, música e por aprender coisas novas que me impulsionem a me desenvolver cada vez mais. Sou aluno da Apple Developer Academy | PUCRS e possuo experiência de 2 anos na construção de aplicativos iOS.",
  },
  skillsSection: {
    title: "Habilidades",
    hardTitle: "Habilidades Técnicas",
    softTitle: "Habilidades Comportamentais",
    hardSkills: [
      "Desenvolvimento iOS",
      "Swift / SwiftUI",
      "Integração de APIs",
      "TCA",
      "MVVM",
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
    description: "Entre em contato comigo através das minhas redes:",
    email: "developerjeanpierre@gmail.com",
  },
  meta: {
    title: "Jean Pierre — Desenvolvedor iOS",
  },
  a11y: {
    toggleLanguage: "Alternar idioma",
    sendEmail: "Enviar e-mail",
    visitLinkedin: "Visitar perfil no LinkedIn",
    visitGithub: "Visitar perfil no GitHub",
    goToProject: "Ir para o projeto",
    aboutPhotoAlt: "Foto de Jean Pierre",
    appStoreBadgeAlt: "Baixar na App Store",
  },
};

/**
 * Shape shared by every locale. The pt-BR locale is the source of truth;
 * other locales must provide exactly the same keys.
 */
export type Translation = typeof ptBR;
