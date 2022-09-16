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
var todayDescriptionEl = document.querySelector("#today-description")
var todayIconEl = document.querySelector('#today-icon')

function getApi(weatherUrl){
    //test
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
            console.log(timeNow)
            var todayDataTime1 = moment(data.list[0].dt_txt, "YYYY-MM-DD, HH:mm:ss").format("YYYY-MM-DD, HH:mm:ss")
            var todayDataTime2 = moment(data.list[1].dt_txt, "YYYY-MM-DD, HH:mm:ss").format("YYYY-MM-DD, HH:mm:ss")
            var todayDataTime3 = moment(data.list[2].dt_txt, "YYYY-MM-DD, HH:mm:ss").format("YYYY-MM-DD, HH:mm:ss")
            var todayDataTime4 = moment(data.list[3].dt_txt, "YYYY-MM-DD, HH:mm:ss").format("YYYY-MM-DD, HH:mm:ss")
            var todayDataTime5 = moment(data.list[4].dt_txt, "YYYY-MM-DD, HH:mm:ss").format("YYYY-MM-DD, HH:mm:ss")
            
            console.log(todayDataTime1)

            if (timeNow >= todayDataTime1 && timeNow < todayDataTime2){
                var todayData = data.list[0]
                renderTodayCard(todayData)
            } else
             if (timeNow >= todayDataTime2 && timeNow < todayDataTime3){
                var todayData = data.list[1]
                renderTodayCard(todayData)
            } else if (timeNow >= todayDataTime3 && timeNow < todayDataTime4){
                var todayData = data.list[2]
                renderTodayCard(todayData)
            } else if (timeNow >= todayDataTime4 && timeNow < todayDataTime5){
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

         
     //renders fetched DATA onto HTML with DOM manipulation
            function renderTodayCard(todayData){
                todayCityEl.innerHTML = data.city.name
                todayTimeEl.innerHTML = "(" + moment(todayData.dt_txt,"YYYY-MM-DD, HH:mm:ss").format("dddd [the] DD[th] MMMM, HH:mm") + ")"
                //convert from Kelvin to Celsius & round off to 1 decimal place
                //toFixed() changes it into a string
                todayTemperatureEl.innerHTML = (todayData.main.temp - 273.15).toFixed(1) + "°C"
                //convert from miles to kilometres
                todayWindEl.innerHTML = (todayData.wind.speed * 1.60934).toFixed(2) + " km/h"
                todaHumidityEl.innerHTML = todayData.main.humidity + " %"
                todayDescriptionEl.innerHTML = titleCase(todayData.weather[0].description)
                todayIconEl.setAttribute('src', "http://openweathermap.org/img/wn/" + todayData.weather[0].icon + ".png")
                    }
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


//Additional functions 

//from https://stackoverflow.com/questions/32589197/how-can-i-capitalize-the-first-letter-of-each-word-in-a-string-using-javascript
function titleCase(string) {
    var splitStr = string.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        //assign back into an array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    //Joined back as a string
    return splitStr.join(' '); 
 }

