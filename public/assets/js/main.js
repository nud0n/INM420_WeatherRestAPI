document.addEventListener("DOMContentLoaded", async function () {
    const apiKey = "1d42e4c46d18458a8b6214414250302"; 
    const cityInput = document.getElementById("cityInput");
    const cityName = document.getElementById("cityName");
    const form = document.querySelector("form");
    const weatherIcon = document.querySelector(".weather-icon");
    const tempDisplay = document.querySelector(".display-2");
    const conditionDisplay = document.querySelector(".display-6");
    const details = document.querySelector(".text-start");

    // Fetch weather for Toronto on page load
    await getWeather("Toronto");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const city = cityInput.value.trim();
        if (city) {
            await getWeather(city);
        }
    });

    async function getWeather(city) {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&hours=3`);
            const data = await response.json();
            updateWeatherUI(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    // Update current weather ui
    function updateWeatherUI(data) {
        //Search city name
        //Update current conditions
        //Update current temperature
        //Update current text 
        cityName.textContent = `${data.location.name}, ${data.location.region}`;
        weatherIcon.src = data.current.condition.icon;
        tempDisplay.textContent = `${data.current.temp_c}°C`;
        conditionDisplay.textContent = data.current.condition.text;
        //Update details like feels likes, humidity, wind, low, chance of rain/slow
        details.innerHTML = `
            <p class="m-0">Feels like: ${data.current.feelslike_c}°C</p>
            <p class="m-0">H: ${data.current.humidity}%</p>
            <p class="m-0">W: ${data.current.wind_kph} km/h</p>
            <p class="m-0">L: ${data.current.temp_c - 5}°C</p>
            <div class="d-flex align-items-center mt-1">
                <img class="precip-icon me-1" src="/assets/images/snow.png" alt="weather icon">
                <p class="m-0">${data.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
            </div>
        `;
    }
});

getWeather();