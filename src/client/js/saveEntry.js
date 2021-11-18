import weatherIcon from './weatherIcon';
import { dateToString } from './date';

const saveEntry = (d) => {
  const { allData, image, id, flights } = d;

  const fragment = document.createDocumentFragment();
  const card = document.createElement('div');
  card.classList = 'card panel';

  // Construct card content
  const index = 0;

  const sliderHtml = allData.weatherData.data
    .map((el, elIndex) => {
      //const { id, image, name, title, quote } = el;

      let position = 'nextSlide';
      if (elIndex === index + 1) {
        position = 'activeSlide';
      } else if (elIndex === index) {
        position = 'activeLastSlide';
      } else if (elIndex === index + 2) {
        position = 'activeNextSlide';
      } else if (elIndex === allData.weatherData.data.length - 1) {
        position = 'lastSlide';
      }
      const icon = weatherIcon(el.weather.code);
      const date = dateToString(el.ts * 1000);

      return `
        <div class='${position} weather-item' data-key=${elIndex}>
          <span class='weather-date'>${date}</span>
          <img src='./images/${icon}.svg' alt="${icon}" class='slider_img' /img>
          <p class='weather-description'>${el.weather.description}</p>
          <div>${Math.round(el.high_temp)}°/${Math.round(el.low_temp)}°<br />${
        el.rh
      }%</div>
        </div>  
        `;
    })
    .join('');

  let flightContainer = '';

  if (
    flights.flights &&
    // eslint-disable-next-line no-prototype-builtins
    JSON.parse(flights.flights)[0].hasOwnProperty('data')
  ) {
    const { data } = JSON.parse(JSON.parse(flights.flights)[0].data);
    if (data.status === 'success') {
      const iataCodeDep = data.data[0].flightPoints[0].iataCode;
      const depTime = data.data[0].flightPoints[0].departure.timings[0].value;
      const iataCodeArr = data.data[0].flightPoints[1].iataCode;
      const arrTime = data.data[0].flightPoints[1].arrival.timings[0].value;
      flightContainer = `
       <div>Flight info:</div>
        <div class='flight_info'>
            <div>${iataCodeDep} ${dateToString(depTime, false, true)}</div>
            <div>${iataCodeArr} ${dateToString(arrTime, false, true)}</div>
        </div>
       `;
    }
  }

  const weatherForecastHtml = `
    <h3>
        <span class='big_slash'>/</span>${allData.city}, ${allData.country}
    </h3>
    </section>
    <div class='card_body' data-id="${id}-wrapper">
        <h5>Departing: ${dateToString(allData.startDate, true)}</h5>
        <div class="flight_container">
          ${flightContainer}
        </div>
        <hr class="hr">
        </h5>
        <div class='section-center'>
          <div class='weather-slider'>
            ${sliderHtml}
          </div>
          <button type="button" class='prev'><</button>
          <button type="button" class='next'>></button>
         </div>
    `;

  card.innerHTML = `
   <section class='section'>
    <div class="card_image">
       <img src=${image.src} alt="${image.tags}" /img>
    </div>
    ${weatherForecastHtml}
    <div class="trip_options">
        <button data-id=${id} data-type='flights' class='update_data'>Flights</button>
        <button data-id=${id} data-type='p_list' class='update_data'>
          item(s) in packing list</button>
        <button data-id=${id} data-type='notes' class='update_data'>Notes</button>
        <button data-id=${id} data-type='notes' class='download_data'>Download</button>
    </div>
    <div class="card_footer">
        <button data-id=${id} class='delete_data'>Delete trip</button>
    </div>
  </div>
  `;

  fragment.appendChild(card);
  document.getElementById('entryHolder').appendChild(fragment);
};

export default saveEntry;
