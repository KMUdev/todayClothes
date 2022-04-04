import React, { useState } from "react";
import LocationManager from "./services/LocationManager";

import p410 from "../public/assets/410.svg";
import cat from "../public/assets/spacecat.jpeg";

function App() {
  const locationManager = new LocationManager();

  const displayAddress = () => {
    console.log(locationManager.getAddress());
  };

  const handleAxios = async () => {
    const result = await locationManager.getWeather(35.854932, 128.489463);
    console.log(result);
  };
  const handleGeocode = async () => {
    const result = await locationManager.getGeoLocation("서울 성동구 서울숲길 17");
    console.log(result);
  };

  return (
    <>
      <h1>HOME</h1>
      <button onClick={locationManager.openPopup}>get location</button>
      <button onClick={displayAddress}>log address</button>
      <button onClick={handleAxios}>get weather by lat,long</button>
      <button onClick={handleGeocode}>get lat,long by address</button>
    </>
  );
}

export default App;
