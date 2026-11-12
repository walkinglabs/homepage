#!/usr/bin/env node
/**
 * Pull real component source from official shadcn / Magic UI / Aceternity
 * registries and write the files into src/components/ui.
 * Same distribution model the shadcn CLI uses — but without the CLI's
 * interactive prompts, and with import normalisation for our stack.
 *
 * usage: node scripts/pull-components.mjs [name ...]
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const UI = join(ROOT, 'src/components/ui')

const SOURCES = {
  shadcn: (n) => `https://ui.shadcn.com/r/styles/new-york-v4/${n}.json`,
  magicui: (n) => `https://magicui.design/r/${n}.json`,
  aceternity: (n) => `https://ui.aceternity.com/registry/${n}.json`,
}

const WANTED = {
  shadcn: ['button', 'badge', 'card', 'separator', 'sheet', 'tabs', 'avatar', 'tooltip'],
  magicui: [
    'marquee',
    'number-ticker',
    'blur-fade',
    'border-beam',
    'dot-pattern',
    'animated-beam',
    'bento-grid',
    'magic-card',
    'shine-border',
    'text-animate',
    'avatar-circles',
    'orbiting-circles',
    'typing-animation',
  ],
  aceternity: [
    'spotlight',
    'infinite-moving-cards',
    'card-spotlight',
    'tracing-beam',
    'focus-cards',
    'hero-highlight',
    'sparkles',
    'moving-border',
  ],
}

/** normalise third-party flavour imports to what we have installed */
function normalise(src) {
  return src
    .replace(/from ["']framer-motion["']/g, 'from "motion/react"')
    // the registry ships unresolved aliases — resolve them against components.json
    .replace(/from ["']cn["']/g, 'from "@/lib/utils"')
    .replace(/from ["']@\/components\/magicui\//g, 'from "@/components/ui/')
    .replace(/from ["']@\/registry\/magicui\//g, 'from "@/components/ui/')
    .replace(/from ["']@\/components\/ui\/utils["']/g, 'from "@/lib/utils"')
}

/** keep only files we care about, and flatten them into src/components/ui */
function targetFor(file) {
  const name = file.path.split('/').pop()
  return join(UI, name)
}

const only = process.argv.slice(2)

const report = []
for (const [registry, names] of Object.entries(WANTED)) {
  const pick = only.length ? names.filter((n) => only.includes(n)) : names
  for (const name of pick) {
    const url = SOURCES[registry](name)
    try {
      const res = await fetch(url)
      if (!res.ok) {
        report.push(`MISS ${registry}/${name} (${res.status})`)
        continue
      }
      const item = await res.json()
      for (const file of item.files ?? []) {
        if (!/\.(tsx|ts)$/.test(file.path)) continue
        const out = targetFor(file)
        await mkdir(dirname(out), { recursive: true })
        await writeFile(out, normalise(file.content))
      }
      const deps = [...(item.dependencies ?? []), ...(item.registryDependencies ?? [])]
      report.push(`OK   ${registry}/${name}${deps.length ? `  deps: ${deps.join(',')}` : ''}`)
    } catch (error) {
      report.push(`ERR  ${registry}/${name}: ${error.message}`)
    }
  }
}

console.log(report.join('\n'))
