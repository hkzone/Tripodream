const express = require('express');
const apiController = require('./apiController');

const router = express.Router();

router.route('/all').get(apiController.getData).post(apiController.updateData);

router.use('/coordinates/:city', apiController.getLocationCoordinates);
router.use('/weather/:lat&:lon&:from&:to', apiController.getWeather);
// router.use(
//   '/weather/historical/:lat&:lon&:from&:to',
//   apiController.getHistoricalWeather
// );
router.use('/images/:city', apiController.getImages);
router.use('/airline/:airlineCode', apiController.getAirlines);
router.use('/airport/:Airport', apiController.getAirportName);
router.use(
  '/schedule/:carrierCode&:flightNumber&:scheduledDepartureDate',
  apiController.getScheduleFlights
);

module.exports = router;
