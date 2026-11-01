import { serve } from "bun";
import { join, extname } from "node:path";

const root = join(import.meta.dir, "..", "dist");
const port = Number(process.env.PORT || 4321);
const hostname = process.env.HOST || "127.0.0.1";

/** Local preview: emit COOP/COEP so WebLLM SharedArrayBuffer works without relying on the SW race. */
const COI_HEADERS = {
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Embedder-Policy": "credentialless",
  "Cross-Origin-Resource-Policy": "cross-origin",
};

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".wasm": "application/wasm",
};

function resolvePath(pathname) {
  let path = decodeURIComponent(pathname);
  if (path.endsWith("/")) path += "index.html";
  return path;
}

serve({
  hostname,
  port,
  async fetch(req) {
    const url = new URL(req.url);
    const path = resolvePath(url.pathname);
    let filePath = join(root, path);
    let file = Bun.file(filePath);
    if (!(await file.exists())) {
      filePath = join(root, path, "index.html");
      file = Bun.file(filePath);
      if (!(await file.exists())) {
        return new Response("Not found", { status: 404, headers: COI_HEADERS });
      }
    }
    const ext = extname(filePath);
    const type = MIME[ext] || file.type || "application/octet-stream";
    return new Response(file, {
      headers: {
        ...COI_HEADERS,
        "Content-Type": type,
      },
    });
  },
});

console.log(`SALON_READY http://${hostname}:${port}/salon/`);
console.log("COI headers: COOP=same-origin COEP=credentialless");
