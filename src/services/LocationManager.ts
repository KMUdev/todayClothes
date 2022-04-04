import axios from "axios";

interface ILocationManager {
  openPopup: () => void;
  getAddress: () => Address;
  getWeather: (lat: number, long: number) => Promise<WeahterData>;
}

export interface Address {
  extraAddr: string;
  zoncode: string;
  addr: string;
}

interface WeahterData {
  current: Current;
  daily: Daily[];
}

interface Current {
  temp: number;
  description: string;
}

interface Daily {
  temp: object[];
  description: string;
}
class LocationManager implements ILocationManager {
  private extraAddr: string;
  private zoncode: string;
  private addr: string;
  private weatherKey: string;

  constructor() {
    this.extraAddr = "";
    this.zoncode = "";
    this.addr = "";
    this.weatherKey = "979787d17ff36d6639902212e1d6ffe4";
  }

  openPopup = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        let addr = ""; // 주소 변수
        let extraAddr = ""; // 참고항목 변수

        //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === "R") {
          // 사용자가 도로명 주소를 선택했을 경우
          addr = data.roadAddress;
        } else {
          // 사용자가 지번 주소를 선택했을 경우(J)
          addr = data.jibunAddress;
        }

        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if (data.userSelectedType === "R") {
          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraAddr += extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
          }
          // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (extraAddr !== "") {
            extraAddr = " (" + extraAddr + ")";
          }
          this.extraAddr = extraAddr;
        } else {
          this.extraAddr = "";
        }

        this.zoncode = data.zonecode;
        this.addr = addr;
      },
    }).open();
  };

  getAddress(): Address {
    return { extraAddr: this.extraAddr, zoncode: this.zoncode, addr: this.addr };
  }

  //FIXME: Cross origin 문제발생, 하지만 postMan으로 요청했을땐 정상작동..header문제로 의심
  //FIXME: dotenv를 설치하고, webpack plugin 도 해봤는데, 에러납니다 ㅜㅜ
  async getGeoLocation(address: string) {
    // const data = await axios.get(`https://naveropenapi.apigw.ntruss.com/map-geocode?query=${address}`, {
    //   headers: {
    //     "X-NCP-APIGW-API-KEY-ID": "ll37qfgivf", // dotenv가 동작한다면 ""를 제거하고 환경변수 사용해야합니다
    //     "X-NCP-APIGW-API-KEY": "Qe7U6XHx0K2ZIA5PoOrIFjSFmRUHWTyMBW36OSSx", // dotenv가 동작한다면 ""를 제거하고 환경변수 사용해야합니다
    //   },
    // });

    try {
      const data = await fetch(`https://naveropenapi.apigw.ntruss.com/map-geocode?query=${address}`, {
        headers: {
          "X-NCP-APIGW-API-KEY-ID": "ll37qfgivf", // dotenv가 동작한다면 ""를 제거하고 환경변수 사용해야합니다
          "X-NCP-APIGW-API-KEY": "Qe7U6XHx0K2ZIA5PoOrIFjSFmRUHWTyMBW36OSSx", // dotenv가 동작한다면 ""를 제거하고 환경변수 사용해야합니다
        },
      });
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  async getWeather(lat: number, lon: number): Promise<WeahterData> {
    const data = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat.toString()}&lon=${lon.toString()}&units=metric&exclude=hourly,alerts,minutely&lang=kr&appid=${
        this.weatherKey
      }`,
    );

    // 반환값 다듬기 current & daily
    const current: Current = {
      temp: data.data.current.temp,
      description: data.data.current.weather[0].description,
    };
    const daily: Daily[] = [];

    data.data.daily.forEach((day: any) => {
      const newDay = {
        temp: day.temp,
        description: day.weather[0].description,
      };
      daily.push(newDay);
    });

    return { current, daily };
  }
}

export default LocationManager;
