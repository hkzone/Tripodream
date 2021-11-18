/* eslint-disable no-unused-vars */
import { jsPDF } from 'jspdf';
import { trips } from './localStorage';
import { daysUntil, dateToString } from './date';

const downloadTrip = (e) => {
  const id = e.target.getAttribute('data-id');
  const { allData, flights, packingList, notes } = trips.filter(
    (trip) => trip.id === id
  )[0];

  let daysAway = daysUntil(allData.startDate);
  let forecastOrCurrent;
  if (daysAway < 16 && daysAway >= 0) {
    forecastOrCurrent = 'forecasted';
  } else {
    daysAway = 0;
    forecastOrCurrent = 'current';
  }

  const printHeader = `
  <div >
      <span class='big_slash'>/</span>${allData.city}, ${allData.country}
    </div> 
    <div> Departing: ${dateToString(allData.startDate, true)}</div>
    <hr>
    <div>This trip is ${daysAway} day(s) away!</div>
     <div>The ${forecastOrCurrent}  weather is 
      ${allData.weatherData.data[daysAway].weather.description.toLowerCase()}
    </div>
    `;
  const printWeather = allData.weatherData.data.map(
    (el) =>
      `date:${el.valid_date} high temp:${el.high_temp} low temp:${el.low_temp} Forecast: ${el.weather.description}`
  );
  // printHeader.append(printWeather);

  // eslint-disable-next-line new-cap
  const pdf = new jsPDF('p', 'pt', [795, 1245]);
  pdf.text = ('printHeader', 10, 10);
  pdf.save('test.pdf');
  // pdf.html(document.getElementsByClassName('card')[0], {
  //   callback: function (pdf) {
  //     pdf.save('test.pdf');
  //   },
  //   x: 10,
  //   y: 10,
  // });
};

export default downloadTrip;
