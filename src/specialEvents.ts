import { logs, SeverityNumber } from "@opentelemetry/api-logs";

const logger = logs.getLogger("special-events", "1.0.0");

/**
 * Retrieves a special message based on the month and day.
 * @returns An object containing special messages for each month and day.
 */
function getSpecialMessage(): Record<number, Record<number, string>> {
  return {
    1: {
      // Enero
      1: "¡Enero comienza! Año nuevo, ponte los guantes y abrígate el huevo 🍳",
      6: "Hoy vienen los reyes con corona y brillo, pero el que se lleva la rosca es tu bolsillo 👑",
      30: "Felicidades @LilNarwhal 🎉 ¡Que te celebren más que a la cuesta de enero!",
    },
    2: {
      // Febrero
      1: "Febrero viene corto pero intenso, ¡ponte romántico o vas al censo! ❤️",
      7: "Felicidades @JoseAwe! 🎉 ¡Que tu cumpleaños dure más que el mes de febrero!",
      14: "Sam va Lentin llegó",
      26: "Felicidades @thedrvd! 🎉 ¡Sigue siendo tan fabuloso como siempre!",
    },
    3: {
      // Marzo
      1: "Marzo loco y abril poco, abrígate antes de quedarte hecho un moco 🤧",
      8: "¡Feliz día de la mujer! Pero cuidado, que hoy mandan ellas 🌹 (no)",
      17: "San Patricio está aquí, échate una cerveza y di ¡sláinte! 🍀",
    },
    4: {
      // Abril
      1: "Abril con lluvias y más de una broma, pero tranquilo, la primavera te corona 🌸",
      20: "¡Feliz día de los porros! 🌿 Si ves unicornios, no es culpa mía 🦄",
    },
    5: {
      // Mayo
      1: "En mayo las flores están de fiesta, y la alergia te invita a una siesta 🤧",
      4: "Felicidades @R3DMSR, y que la fuerza te acompañe hoy y siempre 🎉",
      6: "Felicidades @DoctorMckay 🎉 ¡Que tu día sea más épico que una película de Marvel!",
      8: "Hoy es el día de Motorhead 🤘, ¡así que a romper cuellos con buen metal!",
      9: "Felicidades @Thexiao77 y feliz Día de la Victoria 🎉 ¡Brindemos con vodka camarada! 🍸",
      25: "Felicidades @Garfu01 <3 ¡Hoy eres más irresistible que un meme viral!",
    },
    6: {
      // Junio
      1: "Junio llega caliente, pero no te preocupes, ¡tienes tiempo para ser decente! 🌞",
    },
    7: {
      // Julio
      1: "En julio el sol quema fuerte, y el aire acondicionado es nuestra suerte 🥵",
      8: "Felicidades @sanz97xx! 🎉 ¡Que tu día sea tan épico como tus errores matematicos!",
      20: "¡Feliz día del amigo! (Si tienes uno, claro) 😜",
    },
    8: {
      // Agosto
      1: "Agosto está aquí, con calor a morir, ¡pero no te derritas en tu porvenir! 🌞",
      2: "Felicidades al más guapo y seductor, @Sauturn 🎉 ¡No sabemos cómo lo haces, pero lo haces bien!",
    },
    9: {
      // Septiembre
      1: "Se acabó la playita, septiembre te obliga a ponerte la ropita 😢",
      11: "Felicidades torres gemelas 🎉 ¡Que no te derrumbes este año!",
      15: "Felicidades @CecilioGil 🎉 ¡Que tu día sea tan legendario como tú!",
    },
    10: {
      // Octubre
      1: "💀 SpookTober 💀 Octubre te asusta, pero el dulce es quien te gusta 🍬",
      5: "Felicidades al crack @DavasJoe 🎉 ¡Eres el mas grande, fiera, monstro, mastodonte y tal!",
      7: "Felicidades @txc450 🎉 ¡El más tranquilo, aunque tu estrés diga lo contrario!",
      12: "🇪🇸 ¡Feliz día de la Hispanidad! 🇪🇸 Y a Andres(blu), que no tiene @, también 🎉",
      16: "Felicidades @DarkTrainer 🎉 ¡Eres tan calvo y peludo como nunca!",
      31: "Feliz Halloween 🎃",
    },
    11: {
      // Noviembre
      1: "⛔💦 No Fap November empieza, ¡así que manos quietas! 🙈",
      20: "Se ha matado Paco",
    },
    12: {
      // Diciembre
      1: "Diciembre trae regalos y fiestas, pero no te comas todo o te arrepentirás en la cuesta 🎁",
      20: "Felicidades @jaimegsov el hombre de cobre que no se oxida 🎉",
      25: "Feliz navidad 🎄 ¡Que el gordo barbudo te traiga lo que mereces!",
      28: `
⣿⣿⣿⣿⣿⣿⣿⡿⠟⠋⠉⢁⣀⣀⣀⡈⠉⠛⢿⡿⠿⢿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⠏⢀⣴⣾⣿⣿⣿⣿⣿⡟⠃⢀⣀⣤⣤⣄⠉⢿⣿
⣿⣿⣿⣿⣿⡏⠀⣾⣿⣿⣿⣿⣿⣿⠏⠀⣴⣿⣿⣿⣯⣻⣧⠀⢻
⣿⣿⣿⣿⣿⠁⢸⣿⣿⣿⣿⣿⣿⣿⠀⠸⣿⣿⣿⣿⣿⣿⣿⡇⠈
⣿⣿⣿⣿⡏⠀⣼⣿⣿⣿⣿⣿⣿⣿⣧⠀⠹⢿⣿⣿⣿⡿⠟⠀⣼
⣿⣿⣿⡿⠇⠀⠛⠿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣀⡈⠉⠀⠀⣴⣿⣿
⣿⡿⠁⣀⢠⢤⣤⠀⠀⠉⢀⠀⠀⠈⠉⠻⢿⣿⣿⣿⡇⠀⣿⣿⣿
⡟⠀⣴⣽⣷⣷⠆⠀⣴⣾⣿⣔⡳⢦⡄⣄⣠⣿⣿⣿⡇⠀⣿⣿⣿
⠀⢰⣿⣿⣿⠇⠀⣼⣿⣿⣿⣿⣿⣷⣶⣿⣿⣿⣿⣿⣿⠀⢻⣿⣿
⠀⠸⣾⣿⣿⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⢸⣿⣿
⣧⠀⠻⢿⣿⠀⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⢸⣿⣿
⣿⣷⣤⣀⣈⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⠟⠙⣿⣿⣿⡏⠀⣼⣿⣿
⣿⣿⣿⣿⣿⡇⠀⣄⠀⠙⠛⠿⠿⠛⠁⢀⣼⣿⣿⣿⡇⠀⣿⣿⣿
⣿⣿⣿⣿⣿⣷⡀⠘⠿⠶⠀⢀⣤⣤⡀⠙⢿⣿⣿⡿⠁⢰⣿⣿⣿
⢻⣿⣿⣿⣿⣿⣿⣦⣤⣤⣴⣿⣿⣿⣷⣄⣀⠈⠁⣀⣠⣿⣿⣿⣿
⣹⣿⣿⣿⡿⢋⣩⣬⣩⣿⠃⣿⣿⣿⣿⢸⣿⡿⢋⣡⣬⣩⣿⣿⣿
⡗⣿⣿⣿⣧⣈⣛⠛⠻⣿⠀⣿⣿⣿⡿⢸⣿⣧⣈⣛⠛⠻⣿⣿⣿
⣿⣿⣿⣿⠹⣿⣿⡿⠂⣿⣇⠸⣿⣿⠃⣼⣿⠻⣿⣿⡿⠀⣿⣿⣿
⣿⣿⣿⣿⣶⣤⣤⣴⣾⣿⣿⣶⣤⣤⣾⣿⣿⣶⣤⣤⣴⣾⣿⣿⣿
`,
    },
  };
}

function getMessage(month: number, day: number): string | null {
  const messages = getSpecialMessage();
  return messages[month]?.[day] || null;
}

function getSpecialEvents(): string | null {
  const month = fixMonthlyDate(new Date().getMonth());
  const day = new Date().getDate();

  logger.emit({
    severityNumber: SeverityNumber.INFO,
    severityText: "INFO",
    body: `Checking special event for date: ${month}-${day}`,
    attributes: {
      "log.type": "event-check",
      month,
      day,
    },
  });

  const message = getMessage(month, day);

  if (message) {
    logger.emit({
      severityNumber: SeverityNumber.INFO,
      severityText: "INFO",
      body: `Special event found: ${message}`,
      attributes: {
        "log.type": "event-found",
        month,
        day,
      },
    });
  } else {
    logger.emit({
      severityNumber: SeverityNumber.INFO,
      severityText: "INFO",
      body: "No special event found",
      attributes: {
        "log.type": "event-none",
        month,
        day,
      },
    });
  }

  return message;
}

/**
 * Fixes the monthly date by adding 1 to the given month.
 * If the month is 0, it returns 1.
 *
 * @param month - The month to be fixed.
 * @returns The fixed monthly date.
 */
function fixMonthlyDate(month: number): number {
  if (month === 0) {
    return 1;
  }
  return month + 1;
}

export { getSpecialEvents };
