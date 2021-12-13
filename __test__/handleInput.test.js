import createEntry from '../src/client/js/handleInput';

jest.mock('../src/client/js/utils/modal', () => ({
  span: jest.fn(),
}));

describe('Testing the app.js functionality', () => {
  // The test() function has two arguments - a string description, and an actual test as a callback function.
  test('Testing the createEntry() function', () => {
    expect(createEntry).toBeDefined();
  });
});
