import { getHoursMinutes, dateToString, timeDiff } from '../date';
import getFlightsData from '../flights';

// ********************************************************************************************** //
// ************ Function that returns HTML to display flight details for pdf printing *********** //
// ********************************************************************************************** //
const listItemFlight = (data, customClass) => {
  const {
    departureCity,
    arrivalCity,
    airlineName,
    iataCodeDeparture,
    iataCodeArrival,
    carrierCode,
    flightNumber,
    timingDeparture,
    timingsArrival,
  } = getFlightsData(data);
  return `
  <li>
    <span class="list">
      <div class="${customClass}">
        <div class="airline">
          <div class="name"><span>${airlineName}<span></div>
          <div class="code">${carrierCode} ${flightNumber} </div>
        </div>
        <div class="flight-container">
          <div class="flight">
            <div class="date">${dateToString(
              timingDeparture,
              false,
              false,
              true
            )}</div>
            <div class="city"> ${departureCity}</div>
            <div class="time">${getHoursMinutes(
              timingDeparture
            )} <span>${iataCodeDeparture}</span></div>
          </div>
        </div>
        <div class="duration"><span><img src='./images/departures.png'> </span>
          <div>${timeDiff(
            timingDeparture,
            timingsArrival
          )} </div> <span><img src='./images/arrival.png'></span>
        </div>
        <div class="flight-container">
          <div class="flight">
            <div class="date">${dateToString(
              timingsArrival,
              false,
              false,
              true
            )}</div>
            <div class="city"> ${arrivalCity}</div>
            <div class="time">${getHoursMinutes(
              timingsArrival
            )} <span>${iataCodeArrival}</span></div>
          </div>
        </div>
      </div>
      <span>
  </li>
  `;
};

export default listItemFlight;
