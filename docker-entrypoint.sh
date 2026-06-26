#!/bin/sh
set -e

echo "Applying migrations..."
pnpm prisma migrate deploy

echo "Seeding..."
pnpm prisma db seed

exec "$@"