import type { LocaleCode, PublicLocaleCode } from "../i18n/locales";

type NavItem = {
  label: string;
  href: string;
};

type BuildRunBlock = {
  heading: string;
  intro?: string;
  commands: string[];
};

type Project = {
  title: string;
  summary: string;
  repoUrl: string;
  repoLabel: string;
  status: string;
  prerequisites: string[];
  sections: BuildRunBlock[];
};

type PageCopy = {
  title: string;
  description: string;
  shell: {
    skipToMain: string;
    primaryNavLabel: string;
    languageNavLabel: string;
    modeLabel: string;
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
  };
  gateway: {
    heading: string;
    intro: string;
  };
  projects: {
    heading: string;
    intro: string;
    prerequisitesHeading: string;
    items: Project[];
  };
  notFound: {
    heading: string;
    intro: string;
  };
  emptySection: {
    heading: string;
    intro: string;
  };
  sandbox: {
    heading: string;
    blurb: string;
    promptHint: string;
    navLabel: string;
  };
};

const arclengthEn: Project = {
  title: "ArclengthContinuation",
  summary:
    "A copyleft-oriented fork of Continue for AI-assisted development across the CLI, VS Code, and JetBrains. Work in progress; no releases yet.",
  repoUrl: "https://github.com/lgallindo/arclengthcontinuation",
  repoLabel: "github.com/lgallindo/arclengthcontinuation",
  status: "WIP",
  prerequisites: [
    "bun",
    "Node-compatible toolchain for workspace packages",
    "JDK 21 for the IntelliJ plugin build (wrapper targets JVM 17 bytecode)",
  ],
  sections: [
    {
      heading: "Clone",
      commands: [
        "git clone https://github.com/lgallindo/arclengthcontinuation.git",
        "cd arclengthcontinuation",
      ],
    },
    {
      heading: "Build",
      intro: "Verified baseline from the project README:",
      commands: [
        "cd packages/continue-sdk/typescript",
        "bun run build",
        "cd ../../../extensions/cli",
        "bun run build",
        "cd ../vscode",
        "bun run esbuild",
        "cd ../intellij",
        "JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64 \\",
        'GRADLE_USER_HOME="$PWD/.gradle-home" \\',
        "./gradlew buildPlugin --stacktrace",
      ],
    },
    {
      heading: "Run",
      commands: [
        "cd extensions/cli",
        "bun run start",
        "# or: node dist/alc.js",
        "# VS Code: after bun run esbuild in extensions/vscode,",
        "# package/install locally; no marketplace release yet.",
      ],
    },
  ],
};

const arclengthPt: Project = {
  title: "ArclengthContinuation",
  summary:
    "Fork copyleft-oriented do Continue para desenvolvimento assistido por IA no CLI, VS Code e JetBrains. Em progresso; sem releases ainda.",
  repoUrl: "https://github.com/lgallindo/arclengthcontinuation",
  repoLabel: "github.com/lgallindo/arclengthcontinuation",
  status: "WIP",
  prerequisites: [
    "bun",
    "Toolchain compatível com Node para os pacotes do workspace",
    "JDK 21 para o build do plugin IntelliJ (bytecode JVM 17)",
  ],
  sections: [
    {
      heading: "Clone",
      commands: [
        "git clone https://github.com/lgallindo/arclengthcontinuation.git",
        "cd arclengthcontinuation",
      ],
    },
    {
      heading: "Build",
      intro: "Baseline verificada no README do projeto:",
      commands: [
        "cd packages/continue-sdk/typescript",
        "bun run build",
        "cd ../../../extensions/cli",
        "bun run build",
        "cd ../vscode",
        "bun run esbuild",
        "cd ../intellij",
        "JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64 \\",
        'GRADLE_USER_HOME="$PWD/.gradle-home" \\',
        "./gradlew buildPlugin --stacktrace",
      ],
    },
    {
      heading: "Run",
      commands: [
        "cd extensions/cli",
        "bun run start",
        "# ou: node dist/alc.js",
        "# VS Code: após bun run esbuild em extensions/vscode,",
        "# empacote/instale localmente; sem release na marketplace ainda.",
      ],
    },
  ],
};

export const publicCopy: Record<PublicLocaleCode, PageCopy> = {
  en_US: {
    title: "lgallindo.github.io",
    description: "ArclengthContinuation — build and run notes.",
    shell: {
      skipToMain: "Skip to main content",
      primaryNavLabel: "Primary",
      languageNavLabel: "Language",
      modeLabel: "Theme",
      returnHome: "Return to home",
    },
    modes: {
      phosphor: "Phosphor",
      modem: "Modem",
      utilitarian: "Plain",
    },
    nav: [
      { label: "Home", href: "/en_US/" },
      { label: "Projects", href: "/en_US/projects/" },
      { label: "Sandbox", href: "/en_US/sandbox/" },
    ],
    home: {
      heading: "ArclengthContinuation",
      intro: arclengthEn.summary,
    },
    gateway: {
      heading: "Language",
      intro: "Choose a language.",
    },
    projects: {
      heading: "Projects",
      intro: "One project for now.",
      prerequisitesHeading: "Prerequisites",
      items: [arclengthEn],
    },
    notFound: {
      heading: "404",
      intro: "Nothing at this path.",
    },
    emptySection: {
      heading: "Not yet",
      intro: "No content here yet.",
    },
    sandbox: {
      heading: "Arclength sandbox",
      blurb:
        "A minimal restricted web terminal. Scripted responses only — the real Arclength CLI is not running here.",
      promptHint: "Try: help · version · alc --help",
      navLabel: "Sandbox",
    },
  },
  pt_BR: {
    title: "lgallindo.github.io",
    description: "ArclengthContinuation — notas de build e execução.",
    shell: {
      skipToMain: "Pular para o conteúdo principal",
      primaryNavLabel: "Principal",
      languageNavLabel: "Idioma",
      modeLabel: "Tema",
      returnHome: "Voltar ao início",
    },
    modes: {
      phosphor: "Fósforo",
      modem: "Modem",
      utilitarian: "Simples",
    },
    nav: [
      { label: "Início", href: "/pt_BR/" },
      { label: "Projetos", href: "/pt_BR/projects/" },
      { label: "Sandbox", href: "/pt_BR/sandbox/" },
    ],
    home: {
      heading: "ArclengthContinuation",
      intro: arclengthPt.summary,
    },
    gateway: {
      heading: "Idioma",
      intro: "Escolha um idioma.",
    },
    projects: {
      heading: "Projetos",
      intro: "Um projeto por enquanto.",
      prerequisitesHeading: "Pré-requisitos",
      items: [arclengthPt],
    },
    notFound: {
      heading: "404",
      intro: "Nada neste caminho.",
    },
    emptySection: {
      heading: "Ainda não",
      intro: "Sem conteúdo aqui ainda.",
    },
    sandbox: {
      heading: "Sandbox Arclength",
      blurb:
        "Terminal web mínimo e restrito. Só respostas roteirizadas — o CLI real do Arclength não roda aqui.",
      promptHint: "Tente: help · version · alc --help",
      navLabel: "Sandbox",
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
