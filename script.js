const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "d2a3b34c7102cc9492e03ee4339333f3";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      displayError("Error fetching weather data.");
    }
  } else {
    displayError("Please enter a city name.");
  }
});

async function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("City not found");
  }

  return response.json();
}

function displayWeatherInfo(data) {

  card.textContent = "";


  const cityName = data.name;
  const temp = data.main.temp;
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;

 
  const cityDisplay = document.createElement("h2");
  const tempDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherIcon = document.createElement("img");

  cityDisplay.textContent = cityName;
  tempDisplay.textContent = ` ${temp} °C`;
  descDisplay.textContent = description;
  weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;


  card.style.display = "flex";
  card.style.flexDirection = "column";
  card.style.alignItems = "center";
  card.appendChild(cityDisplay);
  card.appendChild(weatherIcon);
  card.appendChild(tempDisplay);
  card.appendChild(descDisplay);
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.style.justifyContent = "center";
  card.appendChild(errorDisplay);
}
