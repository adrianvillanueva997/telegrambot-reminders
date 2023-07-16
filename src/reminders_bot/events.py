import datetime


def get_event():
    today = datetime.datetime.today()
    month = today.month
    day = today.day
    message = ""
    match month:
        case 1:
            match day:
                case 1:
                    message = "Feliz año nuevo!"
                case 30:
                    message = "Feliz cumpleaños, @LilNarwhal!"
        case 2:
            match day:
                case 1:
                    message = "Febrero febrerín, el más corto y el más ruin"
                case 7:
                    message = "Feliz cumpleaños, @Joseawe!"
                case 14:
                    message = "Sam va lentin!"
                case 26:
                    message = "Feliz cumpleaños, @thedrdvd!"
        case 3:
            match day:
                case 1:
                    message = (
                        "Marzo mal o bueno, el buey a la hierba y a la sombra el perro."
                    )
                case 8:
                    message = "Felicidades a todas las mujeres!"
        case 4:
            match day:
                case 1:
                    message = "Abril, aguas mil"
                case 20:
                    message = "Felicidades porreros!"
        case 5:
            match day:
                case 1:
                    message = "En mayo, cada día un huevo y dos en el domingo"
                case 4:
                    message = "Feliz cumpleaños, @r3dmsr! y Feliz dia de Star Wars!"
                case 6:
                    message = "Feliz cumpleaños, @DoctorMckay!"
                case 8:
                    message = "Feliz dia de Motorhead!"
                case 9:
                    message = "Feliz cumpleaños, @adrianv5x y Feliz dia de la victoria!"
        case 6:
            match day:
                case 1:
                    message = "En junio, el sol en el cubo"
        case 7:
            match day:
                case 1:
                    message = "Julio, ni te cases ni te embarques"
                case 8:
                    message = "Feliz cumpleaños, @Sanz97xx!"
        case 8:
            match day:
                case 1:
                    message = "Agosto, frío en el rostro"
                case 2:
                    message = "Felicidades al mas guapo del grupo! @Sauturn"
        case 9:
            match day:
                case 1:
                    message = "Septiembre, el otoño se ve"
                case 11:
                    message = "Felicidades torres gemelas!"
                case 15:
                    message = "Felicidades @CecilioGil!"
        case 10:
            match day:
                case 1:
                    message = "💀 SpookTober 💀"
                case 5:
                    message = (
                        "Feliz cumpleanos al segundo mas guapo del grupo! @DavasJoe"
                    )
                case 7:
                    message = "Feliz cumpleaños, @txc450!"
                case 8:
                    message = "Felicidades Naruto!"
                case 12:
                    message = "🇪🇸 Feliz dia de Españita 🇪🇸"
                case 16:
                    message = "https://www.youtube.com/watch?v=KnrKrHhqKyk @DarkTrainer"
        case 11:
            match day:
                case 1:
                    message = "⛔💦 Queda inaugurada la temporada de No Fap November ⛔💦"
                case 20:
                    message = "Franco ha muerto!"
        case 12:
            match day:
                case 1:
                    message = (
                        "Cuando en diciembre veas nevar, ensancha el granero y el pajar"
                    )
                case 25:
                    message = "Feliz navidad!"
    return message
