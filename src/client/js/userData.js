// ********************************************************************************************** //
// ********************* object to save all user data of saved and new trip ********************* //
// ********************************************************************************************** //
const state = {
  currentData: {},
  savedTrips: {},
};

// ************************************ update local storage ************************************ //
const updateLocalStorage = () => {
  const arr = state.savedTrips;
  //sort by date
  arr.sort((a, b) => b.startDate - a.startDate);
  localStorage.setItem('savedTrips', JSON.stringify(arr));
};

// ******************************** read trips from localStorage ******************************** //
const localStorageTrips = () =>
  JSON.parse(localStorage.getItem('savedTrips')) || [];

// ****************************************** add trip ****************************************** //
const stateAddTrip = (data) => {
  state.savedTrips.push(data);
};

// ************************************** Update saved trip ************************************* //
const stateUpdateTrip = (type, newValues, savedOrCurrent = 'savedTrips') => {
  if (savedOrCurrent === 'savedTrips') {
    state.savedTrips = state.savedTrips.map((el) => {
      if (el.id !== type.id) return el;
      return {
        ...el,
        [type.nameOfObjectField]: { [type.nameOfObjectField]: newValues },
      };
    });
  } else {
    state.currentData = {
      ...state.currentData,
      [type.nameOfObjectField]: { [type.nameOfObjectField]: newValues },
    };
  }
};

// ***************************************** Delete trip **************************************** //
const stateDeleteTrip = (id) => {
  state.savedTrips = state.savedTrips.filter((trip) => trip.id !== id);
  updateLocalStorage();
};

// ************************************* add to current data ************************************ //
const stateAddToCurrent = (extraData) => {
  state.currentData = { ...state.currentData, ...extraData };
};

// ************************************* clear current data ************************************* //
const stateClearCurrent = () => {
  state.currentData = {};
};

// ***************************** load saved trips from local storage **************************** //
const init = () => {
  state.savedTrips = localStorageTrips();
};

export {
  stateUpdateTrip,
  stateDeleteTrip,
  init,
  updateLocalStorage,
  state,
  stateClearCurrent,
  stateAddToCurrent,
  localStorageTrips,
  stateAddTrip,
};
