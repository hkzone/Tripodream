import generateCard from '../src/client/js/generateCard';

describe('Testing the app.js functionality', () => {
  // The test() function has two arguments - a string description, and an actual test as a callback function.
  test('Testing the generateCard() function', () => {
    expect(generateCard).toBeDefined();
  });
});
