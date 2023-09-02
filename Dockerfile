FROM node:20.5.1 AS build

# Set working directory to /build
WORKDIR /build

# Copy package.json and yarn.lock first to leverage Docker cache for dependency installation
COPY . .

# Install dependencies with yarn and clean cache in one step to reduce layers
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Switch to a lightweight Node.js image for runtime
FROM node:20.5.1-bullseye-slim AS runtime

# Set working directory to /app
WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=build /build/node_modules ./node_modules
COPY --from=build /build/dist ./dist
COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
# Install production dependencies (only the necessary ones)

RUN pnpm install --frozen-lockfile --production
# Start the application in production mode
CMD ["pnpm", "run", "prod"]
