import { dateToString } from '../date';
import slider from './slider';
import nextFlight from './nextFlight';
import oneDayWeather from './_oneDayWeather';

const card = (data, type = 'section') => {
  const {
    allData,
    image,
    id,
    notes = { notes: '[]' },
    packingList = { packingList: '[]' },
    flights = { flights: '[]' },
  } = data;

  const flightsQty = JSON.parse(flights.flights).length;
  const plistQty = JSON.parse(packingList.packingList).length;
  const notesQty = JSON.parse(notes.notes).length;

  const flightContainer = nextFlight(flights);
  return `
  <section class='${type}'>
    ${
      type === 'section'
        ? `<div class="card_image">
      <img src=${image.src} alt="${image.tags}" /img>
      <span class="card-image-overlay style="display: none">Expired</span>
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
          ? `<div class='slider'>
        <div class='weather-slider'>
          ${slider(allData)}
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
        <button data-id=${id} data-type='flights' class='update_data flight_btn icon'>
          <object data="./images/plane.svg" type="image/svg+xml"></object>
           <span>${flightsQty > 0 ? ` (${flightsQty})` : ''} </span></button>
        <button data-id=${id} data-type='p_list' class='update_data pack_list_btn icon'>
         <object data="./images/checkbox.svg" type="image/svg+xml"></object>
         <span>${plistQty > 0 ? ` (${plistQty})` : ''} </span> </button>
        <button data-id=${id} data-type='notes' class='update_data note_btn icon'>
            <object data="./images/notes.svg" type="image/svg+xml"></object>
             <span>${notesQty > 0 ? ` (${notesQty})` : ''} </span></button>
        <button data-id=${id} data-type='download' class='download_data icon'>
        <object data="./images/pdf.svg" type="image/svg+xml"></object></button>
     
      ${
        type === 'section'
          ? `
      
              <button data-id=${id} class='delete_data icon'>
              <object data="./images/delete.svg" type="image/svg+xml"></object>
              </button>
              </div>`
          : ` </div>
              <button data-id=${id} class="save-btn">Save trip</button>
              <button data-id=${id} class="cancel-btn">Cancel</button>`
      }
    </div>`
          : ''
      }
  </section>
`;
};

export default card;
