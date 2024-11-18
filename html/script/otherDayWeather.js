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

function getDayInString(date) {
    var day = new Date();
    day.setFullYear("20" + ((date).slice(0, 2)))
    day.setMonth(Number((date).slice(3, 5)) - 1)
    day.setDate((date).slice(-2))
    switch (day.getDay()) {
        case 0:
            return `Sun`;
        case 1:
            return `Mon`;
        case 2:
            return `Tue`;
        case 3:
            return `Wed`;
        case 4:
            return `Thu`;
        case 5:
            return `Fri`;
        case 6:
            return `Sat`;
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