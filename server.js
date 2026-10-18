// Tiny static server for Railway. No dependencies.
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, "public");
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".json": "application/json",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

http.createServer((req, res) => {
  if (req.url === "/health") { res.writeHead(200); return res.end("ok"); }
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/index.html";
  const file = path.normalize(path.join(ROOT, p));
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) {
      // unknown paths fall back to the app
      return fs.readFile(path.join(ROOT, "index.html"), (e2, html) => {
        res.writeHead(e2 ? 404 : 200, { "Content-Type": TYPES[".html"] });
        res.end(e2 ? "Not found" : html);
      });
    }
    const ext = path.extname(file);
    const headers = {
      "Content-Type": TYPES[ext] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Cache-Control": ext === ".html" || p === "/sw.js" ? "no-cache" : "public, max-age=86400"
    };
    if (p === "/sw.js") headers["Service-Worker-Allowed"] = "/";
    res.writeHead(200, headers);
    res.end(data);
  });
}).listen(PORT, () => console.log("Shamsi running on port " + PORT));
