var value = ["aa","bb","cc"]
localStorage.setItem("testKey", JSON.stringify(value));
var test = JSON.parse(localStorage.getItem("testKey"));


console.log(test)