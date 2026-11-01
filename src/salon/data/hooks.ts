import type { PersonaId } from "./personas";

export type HookMode = "hard" | "soft";

export type SalonHook = {
  id: string;
  match: { any_of: string[] };
  priority: number;
  mode: HookMode;
  latch?: string;
  speakers?: PersonaId[];
  lines?: string[];
  prompt_inject?: string;
};

/** Bonanno hard-hook pack — latch `bonanno` (one fire per in-memory session). */
export const HARD_HOOKS: SalonHook[] = [
  {
    id: "bonanno_armed_joy",
    match: {
      any_of: ["alegria armada", "armed joy", "bonanno", "alfredo bonanno"],
    },
    priority: 100,
    mode: "hard",
    latch: "bonanno",
    speakers: ["bonanno", "bonanno"],
    lines: [
      "A alegria armada não pede licença à tristeza oficial — ela entra e reorganiza a mesa.",
      "Se a festa for vigiada, a gente dança mesmo assim: alegria aqui é método, não enfeite.",
    ],
  },
  {
    id: "bonanno_why_anarchists",
    match: {
      any_of: [
        "por que somos anarquistas",
        "porque somos anarquistas",
        "why we are anarchists",
      ],
    },
    priority: 90,
    mode: "hard",
    latch: "bonanno",
    speakers: ["bonanno", "bonanno"],
    lines: [
      "Somos anarquistas porque a liberdade não se terceiriza — nem a um partido, nem a um salvador.",
      "Perguntam o porquê: porque esperar permissão é o primeiro costume a desaprender.",
    ],
  },
  {
    id: "bonanno_affinity",
    match: {
      any_of: ["grupo de afinidade", "affinity group", "grupos de afinidade"],
    },
    priority: 80,
    mode: "hard",
    latch: "bonanno",
    speakers: ["bonanno", "bonanno"],
    lines: [
      "Afinidade não é clube: é quem age contigo sem pedir carimbo e sem cobrir a fuga alheia de discurso.",
      "Grupo pequeno, confiança gasta em prática — afinidade se prova no risco compartilhado, não na lista de e-mails.",
    ],
  },
  {
    id: "bonanno_insurrection",
    match: {
      any_of: [
        "insurreição informal",
        "insurrecao informal",
        "informal insurrection",
        "illegalism",
        "illegalismo",
      ],
    },
    priority: 70,
    mode: "hard",
    latch: "bonanno",
    speakers: ["bonanno", "bonanno"],
    lines: [
      "Insurreição informal: menos bandeira, mais prática — e sem romance de polícia no enredo.",
      "Não esperem o grande dia anunciado; o informal começa onde a vida já recusa o script.",
    ],
  },
];

/** Soft stubs (eng A7) — empty for v1 default; enable later via pack/flag. */
export const SOFT_HOOKS: SalonHook[] = [];

export const ALL_HOOKS: SalonHook[] = [...HARD_HOOKS, ...SOFT_HOOKS];
