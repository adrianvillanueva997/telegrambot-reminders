function check_daily_event(): string {
  const day = new Date().getDate();
  const month = new Date().getMonth();
  let event = '';
  switch (month) {
    case 1:
      switch (day) {
        case 1:
          event = 'Feliz año nuevo!';
          break;
        case 6:
          event = 'Feliz día de reyes!';
          break;
        case 30:
          event = 'Felicidades @LilNarwhal!';
      }
      break;
    case 2:
      switch (day) {
        case 1:
          event = 'Febrero febrerin el mas corto y el mas ruin';
          break;
        case 7:
          event = 'Feliz cumpleaños @JoseAwe!';
          break;
        case 14:
          event = 'Feliz día del amor y la amistad!';
          break;
        case 26:
          event = 'Feliz cumpleaños @thedrvd!';
          break;
      }
      break;
    case 3:
      switch (day) {
        case 1:
          event =
            'Marzo mal o bueno, el buey a la hierba y a la sombra el perro.';
          break;
        case 8:
          event = 'Feliz día de la mujer!';
          break;
      }
      break;
    case 4:
      switch (day) {
        case 1:
          event = 'Abril aguas mil.';
          break;
        case 20:
          event = 'Felicidades porreros!';
          break;
      }
      break;
    case 5:
      switch (day) {
        case 1:
          event = 'En mayo, cada día un huevo y dos en el domingo';
          break;
        case 4:
          event = 'Felicidades @R3dmsr y Feliz día de Star Wars!';
          break;
        case 6:
          event = 'Feliz cumpleaños @DoctorMckay!';
          break;
        case 8:
          event = 'Feliz día de Motorhead!';
          break;
        case 9:
          event =
            'Feliz cumpleaños @Adrianv5x! Feliz dia de la victoria camaradas';
          break;
      }
      break;
    case 6:
      switch (day) {
        case 1:
          event = 'En junio, la calor en el cucurucho.';
          break;
      }
      break;
    case 7:
      switch (day) {
        case 1:
          event = 'Julio, ni te cases ni te embarques';
          break;
        case 8:
          event = 'Felicidades @sanz97xx!';
          break;
      }
      break;
    case 8:
      switch (day) {
        case 1:
          event = 'Agosto, frio en el rostro';
          break;
        case 2:
          event = 'Felicidades al mas guapo del grupo @Sauturn';
          break;
      }
      break;
    case 9:
      switch (day) {
        case 1:
          event = 'Septiembre, el otoño se ve';
          break;
        case 11:
          event = 'Felicidades torres gemelas';
          break;
        case 15:
          event = 'Felicidades @Ceciliogil!';
      }
      break;
    case 10:
      switch (day) {
        case 1:
          event = '💀 SpookTober 💀';
          break;
        case 5:
          event = 'Felicidades al segundo mas guapo del grupo @DavasJoe';
          break;
        case 12:
          event = '🇪🇸 Feliz dia de Españita 🇪🇸';
          break;
        case 16:
          event = 'https://www.youtube.com/watch?v=KnrKrHhqKyk @DarkTrainer';
          break;
      }
      break;
    case 11:
      switch (day) {
        case 1:
          event = '⛔💦 Queda inaugurada la temporada de No Fap November ⛔💦';
          break;
        case 20:
          event = 'Franco ha resucitado';
          break;
      }
      break;
    case 12:
      switch (day) {
        case 1:
          event =
            'Cuando en diciembre veas nevar, ensancha el granero y el pajar';
          break;
        case 25:
          event = 'Feliz navidad!';
          break;
      }
      break;
  }
  return event;
}

export { check_daily_event };
