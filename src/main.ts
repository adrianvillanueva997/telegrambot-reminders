import { CronJob } from "cron";
import { Telegraf } from "telegraf";
import { type ILogObj, Logger } from "tslog";
import { getSpecialEvents } from "./specialEvents";
const log: Logger<ILogObj> = new Logger();

if (process.env.BOT_TOKEN === undefined) {
	log.error("Bot token is not defined");
	process.exit(1);
}
const bot = new Telegraf(process.env.BOT_TOKEN);
log.info("Bot started");
const telegramGroupId = "-1001063900471";

const thursdayJob = new CronJob("0 0 0 * * 4", async () => {
	log.info("It is Thursday my dudes");
	await bot.telegram.sendMessage(telegramGroupId, "Feliz jueves! 🐸");
});

const specialEventsJob = new CronJob("0 0 * * 0-6", async () => {
	log.info("Checking for special events");
	const specialEvent = getSpecialEvents();
	if (specialEvent !== null) {
		await bot.telegram.sendMessage(telegramGroupId, specialEvent);
	}
});

thursdayJob.start();
specialEventsJob.start();

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
