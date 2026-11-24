# Telegrambot reminders

This is a simple telegram bot that sends reminders to a private group chat.

## Development

Install the tools in `mise.toml` with `mise install`, then run:

```sh
pnpm install --frozen-lockfile
prek install
pnpm build
BOT_TOKEN=<token> pnpm start
```

`pnpm dev` builds and starts the bot in one command. Run `prek run --all-files` to run the checks used by CI.
