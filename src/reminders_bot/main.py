import datetime
import logging
import os

from rich.console import Console
from rich.logging import RichHandler
from telegram import Update
from telegram.ext import (
    Application,
    CallbackContext,
    CommandHandler,
    ContextTypes,
)

from reminders_bot import events
from reminders_bot.routines import (
    TELEGRAM_GROUP_ID,
    setup_daily_routine,
    setup_thursday_routine,
)

console = Console(force_terminal=True, width=255, height=255)
# Enable logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO,
    handlers=[
        RichHandler(rich_tracebacks=True, tracebacks_show_locals=True, console=console)
    ],
)


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send a message when the command /help is issued."""
    await update.message.reply_text("Help!")  # type: ignore


async def happy_thursday(context: CallbackContext) -> None:
    await context.bot.send_message(
        TELEGRAM_GROUP_ID, text="Feliz jueves!"
    )  # type: ignore


async def daily_routine(context: CallbackContext) -> None:
    message_text = events.get_event()
    if message_text != "":
        await context.bot.send_message(TELEGRAM_GROUP_ID, text=message_text)


def main() -> None:
    """Run bot."""
    # Create the Application and pass it your bot's token.
    application = Application.builder().token(os.getenv("telegram_bot")).build()

    # Happy Thursday!
    application.job_queue.run_repeating(
        happy_thursday,
        interval=datetime.timedelta(days=7),
        first=setup_thursday_routine(),
    )
    # Special events
    application.job_queue.run_repeating(
        daily_routine,
        interval=datetime.timedelta(days=1),
        first=setup_daily_routine(),
    )

    application.add_handler(CommandHandler("help", help_command))
    application.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == "__main__":
    main()
