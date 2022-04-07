import React from "react";
import axios from "axios";
import { moveSyntheticComments } from "typescript";

function serializeDate(date: number): string {
  return date < 10 ? "0" + date : "" + date;
}

function getBaseDate(): Date {
  const currentDate = new Date();
  const oneHourInMil = 3600000;
  return new Date(currentDate.getTime() - ((currentDate.getHours() % 3) + 1) * oneHourInMil);
}

function getDateForWeatherAPI(): string[] {
  let base_date = "";
  let base_time = "";

  const baseDate = getBaseDate();

  const year = baseDate.getFullYear();
  const month = baseDate.getMonth() + 1; //JAN == 0
  const day = baseDate.getDate();
  const hour = baseDate.getHours();
  const minute = baseDate.getMinutes();

  base_date += serializeDate(year);
  base_date += serializeDate(month);
  base_date += serializeDate(day);
  base_time += serializeDate(hour);
  base_time += serializeDate(minute);

  return [base_date, base_time];
}

function getPositionForWeatherAPI(): string[] {
  return ["55", "127"];
}

async function getWeatherInfos() {
  const [base_date, base_time] = getDateForWeatherAPI();
  const [nx, ny] = getPositionForWeatherAPI();
  const address = `/api/1360000/VilageFcstInfoService_2.0/getVilageFcst` + `?serviceKey=${process.env.WEATHER_API_KEY}` + `&numOfRows=12` + `&pageNo=1` + `&base_date=${base_date}` + `&base_time=${base_time}` + `&nx=${nx}&ny=${ny}` + `&dataType=JSON`;

  const response = await axios.get(address);
  console.log(response.data);
  return true;
}

export default getWeatherInfos;
