/* eslint-disable no-console */
const Amadeus = require('amadeus');
const axios = require('axios').default;
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: 'config.env' });

const urlWeatherApi = ' https://api.weatherbit.io/v2.0/forecast/daily?';
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

exports.updateData = (req, res) => {
  projectData = { ...req.body };
  res.send(projectData);
};

exports.getData = (req, res) => {
  res.send(projectData);
};

exports.getImages = async (req, res) => {
  const response = await axios.get(
    `${urlPixabayApi}key=${process.env.apiKeyPixabay}&q=${encodeURIComponent(
      req.params.city
    )}`
  );
  res.status(200).json({
    status: 'success',
    data: response.data,
  });
};

exports.getLocationCoordinates = async (req, res) => {
  const response = await axios.get(
    `${urlGeonamesApi}${req.params.city}&maxRows=1&username=${process.env.apiKeyGeonames}`
  );
  res.status(200).json({
    status: 'success',
    data: response.data,
  });
};

exports.getWeather = async (req, res) => {
  const response = await axios.get(
    `${urlWeatherApi}&lat=${req.params.lat}&lon=${req.params.lon}&key=${process.env.apiKeyWeather}`
  );
  res.status(200).json({
    status: 'success',
    data: response.data,
  });
};

exports.getAirlines = (req, res) => {
  amadeus.referenceData.airlines
    .get({
      airlineCodes: req.params.airlineCode,
    })
    .then((response) => {
      if (response.result.meta.count !== 0) {
        res.status(200).json({
          status: 'success',
          data: response.data,
        });
      } else {
        res.status(400).json({
          status: 'error',
        });
      }
    })
    .catch((responseError) => {
      // eslint-disable-next-line no-console
      console.log(responseError.code);
      res.status(400).json({
        status: 'error',
      });
    });
};

// exports.getAirportName = (req, res) => {
//   amadeus.referenceData.locations
//     .get({
//       subType: 'AIRPORT',
//       keyword: req.params.Airport,
//     })
//     .then((response) => {
//       if (response.result.meta.count !== 0) {
//         res.status(200).json({
//           status: 'success',
//           data: response.data,
//         });
//       } else {
//         res.status(400).json({
//           status: 'error',
//         });
//       }
//     })
//     .catch((responseError) => {
//       // eslint-disable-next-line no-console
//       console.log(responseError);
//       res.status(400).json({
//         status: 'error',
//       });
//     });
// };

// exports.getAirportName2 = async (req, res) => {
//   const response = await axios.get(
//     `https://www.air-port-codes.com/api/v1/single`,
//     {
//       params: { iata: req.params.Airport },
//       headers: {
//         'APC-Auth': process.env.AirPortCodesAPIKey,
//         'APC-Auth-Secret': process.env.AirPortCodesAPISecret,
//       },
//     }
//   );
//   res.status(200).json({
//     status: 'success',
//     data: response.data,
//   });
// };

exports.getAirportName3 = async (req, res) => {
  const result = Object.entries(airportsData).filter(
    (obj) => obj[1].iata === req.params.Airport
  )[0][1];

  res.status(200).json({
    status: 'success',
    data: result,
  });
};

exports.getScheduleFlights = (req, res) => {
  amadeus.client
    .get('/v2/schedule/flights', {
      carrierCode: req.params.carrierCode,
      flightNumber: req.params.flightNumber,
      scheduledDepartureDate: req.params.scheduledDepartureDate,
    })
    .then((response) => {
      if (response.result.meta.count !== 0) {
        res.status(200).json({
          status: 'success',
          data: response.data,
        });
      } else {
        res.status(400).json({
          status: 'error',
        });
      }
    })
    .catch((responseError) => {
      // eslint-disable-next-line no-console
      console.log(responseError.code);
      res.status(400).json({
        status: 'error',
      });
    });
};
