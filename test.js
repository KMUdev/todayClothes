const oneHourInMil = 3600000;
const startT = new Date().setMinutes(0, 0, 0); //16
const endT = startT + 24 * oneHourInMil;

console.log(new Date(startT), endT);
