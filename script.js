let apiKey = "281ed3b381dd472f892143915261010";
let getBtn = document.querySelector(".getBtn");
let result = document.querySelector(".result");
let userInput = document.querySelector(".userInput");

async function getWeather() {
  const city = userInput.value.trim();

  if (!city) {
    result.innerText = "Please enter a city name.";
    return;
  }

  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=yes`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found or API request failed.");
    }

    const data = await response.json();

    result.innerHTML = `
      <h2>${data.location.name}, ${data.location.country}</h2>
      <p>Temperature: ${data.current.temp_c} °C</p>
      <p>Condition: ${data.current.condition.text}</p>
      <img src="https:${data.current.condition.icon}" alt="Weather icon">
      <p>Feels Like: ${data.current.feelslike_c} °C</p>
      <p>Humidity: ${data.current.humidity}%</p>
      <p>Wind: ${data.current.wind_kph} km/h</p>
    `;
  } catch (error) {
    result.innerText = error.message;
  }
}

getBtn.addEventListener("click", getWeather);
