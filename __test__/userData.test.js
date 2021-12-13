import {
  stateUpdateTrip,
  stateDeleteTrip,
  init,
  updateLocalStorage,
  state,
  stateClearCurrent,
  stateAddToCurrent,
  localStorageTrips,
  stateAddTrip,
} from '../src/client/js/userData';

describe('Testing the userData functionality', () => {
  test('Testing the stateUpdateTrip() function', () => {
    expect(stateUpdateTrip).toBeDefined();
  });
  test('Testing the stateDeleteTrip() function', () => {
    expect(stateDeleteTrip).toBeDefined();
  });
  test('Testing the init() function', () => {
    expect(init).toBeDefined();
  });
  test('Testing the updateLocalStorage() function', () => {
    expect(updateLocalStorage).toBeDefined();
  });
  test('Testing the state() function', () => {
    expect(state).toBeDefined();
  });
  test('Testing the stateClearCurrent() function', () => {
    expect(stateClearCurrent).toBeDefined();
  });
  test('Testing the stateAddToCurrent() function', () => {
    expect(stateAddToCurrent).toBeDefined();
  });
  test('Testing the localStorageTrips() function', () => {
    expect(localStorageTrips).toBeDefined();
  });
  test('Testing the stateAddTrip() function', () => {
    expect(stateAddTrip).toBeDefined();
  });
});
