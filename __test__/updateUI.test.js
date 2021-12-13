import updateUI from '../src/client/js/updateUI';

jest.mock('../src/client/js/utils/modal', () => ({
  span: jest.fn(),
}));

describe('Testing the updateUI functionality', () => {
  test('Testing the updateUI() function', () => {
    expect(updateUI).toBeDefined();
  });
});
