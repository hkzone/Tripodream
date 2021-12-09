// eslint-disable-next-line import/order
import Litepicker from 'litepicker';
import 'litepicker-polyfills-ie11';
import { fetchLocationCoordinates, fetchWeather, postData } from './apiCalls';
import updateUI from './updateUI';
import { stateAddToCurrent } from './userData';
import { showAlert } from './alerts';

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

// ********************************************************************************************** //
// ********************* Validate input: check if city and dates are entered ******************** //
// ********************************************************************************************** //
const validateFormInput = () => {
  const city = document.querySelector('#city');
  if (city.value.length === 0) {
    showAlert('error', 'Please input a city name', 5);
    return false;
  }
  if (!picker.getStartDate() || !picker.getEndDate()) {
    showAlert('error', 'Please enter date', 5);
    return false;
  }
  return true;
};

// ********************************************************************************************** //
// **************************** function to handle form submit events *************************** //
// ********************************************************************************************** //
const handleSubmit = async (event) => {
  event.preventDefault();
  if (!validateFormInput()) return;

  const startDate = picker.getStartDate().getTime();
  const endDate = picker.getEndDate().getTime();
  const city = document.getElementById('city').value;
  stateAddToCurrent({
    startDate,
    endDate,
    id: new Date().getTime().toString(),
  });

  //display spinner while loading
  document.getElementById('myModalSpinner').style.display = 'grid';

  //fetch data from the server
  try {
    const location = await fetchLocationCoordinates(city);
    const weatherData = await fetchWeather(
      location.latitude,
      location.longitude,
      startDate / 1000,
      endDate / 1000
    );
    console.log(weatherData);
    postData('/api/all', {
      weatherData,
      startDate,
      endDate,
      city: location.city,
      country: location.country,
    });
    await updateUI();
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
  document.getElementById('myModalSpinner').style.display = 'none';
};

export { handleSubmit, validateFormInput };
