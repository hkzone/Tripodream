import { modal, modalContent } from './utils/modal';
import { fetchFlightSchedule } from './apiCalls';
import listItem from './Components/listItem';
import { state, stateUpdateTrip, updateLocalStorage } from './userData';
import addFlightData from './Components/flightData';
import { showAlert } from './utils/alerts';

// ********************************************************************************************** //
// ************************ function to check if any input field is empty *********************** //
// ********************************************************************************************** //
const validateInputsLength = () =>
  [...document.querySelectorAll('.userinput')]
    .map((el) => el.value.length)
    .reduce((m, n) => m * n);

// ********************************************************************************************** //
// ****************************************** Create LI ***************************************** //
// ********************************************************************************************** //
const createLi = (data, customClass = 'list_item') => {
  const li = document.createElement('li');
  li.innerHTML = listItem(data, customClass);
  document.getElementById('ul-packinglist').appendChild(li);
  if (customClass === 'flight_item') {
    const saveUserInput = document.querySelector(`[data-id="${data.id}"] `);
    saveUserInput.innerText = JSON.stringify({
      data,
    });
  }
};

// ********************************************************************************************** //
// ************************************ Extended flight data ************************************ //
// ********************************************************************************************** //
const addExtendedFlightData = async () => {
  try {
    const userInput = [...document.querySelectorAll('.userinput')].map(
      (el) => el.value
    );
    document.getElementById('myModalSpinner').style.display = 'grid';

    const data = await fetchFlightSchedule(
      userInput[0].toUpperCase(),
      userInput[1],
      userInput[2]
    );

    if (data) createLi(data, 'flight_item');
  } catch (err) {
    showAlert('error', err);
  }
  document.getElementById('myModalSpinner').style.display = 'none';
};

// ********************************************************************************************** //
// ********************************** Save user entered values ********************************** //
// ********************************************************************************************** //
const saveEntries = (type) => {
  const items = document.querySelectorAll('.list_item');

  // ************************************** get all li values ************************************* //
  const listValues = [];
  [...items].forEach((el) => {
    listValues.push({ data: el.innerText });
  });
  const newValues = JSON.stringify(listValues);

  // **************************** save all data from the current search *************************** //
  const element = document.querySelectorAll(
    `[data-id='${type.id}'][data-type='${type.dataType}']`
  )[0];

  if (type.type === 'current') {
    if (listValues.length > 0) {
      stateUpdateTrip(type, newValues, 'currentData');
      element.value = JSON.stringify(listValues);
      element.querySelector('span').innerText = `(${listValues.length})`;
    } else {
      element.querySelector('span').innerText = ``;
      stateUpdateTrip(type, '[]', 'currentData');
    }
  }
  // ************************ save modified data for previously saved items *********************** //
  else if (type.type === 'saved') {
    if (listValues.length > 0) {
      stateUpdateTrip(type, newValues);
      document
        .querySelectorAll(
          `[data-id='${type.id}'][data-type='${type.dataType}']`
        )[0]
        .querySelector('span').innerText = `(${listValues.length})`;
    } else {
      stateUpdateTrip(type, '[]');
      document
        .querySelectorAll(
          `[data-id='${type.id}'][data-type='${type.dataType}']`
        )[0]
        .querySelector('span').innerText = ``;
    }
    updateLocalStorage();
  }
  modal.style.display = 'none';

  // ********************** Display extra information if flights were updated ********************* //
  if (type.dataType === 'flights') addFlightData(type.id, listValues);
};

// ********************************************************************************************** //
// ****************************** Open modal for user to enter data ***************************** //
// ********************************************************************************************** //
const createEntry = (type) => {
  // ******************************** delete list if exists already ******************************* //
  const isList = document.getElementsByClassName('packing-list')[0];
  if (isList !== undefined) isList.remove();

  // ******************************** create input and ul elements ******************************** //
  const fragment = document.createDocumentFragment();
  const list = document.createElement('div');
  list.classList = 'packing-list';
  list.innerHTML = `<h3 class='modal_title'>${type.parentName}</h3>
          <div id="inputDiv">
          ${type.inputElemType} 
          <span class="button_small add-button" id="enter">&plus;</span>
        </div>
        <ul id='ul-packinglist'></ul><button id="save">Save</button><button  id="cancel">Cancel</button>`;
  fragment.appendChild(list);
  modalContent.appendChild(fragment);

  // *********************************** get all input elements *********************************** //
  const input = document.getElementsByClassName('userinput');

  // ********************* Check if values were saved before then display them ******************** //
  const savedValues = document.querySelectorAll(
    `[data-id='${type.id}'][data-type='${type.dataType}']`
  )[0];
  const savedObjectValues = type.nameOfObjectField;
  const option = type.parentName === 'flights' ? 'flight_item' : 'list_item';
  if (type.type === 'current') {
    if (savedValues.value)
      JSON.parse(savedValues.value).forEach((el) => {
        createLi(JSON.parse(el.data).data, option);
      });
  } else if (type.type === 'saved') {
    const trip = state.savedTrips.filter((el) => el.id === type.id);

    const data = JSON.parse(
      trip[0][`${savedObjectValues}`][`${savedObjectValues}`] || '[]'
    );
    if (data) {
      data.forEach((el) => createLi(JSON.parse(el.data).data, option));
    }
  }

  // ******************** Add event listeners to add items on "+" button press ******************** //
  const addButton = document.getElementById('enter');
  addButton.addEventListener('click', async () => {
    const allData = [];
    if (validateInputsLength() > 0) {
      if (type.parentName === 'flights') {
        await addExtendedFlightData();
      } // eslint-disable-next-line no-restricted-syntax
      else {
        // eslint-disable-next-line no-restricted-syntax
        for (const el of input) {
          allData.push(el.value);
          el.value = '';
        }
        createLi(allData);
      }
    }
  });

  // ********************* Add event listener to delete item when "x" pressed ********************* //
  const ul = document.getElementById('ul-packinglist');
  ul.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('button_small')) {
      return e.target.parentElement.remove();
    }
  });

  // ************************** Add event listener to handle Save button ************************** //
  const saveBtn = document.getElementById('save');
  saveBtn.addEventListener('click', () => saveEntries(type));

  // ************************* Add event listener to handle cancel button ************************* //
  const cancelBtn = document.getElementById('cancel');
  cancelBtn.addEventListener('click', () => {
    document.getElementsByClassName('packing-list')[0].remove();
    modal.style.display = 'none';
  });

  //Add event listener to add items on Enter pressed
  // input.addEventListener('keypress', (e) => {
  //   if (validateInputsLength() > 0 && e.keyCode === 13) {
  //     createLi(input.value);
  //     input.value = '';
  //   }
  // });

  //Add event listener to mark as done items
  // ul.addEventListener('click', (e) => {
  //   if (e.target.classList.contains('list_item')) {
  //     e.target.classList.toggle('done');
  //   }
  // });
};

export default createEntry;
