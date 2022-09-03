//var weatherUrl = api.openweathermap.org/data/2.5/forecast?lat=lat&lon=lon&appid=a6ccc92be7f9a48de8089f65a85e1b1a
var searchBtnEl = document.querySelector('#search');
var searchInputEl = document.querySelector('#city');

function getApi(){

var cityName = searchInputEl.value

var weatherUrl ="https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=a6ccc92be7f9a48de8089f65a85e1b1a"

fetch(weatherUrl)
.then(function (response){
    if (response.ok){
        response.json().then(function (data){
            console.log(data);
        });
    } else {
        alert ("Error: " + response.statusText + "\n Input a valid city name");
    }
})

}

searchBtnEl.addEventListener('click', getApi);