// Async GET
const retrieveData = async (url = '') => {
  const request = await fetch(url);
  try {
    // Transform into JSON
    const allData = await request.json();
    return allData;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error', error);
    // appropriately handle the error
  }
};

//Fetch location coordinates
const fetchLocationCoordinates = async (urlApi, apiKey, city) => {
  const allData = await retrieveData(
    `${urlApi}${city}&maxRows=1&username=${apiKey}`
  );

  const data = {
    latitude: allData.geonames[0].lat,
    longitude: allData.geonames[0].lng,
    country: allData.geonames[0].countryName,
    city: allData.geonames[0].toponymName,
  };
  return data;
};

//Fetch weather data
const fetchWeather = async (urlApi, apiKey, lat, lon) => {
  const data = await retrieveData(
    `${urlApi}&lat=${lat}&lon=${lon}&key=${apiKey}`
  );
  return data;
};

const getAirlineData = async (airline) => {
  const data = await retrieveData(`/airline/${airline}`);
  return data.data[0].businessName;
};

const getAirportName = async (airport) => {
  const data = await retrieveData(`/airport2/${airport}`);
  return data.data.airport.name;
};

// Async POST
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

//Fetch coordinates for City
const fetchLocationImages = async (urlApi, apiKey, city) => {
  const data = await retrieveData(
    `${urlApi}key=${apiKey}&q=${encodeURIComponent(city)}`
  );
  const maxImages =
    parseInt(data.totalHits, 10) < 20 ? parseInt(data.totalHits, 10) : 20;

  if (parseInt(data.totalHits, 10) > 0) {
    const randomImage = data.hits[Math.floor(Math.random() * maxImages)];
    return {
      src: randomImage.webformatURL,
      tags: randomImage.tags,
    };
  }
  return null;
};

export {
  retrieveData,
  getAirportName,
  getAirlineData,
  fetchLocationCoordinates,
  fetchWeather,
  postData,
  fetchLocationImages,
};
