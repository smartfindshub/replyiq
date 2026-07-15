# @replyiq/database

Shared Prisma database package for ReplyIQ. Single source of truth for schema, client, migrations, and seeding.

## Folder Structure

```
packages/database/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed script
├── src/
│   ├── client.ts          # Singleton PrismaClient
│   └── index.ts           # Package entry point
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### 1. Set up environment

Create a `.env` file in `packages/database/` (or root `apps/api/.env`):

```
DATABASE_URL="postgresql://user:password@localhost:5432/replyiq?schema=public"
```

### 2. Run migrations

```bash
# Create a new migration
pnpm db:migrate

# Push schema to database without migration
pnpm db:push

# Reset database
pnpm db:reset
```

### 3. Generate Prisma Client

```bash
pnpm db:generate
```

### 4. Seed database

```bash
pnpm db:seed
```

### 5. Open Prisma Studio

```bash
pnpm db:studio
```

## Usage in Other Packages

```typescript
import { prisma, type Organization } from '@replyiq/database';

const orgs = await prisma.organization.findMany();
```

## Models

| Model | Description |
|-------|-------------|
| Organization | Top-level tenant |
| User | User within an organization |
| Business | Business belonging to an organization |
| BusinessDomain | Domain associated with a business |

## Enums

| Enum | Values |
|------|--------|
| OrganizationStatus | ACTIVE, SUSPENDED, ARCHIVED |
| BusinessStatus | DRAFT, ACTIVE, SUSPENDED, ARCHIVED |
| UserRole | OWNER, ADMIN, MANAGER |
| UserStatus | ACTIVE, INVITED, DISABLED |
| BusinessDomainStatus | PENDING, VERIFIED, DISABLED |
