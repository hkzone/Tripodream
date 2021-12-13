import app from '../src/client/js/app';

jest.mock('../src/client/js/utils/modal', () => ({
  span: jest.fn(),
}));

describe('Testing the app.js functionality', () => {
  // The test() function has two arguments - a string description, and an actual test as a callback function.
  test('Testing the app() function', () => {
    expect(app).toBeDefined();
  });
});
