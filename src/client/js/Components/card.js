import { dateToString } from '../date';
import slider from './slider';
import nextFlight from './nextFlight';
import oneDayWeather from './_oneDayWeather';

const card = (data, type = 'section') => {
  const { allData, image, id, flights = {} } = data;
  const sliderHtml = slider(allData);

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
      ${
        type !== 'pdf'
          ? ` <div class="flight_container">
        ${flightContainer}
      </div>`
          : ''
      }
      <hr class="hr">
      </h5>
      ${
        // eslint-disable-next-line no-nested-ternary
        type === 'section'
          ? `<div class='section-center'>
        <div class='weather-slider'>
          ${sliderHtml}
        </div>
        <button type="button" class='prev'><</button>
        <button type="button" class='next'>></button>
      </div>`
          : type !== 'pdf'
          ? oneDayWeather(data)
          : ''
      }
      ${
        type !== 'pdf'
          ? `
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
    </div>`
          : ''
      }
  </section>
`;
};

export default card;
