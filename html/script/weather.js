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

console.log(CurrnetWeather)

fetch(CurrnetWeather).then(res => res.json().then(data => {
    var CurrentTemp = 0;
    var CurrentHumidity = 0;
    var CurrentWind = 0;

    const CurrentWeatherInfo = data.response.body.items.item;
    Object.keys(CurrentWeatherInfo).forEach((i) => {
        console.log(CurrentWeatherInfo[i])
    });
    Object.keys(CurrentWeatherInfo).forEach((i) => {
        if (CurrentWeatherInfo[i].category == `T1H`) {
            CurrentTemp = CurrentWeatherInfo[i].obsrValue;
        }
        if (CurrentWeatherInfo[i].category == `REH`) {
            CurrentHumidity = CurrentWeatherInfo[i].obsrValue;
        }
        if (CurrentWeatherInfo[i].category == `WSD`) {
            CurrentWind = CurrentWeatherInfo[i].obsrValue;
        }
    });
    WeatherCard.innerHTML = `
        <div class="header">
            <h1 id="location">Daegu, TAE</h1>
        </div>

        <div class="current-weather">
            <div class="temperature">${CurrentTemp}°C</div>
            <div class="condition">
                <div class="icon">🌤️</div>
                <div class="description">Partly Cloudy</div>
            </div>
        </div>

        <div class="weather-details">
            <div class="detail">
                <i data-lucide="droplets"></i>
                <div class="label">Humidity</div>
                <div class="value">${CurrentHumidity}%</div>
            </div>
            <div class="detail">
                <i data-lucide="wind"></i>
                <div class="label">Wind</div>
                <div class="value">${CurrentWind} m/s</div>
            </div>
            <div class="detail">
                <i data-lucide="thermometer"></i>
                <div class="label">Pressure</div>
                <div class="value">1015 hPa</div>
            </div>
        </div>

        <div class="forecast">
            <div class="day">
                <div class="name">Mon</div>
                <div class="icon">☀️</div>
                <div class="temp">75°F</div>
            </div>
            <div class="day">
                <div class="name">Tue</div>
                <div class="icon">🌤️</div>
                <div class="temp">73°F</div>
            </div>
            <div class="day">
                <div class="name">Wed</div>
                <div class="icon">🌧️</div>
                <div class="temp">68°F</div>
            </div>
            <div class="day">
                <div class="name">Thu</div>
                <div class="icon">⛅</div>
                <div class="temp">70°F</div>
            </div>
            <div class="day">
                <div class="name">Fri</div>
                <div class="icon">☀️</div>
                <div class="temp">72°F</div>
            </div>
        </div>`;
}));

// setTimeout(() => {
//     WeatherCard.innerHTML = `
//     <div class="header">
//                 <h1 id="location">New York, NY</h1>
//             </div>

//             <div class="current-weather">
//                 <div class="temperature">${CurrentTemp}°C</div>
//                 <div class="condition">
//                     <div class="icon">🌤️</div>
//                     <div class="description">Partly Cloudy</div>
//                 </div>
//             </div>

//             <div class="weather-details">
//                 <div class="detail">
//                     <i data-lucide="droplets"></i>
//                     <div class="label">Humidity</div>
//                     <div class="value">${CurrentHumidity}%</div>
//                 </div>
//                 <div class="detail">
//                     <i data-lucide="wind"></i>
//                     <div class="label">Wind</div>
//                     <div class="value">${CurrentWind} m/s</div>
//                 </div>
//                 <div class="detail">
//                     <i data-lucide="thermometer"></i>
//                     <div class="label">Pressure</div>
//                     <div class="value">1015 hPa</div>
//                 </div>
//             </div>

//             <div class="forecast">
//                 <div class="day">
//                     <div class="name">Mon</div>
//                     <div class="icon">☀️</div>
//                     <div class="temp">75°F</div>
//                 </div>
//                 <div class="day">
//                     <div class="name">Tue</div>
//                     <div class="icon">🌤️</div>
//                     <div class="temp">73°F</div>
//                 </div>
//                 <div class="day">
//                     <div class="name">Wed</div>
//                     <div class="icon">🌧️</div>
//                     <div class="temp">68°F</div>
//                 </div>
//                 <div class="day">
//                     <div class="name">Thu</div>
//                     <div class="icon">⛅</div>
//                     <div class="temp">70°F</div>
//                 </div>
//                 <div class="day">
//                     <div class="name">Fri</div>
//                     <div class="icon">☀️</div>
//                     <div class="temp">72°F</div>
//                 </div>
//             </div>`;
// }, 3000);