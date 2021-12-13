import {
  retrieveData,
  getAirportName,
  getAirlineData,
  fetchLocationCoordinates,
  fetchWeather,
  postData,
  fetchLocationImages,
  fetchFlightSchedule,
} from '../src/client/js/apiCalls';

describe('Testing the userData functionality', () => {
  test('Testing the retrieveData() function', () => {
    expect(retrieveData).toBeDefined();
  });
  test('Testing the getAirportName() function', () => {
    expect(getAirportName).toBeDefined();
  });
  test('Testing the getAirlineData() function', () => {
    expect(getAirlineData).toBeDefined();
  });
  test('Testing the fetchLocationCoordinates() function', () => {
    expect(fetchLocationCoordinates).toBeDefined();
  });
  test('Testing the fetchWeather() function', () => {
    expect(fetchWeather).toBeDefined();
  });
  test('Testing the postData() function', () => {
    expect(postData).toBeDefined();
  });
  test('Testing the fetchLocationImages() function', () => {
    expect(fetchLocationImages).toBeDefined();
  });
  test('Testing the fetchFlightSchedule() function', () => {
    expect(fetchFlightSchedule).toBeDefined();
  });
});
