FROM oven/bun:1.3.12-debian AS base

ENV TZ="Europe/Madrid"
WORKDIR /app

RUN apt-get update && \
  apt-get install --no-install-recommends -y \
  ca-certificates \
  tzdata && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
  echo $TZ > /etc/timezone

FROM base AS build
COPY package.json bun.lock* ./
COPY tsconfig.json ./
COPY src/ src/
RUN bun install && bun run build

FROM base AS prod
COPY package.json bun.lock* ./
COPY --from=build /app/dist ./dist
RUN bun install --prod

RUN chown -R bun:bun /app
USER bun

CMD ["bun", "run", "start"]