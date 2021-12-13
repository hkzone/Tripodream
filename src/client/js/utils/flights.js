// ********************************************************************************************** //
// ********************* function that returns flight data in simple format ********************* //
// ********************************************************************************************** //s
const getFlightsData = (data) => ({
  airlineName: data.airlineName,
  departureAirport: data.departureAirport,
  arrivalAirport: data.arrivalAirport,
  departureCity: data.departureCity,
  arrivalCity: data.arrivalCity,
  scheduledDepartureDate: data.data[0].scheduledDepartureDate,
  iataCodeDeparture: data.data[0].flightPoints[0].iataCode,
  iataCodeArrival: data.data[0].flightPoints[1].iataCode,
  carrierCode: data.data[0].flightDesignator.carrierCode,
  flightNumber: data.data[0].flightDesignator.flightNumber,
  timingDeparture: data.data[0].flightPoints[0].departure.timings[0].value,
  timingsArrival: data.data[0].flightPoints[1].arrival.timings[0].value,
});
export default getFlightsData;
