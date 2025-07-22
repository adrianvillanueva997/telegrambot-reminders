# Use specific node version with slim base
FROM node:23.7.0-bookworm-slim@sha256:a5163af143b43b0da7572444bd49a22edb4cc1a74d3a46e1ef840f62bce07cac AS base
# Set environment variables
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH" \
  TZ="Europe/Madrid"

# Install system dependencies
RUN apt-get update && \
  apt-get install --no-install-recommends -y \
  ca-certificates \
  tzdata && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
  echo $TZ > /etc/timezone

# Enable pnpm
RUN corepack enable

# Set working directory
WORKDIR /app

# Production dependencies stage
FROM base AS prod-deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install --prod --frozen-lockfile

# Build stage
FROM base AS build
COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json ./
COPY src/ src/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install --frozen-lockfile && \
  pnpm run build

# Production stage
FROM base AS prod
COPY package.json ./
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

RUN chown -R node:node /app

# Run as non-root user
USER node

# Command to run the application
CMD ["pnpm", "start"]
