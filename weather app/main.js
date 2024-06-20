const dailyForcastContainer = document.querySelector(".dailyForcastContainer");
const searchButton = document.getElementById("searchButton");
const searchBox = document.getElementById("search");
const apiKey = 'a76c9f65781dc37023be5897f7436a0a';

searchButton.addEventListener("click", function() {
  const city = searchBox.value;
  getWeather(city);
  getWeatherForecast(city);
});
function getWeather(city) {
  const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  fetch(urlCurrent)
    .then(response => {
      if (!response.ok) {
        showAlert("Invalid Location!");
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Current weather data:', data);
      let weatherInfo = {};
      weatherInfo.currentTemperature = Math.round(data.main.temp);
      weatherInfo.precipitation = "N/A"; // Adjust as per API response structure
      weatherInfo.humidity = data.main.humidity;
      weatherInfo.windSpeed = data.wind.speed;
      weatherInfo.conditionText = data.weather[0].description;
      weatherInfo.conditionIcon = getFontAwesomeIcon(data.weather[0].icon);

      let date = new Date();
      let dayOfWeekNum = date.getDay();
      let daysOfWeekArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let dayOfWeekStr = daysOfWeekArray[dayOfWeekNum];
      weatherInfo.dayOfWeekStr = dayOfWeekStr;

      showDailyForecastDetails(weatherInfo, city);
    })
    .catch(error => console.log(`There was a problem with fetch operation: ${error.message}`));
}

function getWeatherForecast(city) {
  const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  dailyForcastContainer.innerHTML = "";

  fetch(urlForecast)
    .then(response => {
      if (!response.ok) {
        showAlert("Invalid Location!");
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Forecast data:', data);
      const forecastByDay = {};
      data.list.forEach(forecast => {
        const date = new Date(forecast.dt_txt);
        const day = date.toISOString().split('T')[0]; // Get YYYY-MM-DD format
        if (!forecastByDay[day]) {
          forecastByDay[day] = [];
        }
        forecastByDay[day].push(forecast);
      });

      console.log('Grouped forecast by day:', forecastByDay);

      // Extract and display forecast for the next 5 distinct days
      const days = Object.keys(forecastByDay).sort().slice(0, 5);
      console.log('Days:', days);

      days.forEach(day => {
        const dailyForecasts = forecastByDay[day];
        const dailyTemps = dailyForecasts.map(f => f.main.temp);
        const minTemp = Math.min(...dailyTemps);
        const maxTemp = Math.max(...dailyTemps);

        // Use the forecast closest to midday (12:00 PM) if available, otherwise use the mid-point forecast
        let forecast = dailyForecasts.find(f => new Date(f.dt_txt).getHours() === 12) || dailyForecasts[Math.floor(dailyForecasts.length / 2)];
        let weatherInfo = {};
        weatherInfo.currentTemperature = Math.round(forecast.main.temp);
        weatherInfo.conditionIcon = getFontAwesomeIcon(forecast.weather[0].icon);
        let date = new Date(forecast.dt_txt);
        let dayOfWeekNum = date.getDay();
        weatherInfo.precipitation = "N/A"; 
        weatherInfo.windSpeed = forecast.wind.speed;
        weatherInfo.humidity = forecast.main.humidity;
        weatherInfo.conditionText = forecast.weather[0].description;
        weatherInfo.minTemp = Math.round(minTemp);
        weatherInfo.maxTemp = Math.round(maxTemp);

        let daysOfWeekArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        weatherInfo.dayOfWeekStr = daysOfWeekArray[dayOfWeekNum];

        let dailyForecastHtml = generateDailyForecastHTML(weatherInfo, city);
        dailyForcastContainer.appendChild(dailyForecastHtml);
      });
    })
    .catch(error => console.log(`There was a problem with the fetch operation: ${error.message}`));
}
function getWeatherForecast(city) {
  const cyprus = city; 
  const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cyprus}&appid=${apiKey}&units=metric`;
  dailyForcastContainer.innerHTML = "";

  fetch(urlForecast)
    .then(response => {
      if (!response.ok) {
        showAlert("Invalid Location!");
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Forecast data:', data);

      // Group the forecast data by day
      const forecastByDay = {};
      data.list.forEach(forecast => {
        const date = new Date(forecast.dt_txt);
        const day = date.toISOString().split('T')[0]; // Get YYYY-MM-DD format
        if (!forecastByDay[day]) {
          forecastByDay[day] = [];
        }
        forecastByDay[day].push(forecast);
      });

      // Extract and display forecast for the next 5 days
      const days = Object.keys(forecastByDay).slice(0, 5);
      days.forEach(day => {
        const dailyForecasts = forecastByDay[day];
        const dailyTemps = dailyForecasts.map(f => f.main.temp);
        const minTemp = Math.min(...dailyTemps);
        const maxTemp = Math.max(...dailyTemps);

        const forecast = dailyForecasts[Math.floor(dailyForecasts.length / 2)]; // Use the mid-day forecast
        let weatherInfo = {};
        weatherInfo.currentTemperature = Math.round(forecast.main.temp);
        weatherInfo.conditionIcon = getFontAwesomeIcon(forecast.weather[0].icon);
        let date = new Date(forecast.dt_txt);
        let dayOfWeekNum = date.getDay();
        weatherInfo.precipitation = "N/A"; 
        weatherInfo.windSpeed = forecast.wind.speed;
        weatherInfo.humidity = forecast.main.humidity;
        weatherInfo.conditionText = forecast.weather[0].description;
        weatherInfo.minTemp = Math.round(minTemp);
        weatherInfo.maxTemp = Math.round(maxTemp);

        let daysOfWeekArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        weatherInfo.dayOfWeekStr = daysOfWeekArray[dayOfWeekNum];

        let dailyForecastHtml = generateDailyForecastHTML(weatherInfo, city);
        dailyForcastContainer.appendChild(dailyForecastHtml);
      });
    })
    .catch(error => console.log(`There was a problem with the fetch operation: ${error.message}`));
}

function getFontAwesomeIcon(weatherIconCode) {
  const iconMap = {
    '01d': 'fa-sun',
    '01n': 'fa-moon',
    '02d': 'fa-cloud-sun',
    '02n': 'fa-cloud-moon',
    '03d': 'fa-cloud',
    '03n': 'fa-cloud',
    '04d': 'fa-cloud-meatball',
    '04n': 'fa-cloud-meatball',
    '09d': 'fa-cloud-showers-heavy',
    '09n': 'fa-cloud-showers-heavy',
    '10d': 'fa-cloud-sun-rain',
    '10n': 'fa-cloud-moon-rain',
    '11d': 'fa-poo-storm',
    '11n': 'fa-poo-storm',
    '13d': 'fa-snowflake',
    '13n': 'fa-snowflake',
    '50d': 'fa-smog',
    '50n': 'fa-smog'
  };
  return iconMap[weatherIconCode] || 'fa-question';
}

function generateDailyForecastHTML(weatherInfo, city) {
  let div = document.createElement("div");
  div.className = "dailyForecast";

  let weekdayDiv = document.createElement("div");
  weekdayDiv.className = "weekday";
  weekdayDiv.textContent = weatherInfo.dayOfWeekStr.substring(0, 3);
  div.appendChild(weekdayDiv);

  let imageDiv = document.createElement("div");
  let icon = document.createElement("i");
  icon.className = `fas ${weatherInfo.conditionIcon}`;
  imageDiv.appendChild(icon);
  div.appendChild(imageDiv);

  let maxMinTempDiv = document.createElement("div");
  maxMinTempDiv.className = "maxMinTemp";

  let tempSpan1 = document.createElement("span");
  tempSpan1.className = "temp";
  tempSpan1.textContent = `${weatherInfo.maxTemp}°`;
  maxMinTempDiv.appendChild(tempSpan1);

  let tempSpan2 = document.createElement("span");
  tempSpan2.className = "temp";
  tempSpan2.textContent = `${weatherInfo.minTemp}°`;
  maxMinTempDiv.appendChild(tempSpan2);

  div.appendChild(maxMinTempDiv);

  div.addEventListener("click", function() {
    showDailyForecastDetails(weatherInfo, city);
  });

  return div;
}

function showDailyForecastDetails(weatherInfo, city) {
  document.getElementById("dayTemperature").innerHTML = weatherInfo.currentTemperature;
  document.getElementById("precipitation").innerHTML = weatherInfo.precipitation;
  document.getElementById("humidity").innerHTML = `${weatherInfo.humidity}%`;
  document.getElementById("wind").innerHTML = `${weatherInfo.windSpeed} kph`;
  document.getElementById("condition").innerHTML = weatherInfo.conditionText;
  document.getElementById("today").innerHTML = weatherInfo.dayOfWeekStr;
  document.getElementById("cityName").innerHTML = city;
  document.getElementById("currentIcon").className = `fas ${weatherInfo.conditionIcon}`;
}

function showAlert(message) {
  const alert = document.getElementById("alert");
  alert.innerHTML = message;
  alert.style.display = "flex";

  setTimeout(function() {
    alert.style.display = "none";
  }, 1000);
}



















