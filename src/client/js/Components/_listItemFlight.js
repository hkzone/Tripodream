import { getHoursMinutes } from '../date';
import getFlightsData from '../flights';

// ********************************************************************************************** //
// ******************** Function that returns HTML to display flight details ******************** //
// ********************************************************************************************** //
const listItemFlight = (data, customClass) => {
  const {
    departureAirport,
    arrivalAirport,
    airlineName,
    scheduledDepartureDate,
    iataCodeDeparture,
    iataCodeArrival,
    carrierCode,
    flightNumber,
    timingDeparture,
    timingsArrival,
  } = getFlightsData(data);
  return `<li>
  <span class="list">
    <div class="${customClass}">
      <span class='list_item' data-id='${data.id}' hidden></span>
      <div class="flight_header">
        <div class='flight_icon'>&#9992;</div>
        <div class='flight_information '>
          <div class="flight_date">${scheduledDepartureDate}</div>
          <div>
            <h3>${iataCodeDeparture} to ${iataCodeArrival}</h3>
          </div>
          <div class="flight_airline">${carrierCode} ${flightNumber} ${airlineName}</div>
        </div>
      </div>
      <div class="flight_departure">
        <div class="flight_dep_time">${getHoursMinutes(timingDeparture)}</div>
        <div class="flight_dep">
          <h4>Depart</h4>${departureAirport}
        </div>
      </div>
      <div class="flight_arrival">
        <div class="flight_arr_time">${getHoursMinutes(timingsArrival)}</div>
        <div class="flight_arr">
          <h4>Arrive</h4>${arrivalAirport}
        </div>
      </div>
    </div>
    <span>
</li>
<span class="button_small">
  &times;
</span>`;
};

export default listItemFlight;
