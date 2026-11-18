export const ptBR = {
  nav: {
    about: "Sobre",
    projects: "Projetos",
    contact: "Contato",
  },
  hero: {
    greeting: "Olá, sou",
    description: "Transformando ideias em aplicativos.",
    viewWork: "Ver Projetos",
    getInTouch: "Entrar em Contato",
  },
  assistant: {
    greeting: "Oi! Eu sou a Lumi, a inteligência que o Jean criou pra te apresentar o trabalho dele.",
    runCall: "Pra te mostrar o portfólio dele, primeiro preciso compilar. Aperta o Run?",
    run: "Run",
    runHint: "ou aperte Enter",
    bugCall: "Ih… um bug escapou no meio do build. Me ajuda a pegar ele antes que o Jean perceba?",
    bugHunt: "Lá vai ele! Pega o bichinho vermelho.",
    miss1: "Quase! Ele é mais rápido do que parece.",
    miss2: "Esse bug é bem treinado… tenta de novo!",
    miss3: "Ele tá cansando. Agora é a sua chance!",
    bugCaught: "Boa! Agora vou tentar recompilar o projeto.",
    outro: "Perfeito, tudo pronto. Compilando o portfólio…",
    build: {
      running: "Compilando portfólio…",
      issue: "1 bug escapou em Portfolio.swift:42",
      launching: "Abrindo Portfolio.app…",
    },
    skip: "Pular",
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
      "Prazer, me chamo Jean Pierre. Tenho 20 anos e moro na região metropolitana de Porto Alegre/RS. Sou uma pessoa comunicativa, apaixonada por tecnologia, música e por entender como as coisas funcionam. Hoje sou desenvolvedor iOS e tenho 2 anos de experiência na Apple Developer Academy | PUCRS, onde pude criar e publicar aplicativos na App Store, trabalhando em equipe e aplicando práticas alinhadas ao mercado de trabalho nos projetos. Atualmente, curso Análise e Desenvolvimento de Sistemas na PUCRS e Engenharia de Software na UNINTER. Minha curiosidade e vontade de aprender me impulsionam a novos desafios e a me aprimorar cada vez mais como futuro Engenheiro de Software. Estou animado para contribuir com minha energia e criatividade em novos times e projetos.",
  },
  skillsSection: {
    title: "Habilidades",
    groups: {
      development: {
        title: "Desenvolvimento",
        skills: [
          "Desenvolvimento iOS",
          "MVVM",
          "TCA",
          "MVC",
          "Integração de APIs",
          "Back-end",
          "Testes de Software",
          "Machine Learning",
          "Análise de Dados",
        ],
      },
      languages: {
        title: "Linguagens",
        skills: ["Swift", "Python", "Java", "JavaScript", "SQL", "Flutter"],
      },
      tools: {
        title: "Ferramentas e Processos",
        skills: ["Git", "Scrum", "Linux", "Desenvolvimento com IA"],
      },
      soft: {
        title: "Comportamentais",
        skills: [
          "Comunicação",
          "Trabalho em equipe",
          "Liderança",
          "Pensamento crítico",
          "Organização",
          "Resolução de problemas",
        ],
      },
    },
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
    catchBug: "Pegar o bug",
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
