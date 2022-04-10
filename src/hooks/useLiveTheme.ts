import { useEffect, useState } from "react";
import moment from "moment";

export enum Status {
  morning,
  noon,
  night,
}

export const Theme = {
  none: ["", ""],
  morning: ["#2c3e50", "#3498db"],
  noon: ["#0B486B", "#F56217"],
  night: ["#292E49", "#536976"],
};

const useLiveTheme = () => {
  const [status, setStatus] = useState<Status>();
  const [currentTheme, setTheme] = useState<typeof Theme.none>(Theme.none);
  const [currentTime, setCurrentTime] = useState(moment().hour());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment().hour());
    }, 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentTime >= 6 && currentTime < 17) setStatus(Status.morning);
    else if (currentTime >= 17 && currentTime < 20) setStatus(Status.noon);
    else if (
      (currentTime >= 20 && currentTime < 24) ||
      (currentTime >= 0 && currentTime < 6)
    )
      setStatus(Status.night);
  }, [currentTime]);

  useEffect(() => {
    switch (status) {
      case Status.morning:
        setTheme(Theme.morning);
        break;
      case Status.noon:
        setTheme(Theme.noon);
        break;
      case Status.night:
        setTheme(Theme.night);
        break;
    }
  }, [status]);

  return [status, currentTheme[0], currentTheme[1]];
};

export default useLiveTheme;
