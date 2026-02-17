# Project setup and run guide

This is a Vue 3 + TypeScript application powered by Vite. The app uses a local JSON file as a mock backend, so you can run it without any external services.

## Prerequisites
- Node.js: 20.x (or >= 22.12), as defined in `package.json` engines
- npm: comes with Node (recommended npm v10 or newer)

Verify your versions:
- `node -v`
- `npm -v`

## Install dependencies
- `npm install`

If you run into dependency issues in CI or want stricter installs, you can use `npm ci` instead (requires a clean workspace and uses package-lock exactly).

## Start the app (development)
- `npm run dev`
- Open the URL printed in the terminal (Vite default is http://localhost:5173)

Hot Module Replacement (HMR) is enabled in dev mode.

