import axios from 'axios';

// ********************************************************************************************** //
// ************************ Fetch data from Api server and handle errors ************************ //
// ********************************************************************************************** //
const retrieveData = async (url = '') => {
  const response = await fetch(url);

  //if received responce from our api server
  if (response.status !== 504) {
    return await response.json();
  }

  //add error message to be response
  response.data = response.statusText;
  return response;
};

// ********************************************************************************************** //
// ********************************* Fetch location coordinates ********************************* //
// ********************************************************************************************** //
const fetchLocationCoordinates = async (city) => {
  const data = await retrieveData(`/api/coordinates/${city}`);

  if (data.status !== 'success') throw new Error(data.data);

  const geoData = {
    latitude: data.data.geonames[0].lat,
    longitude: data.data.geonames[0].lng,
    country: data.data.geonames[0].countryName,
    city: data.data.geonames[0].toponymName,
  };
  return geoData;
};

// ********************************************************************************************** //
// ************************************* Fetch weather data ************************************* //
// ********************************************************************************************** //
const fetchWeather = async (lat, lon, start, end) => {
  const dayInMs = 24 * 60 * 60;

  let endtime;

  //maximum fetch forecast for 14 days
  if (end - start > 13 * dayInMs) {
    endtime = start + 13 * dayInMs;
  }
  //minimum fetch forecast for 5 days
  else if (end - start < 4 * dayInMs) {
    endtime = start + 4 * dayInMs;
  } else endtime = end;

  const data = await retrieveData(
    `/api/weather/${lat}&${lon}&${start}&${endtime}`
  );

  if (data.status !== 'success') throw new Error(data.data);

  return data.data;
};

// ********************************************************************************************** //
// ******************************* Fetch random image of location ******************************* //
// ********************************************************************************************** //
const fetchLocationImages = async (city) => {
  const res = await retrieveData(`/api/images/${encodeURIComponent(city)}`);

  if (res.status !== 'success') throw new Error(res.data);

  const { data } = res;
  //maximum number of images to choose from
  const maxImages =
    parseInt(data.totalHits, 10) < 20 ? parseInt(data.totalHits, 10) : 20;
  if (parseInt(data.totalHits, 10) > 0) {
    const randomImage = data.hits[Math.floor(Math.random() * maxImages)];
    return {
      src: randomImage.webformatURL,
      tags: randomImage.tags,
    };
  }
  //if no images available return null
  return null;
};

// ********************************************************************************************** //
// **************************** Fetch name of airline from IATA code **************************** //
// ********************************************************************************************** //
const getAirlineData = async (airline) => {
  const data = await retrieveData(`/api/airline/${airline}`);

  if (data.status !== 'success') throw new Error(data.data);

  return data.data[0].businessName;
};

// ********************************************************************************************** //
// *************************** Fetch name of airport from airport code ************************** //
// ********************************************************************************************** //
const getAirportName = async (airport) => {
  const data = await retrieveData(`/api/airport/${airport}`);

  if (data.status !== 'success') throw new Error(data.data);

  return data.data;
};

// ********************************************************************************************** //
// ************************************ Fetch flight schedule *********************************** //
// ********************************************************************************************** //
const fetchFlightSchedule = async (code, flight, date) => {
  const id = new Date().getTime().toString();
  const data = await retrieveData(`/api/schedule/${code}&${flight}&${date}`);

  if (data.status !== 'success') throw new Error(data.data);

  data.airlineName = await getAirlineData(
    data.data[0].flightDesignator.carrierCode
  );
  const departureLocation = await getAirportName(
    data.data[0].flightPoints[0].iataCode
  );
  const arrivalLocation = await getAirportName(
    data.data[0].flightPoints[1].iataCode
  );
  data.departureAirport = departureLocation.name;
  data.arrivalAirport = arrivalLocation.name;
  data.departureCity = departureLocation.city;
  data.arrivalCity = arrivalLocation.city;
  data.id = id;
  return data;
};

// ********************************************************************************************** //
// ***************************************** Async POST ***************************************** //
// ********************************************************************************************** //
// TODO: Add meaningful functionality.
const postData = async (url = '', data = {}) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    const newData = await response.json();
    return newData;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error', error);
  }
};

export {
  retrieveData,
  getAirportName,
  getAirlineData,
  fetchLocationCoordinates,
  fetchWeather,
  postData,
  fetchLocationImages,
  fetchFlightSchedule,
};
