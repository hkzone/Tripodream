import { dateToString } from '../utils/date';

const nextFlight = ({ flights }) => {
  if (
    flights &&
    flights !== '[]' &&
    // eslint-disable-next-line no-prototype-builtins
    JSON.parse(flights)[0].hasOwnProperty('data')
  ) {
    const { data } = JSON.parse(JSON.parse(flights)[0].data);
    if (data.status === 'success') {
      const iataCodeDep = data.data[0].flightPoints[0].iataCode;
      const depTime = data.data[0].flightPoints[0].departure.timings[0].value;
      const iataCodeArr = data.data[0].flightPoints[1].iataCode;
      const arrTime = data.data[0].flightPoints[1].arrival.timings[0].value;
      return `
        <div>Flight info:</div>
        <div class='flight_info'>
          <div>${iataCodeDep} ${dateToString(depTime, false, true)}</div>
          <div>${iataCodeArr} ${dateToString(arrTime, false, true)}</div>
        </div>
        `;
    }
  }
  return '';
};

export default nextFlight;
