import { writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, "../src/data/repos.json");

function formatCount(n) {
  if (n >= 1000) {
    const v = n / 1000;
    return `${v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)}k`;
  }
  return String(n);
}

async function fetchRepo(repo) {
  const url = `https://api.github.com/repos/${repo}`;
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`Failed to fetch ${repo}: ${res.status} ${res.statusText}`);
  const data = await res.json();
  const starCount = data.stargazers_count ?? 0;
  return {
    repo,
    stars: formatCount(starCount),
    starCount,
    forks: String(data.forks_count ?? 0),
  };
}

try {
  const existing = JSON.parse(readFileSync(outputPath, "utf8"));
  const updated = await Promise.all(existing.map(async (entry) => ({
    ...entry,
    ...await fetchRepo(entry.repo),
  })));

  writeFileSync(outputPath, JSON.stringify(updated, null, 2) + "\n", "utf8");
  console.log("Updated repo stats:", updated);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
