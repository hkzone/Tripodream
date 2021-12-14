import { daysUntil } from '../utils/date';

// ********************************************************************************************** //
// ************ Function that returns HTML to display weather information for one day *********** //
// ********************************************************************************************** //
const oneDayWeather = (data) => {
  // let daysAway = daysUntil(data.startDate);
  // let forecastOrCurrent = '';
  // if (daysAway < 16 && daysAway >= 0) {
  //   forecastOrCurrent = 'forecasted';
  // } else {
  //   daysAway = 0;
  //   forecastOrCurrent = 'current';
  // }

  // const lowTemp = data.allData.weatherData.data[daysAway].low_temp;
  // const highTemp = data.allData.weatherData.data[daysAway].high_temp;
  // const icon = weatherIcon(
  //   data.allData.weatherData.data[daysAway].weather.code
  // );
  // const description =
  //   data.allData.weatherData.data[daysAway].weather.description.toLowerCase();

  const daysAway = daysUntil(data.startDate);
  let forecastOrPredicted = '';
  if (data.allData.weatherData.days[0].source !== 'stats') {
    forecastOrPredicted = 'forecasted';
  } else {
    forecastOrPredicted = 'predicted, based on historical data';
  }

  const lowTemp = data.allData.weatherData.days[0].tempmin;
  const highTemp = data.allData.weatherData.days[0].tempmax;
  const { icon } = data.allData.weatherData.days[0];
  const description = data.allData.weatherData.days[0].conditions.toLowerCase();
  return `
    <div>
      <span id="days-away" class="currentTripDates">This trip is ${daysAway} day(s) away! </span>
    </div>
    <div class="cur_forecast">
      <div id="high_temp">${highTemp}°</div>
      <img alt="" id="temp_icon" src="./images/${icon}.svg" />
      <p id="desc_weather"></p>
      <div id="low_temp">${lowTemp}°</div>
    </div>
    <div id="message_forecast">The ${forecastOrPredicted} weather is: ${description}
    </div>`;
};

export default oneDayWeather;
