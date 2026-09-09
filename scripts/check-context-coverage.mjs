import { readdir } from "node:fs/promises";
import { join, relative, resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const excluded = new Set([".git", ".next", "node_modules", "coverage"]);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const directories = [];
  for (const entry of entries) {
    if (!entry.isDirectory() || excluded.has(entry.name)) continue;
    const child = join(directory, entry.name);
    directories.push(child, ...(await walk(child)));
  }
  return directories;
}

const ownedDirectories = await walk(root);
const missing = [];
for (const directory of ownedDirectories) {
  try {
    await readdir(join(directory, "CONTEXT.md"));
  } catch {
    missing.push(relative(root, directory));
  }
}

if (missing.length > 0) {
  console.error("Missing CONTEXT.md files:");
  for (const directory of missing) console.error(`- ${directory}`);
  process.exitCode = 1;
} else {
  console.log(`Context coverage passed for ${ownedDirectories.length} project-owned directories.`);
}
