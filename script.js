const searchBtn = document.querySelector(".search-btn");
const cityName = document.querySelector(".city-name");
const temp = document.querySelector(".temprature");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind");

const URL = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "648ce7c20f933ab0196cf10007ad44d5";

function debounce(fetchData, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fetchData.apply(this, args);
    }, delay);
  };
}

async function fetchData() {
  try {
    const city = document.querySelector(".search-inp").value.trim();
    console.log(city);
    if (!city) {
      document.querySelector(".weather-details").style.display = "none";
      return;
    }

    const response = await fetch(
      `${URL}?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    cityName.innerHTML = city.toUpperCase();
    temp.innerHTML = `${data.main.temp}°C`;
    humidity.innerHTML = `${data.main.humidity}%`;
    windSpeed.innerHTML = `${data.wind.speed} km/h`;
    document.querySelector(".weather-details").style.display = "flex";
  } catch (error) {
    console.log(error);
    alert(
      "Failed to fetch weather data. Please check the city name and try again."
    );
  }
}

const debouncedFetchData = debounce(fetchData, 1000);
document
  .querySelector(".search-inp")
  .addEventListener("input", debouncedFetchData);
