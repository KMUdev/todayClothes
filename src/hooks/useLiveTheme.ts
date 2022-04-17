import { useEffect, useState } from "react";
import moment from "moment";

export type GradientTop = string;
export type GradientBottom = string;

export enum Status {
  init,
  morning,
  noon,
  night,
}

export type ThemeType = {
  init: [GradientTop, GradientBottom];
  morning: [GradientTop, GradientBottom];
  noon: [GradientTop, GradientBottom];
  night: [GradientTop, GradientBottom];
};

export const Theme: ThemeType = {
  init: ["", ""],
  morning: ["#2c3e50", "#3498db"],
  noon: ["#0B486B", "#F56217"],
  night: ["#292E49", "#536976"],
};

const useLiveTheme = (): [Status, GradientTop, GradientBottom] => {
  const [status, setStatus] = useState<Status>(Status.init);
  const [currentTheme, setTheme] = useState<[GradientTop, GradientBottom]>(
    Theme.init
  );
  const [currentTime, setCurrentTime] = useState(moment().hour());

  //초기 한번만 실행
  //1분주기로 시간 초기화해주는 역할
  //Flow 1
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment().hour());
    }, 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  //시간 상태가 바뀔때 마다 [ 아침, 밤, 낮 ] 인식해서 상태 바꿔주는 역할
  //Flow 2
  useEffect(() => {
    if (currentTime >= 6 && currentTime < 17) setStatus(Status.morning);
    else if (currentTime >= 17 && currentTime < 20) setStatus(Status.noon);
    else if (
      (currentTime >= 20 && currentTime < 24) ||
      (currentTime >= 0 && currentTime < 6)
    )
      setStatus(Status.night);
  }, [currentTime]);

  // [아침, 밤, 낮 ] 상태에 따라 배경 상태 바꿔주는 역할
  //Flow 3
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
      default:
        break;
    }
  }, [status]);

  return [status, currentTheme[0], currentTheme[1]];
};

export default useLiveTheme;
