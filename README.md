# ReplyIQ

AI Employee Platform — building intelligent AI employees that work alongside your team.

## Overview

ReplyIQ is a platform for creating, deploying, and managing AI Employees. The first AI Employee is an AI Receptionist that handles customer interactions with human-like quality.

## Folder Structure

```
replyiq/
├── apps/
│   ├── api/          # Backend API (NestJS)
│   ├── web/          # Dashboard (React + Vite)
│   └── widget/       # Embeddable website widget
├── packages/
│   ├── ai-sdk/       # AI provider integrations
│   ├── config/       # Shared configuration (ESLint, Prettier, TSConfig)
│   ├── types/        # Shared TypeScript types
│   ├── ui/           # Shared UI component library
│   └── utils/        # Shared utilities
├── docs/             # Documentation
├── turbo.json        # Turborepo configuration
└── tsconfig.base.json
```

## Tech Stack

| Layer        | Technology                          |
| ------------ | ----------------------------------- |
| Frontend     | React 19, Vite, TypeScript          |
| Backend      | NestJS, TypeScript                  |
| Database     | PostgreSQL, Prisma                  |
| Styling      | TailwindCSS                         |
| State        | Zustand                             |
| Server State | TanStack Query                      |
| Forms        | React Hook Form                     |
| Validation   | Zod                                 |
| Monorepo     | Turborepo + pnpm                    |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20+
- [pnpm](https://pnpm.io/) v9+

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Start all apps in development mode
pnpm dev

# Start a specific app
pnpm --filter @replyiq/api dev
pnpm --filter @replyiq/web dev
pnpm --filter @replyiq/widget dev
```

### Build

```bash
# Build all packages and apps
pnpm build
```

### Linting & Formatting

```bash
# Lint all packages
pnpm lint

# Format all files
pnpm format

# Check formatting
pnpm format:check

# Typecheck all packages
pnpm typecheck
```

### Clean

```bash
# Remove all build artifacts and node_modules
pnpm clean
```

## License

Private — All rights reserved.
