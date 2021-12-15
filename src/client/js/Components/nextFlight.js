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
      //get next upcoming flight
      const next = JSON.parse(flights).reduce((prev, current) => {
        const prevTime = new Date(
          JSON.parse(
            prev.data
          ).data.data[0].flightPoints[0].departure.timings[0].value
        ).getTime();
        const nextTime = new Date(
          JSON.parse(
            current.data
          ).data.data[0].flightPoints[0].departure.timings[0].value
        ).getTime();
        return prevTime < nextTime && prevTime > Date.now() * 2
          ? prev
          : current;
      });

      const iataCodeDep = JSON.parse(next.data).data.data[0].flightPoints[0]
        .iataCode;
      const depTime = JSON.parse(next.data).data.data[0].flightPoints[0]
        .departure.timings[0].value;
      const iataCodeArr = JSON.parse(next.data).data.data[0].flightPoints[1]
        .iataCode;
      const arrTime = JSON.parse(next.data).data.data[0].flightPoints[1].arrival
        .timings[0].value;

      // if flight is in the past return empty
      if (new Date(depTime) < Date.now()) return '';

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
