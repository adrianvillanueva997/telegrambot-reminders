FROM node:26.13.1-bookworm-slim AS base

ENV TZ="Europe/Madrid"
WORKDIR /app
COPY mise.toml ./

RUN apt-get update && \
  apt-get install --no-install-recommends -y \
  ca-certificates \
  tzdata && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
  echo $TZ > /etc/timezone && \
  PNPM_VERSION="$(awk -F '"' '/^pnpm = / {print $2}' mise.toml)" && \
  test -n "$PNPM_VERSION" && \
  npm install --global "pnpm@$PNPM_VERSION"

FROM base AS build
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY tsconfig.json ./
COPY src/ src/
RUN pnpm build

FROM base AS prod
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --prod --frozen-lockfile
COPY --from=build /app/dist ./dist

RUN chown -R node:node /app
USER 1000:1000

CMD ["node", "dist/main.js"]
