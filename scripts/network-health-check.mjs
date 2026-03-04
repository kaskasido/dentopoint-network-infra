/**
 * Agent 3 – Network Health Check
 * Reads mock automat data and reports device status, fill levels, and alerts.
 * In production this script will query Supabase instead of mock data.
 */

// ESM-compatible import from the compiled mock data via JSON snapshot.
// When moving to Supabase, replace the mock import with a Supabase query.
import { createRequire } from "module";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Parse mock data directly from TypeScript source (simple approach) ──────
// We regex-extract the exported arrays rather than transpiling TS.

function extractArray(source, exportName) {
  const pattern = new RegExp(
    `export const ${exportName}[^=]*=\\s*(\\[(?:[^\\[\\]]|\\[[^\\]]*\\])*\\])`,
    "s"
  );
  const match = source.match(pattern);
  if (!match) return [];
  try {
    // Replace TypeScript string literals & trailing commas for JSON.parse
    const json = match[1]
      .replace(/(?<!:)\/\/[^\n]*/g, "") // strip line comments, preserve URLs (https://)
      .replace(/,(\s*[}\]])/g, "$1"); // strip trailing commas
    return JSON.parse(json);
  } catch {
    return [];
  }
}

const mockPath = path.resolve(__dirname, "../src/data/mockAutomats.ts");
const source = readFileSync(mockPath, "utf8");

// ── Metrics ────────────────────────────────────────────────────────────────

// Parse status and fill level manually since the TS objects are compact
const statusMatches = [...source.matchAll(/status:\s*"([^"]+)"/g)].map(m => m[1]);
const fillMatches = [...source.matchAll(/fillLevel:\s*(\d+)/g)].map(m => parseInt(m[1]));
const nrMatches = [...source.matchAll(/nr:\s*"([^"]+)"/g)].map(m => m[1]);
const nameMatches = [...source.matchAll(/name:\s*"([^"]+)"/g)].map(m => m[1]);

const total = statusMatches.length;
const online = statusMatches.filter(s => s === "online").length;
const offline = statusMatches.filter(s => s === "offline").length;
const maintenance = statusMatches.filter(s => s === "wartung").length;
const uptime = total > 0 ? ((online / total) * 100).toFixed(1) : "0.0";

const avgFill = fillMatches.length > 0
  ? (fillMatches.reduce((a, b) => a + b, 0) / fillMatches.length).toFixed(1)
  : "0";

const critical = fillMatches.filter(f => f < 20).length;
const warning = fillMatches.filter(f => f >= 20 && f < 40).length;

// ── Report ─────────────────────────────────────────────────────────────────

console.log("╔══════════════════════════════════════════════════╗");
console.log("║   Agent 3 – DentoPoint Network Health Report     ║");
console.log("╚══════════════════════════════════════════════════╝");
console.log();
console.log(`Fleet size:    ${total} automats`);
console.log(`Online:        ${online}  (${uptime}% uptime)`);
console.log(`In maintenance:${maintenance}`);
console.log(`Offline:       ${offline}`);
console.log(`Avg fill level:${avgFill}%`);
console.log();

if (offline > 0 || critical > 0) {
  console.log("⚠️  ACTION REQUIRED:");
  if (offline > 0) console.log(`  • ${offline} automat(s) offline → dispatch technician`);
  if (critical > 0) console.log(`  • ${critical} automat(s) fill level < 20% → emergency refill`);
  if (warning > 0) console.log(`  • ${warning} automat(s) fill level < 40% → schedule refill`);
} else {
  console.log("✅ No critical issues. All thresholds met.");
}

// SLA check
const uptimeNum = parseFloat(uptime);
const SLA_THRESHOLD = 98.5;
if (uptimeNum < SLA_THRESHOLD) {
  console.log();
  console.log(`🚨 SLA BREACH: uptime ${uptime}% is below ${SLA_THRESHOLD}% target`);
  console.log("   → Escalate to Agent 0 immediately");
  process.exitCode = 1;
}

console.log();
console.log(`Report generated: ${new Date().toISOString()}`);
