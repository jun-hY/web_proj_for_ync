class UserPosition {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

const WeatherCard = document.querySelector(".weather-card");

const ServiceKey = `8pZx3zpwmiP6xng2EUvTlOz6qnesip%2BuYn70GCdXph%2FQek0Ws9N6r0YU4iLHZgputh87KbB8m6XsQGecpxiIaA%3D%3D`;
const URL = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst
?serviceKey=${ServiceKey}&numOfRows=10&pageNo=1&dataType=JSON
&base_date=20240906&base_time=0600&nx=55&ny=127
`

WeatherCard.innerHTML = `
            <div class="header">
                <h1 id="location">New York, NY</h1>
            </div>

            <div class="current-weather">
                <div class="temperature">72°F</div>
                <div class="condition">
                    <div class="icon">🌤️</div>
                    <div class="description">Partly Cloudy</div>
                </div>
            </div>

            <div class="weather-details">
                <div class="detail">
                    <i data-lucide="droplets"></i>
                    <div class="label">Humidity</div>
                    <div class="value">65%</div>
                </div>
                <div class="detail">
                    <i data-lucide="wind"></i>
                    <div class="label">Wind</div>
                    <div class="value">8 mph</div>
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
            </div>
`;