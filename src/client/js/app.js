/* eslint-disable no-restricted-globals */
/* eslint-disable no-global-assign */

import 'litepicker-polyfills-ie11';
import Litepicker from 'litepicker';
import { updateLocalStorage, trips, currentData } from './localStorage';
import saveEntry from './saveEntry';
import { fetchLocationCoordinates, fetchWeather, postData } from './apiCalls';
import { updateTrip, deleteTrip } from './tripModel';
import updateUI from './updateUI';
import processSlider from './imageSlider';
import downloadTrip from './makePdf';

/* Global Variables */
const urlWeatherApi = ' https://api.weatherbit.io/v2.0/forecast/daily?';
const apiKeyWeather = 'acad7c829c264ed7a34cd9f2d4bd746c';
const urlGeonamesApi = 'https://secure.geonames.org/searchJSON?q=';
const apiKeyGeonames = 'smee2004';

//Wrapping functionalities in a app() function to be executed only after DOM is ready
const app = () => {
  const saveBtn = document.getElementById('save-btn');

  const picker = new Litepicker({
    element: document.getElementById('datepicker'),
    minDate: Date.now(),
    singleMode: false,
    format: 'DD-MMM-YYYY',
    tooltipText: {
      one: 'day',
      other: 'days',
    },
    tooltipNumber: (totalDays) => totalDays - 1,
  });

  // Search for the new destination
  const searchNewTrip = (e) => {
    e.preventDefault();
    const startDate = picker.getStartDate().getTime();
    const endDate = picker.getEndDate().getTime();
    currentData = { startDate, endDate };
    const city = document.getElementById('city').value;
    document.getElementById('myModalSpinner').style.display = 'grid';
    fetchLocationCoordinates(urlGeonamesApi, apiKeyGeonames, city).then(
      (data) => {
        fetchWeather(
          urlWeatherApi,
          apiKeyWeather,
          data.latitude,
          data.longitude
        )
          .then((weatherData) => {
            postData('/all', {
              weatherData,
              startDate,
              endDate,
              city: data.city,
              country: data.country,
            });
            document.getElementById('myModalSpinner').style.display = 'none';
          })
          .then(updateUI);
      }
    );
  };

  // Add event listener to Search new trip
  document.getElementById('generate').addEventListener('click', searchNewTrip);

  // Add event listener to Save the trip button
  saveBtn.addEventListener('click', () => {
    const packingList = {
      packingList: document.getElementById('packing_items_list').value,
    };
    const notes = {
      notes: document.getElementById('notes_list').value,
    };
    const flights = {
      flights: document.getElementById('flight_list').value,
    };
    currentData = {
      ...currentData,
      packingList,
      notes,
      flights,
      id: new Date().getTime().toString(),
    };
    saveEntry(currentData);
    trips.push(currentData);
    updateLocalStorage();
    currentData = {};
    document.getElementById('currentTripWrapper').style.visibility = 'hidden';
  });

  // Add event listener for clicks on saved entries
  document.getElementById('entryHolder').addEventListener('click', () => {
    if (event.target.classList.contains('update_data')) updateTrip(event);
    else if (event.target.classList.contains('delete_data')) deleteTrip(event);
    else if (event.target.classList.contains('download_data'))
      downloadTrip(event);
    else if (event.target.classList.contains('prev')) processSlider(event, '-');
    else if (event.target.classList.contains('next')) processSlider(event, '+');
  });

  //Generate saved enties from Local Storage on start
  if (Object.keys(trips).length !== 0) {
    const sideContainer = document.getElementsByClassName('side_container')[0];
    const headingMytrips = document.createElement('h3');
    headingMytrips.classList = 'my_trips';
    headingMytrips.innerHTML = 'My Trips';
    sideContainer.prepend(headingMytrips);
    trips.forEach((el) => saveEntry(el));
  }
};

export default app;
