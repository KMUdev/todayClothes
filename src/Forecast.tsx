import React from "react";
import axios from "axios";
import { IAPIWeatherInfo } from "./interface/IAPIWeatherInfo";
import { IWeatherInfo } from "./interface/IWeatherInfo";
import { tmpdir } from "os";

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

function isBaseTimeIn24HrsFromNow(date: string, time: string) {
  const oneHourInMil = 3600000;
  const startT = new Date().setMinutes(0, 0, 0);
  const endT = startT + 24 * oneHourInMil;
  const baseT = new Date(date + "-" + time[0] + time[1] + "-" + time[2] + time[3]).getTime();
  return startT <= baseT && baseT <= endT;
}

function parseDayWeather(weatherInfo: IAPIWeatherInfo[]): IWeatherInfo[] {
  const oneDayWeatherInfo: IWeatherInfo[] = []; //지금으로부터 24시간내로의 날씨정보를 담을거임
  let curTime;
  let prevTime = weatherInfo[0].baseTime;
  weatherInfo.forEach((e) => {
    curTime = e.fcstTime;
    const oneHourWeatherInfo: IWeatherInfo = {
      TMP: "",
      POP: "",
      WSD: "",
      REH: "",
      TMN: "",
      TMX: "",
    };

    if (curTime !== prevTime && isBaseTimeIn24HrsFromNow(e.baseDate, e.baseTime)) {
      oneDayWeatherInfo.push(oneHourWeatherInfo);
      prevTime = curTime;
    }
    if (e.category === "TMP" || e.category === "POP" || e.category === "WSD" || e.category === "REH" || e.category === "TMN" || e.category === "TMX") {
      oneHourWeatherInfo[e.category] = e.fcstValue;
    }
  });

  // delete trash infos

  return oneDayWeatherInfo;
}

async function getWeatherInfos() {
  const [base_date, base_time] = getDateForWeatherAPI();
  const [base_xpos, base_ypos] = getPositionForWeatherAPI();
  const WEATHER_API_ENDPOINT = `/api/1360000/VilageFcstInfoService_2.0/getVilageFcst` + `?serviceKey=${process.env.WEATHER_API_KEY}` + `&numOfRows=312` + `&pageNo=1` + `&base_date=${base_date}` + `&base_time=${base_time}` + `&nx=${base_xpos}&ny=${base_ypos}` + `&dataType=JSON`;

  // I want to know how to destruct it pretty
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
  const fcstInfoInDay: IWeatherInfo[] = parseDayWeather(weatherInfo);

  // 어떻게 가공해야할지를 먼저 정해야함.
  // 시간대별로 나타낼까?
  // 13개(날씨정보세트) X 26시간 => 하루치 날씨정보
  //

  console.log(weatherInfo);
  return true;
}

export default getWeatherInfos;
