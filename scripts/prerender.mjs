// Vorrendern: erzeugt für jede öffentliche Seite eine fertige HTML-Datei mit allen Texten,
// damit Suchmaschinen und Vorschauen (WhatsApp, LinkedIn) den Inhalt ohne JavaScript sehen.
// Aufruf nach dem Bauen:  node scripts/prerender.mjs dist
// Braucht Playwright mit Chromium (im Dockerfile: eigene Bau-Stufe).
import { createServer } from "node:http";
import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { extname, join, normalize } from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const DIST = process.argv[2] || "dist";
// Öffentliche Seiten; dieselben wie in public/sitemap.xml
const ROUTES = ["/", "/clinics", "/manufacturers", "/partners", "/impressum", "/datenschutz"];

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".webp": "image/webp", ".woff2": "font/woff2", ".json": "application/json", ".xml": "application/xml", ".txt": "text/plain", ".mp4": "video/mp4" };

// Die unveränderte App-Hülle: Vorlage für alle Seiten und Rückfall für Pfade ohne eigene Datei (Portal, Login …)
const SHELL = join(DIST, "spa.html");
await copyFile(join(DIST, "index.html"), SHELL);
const template = await readFile(SHELL, "utf8");

const server = createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^(\.\.[/\\])+/, "");
  let file = join(DIST, path);
  try {
    if (path.endsWith("/")) file = join(file, "index.html");
    const body = await readFile(file);
    res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(template);
  }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

// Kopfzeilen, die die Seite selbst setzt (useSeo markiert sie mit data-seo), ersetzen die allgemeinen der Vorlage
const MANAGED = [
  /<title>[\s\S]*?<\/title>/i,
  /<meta\s+name="description"[^>]*>/gi,
  /<meta\s+name="robots"[^>]*>/gi,
  /<meta\s+property="og:(title|description|url)"[^>]*>/gi,
  /<meta\s+name="twitter:(title|description)"[^>]*>/gi,
  /<link\s+rel="canonical"[^>]*>/gi,
];

const browser = await chromium.launch();
const context = await browser.newContext({ locale: "de-DE", viewport: { width: 1280, height: 900 } });
let fehler = 0;
for (const route of ROUTES) {
  const page = await context.newPage();
  page.on("pageerror", (e) => console.warn(`  ${route}: ${e.message}`));
  await page.goto(base + route, { waitUntil: "networkidle" });
  // Langsam nach unten scrollen, damit alle Einblend-Animationen ihren Endzustand erreichen
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1500);
  const { root, head, title } = await page.evaluate(() => ({
    root: document.getElementById("root").innerHTML,
    head: [...document.head.querySelectorAll("[data-seo]")].map((e) => e.outerHTML).join("\n    "),
    title: document.title,
  }));
  await page.close();
  if (!root.trim() || !head) {
    console.error(`  ${route}: leer gerendert`);
    fehler++;
    continue;
  }
  let html = template;
  for (const re of MANAGED) html = html.replace(re, "");
  const esc = title.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  html = html
    .replace("</head>", `  <title>${esc}</title>\n    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${root}</div>`);
  const out = route === "/" ? join(DIST, "index.html") : join(DIST, route.slice(1), "index.html");
  await mkdir(join(out, ".."), { recursive: true });
  await writeFile(out, html);
  console.log(`  ${route} → ${out} (${Math.round(html.length / 1024)} KB, „${title}“)`);
}
await browser.close();
server.close();
if (fehler) process.exit(1);
