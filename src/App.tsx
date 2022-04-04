import React from "react";

import p410 from "../public/assets/410.svg";
import cat from "../public/assets/spacecat.jpeg";
import getWeatherInfos from "./Forecast";

function App() {
  return (
    <>
      <button onClick={getWeatherInfos}>click it</button>
      <h3>aa asdasdaasdsdasdasdasd!</h3>
      <img src={p410} />
      <img src={cat} />
    </>
  );
}

export default App;
