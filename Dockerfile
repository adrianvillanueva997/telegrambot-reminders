FROM node:20.5.0 AS build

# Set working directory to /build
WORKDIR /build

# Copy package.json and yarn.lock first to leverage Docker cache for dependency installation
COPY . .

# Install dependencies with yarn and clean cache in one step to reduce layers
RUN yarn install --frozen-lockfile && yarn cache clean
RUN yarn run build

# Switch to a lightweight Node.js image for runtime
FROM node:20.5.0-bullseye-slim AS runtime

# Set working directory to /app
WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=build /build/node_modules ./node_modules
COPY --from=build /build/dist ./dist
COPY package.json yarn.lock ./

# Install production dependencies (only the necessary ones)
RUN yarn install --frozen-lockfile --production && yarn cache clean

# Start the application in production mode
CMD ["yarn", "run", "prod"]
