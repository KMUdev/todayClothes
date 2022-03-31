import React, { useState } from "react";
import LocationManager from "./services/LocationManager";

import p410 from "../public/assets/410.svg";
import cat from "../public/assets/spacecat.jpeg";

function App() {
  const locationManager = new LocationManager();

  const displayPosition = () => {
    console.log(locationManager.getPosition());
  };

  const handleAxios = async () => {
    const result = await locationManager.getGeoLocation("계명대학교");
    console.log(result);
  };

  return (
    <>
      <h1>HOME</h1>
      <button onClick={locationManager.openPopup}>get location</button>
      <button onClick={displayPosition}>log position</button>
      <button onClick={handleAxios}>axios</button>
    </>
  );
}

export default App;
