import { Names, Icons, Temps, Days } from './init_constant.js'

const names = new Names();
const icons = new Icons();
const temps = new Temps();
const days = new Days();
const DAY_TO_TIME = 86400000;
const BaseTime = [2, 5, 8, 11, 14, 17, 20, 23];

/** yyyymmdd 형태로 반환. Date객체를 인자로 함 */
function getDateOnFormat(date) {
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    return year + month + day;
}

const TimeSet = () => {
    var Today = new Date();
    var time = [getDateOnFormat(Today), ''];
    var hours = ('0' + Today.getHours()).slice(-2);
    var minutes = ('0' + Today.getMinutes()).slice(-2);
    if (hours <= BaseTime[0] && minutes < 10) {
        var yesterday = new Date(Today.getTime - DAY_TO_TIME);
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

var day = new Date();
var fiveDays = [];
for (var i = 1; i <= 5; i++) {
    fiveDays.push(new Date(day.getTime() + (DAY_TO_TIME * i)));
}
days.setDays(fiveDays);
for (var i = 0; i < 5; i++) {
    fiveDays[i] = getDateOnFormat(fiveDays[i]);
}

const ServiceKey = `8pZx3zpwmiP6xng2EUvTlOz6qnesip%2BuYn70GCdXph%2FQek0Ws9N6r0YU4iLHZgputh87KbB8m6XsQGecpxiIaA%3D%3D`;
const OtherDayWeather = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${ServiceKey}&numOfRows=1000&pageNo=1&dataType=JSON&base_date=${Time[0]}&base_time=${Time[1]}&nx=89&ny=90`;
const threeDaysLaterTemp = `http://apis.data.go.kr/1360000/MidFcstInfoService/getMidTa?serviceKey=${ServiceKey}&numOfRows=100&pageNo=1&dataType=JSON&regId=11H10701&tmFc=202411250600`;
const threeDaysLaterSky = `http://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst?serviceKey=${ServiceKey}&numOfRows=100&pageNo=1&dataType=JSON&regId=11H10000&tmFc=202411250600`;

fetch(OtherDayWeather).then(res => res.json().then(data => {
    const OtherDayWeatherInfo = data.response.body.items.item;
    Object.keys(OtherDayWeatherInfo).forEach((i) => {
        if (fcstDate == fiveDays[2]) return;
        var fcstTime = OtherDayWeatherInfo[i].fcstTime;
        var fcstDate = OtherDayWeatherInfo[i].fcstDate;
        var category = OtherDayWeatherInfo[i].category;
        var value = OtherDayWeatherInfo[i].fcstValue;

        if (fiveDays.includes(fcstDate)) {
            if (fcstTime == '1200') {
                if (category === 'TMP') {
                    temps.setTemp(fiveDays.findIndex(e => e == fcstDate), value);
                    return;
                }
                if (category == 'SKY') {
                    icons.setIcon(fiveDays.findIndex(e => e == fcstDate), value);
                    return;
                }
            }
        }
    });
}));

fetch(threeDaysLaterTemp).then(res => res.json().then(data => {
    const items = data.response.body.items.item[0]
    temps.setTemp(2, Math.round((items.taMax3 + items.taMin3) / 2));
    temps.setTemp(3, Math.round((items.taMax4 + items.taMin4) / 2));
    temps.setTemp(4, Math.round((items.taMax5 + items.taMin5) / 2));
}));

fetch(threeDaysLaterSky).then(res => res.json().then(data => {
    const items = data.response.body.items.item[0];
    console.log(items);
}))