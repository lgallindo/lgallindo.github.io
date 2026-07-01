import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const distRoot = path.resolve(process.argv[2] ?? "dist");
const publicRouteRoots = new Set(["", "404.html", "en_US", "pt_BR"]);
const secretRoute = "toki-pona/index.html";
const routeEquivalentAlternateChecks = new Map([
  ["en_US/about/index.html", ["https://lgallindo.github.io/en_US/about/", "https://lgallindo.github.io/pt_BR/about/"]],
  ["pt_BR/about/index.html", ["https://lgallindo.github.io/en_US/about/", "https://lgallindo.github.io/pt_BR/about/"]],
  ["en_US/projects/index.html", ["https://lgallindo.github.io/en_US/projects/", "https://lgallindo.github.io/pt_BR/projects/"]],
  ["pt_BR/projects/index.html", ["https://lgallindo.github.io/en_US/projects/", "https://lgallindo.github.io/pt_BR/projects/"]],
  ["en_US/blog/index.html", ["https://lgallindo.github.io/en_US/blog/", "https://lgallindo.github.io/pt_BR/blog/"]],
  ["pt_BR/blog/index.html", ["https://lgallindo.github.io/en_US/blog/", "https://lgallindo.github.io/pt_BR/blog/"]],
]);

const privatePatterns = [
  /AGENTS/i,
  /PROJECT_RULES/i,
  /DESIGN_BIBLE/i,
  /SESSION_HANDOFF/i,
  /PLAN_/i,
  /UX Architecture/i,
  /Art Director/i,
  /Astro Coder/i,
  /\bagent\b/i,
  /\bplanning\b/i,
  /sausage/i,
  /walled garden/i,
  /migration metadata/i,
];

const secretDiscoveryPatterns = [
  /toki/i,
  /pona/i,
  /lipu/i,
  /LANG=tok/i,
  /\btok\b/i,
  /toki-pona/i,
];

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return collectHtmlFiles(fullPath);
      }

      return entry.isFile() && entry.name.endsWith(".html") ? [fullPath] : [];
    }),
  );

  return files.flat();
}

function toRoute(filePath) {
  return path.relative(distRoot, filePath).split(path.sep).join("/");
}

function isPublicSurface(route) {
  const firstSegment = route.split("/")[0] ?? "";
  return publicRouteRoots.has(firstSegment);
}

function findMatches(content, patterns) {
  return patterns
    .filter((pattern) => pattern.test(content))
    .map((pattern) => pattern.toString());
}

const htmlFiles = await collectHtmlFiles(distRoot);
const failures = [];

for (const filePath of htmlFiles) {
  const route = toRoute(filePath);
  const content = await readFile(filePath, "utf8");
  const privateMatches = findMatches(content, privatePatterns);

  if (privateMatches.length > 0) {
    failures.push({
      route,
      check: "private-term-exposure",
      matches: privateMatches,
    });
  }

  if (isPublicSurface(route)) {
    const secretMatches = findMatches(content, secretDiscoveryPatterns);

    if (secretMatches.length > 0) {
      failures.push({
        route,
        check: "secret-locale-discovery",
        matches: secretMatches,
      });
    }
  }

  if (route === secretRoute && !/noindex,\s*nofollow/i.test(content)) {
    failures.push({
      route,
      check: "secret-route-robots",
      matches: ["missing noindex, nofollow"],
    });
  }

  const expectedAlternates = routeEquivalentAlternateChecks.get(route);

  if (expectedAlternates) {
    const missingAlternates = expectedAlternates.filter((alternate) => !content.includes(alternate));

    if (missingAlternates.length > 0) {
      failures.push({
        route,
        check: "route-equivalent-hreflang",
        matches: missingAlternates,
      });
    }
  }
}

if (failures.length > 0) {
  console.error("Public output validation failed:");
  console.error(JSON.stringify(failures, null, 2));
  process.exit(1);
}

console.log(`Public output validation passed for ${htmlFiles.length} HTML files in ${distRoot}.`);
