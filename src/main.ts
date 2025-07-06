import { SeverityNumber } from "@opentelemetry/api-logs/";
import { CronJob } from "cron";
import { Telegraf } from "telegraf";
import { getSpecialEvents } from "./specialEvents";
import { logger } from "./tracing";

if (process.env.BOT_TOKEN === undefined) {
	logger.emit({
		severityNumber: SeverityNumber.INFO,
		severityText: "ERROR",
		body: "Bot token is not defined",
		attributes: { "log.type": "custom" },
	});
	process.exit(1);
}
const bot = new Telegraf(process.env.BOT_TOKEN);
logger.emit({
	severityNumber: SeverityNumber.INFO,
	severityText: "INFO",
	body: "Starting bot",
	attributes: { "log.type": "custom" },
});
const telegramGroupId = "-1001063900471";

const thursdayJob = new CronJob(
	"0 0 0 * * 4",
	async () => {
		logger.emit({
			severityNumber: SeverityNumber.INFO,
			severityText: "INFO",
			body: "Thursday event",
			attributes: { "log.type": "custom" },
		});
		await bot.telegram.sendMessage(telegramGroupId, "Feliz jueves! 🐸");
	},
	null,
	true,
	"Europe/Madrid",
);

const specialEventsJob = new CronJob(
	"0 0 * * 0-6",
	async () => {
		logger.emit({
			severityNumber: SeverityNumber.INFO,
			severityText: "INFO",
			body: "Checking for daily event",
			attributes: { "log.type": "custom" },
		});
		const specialEvent = getSpecialEvents();
		if (specialEvent !== null) {
			logger.emit({
				severityNumber: SeverityNumber.INFO,
				severityText: "INFO",
				body: `Special event detected: ${specialEvent}`,
				attributes: { "log.type": "custom" },
			});
			await bot.telegram.sendMessage(telegramGroupId, specialEvent);
		}
	},
	null,
	true,
	"Europe/Madrid",
);

thursdayJob.start();
specialEventsJob.start();

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
