# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project

Login-protected operations dashboard SPA (client project, 2021): calculation
setups, operational records and summary dashboard behind JWT auth.
Legacy project: React 17 / CRA 4 / TypeScript 4.3 era-pinned dependencies.

## Commands

```bash
yarn install
cp .env.example .env    # set APP_WEB_URL callback
yarn start              # http://localhost:3000
```

Expects a companion REST API for authentication and data.

## Structure

- `src/pages/Login`: authentication screen
- `src/pages/Dashboard`: summary view
- `src/pages/Operations`: operational records
- `src/pages/CalculationSetup`: calculation configuration
- Auth state via JWT stored with js-cookie, parsed with react-jwt

## Rules for agents

- Docs-only maintenance phase: no dependency upgrades or runtime behavior changes
- Never commit `.env`; only `.env.example` is tracked
