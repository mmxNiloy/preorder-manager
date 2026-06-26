# syntax=docker/dockerfile:1

ARG NODE_VERSION=26.4.0
ARG ALPINE_VERSION=3.23
ARG PNPM_VERSION=10.16.1

################################################################################
# Base image
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base

WORKDIR /usr/src/app

RUN chown -R node:node /usr/src/app

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

COPY --chown=node:node --from=build /usr/src/app/package.json ./
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/.next ./.next
COPY --chown=node:node --from=build /usr/src/app/prisma ./prisma
COPY --chown=node:node --from=build /usr/src/app/prisma.config.ts ./prisma.config.ts
COPY --chown=node:node --from=build /usr/src/app/src/generated ./src/generated

EXPOSE 3000

COPY --chown=node:node docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN chmod +x /usr/local/bin/docker-entrypoint.sh

USER node

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["pnpm", "run", "start"]