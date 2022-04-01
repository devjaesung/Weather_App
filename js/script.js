'use strict';

//검색창 설정
const search = document.getElementsByClassName("search")[0];
const searchBox = document.getElementsByClassName("searchBox")[0];

search.addEventListener("click", function(){
   searchBox.classList.add("active");
   document.getElementById("search").focus();
});

document.getElementById("search").addEventListener("blur", function(){ //blur = focus에서 나왔을때
   searchBox.classList.remove("active");//focus에서 나오면 active를 지워줌
});

//위치값 받아오기
let myLat = 0, myLng = 0;
if(navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(function(position){
       myLat = position.coords.latitude;//위도값
       myLng = position.coords.longitude;//경도값
       getWeather(myLat, myLng, '');
   });
}

function getWeather(lat, lon, city){
   const url = "https://api.openweathermap.org/data/2.5/forecast";
   const apikey = "1185989e888e40f8386af897db624aa3";
   let mydata;
   if(city == '') { //search에 값이 들어오지 않은 경우(위치값으로 받은 경우)
      mydata = {
         lat: lat,
         lon: lon,
         appid: apikey,
         units: 'metric',
         lang: 'kr'
      }
   }else{
     mydata = {
        q: city,
        appid: apikey,
        units: 'metric',
        lang: 'kr'
     }
   }
   
   let params = Object.keys(mydata).map(key => key + '=' + mydata[key]).join('&');
   console.log(params);

   fetch(`${url}?${params}`)
   .then( reson => reson.json())
   .then( rs => {
      console.log(rs);
      
      /*1.도시명 2.시간 3. 아이콘 4.현재온도 5. 최저온도,최고온도
        6. 설명 7.일출 8.일몰 9.바람 10.습도 11.구름 12.체감온도
       */

      //1.도시명
      console.log('도시명',rs.city.name);
      //2.시간
      let nowTime = new Date(rs.list[0].dt*1000); //<-- 유닉스타임을 시간으로 변환하는 방법
      console.log('시간',nowTime);
      //3.아이콘
      console.log('아이콘',rs.list[0].weather[0].icon);
      //4.현재온도
      console.log('현재온도',rs.list[0].main.temp);
      //5.최저온도,최고온도
      console.log('최저온도',rs.list[0].main.temp_min,'최고온도',rs.list[0].main.temp_max);
      //6.설명
      console.log('설명',rs.list[0].weather[0].description);
      //7.일출
      let nowSunrise = new Date(rs.city.sunrise*1000);
      console.log('일출',nowSunrise);
      //8.일몰
      let nowSunset = new Date(rs.city.sunset*1000);
      console.log('일몰',nowSunset);
      //9.바람
      console.log('바람',rs.list[0].wind);
      //10.습도
      console.log('습도',rs.list[0].main.humidity);
      //11.구름
      console.log('구름',rs.list[0].clouds.all);
      //12.체감온도
      console.log('체감온도',rs.list[0].main.feels_like);

   });
}