package services

import (
	"time"

	"github.com/charmbracelet/log"
	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"

	"github.com/go-co-op/gocron"
)

func Thursday(bot *tgbotapi.BotAPI) *gocron.Scheduler {
	log.Info("Thursday scheduler started")
	scheduler := gocron.NewScheduler(time.UTC)
	_, err := scheduler.Every(1).Thursday().At("00:00").Do(
		func() {
			log.Info("It's Thursday!")
			message := tgbotapi.NewMessage(-1001063900471, "Feliz jueves!")
			_, _ = bot.Send(message)
		},
	)
	if err != nil {
		log.Error("Error scheduling Thursday")
	}
	return scheduler
}
