import { SeverityNumber } from "@opentelemetry/api-logs";
import { CronJob } from "cron";
import { Telegraf } from "telegraf";
import { getSpecialEvents } from "./specialEvents";
import { initTelemetry } from "./telemetry";

(async () => {
	const { logger } = await initTelemetry();

	if (!process.env.BOT_TOKEN) {
		logger.emit({
			severityNumber: SeverityNumber.ERROR,
			severityText: "ERROR",
			body: "BOT_TOKEN is not defined in environment variables",
			attributes: { "log.type": "init" },
		});
		process.exit(1);
	}

	const bot = new Telegraf(process.env.BOT_TOKEN);
	const telegramGroupId = "-1001063900471";

	logger.emit({
		severityNumber: SeverityNumber.INFO,
		severityText: "INFO",
		body: "Starting Telegram bot...",
		attributes: { "log.type": "startup" },
	});

	const thursdayJob = new CronJob(
		"0 0 0 * * 4",
		async () => {
			logger.emit({
				severityNumber: SeverityNumber.INFO,
				severityText: "INFO",
				body: "Running Thursday scheduled job",
				attributes: { "log.type": "cron" },
			});
			await bot.telegram.sendMessage(telegramGroupId, "Feliz jueves! 🐸");
		},
		null,
		false,
		"Europe/Madrid",
	);

	const publicholidaysJob = new CronJob(
		"0 21 * * 0-6",
		async () => {
			logger.emit({
				severityNumber: SeverityNumber.INFO,
				severityText: "INFO",
				body: "Running Public Holidays scheduled job",
				attributes: { "log.type": "cron" },
			});
			const public_holiday = await getSpanishPublicHolidayTelegram();
			if (public_holiday !== null)
				await bot.telegram.sendMessage(telegramGroupId, public_holiday);
		},
		null,
		false,
		"Europe/Madrid",
	);

	const specialEventsJob = new CronJob(
		"0 0 * * 0-6",
		async () => {
			logger.emit({
				severityNumber: SeverityNumber.INFO,
				severityText: "INFO",
				body: "Checking for daily special event",
				attributes: { "log.type": "cron" },
			});

			const specialEvent = getSpecialEvents();
			if (specialEvent) {
				await bot.telegram.sendMessage(telegramGroupId, specialEvent);
			}
		},
		null,
		false,
		"Europe/Madrid",
	);

	thursdayJob.start();
	specialEventsJob.start();
	publicholidaysJob.start();
	await bot.launch();

	logger.emit({
		severityNumber: SeverityNumber.INFO,
		severityText: "INFO",
		body: "Telegram bot launched successfully",
		attributes: { "log.type": "startup" },
	});

	logger.emit({
		severityNumber: SeverityNumber.INFO,
		severityText: "INFO",
		body: "Cron jobs started",
		attributes: { "log.type": "startup" },
	});

	// Graceful shutdown
	process.once("SIGINT", async () => {
		bot.stop("SIGINT");
		logger.emit({
			severityNumber: SeverityNumber.INFO,
			severityText: "INFO",
			body: "Bot stopped on SIGINT",
			attributes: { "log.type": "shutdown" },
		});
	});

	process.once("SIGTERM", async () => {
		bot.stop("SIGTERM");
		logger.emit({
			severityNumber: SeverityNumber.INFO,
			severityText: "INFO",
			body: "Bot stopped on SIGTERM",
			attributes: { "log.type": "shutdown" },
		});
	});
})();
