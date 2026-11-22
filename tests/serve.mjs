// Tiny static server for out/: trailing-slash aware (like Cloudflare assets), used as the Playwright webServer and by lhci.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(process.argv[2] ?? "../out");
const port = Number(process.argv[3] ?? 4173);
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".avif": "image/avif", ".webp": "image/webp", ".png": "image/png", ".woff2": "font/woff2", ".txt": "text/plain", ".xml": "application/xml" };

createServer(async (req, res) => {
  const url = new URL(req.url, "http://x");
  let p = normalize(decodeURIComponent(url.pathname)).replaceAll("\\", "/");
  if (!p.startsWith("/") || p.split("/").includes("..")) return res.writeHead(400).end();
  try {
    if (!extname(p) && !p.endsWith("/") && (await stat(join(root, p)).catch(() => null))?.isDirectory()) {
      return res.writeHead(308, { location: p + "/" + url.search }).end();
    }
    if (p.endsWith("/")) p += "index.html";
    let body = await readFile(join(root, p));
    const type = TYPES[extname(p)] ?? "application/octet-stream";
    const headers = { "content-type": type };
    // Cloudflare compresses text assets; do the same so Lighthouse sees real transfer sizes.
    if (/^(text|application\/(json|xml)|image\/svg)/.test(type) && /gzip/.test(req.headers["accept-encoding"] ?? "")) {
      body = gzipSync(body);
      headers["content-encoding"] = "gzip";
    }
    res.writeHead(200, headers).end(body);
  } catch {
    const body = await readFile(join(root, "404.html")).catch(() => "not found");
    res.writeHead(404, { "content-type": "text/html" }).end(body);
  }
}).listen(port, () => console.log(`serving ${root} on ${port}`));
