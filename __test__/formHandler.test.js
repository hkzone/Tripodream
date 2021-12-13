import { handleSubmit } from '../src/client/js/formHandler';

jest.mock('../src/client/js/utils/modal', () => ({
  span: jest.fn(),
}));
jest.mock('litepicker');

describe('Testing the submit functionality', () => {
  // The test() function has two arguments - a string description, and an actual test as a callback function.
  test('Testing the handleSubmit() function', () => {
    expect(handleSubmit).toBeDefined();
  });
});
