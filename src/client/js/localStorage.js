/* eslint-disable prefer-const */
const localStorageTrips = JSON.parse(localStorage.getItem('trips'));
// eslint-disable-next-line import/no-mutable-exports
let trips = localStorage.getItem('trips') !== null ? localStorageTrips : [];
let currentData = {};

//update local storage
const updateLocalStorage = () =>
  localStorage.setItem('trips', JSON.stringify(trips));

export { updateLocalStorage, trips, currentData };
