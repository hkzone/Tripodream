import { daysUntil } from '../date';
import weatherIcon from '../weatherIcon';

// ********************************************************************************************** //
// ************ Function that returns HTML to display weather information for one day *********** //
// ********************************************************************************************** //
const oneDayWeather = (data) => {
  let daysAway = daysUntil(data.startDate);
  let forecastOrCurrent = '';
  if (daysAway < 16 && daysAway >= 0) {
    forecastOrCurrent = 'forecasted';
  } else {
    daysAway = 0;
    forecastOrCurrent = 'current';
  }
  return `
    <div>
      <span id="days-away" class="currentTripDates">This trip is ${daysAway} day(s) away! </span>
    </div>
    <div class="cur_forecast">
      <div id="high_temp">${
        data.allData.weatherData.data[daysAway].high_temp
      }°</div>
      <img alt="" id="temp_icon" src="./images/${weatherIcon(
        data.allData.weatherData.data[daysAway].weather.code
      )}.svg" />
      <p id="desc_weather"></p>
      <div id="low_temp">${
        data.allData.weatherData.data[daysAway].low_temp
      }°</div>
    </div>
    <div id="message_forecast">The ${forecastOrCurrent} weather is ${data.allData.weatherData.data[
    daysAway
  ].weather.description.toLowerCase()}
    </div>`;
};

export default oneDayWeather;
