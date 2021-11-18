import 'litepicker-polyfills-ie11';
import Litepicker from 'litepicker';
import { modal } from './modal';
import createEntry from './tripController';
import { updateLocalStorage, trips } from './localStorage';

// ------------------PACKING LIST------------------

// Open the modal and create list
const openPackingListButton = document.getElementById('pack_list_btn'); // Get the button that opens the modal

const openPacking = (type) => {
  createEntry({
    ...type,
    inputElemType: `<div class="input">
      <input id="userinput" type="text" placeholder="" class="userinput input_field" required>
      <label class="input_label" for="userinput">Add items to pack for this trip</label>
    </div>`,
    parentName: 'packing list',
    saveToInputWithClass: 'packing_items_list',
  });
  modal.style.display = 'grid';
  // Focus on input element
  document.getElementsByClassName('userinput')[0].focus();
};

// Add event listener to handle open packing list button
openPackingListButton.onclick = () => {
  openPacking({
    type: 'current',
    parentClass: 'pack_list_btn',
  });
};

// ------------------NOTES------------------
const noteButton = document.getElementById('note_btn');

// Open the modal and create list
const openNotes = (type) => {
  createEntry({
    ...type,
    inputElemType: `<div class="input">
      <textarea id="notes" type="text" placeholder="" class="userinput input_field" rows="5" required></textarea>
      <label class="input_label" for="notes">Add notes for this trip</label>
    </div>`,
    parentName: 'notes',
    saveToInputWithClass: 'notes_list',
  });

  modal.style.display = 'grid';
  // Focus on input element
  document.getElementsByClassName('userinput')[0].focus();
};

// Add event listener to handle open notes button
noteButton.onclick = () => {
  openNotes({
    type: 'current',
    parentClass: 'note_btn',
  });
};

// ------------------FLIGHT DETAILS------------------
const flightButton = document.getElementById('flight_btn');

//Open the modal and create list
const openFlight = (type) => {
  createEntry({
    ...type,
    inputElemType: `<div class="flight_input">
        <div class="input">
          <input id='airline' list='airline_list' class="userinput input_field required" type="text" placeholder="LH for Lufthansa" autocomplete="false" required>
          <label class="input_label" for="airline">Airline code</label>
        </div>
        <div class="input"> 
          <input id="flight" class="userinput input_field" type="text" placeholder="098" required>
          <label class="input_label" for="flight">Flight#</label>
        </div>
        <div class="input">
          <input class="userinput input_field" type="text" id="datepicker2" placeholder="" required>
          <label class="input_label" for="datepicker2">Date</label>
        </div>
      </div>`,
    parentName: 'flights',
    saveToInputWithClass: 'flight_list',
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

// Add event listener to handle open flights button
flightButton.addEventListener('click', () => {
  // eslint-disable-next-line no-restricted-globals
  const id = event.target.getAttribute('data-id');
  openFlight({
    type: 'current',
    parentClass: 'flight_btn',
    id,
  });
});

//Delete Trip
// eslint-disable-next-line no-unused-vars
const deleteTrip = (e) => {
  const id = e.target.getAttribute('data-id');
  trips = trips.filter((trip) => trip.id !== id);
  updateLocalStorage();
  e.target.parentElement.parentElement.parentElement.remove();
};

//Update Trip
// eslint-disable-next-line no-unused-vars
const updateTrip = (e) => {
  const id = e.target.getAttribute('data-id');
  const type = e.target.getAttribute('data-type');
  if (type === 'p_list') {
    openPacking({
      type: 'saved',
      nameOfObjectField: 'packingList',
      dataType: type,
      id,
    });
  } else if (type === 'notes') {
    openNotes({
      type: 'saved',
      nameOfObjectField: 'notes',
      dataType: type,
      id,
    });
  } else if (type === 'flights') {
    openFlight({
      type: 'saved',
      nameOfObjectField: 'flights',
      dataType: type,
      id,
    });
  }
};

export { updateTrip, deleteTrip };
