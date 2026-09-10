import type { Project } from "../types";
import { projectBases } from "./projects.shared";

export const projectsPtBR: Project[] = [
  {
    ...projectBases.portalRunes,
    tags: ["Vision Pro", "Realidade Mista"],
    subtitle: "Experiência Imersiva para Apple Vision Pro",
    description:
      "Um ritual de realidade mista em que gestos, elementos 3D e áudio espacial transformam seu ambiente em um desafio com portais e runas.",
    detailedDescription:
      "Experiência imersiva desenvolvida para o Apple Vision Pro, na qual o usuário transforma seu ambiente em um espaço ritualístico onde um misterioso portal de pedra ganha vida. O app utiliza hand tracking para interações mágicas naturais, escaneamento de ambiente para integrar a experiência ao espaço real do usuário, runas interativas e mecânicas de gestos para invocar uma bola de fogo, além de áudio espacial e efeitos visuais atmosféricos guiados por um tutorial interativo.",
    role: "Desenvolvedor iOS",
    skills: [
      "Realidade Aumentada",
      "Rastreamento de Mãos",
      "Áudio Espacial",
      "Modelagem 3D",
    ],
    team: [
      { name: "Jean Pierre", role: "Desenvolvedor iOS" },
      { name: "Vinicius Cadore", role: "Designer de UI/UX" },
      { name: "Gabriel Kowaleski", role: "Desenvolvedor iOS" },
      { name: "Bruna Marschner", role: "Desenvolvedor iOS" },
    ],
  },
  {
    ...projectBases.shiro,
    tags: ["App iOS", "Jogo"],
    subtitle: "Arcade Game",
    description:
      "Arcade clássico em que você assume o papel de um escalador em uma jornada vertical implacável.",
    detailedDescription:
      "Neste arcade clássico, você assume o papel de um escalador em uma jornada vertical implacável. Com controles precisos e ritmo acelerado, o jogador deve desviar de avalanches e troncos estrategicamente posicionados para impedir seu progresso. Você é capaz de guiar nosso herói através dos perigos da neve e conquistar o topo da montanha?",
    role: "Desenvolvedor iOS & Scrum Master",
    skills: [
      "Desenvolvimento de Jogos",
      "Design de Jogos",
      "Otimização de Performance",
      "Scrum",
      "Liderança de Equipe",
    ],
    team: [
      { name: "Jean Pierre", role: "Desenvolvedor iOS e Scrum Master" },
      { name: "Vicenzo Masera", role: "Desenvolvedor iOS" },
      { name: "Enzo Tonatto", role: "Desenvolvedor iOS" },
      { name: "Bernardo Garcia", role: "Desenvolvedor iOS" },
      { name: "Pedro Lima", role: "Designer de UI/UX e PO" },
    ],
  },
  {
    ...projectBases.coffeeOverflow,
    tags: ["App iOS", "Jogo"],
    subtitle: "Ritmo e Coordenação",
    description:
      "Uma mistura inusitada entre café, música e tecnologia, no ritmo de uma trilha sonora frenética.",
    detailedDescription:
      "Uma mistura inusitada entre café, música e tecnologia. O jogo coloca você no papel de um barista que deve saciar o desejo insaciável dos programadores por café, ao mesmo tempo em que equilibra a bandeja com as xícaras que caem de um globo de dança tecnológico. Tudo isso deve ser feito em sintonia com passos de dança sincronizados a uma trilha sonora frenética e animada. Mantenha o ritmo, equilibre o café e curta a festa!",
    role: "Desenvolvedor iOS & Scrum Master",
    skills: [
      "Design de UI/UX",
      "Arquitetura de Componentes",
      "Design Systems",
      "Scrum",
    ],
    team: [
      { name: "Jean Pierre", role: "Desenvolvedor iOS e Scrum Master" },
      { name: "Pablo Garcia", role: "Desenvolvedor iOS" },
      { name: "Eduardo Ferrari", role: "Desenvolvedor iOS e Engenheiro de Áudio" },
      { name: "Guilherme Ghise", role: "Desenvolvedor iOS e PO" },
      { name: "Leonardo Monteiro", role: "Designer de UI/UX" },
    ],
  },
  {
    ...projectBases.ohMyGrill,
    tags: ["App iOS", "Jogo"],
    subtitle: "Simulador de Hamburgueria",
    description:
      "Um simulador de hamburgueria caótico e divertido onde o trabalho em equipe é a chave.",
    detailedDescription:
      "Um simulador de hamburgueria caótico e divertido onde o trabalho em equipe é a chave. Gerencie uma cozinha com até quatro jogadores, coordenando tarefas sob pressão: fritar batatas, preparar ingredientes e montar pedidos com precisão. Será que você e sua equipe conseguem entregar o hambúrguer perfeito antes que o tempo se esgote?",
    role: "PO & Desenvolvedor iOS",
    skills: [
      "Gestão de Produto",
      "Desenvolvimento iOS",
      "Design de UI/UX",
      "Design de Jogos",
    ],
    team: [
      { name: "Jean Pierre", role: "Desenvolvedor iOS e PO" },
      { name: "Bárbara Dapper", role: "Desenvolvedor iOS e Scrum Master" },
      { name: "João Carvalho", role: "Desenvolvedor iOS" },
      { name: "Maria Eduarda", role: "Desenvolvedor iOS" },
      { name: "Vitor Martins", role: "Designer de UI/UX" },
    ],
  },
  {
    ...projectBases.apiRequest,
    tags: ["App iOS"],
    subtitle: "Integração e E-commerce",
    description:
      "Aplicativo focado na experiência de compra moderna, demonstrando o consumo de APIs externas de forma fluida.",
    detailedDescription:
      "Aplicativo focado na experiência de compra moderna, desenvolvido para demonstrar o consumo de APIs externas de forma fluida. O projeto gerencia o fluxo completo do usuário, desde a navegação em catálogos dinâmicos até funcionalidades avançadas como sistema de favoritos, persistência de dados para salvamento de itens e um checkout simulado e intuitivo.",
    role: "Desenvolvedor iOS",
    skills: [
      "Desenvolvimento iOS",
      "Integração de APIs",
      "Comunicação em Rede",
      "Resolução de Problemas",
    ],
    team: [
      { name: "Jean Pierre", role: "Desenvolvedor iOS" },
      { name: "Bruna Marschner", role: "Desenvolvedor iOS" },
    ],
  },
  {
    ...projectBases.concursAi,
    tags: ["App iOS"],
    subtitle: "Educação e Tecnologia",
    description:
      "Plataforma inteligente voltada para a otimização de estudos para concursos públicos.",
    detailedDescription:
      "Plataforma inteligente voltada para a otimização de estudos para concursos públicos. O aplicativo resolve a dor da revisão de conteúdos extensos através da geração de quizzes personalizados, permitindo que o estudante identifique lacunas no aprendizado e reforce o conhecimento de maneira ativa e dinâmica.",
    role: "Desenvolvedor iOS",
    skills: [
      "Desenvolvimento iOS",
      "Tecnologia Educacional",
      "Gerenciamento de Dados",
      "Pesquisa com Usuários",
    ],
    team: [
      { name: "Jean Pierre", role: "Desenvolvedor iOS" },
      { name: "Endrew Soares", role: "Desenvolvedor iOS" },
      { name: "Fernando Sulzbach", role: "Desenvolvedor iOS" },
      { name: "Leonel Ferraz", role: "Desenvolvedor iOS" },
      { name: "Rafa Julianotte", role: "Designer de UI/UX" },
    ],
  },
];
