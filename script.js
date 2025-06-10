// WEATHER APP

const button = document.querySelector(".btn");
const cityInput = document.querySelector(".user-input");
const card = document.querySelector(".weather-img");
const apiKey = "b808b96ed760eeb76ca799150961a749"; 

button.addEventListener("click", async event => {
  event.preventDefault();
  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError("City not found");
    }
  } else {
    displayError("Please enter a city");
  }
});

// ✅ Get weather data from OpenWeatherMap
async function getWeatherData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );

  if (!response.ok) {
    throw new Error("City not found");
  }

  const data = await response.json();
  return data;
}

// ✅ Display weather info
function displayWeatherInfo(data) {
  // Clear any previous content
  card.innerHTML = "";

  const cityName = document.createElement("h1");
  cityName.textContent = data.name;
  cityName.classList.add("city-name");

  const temperature = document.createElement("p");
  temperature.innerHTML = `${Math.round(data.main.temp)}<sup>°C</sup>`;
  temperature.classList.add("temperature");

  const humidityDiv = document.createElement("div");
  humidityDiv.classList.add("humidity-div");

  const humidityIcon = document.createElement("img");
  humidityIcon.src = "/icons/humidity.png";
  humidityIcon.alt = "humidity logo";
  humidityIcon.style.display = "inline";

  const humidityText = document.createElement("p");
  humidityText.textContent = `Humidity: ${data.main.humidity}%`;
  humidityText.classList.add("humidity");

  humidityDiv.appendChild(humidityIcon);
  humidityDiv.appendChild(humidityText);

  const rightDiv = document.createElement("div");
  rightDiv.classList.add("right");
  rightDiv.appendChild(cityName);
  rightDiv.appendChild(humidityDiv);
  rightDiv.appendChild(temperature);

  const weatherIcon = document.createElement("img");
  weatherIcon.src = getCustomIcon(data.weather[0].main);
  weatherIcon.alt = data.weather[0].description;
  weatherIcon.style.display = "inline";

  //the background images on the card
  card.style.backgroundImage = getBackgroundImage(data.weather[0].main);

//   the icons
function getCustomIcon(condition) {
  switch (condition.toLowerCase()) {
    case "clear":
      return "/icons/white sunny.png";
    case "clouds":
      return "/icons/cloudy.png";
    case "rain":
      return "/icons/drizzle.png";
    case "drizzle":
      return "/icons/drizzle.png";
    case "thunderstorm":
      return "/icons/thunderstorm.png";
    case "snow":
      return "/icons/snow cloud.png";
    case "mist":
    case "haze":
    case "fog":
      return "/icons/fog.png";
    default:
      return "/icons/cloudy.png"; // fallback icon
  }
}

  const description = document.createElement("p");
  description.textContent = data.weather[0].description;
  description.classList.add("decDisplay");

  const leftDiv = document.createElement("div");
  leftDiv.classList.add("left");
  leftDiv.appendChild(weatherIcon);
  leftDiv.appendChild(description);

  card.classList.add("weather-img");
  card.style.display = "flex";
  card.appendChild(rightDiv);
  card.appendChild(leftDiv);
}

//function that gets the background image on the card
function getBackgroundImage(condition) {
  switch (condition.toLowerCase()) {
    case "clear":
      return "url('/landscape-images/sunny.jpg')";
    case "clouds":
      return "url('landscape-images/clouds-landscape.jpg')";
    case "rain":
      return "url('landscape-images/drizzle-landscape.jpg')";
    case "drizzle":
      return "url('landscape-images/drizzle-landscape.jpg')";
    case "thunderstorm":
      return "url('landscape-images/thunderstorm-landscape.jpg')";
    case "snow":
      return "url('landscape-images/snow-flake.jpg')";
    case "mist":
    case "haze":
    case "fog":
      return "url('/landscape-images/fog-landscape.jpg')";
    default:
      return "url('/landscape-images/sunny.jpg')";
  }
}
// ✅ Display errors
function displayError(message) {
  card.innerHTML = "";

  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("error-message");

  card.classList.add("weather-img");
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
