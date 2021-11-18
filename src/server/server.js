const dotenv = require('dotenv');
const Amadeus = require('amadeus');
const axios = require('axios').default;

dotenv.config({ path: 'config.env' });

const amadeus = new Amadeus({
  clientId: process.env.AmadeusAPIKey,
  clientSecret: process.env.AmadeusAPISecret,
});

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server
const port = process.env.PORT || 3000;
// eslint-disable-next-line no-unused-vars
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is running on port ${port}...`);
});

const getAirlines = (req, res) => {
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

const getAirportName = (req, res) => {
  amadeus.referenceData.locations
    .get({
      subType: 'AIRPORT',
      keyword: req.params.Airport,
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
      console.log(responseError);
      res.status(400).json({
        status: 'error',
      });
    });
};

const getAirportName2 = async (req, res) => {
  const response = await axios.get(
    `https://www.air-port-codes.com/api/v1/single`,
    {
      params: { iata: req.params.Airport },
      headers: {
        'APC-Auth': process.env.AirPortCodesAPIKey,
        'APC-Auth-Secret': process.env.AirPortCodesAPISecret,
      },
    }
  );
  res.status(200).json({
    status: 'success',
    data: response.data,
  });
};

const getScheduleFlights = (req, res) => {
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
// GET route

app.get('/', (req, res) => {
  res.sendFile('/dist/index.html');
});

app.get('/all', (req, res) => res.send(projectData));

app.get('/airline/:airlineCode', (req, res) => {
  getAirlines(req, res);
});

app.get(
  '/schedule/:carrierCode&:flightNumber&:scheduledDepartureDate',
  (req, res) => {
    getScheduleFlights(req, res);
  }
);

app.get('/airport/:Airport', (req, res) => {
  getAirportName(req, res);
});

app.get('/airport2/:Airport', (req, res) => {
  getAirportName2(req, res);
});

// POST route
app.post('/all', (req, res) => {
  projectData = { ...req.body };
  res.send(projectData);
});
