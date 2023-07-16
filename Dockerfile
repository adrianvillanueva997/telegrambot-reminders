# Multistage docker image building
# build-env -> prod

FROM python:3.11.4-slim-buster AS build-env

# Install build dependencies
RUN apt-get update \
    && apt-get install -y build-essential python-pkg-resources  \
    && rm -rf /var/lib/apt/lists/*

# Install Poetry
RUN pip install --upgrade --no-cache-dir pip &&  pip install --no-cache-dir poetry

# Copy only the dependency files
COPY pyproject.toml poetry.lock /app/

# Install dependencies in a virtual environment
WORKDIR /app
RUN poetry config virtualenvs.create false \
    && poetry install --no-root --no-dev

# Second stage
FROM python:3.11.4-slim-buster AS prod

# Copy installed dependencies from previous stage
COPY --from=build-env /usr/local /usr/local

# Copy project files
WORKDIR /app
COPY . .

# Expose port and set command
EXPOSE 2112
CMD ["make", "prod"]
