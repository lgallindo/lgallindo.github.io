import type { LocaleCode, PublicLocaleCode } from "../i18n/locales";

type NavItem = {
  label: string;
  href: string;
};

type Project = {
  title: string;
  status: string;
  summary: string;
};

type Post = {
  title: string;
  date: string;
  summary: string;
};

type PageCopy = {
  title: string;
  description: string;
  eyebrow: string;
  shell: {
    skipToMain: string;
    primaryNavLabel: string;
    languageNavLabel: string;
    modeLabel: string;
    footer: string;
    returnHome: string;
  };
  modes: {
    phosphor: string;
    modem: string;
    utilitarian: string;
  };
  nav: NavItem[];
  home: {
    heading: string;
    intro: string;
    commands: NavItem[];
  };
  gateway: {
    heading: string;
    intro: string;
  };
  projects: {
    heading: string;
    intro: string;
    items: Project[];
  };
  blog: {
    heading: string;
    intro: string;
    posts: Post[];
  };
  about: {
    heading: string;
    intro: string;
    timeline: Project[];
  };
  notFound: {
    heading: string;
    intro: string;
  };
};

export const publicCopy: Record<PublicLocaleCode, PageCopy> = {
  en_US: {
    title: "lgallindo.github.io",
    description: "Data engineering, FOSS systems, CAD builds, and technical writing by Luis Gallindo.",
    eyebrow: "Data engineering / FOSS / maker systems",
    shell: {
      skipToMain: "Skip to main content",
      primaryNavLabel: "Primary",
      languageNavLabel: "Language",
      modeLabel: "Interaction mode",
      footer: "GPL-minded technical notes for data systems, FOSS work, and practical builds.",
      returnHome: "Return to home",
    },
    modes: {
      phosphor: "Phosphor",
      modem: "Modem",
      utilitarian: "Utilitarian",
    },
    nav: [
      { label: "[1] Home", href: "/en_US/" },
      { label: "[2] Projects", href: "/en_US/projects/" },
      { label: "[3] Blog", href: "/en_US/blog/" },
      { label: "[4] About", href: "/en_US/about/" },
    ],
    home: {
      heading: "Systems notebook",
      intro:
        "I build data platforms, inspect software supply chains, and document practical maker systems with a preference for transparent tools.",
      commands: [
        { label: "cd projects", href: "/en_US/projects/" },
        { label: "tail blog", href: "/en_US/blog/" },
        { label: "whoami", href: "/en_US/about/" },
      ],
    },
    gateway: {
      heading: "Select Locale",
      intro: "Choose the public language for this terminal session.",
    },
    projects: {
      heading: "Projects",
      intro: "Selected work across data engineering, FOSS maintenance, CAD, and small-game systems.",
      items: [
        {
          title: "Data platform migration notes",
          status: "active",
          summary: "Operational patterns for moving analytical workloads without hiding failure modes.",
        },
        {
          title: "Maker CAD bench",
          status: "field notes",
          summary: "Parametric parts, repair sketches, and workshop documentation for practical builds.",
        },
      ],
    },
    blog: {
      heading: "Blog",
      intro: "Technical writing for systems that benefit from reproducible notes and explicit tradeoffs.",
      posts: [
        {
          title: "Why portfolio migrations should preserve old artifacts",
          date: "2026-06-29",
          summary: "A short note on keeping legacy output available while a new static generator takes over.",
        },
      ],
    },
    about: {
      heading: "About",
      intro:
        "Luis Gallindo works at the intersection of data engineering, applied automation, and hands-on systems building.",
      timeline: [
        {
          title: "Current focus",
          status: "now",
          summary: "Reliable data workflows, reproducible technical writing, and visible engineering decisions.",
        },
      ],
    },
    notFound: {
      heading: "404",
      intro: "The requested path is not published in this terminal session.",
    },
  },
  pt_BR: {
    title: "lgallindo.github.io",
    description: "Engenharia de dados, sistemas FOSS, CAD e escrita técnica de Luis Gallindo.",
    eyebrow: "Engenharia de dados / FOSS / sistemas maker",
    shell: {
      skipToMain: "Pular para o conteúdo principal",
      primaryNavLabel: "Principal",
      languageNavLabel: "Idioma",
      modeLabel: "Modo de interação",
      footer: "Notas técnicas com espírito GPL sobre sistemas de dados, trabalho FOSS e construções práticas.",
      returnHome: "Voltar ao início",
    },
    modes: {
      phosphor: "Fósforo",
      modem: "Modem",
      utilitarian: "Utilitário",
    },
    nav: [
      { label: "[1] Início", href: "/pt_BR/" },
      { label: "[2] Projetos", href: "/pt_BR/projects/" },
      { label: "[3] Blog", href: "/pt_BR/blog/" },
      { label: "[4] Sobre", href: "/pt_BR/about/" },
    ],
    home: {
      heading: "Caderno de sistemas",
      intro:
        "Construo plataformas de dados, examino cadeias de software e documento sistemas maker com preferência por ferramentas transparentes.",
      commands: [
        { label: "cd projetos", href: "/pt_BR/projects/" },
        { label: "tail blog", href: "/pt_BR/blog/" },
        { label: "whoami", href: "/pt_BR/about/" },
      ],
    },
    gateway: {
      heading: "Selecionar idioma",
      intro: "Escolha o idioma público para esta sessão de terminal.",
    },
    projects: {
      heading: "Projetos",
      intro: "Trabalhos em engenharia de dados, manutenção FOSS, CAD e pequenos sistemas de jogos.",
      items: [
        {
          title: "Notas de migração de plataformas de dados",
          status: "ativo",
          summary: "Padrões operacionais para mover cargas analíticas sem esconder modos de falha.",
        },
        {
          title: "Bancada CAD maker",
          status: "notas de campo",
          summary: "Peças paramétricas, esboços de reparo e documentação de oficina para construções práticas.",
        },
      ],
    },
    blog: {
      heading: "Blog",
      intro: "Escrita técnica para sistemas que se beneficiam de notas reproduzíveis e escolhas explícitas.",
      posts: [
        {
          title: "Por que migrações de portfólio devem preservar artefatos antigos",
          date: "2026-06-29",
          summary: "Uma nota breve sobre manter a saída legada disponível enquanto um novo gerador estático assume.",
        },
      ],
    },
    about: {
      heading: "Sobre",
      intro:
        "Luis Gallindo atua na interseção entre engenharia de dados, automação aplicada e construção prática de sistemas.",
      timeline: [
        {
          title: "Foco atual",
          status: "agora",
          summary: "Fluxos de dados confiáveis, escrita técnica reproduzível e decisões de engenharia visíveis.",
        },
      ],
    },
    notFound: {
      heading: "404",
      intro: "O caminho solicitado não está publicado nesta sessão de terminal.",
    },
  },
};

export const tokiPonaCopy = {
  title: "lipu pi ilo sona",
  description: "lipu lili pi nasin ilo, sona pali, en pali open.",
  heading: "o kama pona",
  intro:
    "ni li nasin lili pi toki pona. ona li lon taso tan nimi nasin; ona li lon ala lon lipu ante anu nasin open.",
};

export function getCopy(locale: LocaleCode): PageCopy {
  if (locale === "tok") {
    return publicCopy.en_US;
  }

  return publicCopy[locale];
}
