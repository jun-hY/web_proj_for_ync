import { Names, Icons, Temps } from './init_constant.js'

const names = new Names();
const icons = new Icons();
const temps = new Temps();

var date = new Date();

var year = date.getFullYear();
var month = ('0' + (date.getMonth() + 1)).slice(-2);
var day = ('0' + date.getDate()).slice(-2);

var hours = ('0' + date.getHours()).slice(-2);
var minutes = ('0' + date.getMinutes()).slice(-2);
const Today = year + month + day;

const BaseTime = [2, 5, 8, 11, 14, 17, 20, 23];

// 나올 수 있는 경우
// 2시 5분 -> 10분을 넘기지 않아 0200에 발표된 api 요청 불가 전날 2300 api 요청
// 5시 5분 -> 마찬가지로 10분을 넘기지 않아 api 요청 불가 이전 0200 api 요청
// 5시 10분 -> 0500 api 요청
const Time = () => {
    var time = [Today, '2000'];
    if (hours <= BaseTime[0] && minutes < 10) {
        time = [Today, '2300']
        return time;
    }
    for (var i = 0; i < BaseTime.length; i++) {


    }
    return time;
}


const ServiceKey = `8pZx3zpwmiP6xng2EUvTlOz6qnesip%2BuYn70GCdXph%2FQek0Ws9N6r0YU4iLHZgputh87KbB8m6XsQGecpxiIaA%3D%3D`;
const OtherDayWeather = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${ServiceKey}&numOfRows=918&pageNo=1&dataType=JSON&base_date=${Time()[0]}&base_time=${Time()[1]}&nx=89&ny=90`;

console.log(OtherDayWeather)