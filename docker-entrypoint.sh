#!/bin/sh
set -e

echo "DATABASE_URL=$DATABASE_URL"

env | sort

echo "Applying migrations..."
pnpm prisma migrate deploy

echo "Seeding..."
pnpm prisma db seed

exec "$@"