//Function to create li element and delete button
import getFlightsData from '../flights';
import { getHoursMinutes } from '../date';

const listItem = (data, customClass) => {
  let value = data;
  console.log(value);
  if (customClass === 'flight_item') {
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
    value = ` 
    <li>
        <span class="list">
            <div class="${customClass}">
                <span class='list_item' data-id='${data.id}' hidden></span>
                <div class="flight_header">
                    <div class='flight_icon'>&#9992;</div>
                    <div class='flight_information '>
                        <div class="flight_date">${scheduledDepartureDate}</div>
                        <div><h3>${iataCodeDeparture} to ${iataCodeArrival}</h3></div>
                        <div class="flight_airline">${carrierCode} ${flightNumber} ${airlineName}</div>
                    </div>
                </div>
                <div class="flight_departure">  
                    <div class="flight_dep_time">${getHoursMinutes(
                      timingDeparture
                    )}</div>
                    <div class="flight_dep"> <h4>Depart</h4>${departureAirport}</div> 
                </div>
                <div class="flight_arrival">  
                    <div class="flight_arr_time">${getHoursMinutes(
                      timingsArrival
                    )}</div>
                    <div class="flight_arr"> <h4>Arrive</h4>${arrivalAirport}</div>
                </div>
            </div>
        <span>
    </li>
    <span class="button_small">
        &times;
    </span>`;
  } else
    value = ` 
        <span class=${customClass}  hidden>
            ${JSON.stringify({ data: value })}
        </span>
        <span>${value}</span>`;

  return value;
};

export default listItem;
