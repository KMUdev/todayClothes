import React from "react";
import axios from "axios";

const address = `/api/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=NBk%2BEjW5T0GVhgRW5nxc2Ww8TS2Oz6PCOpwgh4GIIhjc0et%2BKdl395nr3iRALtUisc9b%2Bb9sV7GZHOl8Mw2HeQ%3D%3D&numOfRows=12&pageNo=1&base_date=20220404&base_time=0500&nx=55&ny=127&dataType=JSON`;

async function getWeatherInfos() {
  const response = await axios.get(address);
  console.dir(response.data);
  return true;
}

export default getWeatherInfos;
