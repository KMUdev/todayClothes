import React, { useEffect, useState } from "react";
import LocationManager from "./services/LocationManager";

import p410 from "../public/assets/410.svg";
import cat from "../public/assets/spacecat.jpeg";

function App() {
  const [location, setLocation] = useState({});
  const locationManager = new LocationManager();
  const displayPosition = () => {
    console.log(locationManager.getPosition());
  };

  return (
    <>
      <h1>HOME</h1>
      <button onClick={locationManager.openPopup}>get location</button>
      <button onClick={displayPosition}>log position</button>
    </>
  );
}

export default App;
