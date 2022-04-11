const { isNamedExportBindings } = require("typescript");

const oneHourInMil = 3600000;
const startT = new Date().setMinutes(0, 0, 0);
const endT = startT + 24 * oneHourInMil;

console.log(new Date(startT), new Date(endT));

let date = "20220311";
let a = parseInt(date.slice(0, 4));
let b = date.slice(4, 6);
let c = date.slice(6, 8);
console.log(a, b, c);

// date -> 20220411
// time -> 1700
// const baseT = new Date(20220311, 1900).getTime();
// console.log(baseT);
