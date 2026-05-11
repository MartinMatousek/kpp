import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Load .env if present (Cloudflare Pages injects env vars directly)
try {
  const env = readFileSync(join(root, ".env"), "utf-8");
  for (const line of env.split("\n")) {
    const [k, ...rest] = line.split("=");
    if (k && rest.length && !process.env[k.trim()]) {
      process.env[k.trim()] = rest.join("=").trim();
    }
  }
} catch {}

const siteUrl = process.env.VITE_SITE_URL;

if (!siteUrl) {
  console.error("VITE_SITE_URL is not set — skipping static file generation");
  process.exit(1);
}

const templatesDir = join(root, "templates");
const publicDir = join(root, "public");

for (const file of readdirSync(templatesDir)) {
  const content = readFileSync(join(templatesDir, file), "utf-8");
  const resolved = content.replaceAll("{{SITE_URL}}", siteUrl);
  writeFileSync(join(publicDir, file), resolved);
  console.log(`generated public/${file} → ${siteUrl}`);
}
