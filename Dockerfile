# Multistage docker image building
# build-env -> prod

FROM python:3.11.4-slim-buster AS build-env
WORKDIR /app
# Install build dependencies
RUN apt-get update \
    && apt-get install -y build-essential python-pkg-resources \
    && rm -rf /var/lib/apt/lists/*

# Install Poetry
RUN pip install --upgrade --no-cache-dir pip &&  pip install --no-cache-dir poetry

# Copy only the dependency files
COPY . .

# Install dependencies in a virtual environment

RUN poetry install

CMD ["make", "prod"]
