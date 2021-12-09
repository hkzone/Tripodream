import { fetchLocationImages } from './apiCalls';
import {
  updateLocalStorage,
  state,
  stateAddTrip,
  stateAddToCurrent,
  stateClearCurrent,
} from './userData';
import cardComponent from './Components/card';
import { updateTrip } from './tripModel';
import generateCard from './generateCard';

// ********************************************************************************************** //
// **************************************** Save new trip *************************************** //
// ********************************************************************************************** //
const saveNewTrip = (event) => {
  const id = event.target.getAttribute('data-id');
  const packingList = {
    packingList:
      document.querySelectorAll(`[data-id='${id}'][data-type='p_list']`)[0]
        .value || '[]',
  };
  const notes = {
    notes:
      document.querySelectorAll(`[data-id='${id}'][data-type='notes']`)[0]
        .value || '[]',
  };
  const flights = {
    flights:
      document.querySelectorAll(`[data-id='${id}'][data-type='flights']`)[0]
        .value || '[]',
  };
  // *********************** add to current data in state input by the user *********************** //
  stateAddToCurrent({
    packingList,
    notes,
    flights,
    id: new Date().getTime().toString(),
  });

  generateCard(state.currentData);
  //TODO: make this work through api calls
  stateAddTrip(state.currentData);

  updateLocalStorage();
  stateClearCurrent();
  document.getElementById('currentTripWrapper').style.visibility = 'hidden';
};

// ********************************************************************************************** //
// ******************************** Update UI to display new trip ******************************* //
// ********************************************************************************************** //
const updateUI = async () => {
  // *************************** get current search data from api server ************************** //
  const request = await fetch('/api/all');
  const allData = await request.json();

  // ******************************* get image for searched location ****************************** //
  let image = await fetchLocationImages(`${allData.city}+${allData.country}`);
  if (image === null) {
    image = await fetchLocationImages(allData.country);
  }

  // ***************************** display information on current trip **************************** //
  stateAddToCurrent({ allData, image });
  const mainWrapper = document.getElementById('currentTripWrapper');
  mainWrapper.innerHTML = cardComponent(state.currentData, 'tripDetails');
  mainWrapper.style.backgroundImage = `url('${image.src}')`;
  mainWrapper.setAttribute('data-id', `${state.currentData.id}-wrapper`);
  mainWrapper.style.visibility = 'visible';

  // ************************** Event listener for clicks on current trip ************************** //
  mainWrapper.addEventListener('click', (event) => {
    const { classList } = event.target;
    if (classList.contains('update_data')) updateTrip(event, 'current');
    else if (classList.contains('save-btn')) saveNewTrip(event);
    else if (classList.contains('cancel-btn')) mainWrapper.innerHTML = '';
    // else if (classList.contains('download_data')) downloadTrip(event);
  });
};

export default updateUI;
