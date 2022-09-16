//var weatherUrl = api.openweathermap.org/data/2.5/forecast?lat=lat&lon=lon&appid=a6ccc92be7f9a48de8089f65a85e1b1a
var searchBtnEl = document.querySelector('#search');
var searchInputEl = document.querySelector('#city');
var leftbarEl = document.querySelector('#left-bar');

//today-card EL
var todayCardEL = document.querySelector("#today-card")
var todayCityEl = document.querySelector('#today-city')
var todayTimeEl = document.querySelector("#today-time")
var todayTemperatureEl = document.querySelector("#today-temperature")
var todayWindEl = document.querySelector("#today-wind")
var todaHumidityEl = document.querySelector("#today-humidity")
var todayUVEl = document.querySelector("#today-UV")

//test out parseTime
var parseTimeNow = moment('2022-09-16 06:00:00').format("YYYY-MM-DD, HH:mm:ss")
var timeNow = moment().format("YYYY-MM-DD, HH:mm:ss")
console.log(timeNow)
console.log(parseTimeNow)

if (timeNow == parseTimeNow || timeNow > parseTimeNow){
    console.log("true")
} else { console.log("false")}

//2022-09-16 06:00:00

function getApi(weatherUrl){
    
var cityName = "Sydney" //searchInputEl.value
var weatherUrl ="https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=a6ccc92be7f9a48de8089f65a85e1b1a"

fetch(weatherUrl)
.then(function (response){
    if (response.ok){
        response.json().then(function (data){
            console.log(data);

            //to know which data weather time to take from
            //Need to find a better solution
            var timeNow = moment().format("YYYY-MM-DD, HH:mm:ss")
            var todayDataTime1 = moment(data.list[0].dt_txt).format("YYYY-MM-DD, HH:mm:ss")
            var todayDataTime2 = moment(data.list[1].dt_txt).format("YYYY-MM-DD, HH:mm:ss")
            var todayDataTime3 = moment(data.list[2].dt_txt).format("YYYY-MM-DD, HH:mm:ss")
            var todayDataTime4 = moment(data.list[3].dt_txt).format("YYYY-MM-DD, HH:mm:ss")
            var todayDataTime5 = moment(data.list[4].dt_txt).format("YYYY-MM-DD, HH:mm:ss")

            if (todayDataTime1 >= timeNow){
                var todayData = data.list[0]
                renderTodayCard(todayData)
            } else if (todayDataTime2 >= timeNow && timeNow > todayDataTime1){
                var todayData = data.list[1]
                renderTodayCard(todayData)
            } else if (todayDataTime3 >= timeNow && timeNow > todayDataTime2){
                var todayData = data.list[2]
                renderTodayCard(todayData)
            } else if (todayDataTime4 >= timeNow && timeNow > todayDataTime3){
                var todayData = data.list[3]
                renderTodayCard(todayData)
            } else {
                var todayData = data.list[4]
                renderTodayCard(todayData)
            }
            // for (var i = 0; i < 5; i ++){
 
            // var timeNow = moment().format("YYYY-MM-DD, HH:mm:ss")
           
            // window['todayDataTime' + i] = moment(data.list[i].dt_txt).format("YYYY-MM-DD, HH:mm:ss")
            // //if datatime is larger than now & is not more than 3 hours apart
            // if (window['todayDataTime' + i] >= timeNow && window['todayDataTime' + y] )
            // {
        
            // var futureTodayDataTime = [window['todayDataTime' + i]]
            //     console.log(futureTodayDataTime)
            // }
            // }
            // for (var i = 0; i < 2; i++){
               
            //     var currentDataTime = moment(data.list[i].dt_txt).format("YYYY-MM-DD, HH:mm:ss")
            //     var nextDataTime = moment(data.list[i++].dt_txt).format("YYYY-MM-DD, HH:mm:ss")
            //     var timeNow = moment().format("YYYY-MM-DD, HH:mm:ss")
            //     console.log(nextDataTime)
            //     if (timeNow <= dataTime && timeNow > dataTime2){
            //         console.log("hi", dataTime)
            //     } else {
            //       //  console.log("no")
            //     }

            // }

            function renderTodayCard(todayData){
                todayCityEl.innerHTML = data.city.name
                todayTimeEl.innerHTML = todayData.dt_txt
                //convert from Kelvin to Celsius & round off to 1 decimal place
                //toFixed() changes it into a string
                todayTemperatureEl.innerHTML = (todayData.main.temp - 273.15).toFixed(1) + "°C"
                //convert from miles to kilometres
                todayWindEl.innerHTML = (todayData.wind.speed * 1.60934).toFixed(2) + " km/h"
                todaHumidityEl.innerHTML = todayData.main.humidity + " %"
                todayUVEl.innerHTML = "hi"   
                    }
          //renders fetched DATA onto HTML with DOM manipulation
            

        });
    } else {
        alert ("Error: " + response.statusText + "\n  Input a valid city name");
    }
 
})

//clears input once submitted
searchInputEl.value = " ";
}

//test
getApi()


//TODO Fix THIS LAST
function saveCity(cityName){
  
for (var i = 1; i <= localStorage.length; i++){
 localStorage.setItem(`name${i}`, cityName)

 var savedCityUl = document.createElement('ul');
 var historyCity = document.createElement('button')

 var savedCityData = localStorage.getItem(`name${i}`)

    historyCity.textContent = savedCityData

    historyCity.setAttribute("class","btn btn-secondary container-fluid p-2 m-2")

    leftbarEl.appendChild(savedCityUl);
    savedCityUl.appendChild(historyCity);
}
 
historyCity.addEventListener('click', function(){
    
        var weatherUrl ="https://api.openweathermap.org/data/2.5/forecast?q=" + savedCityData + "&appid=a6ccc92be7f9a48de8089f65a85e1b1a"

    fetch(weatherUrl)
    .then(function (response){
    if (response.ok){
        response.json().then(function (data){
            console.log(data);
    })
    }
    })
    }) 
}

//eventListeners
searchBtnEl.addEventListener('click', getApi);

//TODO create init functions
function init(){
    renderHistory()
}

// searchInputEl.addEventListener("keydown", (event) => {
//     console.log(event.key)
//     if (event.key = "Enter"){
//         getApi
//    


//test
// var testCityName = [searchInputEl.value];

// function save(){
//     localStorage.setItem('name', JSON.stringify(testCityName));
// }

// function init(){

//     var storedCities = JSON.parse(localStorage.getItem('name'));

//     if(storedCities !== null){

//     }

//     renderHistory()

// }

// function renderHistory(){
//     for (var i = 0;i < testCityName.length; i++){
//         var history = testCityName[i];

//         var historyCityBtn = document.createElement('button');
//         historyCityBtn.textContent = history;
//         historyCityBtn.setAttribute("class","btn btn-secondary container-fluid p-2 m-2")

//     leftbarEl.appendChild(historyCityBtn);
    
//     historyCityBtn.addEventListener('click', function(){
    
//         var weatherUrl ="https://api.openweathermap.org/data/2.5/forecast?q=" + history + "&appid=a6ccc92be7f9a48de8089f65a85e1b1a"

//     fetch(weatherUrl)
//     .then(function (response){
//     if (response.ok){
//         response.json().then(function (data){
//             console.log(data);
//     })
//     }
//     })
//     }) 
//     }
// }