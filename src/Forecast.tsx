import React from "react";
import axios from "axios";
import { IAPIWeatherInfo } from "./interface/IAPIWeatherInfo";
import { IWeatherInfo } from "./interface/IWeatherInfo";

/**
 * 한자리 날짜를 두자리로 만들어준다
 * 예제)
 * if 3 then "03"
 * if 13 then "13"
 */
function dateToDoubleDigits(date: number): string {
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

  base_date += dateToDoubleDigits(year);
  base_date += dateToDoubleDigits(month);
  base_date += dateToDoubleDigits(day);
  base_time += dateToDoubleDigits(hour);
  base_time += dateToDoubleDigits(minute);

  return [base_date, base_time];
}

function getPositionForWeatherAPI(): string[] {
  return ["55", "127"];
}

// 지금 시간으로부터 24시간내로의 날씨정보
// fcstInfoInDay[0+23]
function isFcstTimeIn24HrsFromNow(date: string, time: string) {
  const oneHourInMil = 3600000;
  const startT = new Date().setMinutes(0, 0, 0);
  const endT = startT + 24 * oneHourInMil;
  const fcstT = new Date(parseInt(date.slice(0, 4)), parseInt(date.slice(4, 6)) - 1, parseInt(date.slice(6, 8))).getTime();
  return startT <= fcstT && fcstT <= endT;
}

function parseOneDayWeather(weatherInfo: IAPIWeatherInfo[]): IWeatherInfo[] {
  const oneDayWeatherInfo: IWeatherInfo[] = []; //지금으로부터 24시간내로의 날씨정보를 담을거임
  let curTime;
  let prevTime = weatherInfo[0].fcstTime;

  let oneHourWeatherInfo: IWeatherInfo = { TMP: "", POP: "", WSD: "", REH: "" };

  weatherInfo.forEach((e) => {
    curTime = e.fcstTime;
    if (curTime !== prevTime) {
      if (isFcstTimeIn24HrsFromNow(e.fcstDate, e.fcstTime)) oneDayWeatherInfo.push(oneHourWeatherInfo);
      oneHourWeatherInfo = { TMP: "", POP: "", WSD: "", REH: "" };
    }
    if (e.category === "TMP" || e.category === "POP" || e.category === "WSD" || e.category === "REH") oneHourWeatherInfo[e.category] = e.fcstValue;
    prevTime = curTime;
  });

  return oneDayWeatherInfo;
}

async function getWeatherInfos(): Promise<IWeatherInfo[]> {
  const [base_date, base_time] = getDateForWeatherAPI();
  const [base_xpos, base_ypos] = getPositionForWeatherAPI();
  const WEATHER_API_ENDPOINT = `/api/1360000/VilageFcstInfoService_2.0/getVilageFcst` + `?serviceKey=${process.env.WEATHER_API_KEY}` + `&numOfRows=400` + `&pageNo=1` + `&base_date=${base_date}` + `&base_time=${base_time}` + `&nx=${base_xpos}&ny=${base_ypos}` + `&dataType=JSON`;

  const {
    data: {
      response: {
        body: {
          items: { item },
        },
      },
    },
  } = await axios.get(WEATHER_API_ENDPOINT);

  const weatherInfo: IAPIWeatherInfo[] = item;

  const fcstInfoInDay: IWeatherInfo[] = parseOneDayWeather(weatherInfo);
  console.log(fcstInfoInDay);

  return fcstInfoInDay;
}

export default getWeatherInfos;
