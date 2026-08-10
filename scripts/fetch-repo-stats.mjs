import { writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, "../src/data/repos.json");

const REPOS = [
  "walkinglabs/hands-on-modern-rl",
  "walkinglabs/learn-harness-engineering",
  "walkinglabs/awesome-harness-engineering",
  "datawhalechina/easy-vibe",
];

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
  return {
    repo,
    stars: formatCount(data.stargazers_count ?? 0),
    forks: String(data.forks_count ?? 0),
  };
}

try {
  const results = await Promise.all(REPOS.map(fetchRepo));

  let existing = [];
  try {
    existing = JSON.parse(readFileSync(outputPath, "utf8"));
  } catch {
    existing = [];
  }

  const merged = REPOS.map((repo) => {
    const base = existing.find((r) => r.repo === repo) ?? {};
    const fresh = results.find((r) => r.repo === repo);
    return { ...base, repo, stars: fresh.stars, forks: fresh.forks };
  });

  writeFileSync(outputPath, JSON.stringify(merged, null, 2) + "\n", "utf8");
  console.log("Updated repo stats:", results);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
