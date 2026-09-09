import { access, readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const requiredPaths = [
  "CONTEXT.md",
  "REFERENCE.md",
  "app/CONTEXT.md",
  "app/learning/CONTEXT.md",
  "curriculum/CONTEXT.md",
  "governance/CONTEXT.md",
  "references/source-material/CONTEXT.md",
  "references/source-material/foundation-constitution/CONTEXT.md",
  "skills/bhavya-ui/SKILL.md",
  "skills/bhavya-learning/SKILL.md",
  "skills/bhavya-source-integrity/SKILL.md",
];

for (const relativePath of requiredPaths) {
  await access(join(root, relativePath));
}

const agents = await readFile(join(root, "AGENTS.md"), "utf8");
const forbiddenHeadings = ["## Product priorities", "## Before coding", "## Before completion"];
for (const heading of forbiddenHeadings) {
  if (agents.includes(heading)) throw new Error(`AGENTS.md contains workspace detail that belongs in scoped context: ${heading}`);
}

for (const skillPath of requiredPaths.filter((path) => path.endsWith("SKILL.md"))) {
  const skill = await readFile(join(root, skillPath), "utf8");
  if (!skill.replace(/^\uFEFF/, "").startsWith("---\n") || !skill.includes("name:") || !skill.includes("description:")) throw new Error(`Skill metadata missing: ${skillPath}`);
}

console.log(`Routing check passed for ${requiredPaths.length} required paths and skill metadata.`);
