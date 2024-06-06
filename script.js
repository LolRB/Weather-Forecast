const apiKey = "161ecb95bf612fc1d56530060a842aef";
const weatherHeader = document.getElementById("weatherHeader");
const weather = document.getElementById("weather");
const headerForecast = document.getElementById("forecastHeader");
const nextDaysForecast = document.getElementById("next5Days");
const searchButton = document.getElementById("search-button");
const cities = document.getElementById("cities");

function cityApi() {
  const city = document.getElementById("city-input").value;
  const cityRequestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

  fetch(cityRequestUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      if (data && data.length > 0) {
        const latitude = data[0].lat;
        const longitude = data[0].lon;
        const cityName = data[0].name;

        getApi(latitude, longitude, cityName);
      } else {
        console.error("No data found for the specified city.");
      }
    })
    .catch((error) => {
      console.error("Error fetching city data:", error);
    });
}

function getApi(lat, lon, cityName) {
  const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  fetch(requestUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      displayTodaysWeather(data, cityName);
      displayNextFiveDaysWeather(data, cityName);
      saveToLocalStorage(cityName, data); // Save weather data to local storage
      createCityButton(cityName, data); // Create button for city name
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}