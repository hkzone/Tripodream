import { dateToString, daysUntil } from '../date';
import slider from './slider';
import nextFlight from './nextFlight';
import weatherIcon from '../weatherIcon';

const card = (data, type = 'section') => {
  const { allData, image, id, flights = {} } = data;
  const sliderHtml = slider(allData);
  let daysAway = daysUntil(data.startDate);
  let forecastOrCurrent = '';
  if (daysAway < 16 && daysAway >= 0) {
    forecastOrCurrent = 'forecasted';
  } else {
    daysAway = 0;
    forecastOrCurrent = 'current';
  }

  const flightContainer = nextFlight(flights);
  return `
   <section class='${type}'>
    ${
      type === 'section'
        ? `<div class="card_image">
       <img src=${image.src} alt="${image.tags}" /img>
    </div>`
        : ''
    }
    <h3>
        <span class='big_slash'>/</span>${allData.city}, ${allData.country}
    </h3>
    
    <div class='card_body' data-id="${id}-wrapper">
        <h5>Departing: ${dateToString(allData.startDate, true)}</h5>
        <div class="flight_container">
          ${flightContainer}
        </div>
        <hr class="hr">
        </h5>
        ${
          type === 'section'
            ? `<div class='section-center'>
          <div class='weather-slider'>
            ${sliderHtml}
          </div>
          <button type="button" class='prev'><</button>
          <button type="button" class='next'>></button>
         </div>`
            : `<div>
                <span id="days-away" class="currentTripDates">This trip is ${daysAway} day(s) away! </span>
              </div>
              <div class="cur_forecast">
                <div id="high_temp">${
                  data.allData.weatherData.data[daysAway].high_temp
                }°</div>
                <img  alt="" id="temp_icon" src="./images/${weatherIcon(
                  data.allData.weatherData.data[daysAway].weather.code
                )}.svg" />
                <p id="desc_weather"></p>
                <div id="low_temp">${
                  data.allData.weatherData.data[daysAway].low_temp
                }°</div>
              </div>
              <div id="message_forecast">The ${forecastOrCurrent}  weather is ${data.allData.weatherData.data[
                daysAway
              ].weather.description.toLowerCase()}</div>`
        }
        
    <div class="trip_options">
        <button data-id=${id} data-type='flights' class='update_data flight_btn'>Flights</button>
        <button data-id=${id} data-type='p_list' class='update_data pack_list_btn'>
          item(s) in packing list</button>
        <button data-id=${id} data-type='notes' class='update_data note_btn'>Notes</button>
        <button data-id=${id} data-type='download' class='download_data'>Download</button>
    </div>
    ${
      type === 'section'
        ? `
    <div class="card_footer">
        <button data-id=${id} class='delete_data'>Delete trip</button>
    </div>`
        : `<button data-id=${id} class="save-btn">Save trip</button>
          <button data-id=${id} class="cancel-btn">Cancel</button>`
    }
  </div>
  </section>
  `;
};

export default card;
