// update currentTime

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
minutes = ("0" + now.getMinutes()).slice(-2); // put a 0 in front and take the right two characters
let time = `${hours}:${minutes}`;

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${day} ${time}`;

function getTemperature(response) {
  document.querySelector("#currentTemp").innerHTML = `${Math.round(
    response.data.main.temp
  )}`;
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#feelsLike").innerHTML = `${Math.round(
    response.data.main.feels_like
  )}`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )}`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  let iconNum = response.data.weather[0].icon;
  let iconUrl = `http://openweathermap.org/img/wn/${iconNum}@2x.png`;
  document.querySelector("#mainIcon").innerHTML = "iconUrl";
  document.getElementById("mainIcon").src = `${iconUrl}`;
}

function search(city) {
  let units = "metric";
  let apiKey = "4eb5bd3fa558dedffa809dd06956430e";
  let apiEndPoint = "https://api.openweathermap.org/data";
  let apiUrl = `${apiEndPoint}/2.5/weather?q=${city}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(getTemperature);
}

function findCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
  document.getElementById("celsius").style.color = "#9adcff";
  document.getElementById("fahrenheit").style.color = "#ff8aae";
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", findCity);

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "4eb5bd3fa558dedffa809dd06956430e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(getTemperature);
  document.getElementById("celsius").style.color = "#9adcff";
  document.getElementById("fahrenheit").style.color = "#ff8aae";
}
function currentLocation() {
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function convertToF() {
  document.getElementById("fahrenheit").style.color = "#9adcff ";
  document.getElementById("celsius").style.color = "#ff8aae";
  document.querySelector("#unitsDegrees").innerHTML = "°F";
  document.querySelector("#unitsSpeed").innerHTML = "mph";
  let units = "imperial";
  let cityF = document.querySelector("h1").innerHTML;
  let apiKey = "4eb5bd3fa558dedffa809dd06956430e";
  let apiEndPoint = "https://api.openweathermap.org/data";
  let apiUrl = `${apiEndPoint}/2.5/weather?q=${cityF}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(getTemperature);
}
function convertToC() {
  document.getElementById("celsius").style.color = "#9adcff";
  document.getElementById("fahrenheit").style.color = "#ff8aae";
  document.querySelector("#unitsDegrees").innerHTML = "°C";
  document.querySelector("#unitsSpeed").innerHTML = "m/s";

  let units = "metric";
  let cityC = document.querySelector("h1").innerHTML;
  let apiKey = "4eb5bd3fa558dedffa809dd06956430e";
  let apiEndPoint = "https://api.openweathermap.org/data";
  let apiUrl = `${apiEndPoint}/2.5/weather?q=${cityC}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(getTemperature);
}
let fahrenheitElement = document.querySelector("#fahrenheit");
fahrenheitElement.addEventListener("click", convertToF);

let celsiusElement = document.querySelector("#celsius");
celsiusElement.addEventListener("click", convertToC);

let locationButton = document.querySelector("#locationButton");
locationButton.addEventListener("click", currentLocation);

search("London");
