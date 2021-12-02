// eslint-disable-next-line import/order
import Litepicker from 'litepicker';
import 'litepicker-polyfills-ie11';
import { fetchLocationCoordinates, fetchWeather, postData } from './apiCalls';
import updateUI from './updateUI';
import { stateAddToCurrent } from './userData';

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
// ************************* function to display error messages in form ************************* //
// ********************************************************************************************** //
const showErrorMessage = (msg) => {
  const msgField = document.querySelector('#message');
  msgField.textContent = msg;
  msgField.classList.toggle('error');
  setTimeout(() => {
    msgField.textContent = '';
    msgField.classList.toggle('error');
  }, 3000);
};

// ********************************************************************************************** //
// ********************* Validate input: check if city and dates are entered ******************** //
// ********************************************************************************************** //
const validateFormInput = () => {
  const city = document.querySelector('#city');
  if (city.value.length === 0) {
    showErrorMessage(`Please input a city name`);
    return false;
  }
  if (!picker.getStartDate() || !picker.getEndDate()) {
    showErrorMessage(`Please enter dates`);
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
      location.longitude
    );
    postData('/api/all', {
      weatherData,
      startDate,
      endDate,
      city: location.city,
      country: location.country,
    });
    updateUI();
  } catch (err) {
    showErrorMessage(err);
  }
  document.getElementById('myModalSpinner').style.display = 'none';
};

export { handleSubmit, validateFormInput };
