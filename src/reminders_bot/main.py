import datetime
import logging
import os
from logging import log

from rich.logging import RichHandler
from telegram import Update
from telegram.ext import (
    Application,
    CallbackContext,
    CommandHandler,
    ContextTypes,
    JobQueue,
)

# Enable logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO,
    handlers=[RichHandler(rich_tracebacks=True)],
)


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send a message when the command /help is issued."""
    await update.message.reply_text("Help!")
    jobs = JobQueue()
    await jobs.start()
    print("patata")


async def happy_thursday(context: CallbackContext) -> None:
    # await context.bot.send_message(-1001063900471, text="Feliz jueves!")  # type: ignore
    log.info("Feliz jueves!")


def main() -> None:
    """Run bot."""
    # Create the Application and pass it your bot's token.
    application = Application.builder().token(os.getenv("telegram_bot")).build()

    # Schedule the job to run every Thursday at 12:03 AM (UTC)
    now = datetime.datetime.now()
    target_time = datetime.datetime(now.year, now.month, now.day, 0, 0)
    if target_time < now:
        target_time += datetime.timedelta(
            days=7
        )  # Schedule it for the next week if it's already passed
    days_until_thursday = (target_time.date() - now.date()).days
    target_time += datetime.timedelta(days=days_until_thursday)

    application.job_queue.run_repeating(
        happy_thursday, interval=datetime.timedelta(days=7), first=target_time
    )

    application.add_handler(CommandHandler("help", help_command))
    application.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == "__main__":
    main()
