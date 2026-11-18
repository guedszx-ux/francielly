/**
 * ============================================================================
 *  FRANCIELLY — Um capítulo bonito da nossa história.
 *  ARQUIVO ÚNICO DE PERSONALIZAÇÃO
 * ============================================================================
 *
 *  Tudo o que pode ser trocado (textos, fotos, legendas e música) está aqui.
 *
 *  COMO ADICIONAR UMA FOTO
 *  1. Coloque o arquivo na pasta  public/images/   (ex.: public/images/casal-01.jpg)
 *  2. No item correspondente abaixo, troque   src: null
 *     por                                     src: "/images/casal-01.jpg"
 *  3. (Opcional) escreva uma legenda em  legenda: "..."
 *  Enquanto  src  for null, o site mostra um espaço reservado elegante — nunca uma imagem quebrada.
 *
 *  COMO ADICIONAR A MÚSICA
 *  1. Coloque a música em  public/music/   (ex.: public/music/get-you.m4a)
 *  2. Preenchido:  backgroundMusic: "/music/get-you.m4a"
 *  Com o campo vazio, o controle de música fica oculto.
 * ============================================================================
 */

export type Foto = {
  /** Caminho a partir de /public. Ex.: "/images/casal-01.jpg". Use null até ter a foto. */
  src: string | null;
  /** Descrição da foto para leitores de tela. */
  alt: string;
  /** Legenda opcional. Deixe "" para não exibir. */
  legenda: string;
};

export type CategoriaAlbum = "francielly" | "nos-dois" | "ivy" | "familia";

export const experiencia = {
  homenageada: "Francielly",
  dataAniversario: "18 de novembro de 2026",
  inicioRelacionamento: { mes: "fevereiro", ano: 2023 },
  filha: { nome: "Ivy", idade: "9 meses" },
  autor: "Pablo Guedes",

  /** 🎵 MÚSICA — caminho do áudio dentro de /public. Ex.: "/music/get-you.m4a" */
  backgroundMusic: "/music/get-you.m4a",
  /** Volume inicial da música (0 a 1). */
  volumeInicial: 0.55,

  abertura: {
    data: "18 NOVEMBRO 2026",
    titulo: "Fiz uma coisa especial para você...",
    subtitulo: "Porque algumas pessoas merecem muito mais do que apenas um feliz aniversário.",
    texto: "Preparei cada detalhe pensando em você.",
    assinatura: "Para Francielly, com todo o meu amor.",
    botao: "ABRIR MEU PRESENTE",
  },

  dedicatoria: {
    capitulo: "Capítulo I",
    titulo: "Hoje o dia é inteiramente seu.",
    destaque: "inteiramente seu.",
    paragrafos: [
      "Francielly, hoje é o seu dia.",
      "E eu queria encontrar uma maneira diferente de demonstrar o quanto você é especial para mim.",
      "Por isso, preparei este pequeno universo, com muito carinho, pensando em você.",
      "Cada detalhe foi pensado para tornar esse momento especial e deixar registrado algo que às vezes as palavras não conseguem explicar: o quanto sua presença é importante na minha vida.",
      "Hoje é dia de celebrar você, sua vida, seus sonhos e tudo de bonito que ainda está por vir.",
    ],
    fechamento: "Feliz aniversário, meu amor.",
    // 📷 Foto de destaque da Francielly → public/images/casal-01.jpg
    foto: { src: "/images/casal-01.jpg", alt: "Pablo e Francielly juntos", legenda: "" } as Foto,
  },

  historia: {
    capitulo: "Capítulo II",
    titulo: "Uma história que começou em fevereiro de 2023.",
    destaque: "fevereiro de 2023.",
    marcos: [
      {
        rotulo: "FEVEREIRO DE 2023",
        texto: "O começo de uma história que ainda está sendo escrita.",
        // 📷 → public/images/casal-01.jpg
        foto: { src: "/images/casal-03.jpg", alt: "Pablo e Francielly em um momento juntos", legenda: "" } as Foto,
      },
      {
        rotulo: "NOSSA FAMÍLIA",
        texto:
          "A vida nos trouxe um presente que mudou tudo e tornou nossa história ainda mais especial: nossa pequena Ivy.",
        // 📷 → public/images/historia-familia.jpg
        foto: { src: "/images/familia-01.jpg", alt: "Pablo, Francielly e Ivy", legenda: "" } as Foto,
      },
      {
        rotulo: "NOVEMBRO DE 2026",
        texto:
          "Mais um aniversário seu, mais uma oportunidade de celebrar a mulher que amo e tudo aquilo que estamos construindo juntos.",
        // 📷 → public/images/historia-aniversario.jpg
        foto: { src: "/images/casal-02.jpg", alt: "Pablo e Francielly", legenda: "" } as Foto,
      },
    ],
  },

  familia: {
    capitulo: "Capítulo III",
    titulo: "De uma história de amor nasceu uma família.",
    subtitulo: "E hoje temos algo ainda mais bonito para chamar de nosso.",
    paragrafos: [
      "Em fevereiro de 2023, começamos a escrever nossa história.",
      "Com o tempo, essa história ganhou novos significados, novos sonhos e um amor ainda maior.",
      "Então chegou a Ivy.",
      "Nossa pequena, que hoje tem 9 meses e transformou tantas coisas em nossas vidas.",
      "Ela é um dos presentes mais preciosos que poderíamos receber.",
      "E, Francielly, quando olho para você e para a nossa pequena, vejo uma das coisas mais bonitas que a vida poderia me proporcionar: a nossa família.",
      "Ver a família que estamos construindo é algo que merece ser celebrado todos os dias.",
      "Você é uma parte essencial de tudo isso.",
      "Obrigado por compartilhar comigo esse capítulo tão especial da vida.",
    ],
    /** Parágrafo exibido com destaque tipográfico. */
    paragrafoEmDestaque: "Então chegou a Ivy.",
    frase: "Agora somos três. E essa é uma das histórias mais bonitas que a vida me permitiu viver.",
    fotos: {
      // 📷 Foto principal grande dos três juntos → public/images/familia-01.jpg
      principal: { src: "/images/familia-01.jpg", alt: "Pablo, Francielly e Ivy juntos", legenda: "" } as Foto,
      // 📷 Francielly com Ivy → public/images/francielly-ivy.jpg
      franciellyComIvy: { src: "/images/francielly-ivy.jpg", alt: "Francielly com a pequena Ivy", legenda: "" } as Foto,
      // 📷 Ivy → public/images/ivy.jpg
      ivy: { src: "/images/ivy.jpg", alt: "Nossa pequena Ivy", legenda: "" } as Foto,
      // 📷 Nós três → public/images/familia-02.jpg
      nosTres: { src: "/images/familia-03.jpg", alt: "Pablo, Francielly e Ivy", legenda: "" } as Foto,
    },
  },

  jogo: {
    capitulo: "Capítulo IV",
    titulo: "Cinco pequenos motivos para sorrir.",
    apresentacao: [
      "Preparei algumas pequenas surpresas escondidas por aqui.",
      "Encontre os cinco corações e descubra algumas das coisas que fazem você ser tão especial para mim.",
    ],
    mensagens: [
      "Seu sorriso é uma das minhas coisas favoritas.",
      "Sua presença torna meus dias mais especiais.",
      "Você merece ser celebrada todos os dias.",
      "Sou feliz por compartilhar essa história com você.",
      "Meu presente favorito é ter você na minha vida.",
    ],
    finalizacao: {
      primeira: "Você encontrou todos os pedacinhos do meu amor...",
      segunda: "Mas ainda falta descobrir a surpresa mais importante.",
      botao: "DESCOBRIR A SURPRESA FINAL",
    },
  },

  album: {
    capitulo: "Capítulo V",
    titulo: "Alguns momentos merecem ficar para sempre.",
    categorias: [
      { id: "francielly", nome: "Francielly" },
      { id: "nos-dois", nome: "Nós dois" },
      { id: "ivy", nome: "Nossa pequena Ivy" },
      { id: "familia", nome: "Nossa família" },
    ] as { id: CategoriaAlbum; nome: string }[],
    // 📷 Oito espaços do álbum → public/images/album-01.jpg ... album-08.jpg
    fotos: [
      { categoria: "francielly", src: "/images/casal-01.jpg", alt: "Francielly e Pablo juntos", legenda: "" },
      { categoria: "nos-dois", src: "/images/casal-02.jpg", alt: "Pablo e Francielly", legenda: "" },
      { categoria: "ivy", src: "/images/ivy.jpg", alt: "Ivy", legenda: "" },
      { categoria: "familia", src: "/images/familia-01.jpg", alt: "Pablo, Francielly e Ivy", legenda: "" },
      { categoria: "nos-dois", src: "/images/casal-03.jpg", alt: "Pablo e Francielly", legenda: "" },
      { categoria: "familia", src: "/images/familia-02.jpg", alt: "Nossa família", legenda: "" },
      { categoria: "familia", src: "/images/familia-03.jpg", alt: "Nossa família", legenda: "" },
      { categoria: "familia", src: "/images/familia-04.jpg", alt: "Nossa família", legenda: "" },
    ] as (Foto & { categoria: CategoriaAlbum })[],
  },

  carta: {
    capitulo: "Capítulo VI",
    convite: "Francielly, existe uma coisa que eu queria te dizer...",
    botao: "ABRIR MINHA CARTA",
    saudacao: "Meu amor,",
    paragrafos: [
      "Hoje é o seu dia, e eu não poderia deixar essa data passar sem fazer algo diferente para você.",
      "Desde fevereiro de 2023, estamos escrevendo uma história juntos. Uma história que continua sendo construída, com momentos, aprendizados e sentimentos que fazem parte de nós.",
      "Eu queria que você soubesse o quanto é especial para mim. Não apenas hoje, no seu aniversário, mas em todos os dias.",
      "Você merece carinho, felicidade, respeito, amor e todas as coisas bonitas que a vida pode proporcionar.",
      "E hoje, olhando para nós e para a nossa pequena Ivy, percebo que nossa história ganhou um significado ainda mais bonito.",
      "A chegada dela trouxe uma nova dimensão para nossa vida. Agora temos uma família, sonhos compartilhados e tantos capítulos que ainda queremos viver.",
      "Francielly, espero que você nunca esqueça o quanto é especial.",
      "Como mulher, como minha companheira e como mãe da nossa pequena Ivy.",
      "Quero que seu novo ciclo seja cheio de saúde, conquistas, paz, realizações e muitos motivos para sorrir.",
      "Talvez este site seja apenas uma pequena surpresa, mas cada detalhe foi preparado pensando em você.",
      "Queria que você pudesse sentir um pouquinho de todo o carinho que coloquei aqui.",
      "Obrigado por fazer parte da minha vida e por construir essa família comigo.",
      "Que a gente ainda tenha muitos aniversários para comemorar, muitas lembranças para criar e muitos capítulos bonitos para escrever.",
    ],
    encerramento: ["Feliz aniversário, meu amor.", "Eu amo você."],
    despedida: "Com todo o meu amor.",
    assinatura: "Pablo Guedes",
  },

  final: {
    titulo: "Feliz aniversário, Francielly.",
    mensagem: [
      "Que a vida seja sempre generosa com você.",
      "Que nunca faltem motivos para sorrir, sonhos para realizar e momentos felizes para guardar.",
      "Que você continue sendo essa pessoa tão especial e que nunca se esqueça do quanto é amada.",
    ],
    fraseDestaque: "Você é uma das partes mais bonitas da minha história.",
    segundaMensagem: "E a nossa pequena Ivy é um dos capítulos mais preciosos dessa história.",
    assinatura: "Com amor, de quem escolheu compartilhar a vida com você.",
    botao: "RELEMBRAR NOSSA HISTÓRIA",
    /** Mensagem enquanto os cinco corações ainda não foram encontrados. */
    bloqueado: "Encontre os cinco corações para revelar esta última página.",
    botaoBloqueado: "VOLTAR AOS CORAÇÕES",
    // 📷 Foto opcional da família ao fundo → public/images/familia-final.jpg
    fotoFundo: { src: "/images/familia-01.jpg", alt: "Nossa família", legenda: "" } as Foto,
  },
};

/** Ordem e nomes das seções no indicador de progresso. */
export const SECOES = [
  { id: "hoje", nome: "Hoje", tom: "claro" },
  { id: "historia", nome: "Nossa história", tom: "escuro" },
  { id: "familia", nome: "Nossa família", tom: "claro" },
  { id: "motivos", nome: "Cinco motivos", tom: "escuro" },
  { id: "album", nome: "Álbum", tom: "claro" },
  { id: "carta", nome: "A carta", tom: "escuro" },
  { id: "final", nome: "Surpresa final", tom: "escuro" },
] as const;

export type SecaoId = (typeof SECOES)[number]["id"];
