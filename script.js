// update currentTime

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thusday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
minutes = ("0" + now.getMinutes()).slice(-2);
let time = `${hours}:${minutes}`;

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${day} ${time}`;

function getTemperature(response) {
  document.querySelector("#currentTemp").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#feelsLike").innerHTML = `${Math.round(
    response.data.main.feels_like
  )}°C`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
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
}
function currentLocation() {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let locationButton = document.querySelector("#locationButton");
locationButton.addEventListener("click", currentLocation);

search("London");
