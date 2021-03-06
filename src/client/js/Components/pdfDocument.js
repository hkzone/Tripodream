import cardComponent from './card';
import listItem from './listItem';
import { state } from '../userData';
import { dateToString } from '../utils/date';

// ********************************************************************************************** //
// ************************** Function to return HTML for pdf printing ************************** //
// ********************************************************************************************** //
const pdfDocument = (id, type) => {
  // eslint-disable-next-line one-var
  let data;

  if (type === 'saved') {
    data = state.savedTrips.filter((el) => el.id === id)[0];
  } else {
    data = state.currentData;
  }

  const flightsArr = JSON.parse(data.flights.flights || '[]');
  const notesArr = JSON.parse(data.notes.notes || '[]');
  const packingArr = JSON.parse(data.packingList.packingList || '[]');

  return `<div id="pdf-modal" class="modal">
  <div class="pdf-buttons"> <button class="button button-grey print-pdf">print pdf
    </button>
    <button class="button button-grey close-pdf">close
    </button>
  </div>
  <section id="pdf">
    <div class="pdf-content">
      <div class="card">
        ${cardComponent(data, 'pdf')}
      </div>
      <div class="weather">
        <h5>Weather forecast</h5>
        <ul>
          ${data.allData.weatherData.days
            .map(
              (el) =>
                `<li><span class="date-weather">${dateToString(
                  el.datetimeEpoch * 1000
                )}</span><span class="weather-desc">${
                  el.conditions
                }</span><span class="weather-temp">${el.tempmax}°/${
                  el.tempmin
                }°</span></li> `
            )
            .join('')}
        </ul>
      </div>
      ${
        flightsArr.length
          ? `<div>
        <h5>Flights</h5>
        <ul>
          ${flightsArr
            .map(
              (el) =>
                `${listItem(JSON.parse(el.data).data, 'flight_item', true)}`
            )
            .join('')}

        </ul>
      </div>`
          : ''
      }
      ${
        packingArr.length
          ? `
      <div class="list-pdf packing">
        <h5>Packing list</h5>
        <ul>
          ${packingArr
            .map(
              (el) =>
                `<li>${listItem(
                  JSON.parse(el.data).data,
                  'list_item',
                  true
                )}</li>`
            )
            .join('')}
        </ul>
      </div>
      `
          : ''
      }
      ${
        notesArr.length
          ? `
      <div class="list-pdf notes">
        <h5>Notes</h5>
        <ul>
          ${notesArr
            .map(
              (el) =>
                `<li>${listItem(
                  JSON.parse(el.data).data,
                  'list_item',
                  true
                )}</li>`
            )
            .join('')}
        </ul>
      </div>
      `
          : ''
      }

    </div>
  </section>
  `;
};

export default pdfDocument;
