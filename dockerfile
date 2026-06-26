# syntax=docker/dockerfile:1

ARG NODE_VERSION=26.4.0
ARG ALPINE_VERSION=3.23
ARG PNPM_VERSION=10.16.1

################################################################################
# Base image
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base

WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm@${PNPM_VERSION}

################################################################################
# Install dependencies
FROM base AS deps

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

RUN --mount=type=cache,target=/pnpm/store \
    pnpm install --frozen-lockfile

# Approve packages that need build scripts.
# See note below.
RUN pnpm approve-builds *

# Reinstall now that builds are approved.
RUN --mount=type=cache,target=/pnpm/store \
    pnpm install --frozen-lockfile

################################################################################
# Build
FROM deps AS build

COPY . .

RUN pnpm run build

################################################################################
# Runtime
FROM base AS final

ENV NODE_ENV=production

COPY --from=build /usr/src/app/package.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/prisma ./prisma

EXPOSE 3000

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]

USER node

CMD ["pnpm", "run", "start"]