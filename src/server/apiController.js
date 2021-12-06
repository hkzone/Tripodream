/* eslint-disable no-console */
const Amadeus = require('amadeus');
const axios = require('axios').default;
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: 'config.env' });

const urlWeatherApi = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const urlGeonamesApi = 'https://secure.geonames.org/searchJSON?q=';
const urlPixabayApi =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal&';

const amadeus = new Amadeus({
  clientId: process.env.AmadeusAPIKey,
  clientSecret: process.env.AmadeusAPISecret,
});

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

let airportsData;

exports.updateData = (req, res) => {
  projectData = { ...req.body };
  res.send(projectData);
};

exports.getData = (req, res) => {
  res.send(projectData);
};

// ***************************** File to serve airport name request ***************************** //
fs.readFile(
  path.join(__dirname, '/data/airports.json'),
  'utf8',
  (err, response) => {
    if (err) {
      console.error(err);
      return;
    }
    airportsData = JSON.parse(response);
  }
);

// ********************************************************************************************** //
// ************************* Returns airport data based on airport code ************************* //
// ********************************************************************************************** //

exports.getAirportName = async (req, res) => {
  try {
    const result = Object.entries(airportsData).filter(
      (obj) => obj[1].iata === req.params.Airport
    )[0][1];
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      data: `airport name with code ${req.params.Airport} not found`,
    });
  }
};

// ********************************************************************************************** //
// ***************************************** PIXABAY API **************************************** //
// ********************************************************************************************** //
exports.getImages = async (req, res) => {
  try {
    const response = await axios.get(
      `${urlPixabayApi}key=${process.env.apiKeyPixabay}&q=${encodeURIComponent(
        req.params.city
      )}`
    );
    res.status(200).json({
      status: 'success',
      data: response.data,
    });
  } catch (err) {
    if (err.response) {
      // The request was made and the server responded with a status code
      console.log('Error', err.response.data);
      res.status(err.response.status || 400).json({
        status: 'error',
        data: err.response.data || err.message,
      });
    } else {
      //The request was made but no response was received or some other error occurred
      console.log('Error', err.message);
      res
        .status(400)
        .json({ status: 'error', data: `Api error ${err.message} ` });
    }
  }
};

// ********************************************************************************************** //
// **************************************** Geonames Api **************************************** //
// ********************************************************************************************** //

exports.getLocationCoordinates = async (req, res) => {
  try {
    const response = await axios.get(
      `${urlGeonamesApi}${req.params.city}&maxRows=1&username=${process.env.apiKeyGeonames}`
    );
    res.status(200).json({
      status: 'success',
      data: response.data,
    });
  } catch (err) {
    if (err.response) {
      // The request was made and the server responded with a status code
      console.log('Error', err.message);
      res.status(err.response.status || 400).json({
        status: 'error',
        data: err.response.data.status.message || err.message,
      });
    } else {
      //The request was made but no response was received or some other error occurred
      console.log('Error', err.message);
      res
        .status(400)
        .json({ status: 'error', data: `Api error ${err.message} ` });
    }
  }
};

// ********************************************************************************************** //
// *************************************** Weatherbit Api *************************************** //
// ********************************************************************************************** //

exports.getWeather = async (req, res) => {
  try {
    const response = await axios.get(
      `${urlWeatherApi}&lat=${req.params.lat}&lon=${req.params.lon}&key=${process.env.apiKeyWeather}`
    );
    res.status(200).json({
      status: 'success',
      data: response.data,
    });
  } catch (err) {
    if (err.response) {
      // The request was made and the server responded with a status code
      console.log('Error', err.message);
      res.status(err.response.status || 400).json({
        status: 'error',
        data: err.response.data.error || err.message,
      });
    } else {
      //The request was made but no response was received or some other error occurred
      console.log('Error', err.message);
      res
        .status(400)
        .json({ status: 'error', data: `Api error ${err.message} ` });
    }
  }
};

// ********************************************************************************************** //
// ******************************* Amadeus API- get airlines data ******************************* //
// ********************************************************************************************** //
exports.getAirlines = async (req, res) => {
  try {
    const response = await amadeus.referenceData.airlines.get({
      airlineCodes: `${req.params.airlineCode}`,
    });
    if (response.result.meta.count !== 0) {
      res.status(200).json({
        status: 'success',
        data: response.data,
      });
    } else {
      res.status(400).json({
        status: 'error',
        data: 'Airline with this code not found',
      });
    }
  } catch (responseError) {
    // eslint-disable-next-line no-console
    console.log(responseError.description);
    res.status(400).json({
      status: 'error',
      data: responseError.description
        .map((el) => `${el.title}: ${el.detail}`)
        .join(','),
    });
  }
};

// ********************************************************************************************** //
// **************************** Amadeus API- get flight schedule data *************************** //
// ********************************************************************************************** //
exports.getScheduleFlights = async (req, res) => {
  try {
    const response = await amadeus.client.get('/v2/schedule/flights', {
      carrierCode: req.params.carrierCode,
      flightNumber: req.params.flightNumber,
      scheduledDepartureDate: req.params.scheduledDepartureDate,
    });

    if (response.result.meta.count !== 0) {
      res.status(200).json({
        status: 'success',
        data: response.data,
      });
    } else {
      console.log('error not found');
      res.status(400).json({
        status: 'error',
        data: 'Flight information for data provided not found, please check',
      });
    }
  } catch (responseError) {
    // eslint-disable-next-line no-console
    console.log('error', responseError.description);
    res.status(400).json({
      status: 'error',
      data: responseError.description
        .map((el) => `${el.title}: ${el.detail}`)
        .join(','),
    });
  }
};
