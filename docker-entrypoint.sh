#!/bin/sh
set -e

echo "Generating Prisma Client..."
pnpm prisma generate

echo "Applying migrations..."
pnpm prisma migrate deploy

echo "Seeding..."
pnpm prisma db seed

exec "$@"