import { dateToString } from '../date';

const addFlightData = (id, fData) => {
  const flightContainer = document.querySelector(
    `[data-id="${id}-wrapper"] .flight_container`
  );

  const { data } = JSON.parse(fData[0].data);
  const iataCodeDep = data.data[0].flightPoints[0].iataCode;
  const depTime = data.data[0].flightPoints[0].departure.timings[0].value;
  const iataCodeArr = data.data[0].flightPoints[1].iataCode;
  const arrTime = data.data[0].flightPoints[1].arrival.timings[0].value;
  flightContainer.innerHTML = `
       <div>Flight info:</div>
        <div class='flight_info'>
            <div>${iataCodeDep} ${dateToString(depTime, false, true)}</div>
            <div>${iataCodeArr} ${dateToString(arrTime, false, true)}</div>
        </div>
       `;
};

export default addFlightData;
