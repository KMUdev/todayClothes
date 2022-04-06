import React from "react";
import axios from "axios";
import { moveSyntheticComments } from "typescript";

function serializeDate(date: number): string {
  return date < 10 ? "0" + date : "" + date;
}

function getBaseDate(): string[] {
  let base_date = "";
  let base_time = "";

  // dateObj에 저장하기전, 00:00 ~ 01:59의 시간대는 없기때문에
  // 날짜를 전날 23:00 기준으로 정해주어야한다.
  // 날짜 계산을 먼저 하도록.

  const dateObj = new Date();
  const year = dateObj.getFullYear().toString();
  const month = dateObj.getMonth() + 1; //JAN == 0
  const day = dateObj.getDate();
  const hour = dateObj.getHours();

  base_date += year;
  base_date += serializeDate(month);
  base_date += serializeDate(day);
  base_time += serializeDate(hour); //tobase_time
  base_time += "00";

  return [base_date, base_time];
}

function getPosition(): string[] {
  return ["55", "127"];
}

async function getWeatherInfos() {
  const [base_date, base_time] = getBaseDate();
  const [nx, ny] = getPosition();
  console.log(base_date, base_time, nx, ny);
  const address = `/api/1360000/VilageFcstInfoService_2.0/getVilageFcst` + `?serviceKey=${process.env.WEATHER_API_KEY}` + `&numOfRows=12` + `&pageNo=1` + `&base_date=${base_date}` + `&base_time=${base_time}` + `&nx=${nx}&ny=${ny}` + `&dataType=JSON`;
  console.log(address);

  const response = await axios.get(address);
  console.log(response.data);
  return true;
}

export default getWeatherInfos;
