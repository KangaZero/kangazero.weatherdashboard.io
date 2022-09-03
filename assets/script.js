//var weatherUrl = api.openweathermap.org/data/2.5/forecast?lat=lat&lon=lon&appid=a6ccc92be7f9a48de8089f65a85e1b1a
var searchBtnEl = document.querySelector('#search');
var searchInputEl = document.querySelector('#city');
var leftbarEl = document.querySelector('#left-bar');



function getApi(cityName){
    
var cityName = searchInputEl.value
var weatherUrl ="https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=a6ccc92be7f9a48de8089f65a85e1b1a"

fetch(weatherUrl)
.then(function (response){
    if (response.ok){
        response.json().then(function (data){
            console.log(data);
            saveCity(cityName)
        });
    } else {
        alert ("Error: " + response.statusText + "\n  Input a valid city name");
    }
 
})

searchInputEl.value = " ";

}

//city index
var ci = 0

function saveCity(cityName){
  
 localStorage.setItem(ci, cityName)
 localStorage.getItem(ci)
      
 var savedCityUl = document.createElement('ul');
 var historyCity = document.createElement('button')


    historyCity.textContent = localStorage.getItem(ci);
   
    //different variable from getApi function 
    var cityName = localStorage.getItem(ci);

    historyCity.setAttribute("class","btn btn-secondary container-fluid p-2 m-2")

    leftbarEl.appendChild(savedCityUl);
    savedCityUl.appendChild(historyCity);

    historyCity.addEventListener('click', function(){
    
        var weatherUrl ="https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=a6ccc92be7f9a48de8089f65a85e1b1a"

    fetch(weatherUrl)
    .then(function (response){
    if (response.ok){
        response.json().then(function (data){
            console.log(data);
    })
    }
    })
    }) 
    ci++
}

searchBtnEl.addEventListener('click', getApi);

// searchInputEl.addEventListener("keydown", (event) => {
//     console.log(event.key)
//     if (event.key = "Enter"){
//         getApi
//    