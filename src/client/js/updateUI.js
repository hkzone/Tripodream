import { fetchLocationImages } from './apiCalls';
import { currentData } from './localStorage';
import { dateToString, daysUntil } from './date';
import weatherIcon from './weatherIcon';

const apiKeyPixabay = '24117524-a6ef2b73885d93dcc5792a808';
const urlPixabayApi =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal&';

const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const mainWrapper = document.getElementById('currentTripWrapper');
    const allData = await request.json();
    const id = new Date().getTime().toString();

    let image = await fetchLocationImages(
      urlPixabayApi,
      apiKeyPixabay,
      `${allData.city}+${allData.country}`
    );
    if (image === null) {
      image = await fetchLocationImages(
        urlPixabayApi,
        apiKeyPixabay,
        allData.country
      );
    }

    currentData = {
      ...currentData,
      allData,
      image,
    };

    let daysAway = daysUntil(currentData.startDate);
    let forecastOrCurrent = '';

    document.getElementById(
      'destination'
    ).innerHTML = `<span class='big_slash'>/</span>${allData.city}, ${allData.country}`;
    document.getElementById('departing').innerText = `Departing: ${dateToString(
      currentData.startDate,
      true
    )}`;
    document.getElementById(
      'currentTripWrapper'
    ).style.backgroundImage = `url('${image.src}')`;

    document.getElementById(
      'days-away'
    ).innerText = `This trip is ${daysAway} day(s) away!`;

    if (daysAway < 16 && daysAway >= 0) {
      forecastOrCurrent = 'forecasted';
    } else {
      daysAway = 0;
      forecastOrCurrent = 'current';
    }
    document.getElementById(
      'high_temp'
    ).innerText = `${currentData.allData.weatherData.data[daysAway].high_temp}°`;
    document.getElementById(
      'low_temp'
    ).innerText = `${currentData.allData.weatherData.data[daysAway].low_temp}°`;
    document.getElementById('temp_icon').src = `./images/${weatherIcon(
      currentData.allData.weatherData.data[daysAway].weather.code
    )}.svg`;
    document.getElementById(
      'message_forecast'
    ).innerText = `The ${forecastOrCurrent}  weather is ${currentData.allData.weatherData.data[
      daysAway
    ].weather.description.toLowerCase()}`;

    document.getElementById('pack_list_btn').innerText = 'Add packing list';
    document.getElementById('note_btn').innerText = 'Add note';

    document.getElementById('flight_btn').setAttribute('data-id', id);
    mainWrapper.setAttribute('data-id', `${id}-wrapper`);
    //Show
    mainWrapper.style.visibility = 'visible';
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error', error);
  }
};

export default updateUI;
