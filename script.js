// API key for OpenWeatherMap
const apiKey = "89cad2e3be2bab4205eaaad61a50135f";
// API endpoint for weather data
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
// Selecting elements from the DOM
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Function to check weather for a city
async function checkWeather(city) {
  // Fetching weather data from the API
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  // Handling invalid city names
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    // Parsing JSON response
    var data = await response.json();

    // Displaying weather data
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = data.main.temp + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Setting weather icon based on weather condition
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

// Event listener for search button click
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
