# Weather Web Application

   This Weather web Application allows users to search for the current weather and a 5-day forecast for any city in the world. The application uses the OpenWeatherMap API to fetch weather data and displays it in a user-friendly interface.

# Features 

 - Search for weather information by city name.
  - Display current weather conditions, including temperature, humidity, wind speed, and weather description.   
  - Display a 5-day weather forecast with temperature ranges and weather icons.

# Screenshots
  This screenshot shows the search input field and button where users can enter a city name. ![Reference Image](/12.png)
 
# Setup and installation 
  Prerequisites
  - A modern web browser (e.g., Chrome, Firefox, Edge).
  - An internet connection to fetch weather data from the OpenWeatherMap API.

# Installation


```JAVASCRIPT 

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
```