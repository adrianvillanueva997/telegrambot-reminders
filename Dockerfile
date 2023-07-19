FROM python:3.11.4-slim-buster AS prod

WORKDIR /app

# Install dependencies
COPY . .
RUN pip install poetry && poetry install

# Run your app
CMD [ "poetry", "run", "python", "src/reminders_bot/main.py" ]