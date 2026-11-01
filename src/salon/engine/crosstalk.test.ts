import { describe, expect, test } from "bun:test";
import {
  parseCrosstalkOutput,
  pickCrosstalkCandidate,
} from "./crosstalk";
import { findMentions, lastMentionId } from "./mention";
import { matchHooks } from "./hooks";

describe("parseCrosstalkOutput", () => {
  test("empty is pass", () => {
    expect(parseCrosstalkOutput("")).toEqual({ kind: "pass" });
    expect(parseCrosstalkOutput("   ")).toEqual({ kind: "pass" });
  });

  test("PASS token is pass; PASSING is not", () => {
    expect(parseCrosstalkOutput("PASS")).toEqual({ kind: "pass" });
    expect(parseCrosstalkOutput("pass.")).toEqual({ kind: "pass" });
    expect(parseCrosstalkOutput("PASSING")).toEqual({
      kind: "emit",
      line: "PASSING",
    });
    expect(parseCrosstalkOutput("PASSWORD")).toEqual({
      kind: "emit",
      line: "PASSWORD",
    });
  });

  test("single line emits; multiline passes", () => {
    expect(parseCrosstalkOutput("A short line.")).toEqual({
      kind: "emit",
      line: "A short line.",
    });
    expect(parseCrosstalkOutput("one\ntwo")).toEqual({ kind: "pass" });
  });
});

describe("mention L→R", () => {
  test("last match is addressee", () => {
    const hits = findMentions("hello Stirner and then Kropotkin");
    expect(hits.map((h) => h.id)).toEqual(["stirner", "kropotkin"]);
    expect(lastMentionId(hits)).toBe("kropotkin");
  });
});

describe("Bonanno latch match", () => {
  test("armed joy matches highest priority", () => {
    const r = matchHooks("quero falar de alegria armada", new Set());
    expect(r.kind).toBe("hard");
    if (r.kind === "hard") expect(r.hook.id).toBe("bonanno_armed_joy");
  });

  test("spent latch skips hard", () => {
    const r = matchHooks("bonanno", new Set(["bonanno"]));
    expect(r.kind).toBe("none");
  });
});

describe("crosstalk picker", () => {
  test("prefers mention when eligible", () => {
    const present = new Set(["stirner", "kropotkin"] as const);
    const { candidate } = pickCrosstalkCandidate(
      { joinOrder: ["stirner", "kropotkin"], cursor: 0 },
      present as Set<"stirner" | "kropotkin">,
      "stirner",
      "kropotkin",
    );
    expect(candidate).toBe("kropotkin");
  });
});
