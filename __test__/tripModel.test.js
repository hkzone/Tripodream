import { updateTrip, deleteTrip } from '../src/client/js/tripModel';

jest.mock('../src/client/js/utils/modal', () => ({
  span: jest.fn(),
}));

describe('Testing the app.js functionality', () => {
  // The test() function has two arguments - a string description, and an actual test as a callback function.
  test('Testing the updateTrip() function', () => {
    expect(updateTrip).toBeDefined();
  });
  test('Testing the deleteTrip() function', () => {
    expect(deleteTrip).toBeDefined();
  });
});
