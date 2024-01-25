# Build stage
FROM golang:1.21-bullseye as build-env
RUN apt-get update && \
    apt-get install --no-install-recommends -y make git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
WORKDIR /build
COPY go.mod .
COPY go.sum .
RUN go mod download
COPY . .
RUN go build && chmod +x telegrambot_reminders

# Executable stage
FROM debian:12.4-slim
RUN apt-get update && \
    apt-get install --no-install-recommends -y ca-certificates tzdata && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
WORKDIR /app
RUN adduser --disabled-password appuser
COPY --from=build-env /build/telegrambot_reminders .
USER appuser
ENV TZ=Europe/Madrid
ENTRYPOINT ["./telegrambot_reminders"]
