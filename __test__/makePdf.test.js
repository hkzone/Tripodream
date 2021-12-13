import downloadTrip from '../src/client/js/makePdf';

describe('Testing the app.js functionality', () => {
  // The test() function has two arguments - a string description, and an actual test as a callback function.
  test('Testing the downloadTrip() function', () => {
    expect(downloadTrip).toBeDefined();
  });
});
