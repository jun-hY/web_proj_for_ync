import { Names, Icons, Temps } from './init_constant.js'

const names = new Names();
const icons = new Icons();
const temps = new Temps();

function getDateOnFormat(date) {
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    return year + month + day;
}

function getDayInKorean(date) {
    var day = new Date(date);
    switch (day.getDay()) {
        case 0:
            return `SUN`;
        case 1:
            return `MON`;
        case 2:
            return `TUE`;
        case 3:
            return `WED`;
        case 4:
            return `THU`;
        case 5:
            return `FRI`;
        case 6:
            return `SAT`;
    }
}

const BaseTime = [2, 5, 8, 11, 14, 17, 20, 23];

const TimeSet = () => {
    var Today = new Date();
    var time = [getDateOnFormat(Today), ''];
    var hours = ('0' + Today.getHours()).slice(-2);
    var minutes = ('0' + Today.getMinutes()).slice(-2);
    if (hours <= BaseTime[0] && minutes < 10) {
        var yesterday = new Date(Today.getTime - 86400000);
        time = [getDateOnFormat(yesterday), '2300'];
        return time;
    }
    for (var i = 0; i < BaseTime.length; i++) {
        if (hours >= BaseTime[i] && hours < BaseTime[i + 1]) {
            if (minutes < 10 && hours == BaseTime[i]) {
                time[1] = ('0' + BaseTime[i - 1] + '00').slice(-4);
                break;
            }
            time[1] = ('0' + BaseTime[i] + '00').slice(-4);
            break;
        }
    }
    return time;
}
const Time = TimeSet();

const ServiceKey = `8pZx3zpwmiP6xng2EUvTlOz6qnesip%2BuYn70GCdXph%2FQek0Ws9N6r0YU4iLHZgputh87KbB8m6XsQGecpxiIaA%3D%3D`;
const OtherDayWeather = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${ServiceKey}&numOfRows=918&pageNo=1&dataType=JSON&base_date=${Time[0]}&base_time=${Time[1]}&nx=89&ny=90`;

fetch(OtherDayWeather).then(res => res.json().then(data => {
    const OtherDayWeatherInfo = data.response.body.items.item;
    Object.keys(OtherDayWeatherInfo).forEach((i) => {
        console.log(OtherDayWeatherInfo[i]);
    })
}))