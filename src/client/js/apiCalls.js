// ********************************************************************************************** //
// ************************ Fetch data from Api server and handle errors ************************ //
// ********************************************************************************************** //
const retrieveData = async (url = '') => {
  const request = await fetch(url);
  try {
    return await request.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error', error);
    // TODO:appropriately handle the error
  }
};

// ********************************************************************************************** //
// ********************************* Fetch location coordinates ********************************* //
// ********************************************************************************************** //
const fetchLocationCoordinates = async (city) => {
  const { data } = await retrieveData(`/api/coordinates/${city}`);
  const geoData = {
    latitude: data.geonames[0].lat,
    longitude: data.geonames[0].lng,
    country: data.geonames[0].countryName,
    city: data.geonames[0].toponymName,
  };
  return geoData;
};

// ********************************************************************************************** //
// ************************************* Fetch weather data ************************************* //
// ********************************************************************************************** //
const fetchWeather = async (lat, lon) => {
  const { data } = await retrieveData(`/api/weather/${lat}&${lon}`);
  return data;
};

// ********************************************************************************************** //
// ******************************* Fetch random image of location ******************************* //
// ********************************************************************************************** //
const fetchLocationImages = async (city) => {
  const { data } = await retrieveData(
    `/api/images/${encodeURIComponent(city)}`
  );
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
  return data.data[0].businessName;
};

// ********************************************************************************************** //
// *************************** Fetch name of airport from airport code ************************** //
// ********************************************************************************************** //
const getAirportName = async (airport) => {
  const data = await retrieveData(`/api/airport2/${airport}`);
  return data.data.name;
};

// ********************************************************************************************** //
// ************************************ Fetch flight schedule *********************************** //
// ********************************************************************************************** //
const fetchFlightSchedule = async (code, flight, date) => {
  const id = new Date().getTime().toString();
  const data = await retrieveData(`/api/schedule/${code}&${flight}&${date}`);
  if (data.status === 'success') {
    data.airlineName = await getAirlineData(
      data.data[0].flightDesignator.carrierCode
    );
    data.departureAirport = await getAirportName(
      data.data[0].flightPoints[0].iataCode
    );
    data.arrivalAirport = await getAirportName(
      data.data[0].flightPoints[1].iataCode
    );
    data.id = id;
    return data;
  }
  return null;
};

// ********************************************************************************************** //
// ***************************************** Async POST ***************************************** //
// ********************************************************************************************** //
// TODO: Add meaningful functionality.
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
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
