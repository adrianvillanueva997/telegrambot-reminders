package services

import (
	"time"

	"github.com/charmbracelet/log"
	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"

	"github.com/go-co-op/gocron"
)

func SpecialEvents(bot *tgbotapi.BotAPI) *gocron.Scheduler {
	log.Info("Special events scheduler started")
	scheduler := gocron.NewScheduler(time.UTC)
	_, err := scheduler.Every(1).Thursday().At("00:00").Do(
		func() {
			log.Info("Checking special events!")
			event := get_event()
			if len(event) > 0 {
				message := tgbotapi.NewMessage(-1001063900471, "Feliz jueves!")
				_, _ = bot.Send(message)
			}

		},
	)
	if err != nil {
		log.Error("Error scheduling special events")
	}
	return scheduler
}

func get_event() string {
	day := int(time.Now().Day())
	month := int(time.Now().Month())
	var message string
	switch month {
	case 1:
		switch day {
		case 1:
			message = "Feliz año nuevo!"
		case 6:
			message = "Feliz día de reyes!"
		case 30:
			message = "Felicidades @LilNarwhal!"
		}
	case 2:
		switch day {
		case 1:
			message = "Febrero febrerin el mas corto y el mas ruin"
		case 7:
			message = "Feicidades @JoseAwe!"
		case 14:
			message = "Sam va lentin"
		case 26:
			message = "Felicidades @thedrvd!"
		}

	case 3:
		switch day {
		case 1:
			message = "Marzo mal o bueno, el buey a la hierba y a la sombra el perro."
		case 8:
			message = "Felicidades mujeres!"
		}

	case 4:
		switch day {
		case 1:
			message = "Abril aguas mil"
		case 20:
			message = "Felicidades porreros!"
		}

	case 5:
		switch day {
		case 1:
			message = "En mayo, cada día un huevo y dos en el domingo"
		case 4:
			message = "Felicidades @R3DMSR y feliz dia de Star Wars!"

		case 6:
			message = "Felicidades @DoctorMckay!"

		case 8:
			message = "Feliz dia de Motorhead!"

		case 9:
			message = "Felicidades @Thexiao77! Y Feliz dia de la victoria camaradas!"

		}

	case 6:
		switch day {
		case 1:
			message = "En junio, la hoz en el puño"

		}

	case 7:
		switch day {
		case 1:
			message = "Julio. El que en julio no trabaja, ni pobre ni rico se halla."

		case 8:
			message = "Felicidades @sanz97xx! (Menudo gilipollas)"

		}

	case 8:
		switch day {
		case 1:
			message = "Agosto. Agua en agosto, hielo en el mosto."

		case 2:
			message = "Felicidades al mas guapo, grande, hermoso y seductor, @Sauturn"

		}

	case 9:
		switch day {
		case 1:
			message = "Septiembre. Septiembre, o seca las fuentes o se lleva los puentes."

		case 11:
			message = "Felicidades Torres Gemelas!"

		case 15:
			message = "Felicidades @CecilioGil!"

		}

	case 10:
		switch day {
		case 1:
			message = "💀 SpookTober 💀"

		case 5:
			message = "Felicidades al artista, maquina, fiera, crack, mastodonte @DavasJoe"

		case 12:
			message = "🇪🇸 Felis dia de Espanita 🇪🇸"

		case 16:
			message = "Feicidades al segundo mas calvo (y al mas furro) del grupo, @DarkTrainer https://www.youtube.com/watch?v=KnrKrHhqKyk"

		}

	case 11:
		switch day {
		case 1:
			message = "'⛔💦 Queda inaugurada la temporada de No Fap November ⛔💦';"

		case 20:
			message = "Ha muerto Maradona"

		}

	case 12:
		switch day {
		case 1:
			message = "Diciembre. En diciembre, ni se coge el frío ni se deja."

		case 25:
			message = "Feliz navidad!"

		}

	}
	return message
}
