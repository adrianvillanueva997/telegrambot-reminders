package main

import (
	"adrianvillanueva997/telegrambot_reminders/src/services"
	"os"

	"github.com/charmbracelet/log"
	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
)

func main() {
	bot, err := tgbotapi.NewBotAPI(os.Getenv("TELEGRAM_TOKEN"))
	if err != nil {
		log.Error("Error creating bot", err)
	}
	bot.Debug = false

	log.Info("Authorized on account ")

	u := tgbotapi.NewUpdate(0)
	u.Timeout = 60

	updates := bot.GetUpdatesChan(u)
	if err != nil {
		log.Error("Error getting updates", err)
	}
	services.Thursday(bot).Start()
	services.SpecialEvents(bot).Start()
	for update := range updates {
		if update.Message == nil {
			continue
		}
	}

}
