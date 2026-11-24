import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const line = readFileSync(join(repoRoot, "line.txt"), "utf8").trimEnd();
if (line.length === 0 || line.includes("\n")) {
  throw new Error("line.txt must contain exactly one non-empty line.");
}
if (line.length > 200) {
  throw new Error(`Entry line is ${line.length} characters, over the 200-character limit.`);
}

const outputDir =
  process.env.MAKEFUN_BOT_DIR ?? process.env.MAKEFUN_OUTPUT_DIR;
if (!outputDir) {
  throw new Error("Set MAKEFUN_BOT_DIR or MAKEFUN_OUTPUT_DIR to the output directory.");
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "output.txt"), line + "\n", "utf8");
console.log(line);
