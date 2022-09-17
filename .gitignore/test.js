const f = document.getElementById('foo');
document.addEventListener('click', (ev) => {
  f.style.transform = `translateY(${ev.clientY - 25}px)`;
  f.style.transform += `translateX(${ev.clientX - 25}px)`;
}, false);


var searchEL = document.querySelector('#search');

var leftEl = document.querySelector('#left-bar')
var inputEl = document.querySelector("#city")

searchEL.addEventListener('click', function(){
    
    var btnEl = document.createElement('button');
    btnEl.innerHTML = inputEl.value;
    leftEl.appendChild(btnEl);
localStorage.setItem("cityname", [btnEl.innerHTML])
console.log(localStorage.getItem('cityname'))

})