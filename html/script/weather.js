class UserPosition {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

const WeatherCard = document.querySelector(".weather-card");

var date = new Date();

var year = date.getFullYear();
var month = ('0' + (date.getMonth() + 1)).slice(-2);
var day = ('0' + date.getDate()).slice(-2);

var hours = ('0' + date.getHours()).slice(-2);
var minutes = ('0' + date.getMinutes()).slice(-2);
const Today = year + month + day;

const Time = Number(minutes) >= 45 ? `${hours}30` : `${Number(hours) - 1}30`;


// 초단기 실황 조회 api
// `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${ServiceKey}&numOfRows=10&pageNo=1&dataType=JSON&base_date=${Today}&base_time=${Time}&nx=89&ny=90`

// 단기 예보 api
// `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=8pZx3zpwmiP6xng2EUvTlOz6qnesip%2BuYn70GCdXph%2FQek0Ws9N6r0YU4iLHZgputh87KbB8m6XsQGecpxiIaA%3D%3D&numOfRows=50&pageNo=1&base_date=${Today}&base_time=${Time}&nx=89&ny=90`

// 초단기 예보 api
// `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${ServiceKey}&numOfRows=10&pageNo=1&base_date=${Today}&base_time=${Time}&nx=89&ny=90`

const ServiceKey = `8pZx3zpwmiP6xng2EUvTlOz6qnesip%2BuYn70GCdXph%2FQek0Ws9N6r0YU4iLHZgputh87KbB8m6XsQGecpxiIaA%3D%3D`;
const CurrnetWeather = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${ServiceKey}&numOfRows=100&pageNo=1&dataType=JSON&base_date=${Today}&base_time=${Time}&nx=89&ny=90`

fetch(CurrnetWeather).then(res => res.json().then(data => {
    const CurrentTemp = document.querySelector(".current-weather .temperature");
    const CurrentHumidity = document.querySelector(".weather-details .humidity-value");
    const CurrentWind = document.querySelector(".weather-details .wind-value");
    const CurrentSkyIcon = document.querySelector(".current-weather .icon");
    const CurrentSkyDescription = document.querySelector(".current-weather .description");
    const CurrentWindDirection = document.querySelector(".weather-details .direction-value");

    const CurrentWeatherInfo = data.response.body.items.item;
    // Object.keys(CurrentWeatherInfo).forEach((i) => {
    //     console.log(CurrentWeatherInfo[i])
    // });
    Object.keys(CurrentWeatherInfo).forEach((i) => {
        const isCurrentTemp = CurrentWeatherInfo[i].category == `T1H` && CurrentWeatherInfo[i].fcstTime == `${Number(hours) + 1}00`
        const isCurrentHumidity = CurrentWeatherInfo[i].category == `REH` && CurrentWeatherInfo[i].fcstTime == `${Number(hours) + 1}00`
        const isCurrentWind = CurrentWeatherInfo[i].category == `WSD` && CurrentWeatherInfo[i].fcstTime == `${Number(hours) + 1}00`
        const isCurrentSky = CurrentWeatherInfo[i].category == `SKY` && CurrentWeatherInfo[i].fcstTime == `${Number(hours) + 1}00`
        const isCurrentWindDir = CurrentWeatherInfo[i].category == `VEC` && CurrentWeatherInfo[i].fcstTime == `${Number(hours) + 1}00`
        const Value = CurrentWeatherInfo[i].fcstValue;
        if (isCurrentTemp) {
            CurrentTemp.innerText = `${Value}°C`;
            return;
        }
        if (isCurrentHumidity) {
            CurrentHumidity.innerText = `${Value}%`;
            return;
        }
        if (isCurrentWind) {
            CurrentWind.innerText = `${Value} m/s`;
            return;
        }
        if (isCurrentSky) {
            CurrentSkyIcon.innerText = `${Value < 3 ? `☀️` : Value < 4 ? `🌤️` : `☁️`}`;
            CurrentSkyDescription.innerText = `${Value < 3 ? `맑음` : Value < 4 ? `구름많음` : `흐림`}`;
            return;
        }
        if (isCurrentWindDir) {
            var direction = ``;
            if (Value > 337 || Value <= 22) direction = `⬇`;
            else if (Value <= 67) direction = `⬋`;
            else if (Value <= 112) direction = `⬅`;
            else if (Value <= 157) direction = `⬉`;
            else if (Value <= 202) direction = `⬆`;
            else if (Value <= 247) direction = `⬈`;
            else if (Value <= 292) direction = `⮕`;
            else if (Value <= 337) direction = `⬊`;

            CurrentWindDirection.innerText = `${direction}`
        }
    });
}));