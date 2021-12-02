import 'litepicker-polyfills-ie11';
import Litepicker from 'litepicker';
import { modal } from './modal';
import { stateDeleteTrip } from './userData';
import createEntry from './handleInput';
import inputComponent from './Components/input';

// ********************************************************************************************** //
// ************************************** open packing list ************************************* //
// ********************************************************************************************** //
const openPacking = (event, type) => {
  createEntry({
    ...type,
    inputElemType: inputComponent('packingList'),
    parentName: 'packing list',
    saveToInputWithClass: 'packing_items_list',
    nameOfObjectField: 'packingList',
    dataType: event.target.getAttribute('data-type'),
  });
  modal.style.display = 'grid';
  // Focus on input element
  document.getElementsByClassName('userinput')[0].focus();
};

// ********************************************************************************************** //
// ***************************************** open notes ***************************************** //
// ********************************************************************************************** //
const openNotes = (event, type) => {
  createEntry({
    ...type,
    inputElemType: inputComponent('notes'),
    parentName: 'notes',
    saveToInputWithClass: 'notes_list',
    nameOfObjectField: 'notes',
    dataType: event.target.getAttribute('data-type'),
  });

  modal.style.display = 'grid';
  // Focus on input element
  document.getElementsByClassName('userinput')[0].focus();
};
// ********************************************************************************************** //
// **************************************** open flights **************************************** //
// ********************************************************************************************** //
const openFlight = (event, type) => {
  createEntry({
    ...type,
    inputElemType: inputComponent('flights'),
    parentName: 'flights',
    saveToInputWithClass: 'flight_list',
    nameOfObjectField: 'flights',
    dataType: event.target.getAttribute('data-type'),
  });
  // eslint-disable-next-line no-unused-vars
  const picker2 = new Litepicker({
    element: document.getElementById('datepicker2'),
    minDate: Date.now(),
    singleMode: true,
    format: 'YYYY-MM-DD',
  });

  modal.style.display = 'grid';

  // const airline = document.getElementById('airline');
  // const airlineList = document.getElementById('airline_list');
  // const errors = document.getElementById('errors');
  // airline.addEventListener('keyup', () => {
  //   console.log(airline.value, airline.value.length);
  //   if (airline.value.length === 2) {
  //     retrieveData(`/airline/${airline.value}`).then((data) => {
  //       if (data.status === 'success') {
  //         const option = document.createElement('option');
  //         option.value = `${data.data[0].iataCode} : ${data.data[0].businessName}`;
  //         airlineList.innerHTML = '';
  //         airlineList.appendChild(option);
  //         errors.innerText = '';
  //       } else {
  //         errors.innerText = 'Attention: Code not found';
  //       }
  //     });
  //   }
  // });
  // Focus on input element
  document.getElementsByClassName('userinput')[0].focus();
};

// ********************************************************************************************** //
// ***************************************** Delete Trip **************************************** //
// ********************************************************************************************** //
const deleteTrip = (e) => {
  const id = e.target.getAttribute('data-id');
  stateDeleteTrip(id);
  e.target.parentElement.parentElement.parentElement.remove();
};

// ********************************************************************************************** //
// ***************************************** Update Trip **************************************** //
// ********************************************************************************************** //
const updateTrip = (event, type = 'saved') => {
  const id = event.target.getAttribute('data-id');
  const parentElement = event.target.getAttribute('data-type');

  if (parentElement === 'p_list') {
    openPacking(event, { type, id });
  } else if (parentElement === 'notes') {
    openNotes(event, { type, id });
  } else if (parentElement === 'flights') {
    openFlight(event, { type, id });
  }
};

export { updateTrip, deleteTrip };
