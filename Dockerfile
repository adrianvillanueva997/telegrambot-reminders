FROM node:19.7.0-buster AS build
WORKDIR /build

COPY package.json yarn.lock ./
RUN yarn install
