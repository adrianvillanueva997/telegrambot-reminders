function getSpecialEvents(): string {
  const month = new Date().getMonth();
  const day = new Date().getDate();
  let message = 'undefined';
  switch (month) {
    case 1:
      switch (day) {
        case 1:
          message = 'Feliz año nuevo! 🎉';
          break;
        case 6:
          message = 'Feliz día de reyes! 👑';
          break;
        case 30:
          message = 'Felicidades @LilNarwhal 🎉';
          break;
      }
      break;
    case 2:
      switch (day) {
        case 1:
          message = 'Febrero febrerin el mas corto y el mas ruin ';
          break;
        case 7:
          message = 'Feicidades @JoseAwe! 🎉';
          break;
        case 14:
          message = 'Sam va lentin 🌹';
          break;
        case 26:
          message = 'Felicidades @thedrvd! 🎉';
          break;
      }
      break;
    case 3:
      switch (day) {
        case 1:
          message = 'Marszo ';
          break;
        case 8:
          message = 'Feliz día de la mujer! 🌹';
          break;
        case 17:
          message = 'Feliz día de San Patricio! 🍀';
          break;
      }
      break;
    case 4:
      switch (day) {
        case 1:
          message = 'Abril abrilero, cada día un chaparrón y un sombrero';
          break;
        case 20:
          message = 'Feliz dia de los porros! 🌿';
          break;
      }
      break;
    case 5:
      switch (day) {
        case 1:
          message = 'En mayo, cada día un huevo y dos en el domingo';
          break;
        case 4:
          message = 'Felicidades @R3DMSR y feliz dia de Star Wars! 🎉';
          break;
        case 6:
          message = 'Felicidades @DoctorMckay! 🎉';
          break;
        case 8:
          message = 'Feliz dia de Motorhead! 🤘';
          break;
        case 9:
          message =
            'Felicidades @Thexiao77! Y Feliz dia de la victoria camaradas! 🎉';
          break;
        case 25:
          message = 'Felicidades @Garfu01 <3 <3 <3';
      }
      break;
    case 6:
      switch (day) {
        case 1:
          message =
            'En junio, el que no trabaja no tiene dinero ni tiene amigo';
          break;
      }
      break;
    case 7:
      switch (day) {
        case 1:
          message = 'Julio';
          break;
        case 8:
          message = 'Felicidades @sanz97xx! (Menudo gilipollas) 🎉';
          break;
        case 20:
          message = 'Feliz dia del amigo! (para los que tengan)';
          break;
      }
      break;
    case 8:
      switch (day) {
        case 1:
          message = 'Agosto';
          break;
        case 2:
          message =
            'Felicidades al mas guapo, grande, hermoso y seductor @Sauturn 🎉';
          break;
      }
      break;
    case 9:
      switch (day) {
        case 1:
          message = 'Septiembre';
          break;
        case 11:
          message = 'Felicidades torres gemelas! 🎉';
          break;
        case 15:
          message = 'Felicidades @CecilioGil! 🎉';
          break;
      }
      break;
    case 10:
      switch (day) {
        case 1:
          message = '💀 SpookTober 💀';
          break;
        case 5:
          message =
            'Felicidades al artista, maquina, fiera, crack, mastodonte @DavasJoe 🎉';
          break;
        case 7:
          message =
            'Felicidades a la persona mas calmada y tranquila del grupo @txc450 🎉';
          break;
        case 12:
          message =
            '🇪🇸 Felis dia de Espanita 🇪🇸 y felisidades a Andres(blu) (no tiene @ )';
          break;
        case 16:
          message =
            'Feicidades al segundo mas calvo (y al mas furro) del grupo, @DarkTrainer https://www.youtube.com/watch?v=KnrKrHhqKyk 🎉';
          break;
        case 31:
          message = 'Feliz Halloween! 🎃';
          break;
      }
      break;
    case 11:
      switch (day) {
        case 1:
          message =
            '⛔💦 Queda inaugurada la temporada de No Fap November ⛔💦';
          break;
        case 20:
          message = 'Ha muerto Maradona';
          break;
      }
      break;
    case 12:
      switch (day) {
        case 1:
          message = 'Diciembre. ';
          break;
        case 25:
          message = 'Feliz navidad! 🎄🎅🎁';
          break;
      }
      break;
  }
  return message;
}

export { getSpecialEvents };
