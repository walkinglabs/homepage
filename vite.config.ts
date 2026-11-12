import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

const githubPages = process.env.GITHUB_PAGES === 'true'

export default defineConfig({
  base: githubPages ? '/homepage/' : '/',
  plugins: [
    react(),
    tailwindcss(),
    githubPages && {
      name: 'github-pages-entry',
      apply: 'build',
      writeBundle({ dir = 'dist' }) {
        // The Pages workflow also publishes the original entry name.
        copyFileSync(join(dir, 'index.html'), join(dir, 'index.dev.html'))
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
