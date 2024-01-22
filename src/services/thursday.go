package services

import (
	"github.com/charmbracelet/log"
	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"

	"github.com/go-co-op/gocron/v2"
)

func Thursday(bot *tgbotapi.BotAPI) gocron.Scheduler {
	log.Info("Thursday scheduler started")
	scheduler, err := gocron.NewScheduler()
	if err != nil {
		log.Error("Error creating scheduler", err)
	}

	_, err = scheduler.NewJob(
		gocron.WeeklyJob(
			1,
			gocron.NewWeekdays(4),
			gocron.NewAtTimes(
				gocron.NewAtTime(0, 0, 0),
			),
		),
		gocron.NewTask(
			func() {
				log.Info("It's Thursday!")
				message := tgbotapi.NewMessage(-1001063900471, "Feliz jueves!")
				_, _ = bot.Send(message)
			},
		),
	)

	if err != nil {
		log.Error("Error scheduling Thursday")
	}
	return scheduler
}
