import React, { useState } from "react";
import LocationManager from "./services/LocationManager";
import WeatherCard from './components/WeatherCard'
import { GlobalStyle } from './styles/Globalstyle';
import { ThemeProvider } from 'styled-components';
import { Mytheme } from './styles/theme';

import p410 from "../public/assets/410.svg";
import cat from "../public/assets/spacecat.jpeg";
import Text from "./components/Text";

function App() {
  return(
    <ThemeProvider theme={Mytheme}>
      <GlobalStyle />
      <></>
    </ThemeProvider>
  )
}

export default App;
