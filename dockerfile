# syntax=docker/dockerfile:1

ARG NODE_VERSION=26.4.0
ARG ALPINE_VERSION=3.23

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} as base

# Set working directory for all build stages.
WORKDIR /usr/src/app

################################################################################
# Create a stage for installing production dependencies.
FROM base as deps

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

################################################################################
# Create a stage for building the application.
FROM deps as build

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

# Copy the rest of the source files into the image.
COPY . .

# Install dependencies
RUN npm i

# Run the build script.
RUN npm run build

################################################################################
# Create a new stage to run the application with minimal runtime dependencies
FROM base as final

ENV NODE_ENV production

# Run the application as a non-root user.
USER node

# Copy package.json so that package manager commands can be used.
COPY package.json .

# Copy the production dependencies from the deps stage
COPY --from=deps /usr/src/app/node_modules ./node_modules

# ✅ Copy the built Next.js application
COPY --from=build /usr/src/app/.next ./.next

# ✅ Copy the public folder (Fix for missing static files)
COPY --from=build /usr/src/app/public ./public

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD npm run start
