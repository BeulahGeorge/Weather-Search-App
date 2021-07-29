function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function searchTemperature(response) {
  console.log(response);
  let wfCity = document.querySelector("#cityname");

  let country = document.querySelector("#country");
  let wfCountry = response.data.sys.country;
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  let fsDesc = document.querySelector("#weatherType");
  let feelsLike = Math.round(response.data.main.feels_like);
  let wfstemperature = Math.round(response.data.main.temp);
  let wfsCity = response.data.name;
  let wfsDesc = response.data.weather[0].description;
  let wfsTemp = document.querySelector("#displayTemp");
  let wfeelsLike = document.querySelector("#feelsLike");
  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  let visibility = response.data.visibility / 1000;
  let wvisibility = document.querySelector("#visibility");
  let wpressure = document.querySelector("#pressure");
  let pressure = response.data.main.pressure;

  wfsTemp.innerHTML = `${wfstemperature}`;
  wfCity.innerHTML = `${wfsCity}`;
  country.innerHTML = `${wfCountry}`;
  fsDesc.innerHTML = `${wfsDesc}`;
  wfeelsLike.innerHTML = `${feelsLike}`;
  windSpeed.innerHTML = `${wind}`;
  wvisibility.innerHTML = `${visibility}`;
  wpressure.innerHTML = `${pressure}`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchcity(event) {
  event.preventDefault();
  let searchinput = document.querySelector("#city");
  console.log(`${searchinput.value}`);
  let cityname = document.querySelector("#cityname");
  cityname.innerHTML = `${searchinput.value}`;

  let keyapi = "b9fe6911542128bca5d3273719c2d53d";
  let apiwfc = `https://api.openweathermap.org/data/2.5/weather?q=${searchinput.value}&appid=${keyapi}&units=metric`;
  axios.get(apiwfc).then(searchTemperature);
}
let citySearch = document.querySelector("#citySearch");
citySearch.addEventListener("click", searchcity);
