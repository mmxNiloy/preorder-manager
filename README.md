# Preorder Manager

A small Next.js app to list, filter, sort, and manage product preorders. It has two screens: a preorder list and a create/update form.

**Live demo:** [https://preorder.revolohr.com/](https://preorder.revolohr.com/)

## Features

- **Preorder list** — Table with name, products, preorder-when, start/end dates, status toggle, and edit/delete actions
- **Backend-driven controls** — All / Active / Inactive filters, sort (name, created at, starts at, ends at + asc/desc), and pagination via Prisma with URL state (`nuqs`)
- **Status toggle** — Updates `isActive` in the database with toast feedback and list refresh
- **Delete** — Removes a record after confirmation, with toast feedback and list refresh
- **Checkboxes** — Per-row and select-all selection (UI only, no bulk actions)
- **Create preorder** — Form at `/preorder/new` persists a new record to the database
- **Update preorder** — Pencil icon opens `/preorder/[id]` with prefilled fields; save updates the database
- **Navigation & loading** — Back, Cancel, and Save redirect to the list; save shows a loader while persisting
- **Empty & error states** — Empty table message; distinct messages for invalid filters vs fetch failures

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **UI:** Tailwind CSS 4, shadcn/ui (Base UI), TanStack Table, Lucide icons, Sonner toasts
- **Forms:** TanStack Form + Zod validation
- **State:** `nuqs` for filter, sort, and page URL params
- **Data:** Prisma 7, SQLite via `@prisma/adapter-libsql`, server actions in `src/app/(server)/`

## Getting Started

**Prerequisites:** Node.js 20+, pnpm 10

### Install node/npm

Follow this url to download and install Node.js [https://nodejs.org/en/download/current](Node.js)

### Install pnpm

```bash
npm i -g pnpm@latest
```

### Create a `.env` file in the project root:

```env
DATABASE_URL="file:./dev.db"
```

### Then install, migrate, seed, and run:

```bash
pnpm install
pnpm approve-builds * # Approve all necessary build scripts
pnpm install # Optional
pnpm db:migrate
pnpm db:seed
pnpm dev
```

### Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Script            | Purpose                             |
| ----------------- | ----------------------------------- |
| `dev`             | Local dev server                    |
| `build` / `start` | Production build and serve          |
| `db:migrate`      | Apply migrations (dev)              |
| `db:seed`         | Seed sample preorders (~20 records) |
| `db:generate`     | Regenerate Prisma client            |
| `lint`            | ESLint                              |

**`postinstall` runs `prisma generate` only. Migrations and seeding are explicit locally.**

## Project Structure

```
src/app/
  (pages)/            # Routes: /, /preorder/new, /preorder/[id]
  (server)/           # Server actions, DTOs (Zod), error filters
components/
  custom/home/        # List page: toolbar, table, pagination
  custom/preorder/    # Create/update form
  ui/                 # shadcn primitives + shared DataTable
lib/
  searchparams.ts     # nuqs filter/sort/page definitions
prisma/
  schema.prisma       # Preorder model
  seed.ts             # Sample data
  migrations/
dockerfile            # Multi-stage production image
docker-entrypoint.sh  # migrate deploy + seed on container start
```

### Routes

| Route            | Description     |
| ---------------- | --------------- |
| `/`              | Preorder list   |
| `/preorder/new`  | Create preorder |
| `/preorder/[id]` | Edit preorder   |

## Deployment

Production runs as a Docker container. The image uses a multi-stage build (deps → build → final) on Node 26 Alpine with pnpm.

On container start, `docker-entrypoint.sh` runs `prisma migrate deploy` and `prisma db seed` before starting the server.

```bash
docker build -t preorder-manager .
docker run -p 3000:3000 -e DATABASE_URL="file:./prod.db" preorder-manager
```

- Exposes port **3000**, runs `pnpm start`
- Set **`DATABASE_URL`** to your SQLite file path or libsql URL (mount a volume for persistence)
- `next.config.ts` uses `output: "standalone"` for optimized production output

Live instance: [https://preorder.revolohr.com/](https://preorder.revolohr.com/)
