# WalkingLabs Homepage

Official homepage for WalkingLabs, built with React, Vite, Tailwind CSS, and Motion.

## Development

Install dependencies:

```bash
npm install
```

Start the local dev server:

```bash
npm run dev
```

The site runs at [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev      # Start Vite dev server
npm run lint     # Type-check with TypeScript
npm run build    # Build production assets into dist/
npm run preview  # Preview the production build locally
```

## GitHub Pages

This repository includes a GitHub Actions workflow at `.github/workflows/pages.yml`.

For deployment, configure repository settings:

1. Open `Settings` -> `Pages`.
2. Set `Build and deployment` source to `GitHub Actions`.
3. Push to `main` or manually run the `Deploy to GitHub Pages` workflow.

The workflow builds the Vite app with the `/homepage/` base path and deploys the generated `dist/` directory.
