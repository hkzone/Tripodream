import { updateLocalStorage, trips } from './localStorage';
import { modal, modalContent } from './modal';
import { retrieveData, getAirportName, getAirlineData } from './apiCalls';
import { getHoursMinutes, dateToString } from './date';
import getFlightsData from './flights';

const addFlightData = (id, fData) => {
  const flightContainer = document.querySelector(
    `[data-id="${id}-wrapper"] .flight_container`
  );

  const { data } = JSON.parse(fData[0].data);
  const iataCodeDep = data.data[0].flightPoints[0].iataCode;
  const depTime = data.data[0].flightPoints[0].departure.timings[0].value;
  const iataCodeArr = data.data[0].flightPoints[1].iataCode;
  const arrTime = data.data[0].flightPoints[1].arrival.timings[0].value;
  flightContainer.innerHTML = `
       <div>Flight info:</div>
        <div class='flight_info'>
            <div>${iataCodeDep} ${dateToString(depTime, false, true)}</div>
            <div>${iataCodeArr} ${dateToString(arrTime, false, true)}</div>
        </div>
       `;
};

// ------------------Create modal content and save user input------------------

const createEntry = (type) => {
  const isList = document.getElementsByClassName('packing-list')[0];
  if (isList !== undefined) isList.remove();

  const saveToElem = type.saveToInputWithClass;

  //create input and ul elements
  const fragment = document.createDocumentFragment();
  const list = document.createElement('div');
  list.classList = 'packing-list';
  list.innerHTML = `<h3 class='modal_title'>${type.parentName}</h3>
          <div id="errors"></div>
          <div id="inputDiv">
          ${type.inputElemType} 
          <span class="button_small" id="enter">&plus;</span>
        </div>
        <ul id='ul-packinglist'></ul><button id="save">Save</button><button  id="cancel">Cancel</button>`;
  fragment.appendChild(list);
  modalContent.appendChild(fragment);

  //get elements
  const addButton = document.getElementById('enter');
  const input = document.getElementsByClassName('userinput');
  const ul = document.getElementById('ul-packinglist');
  const saveBtn = document.getElementById('save');
  const cancelBtn = document.getElementById('cancel');

  // Check if any length of text entered in input fields is empty
  const inputLength = () =>
    [...document.querySelectorAll('.userinput')]
      .map((el) => el.value.length)

      .reduce((m, n) => m * n);

  //Function to create li element and delete button
  const createEntryElement = (data, customClass = 'list_item') => {
    let value = data;
    if (customClass === 'flight_item') {
      const {
        departureAirport,
        arrivalAirport,
        airlineName,
        scheduledDepartureDate,
        iataCodeDeparture,
        iataCodeArrival,
        carrierCode,
        flightNumber,
        timingDeparture,
        timingsArrival,
      } = getFlightsData(data);
      value = ` 
        <div class="${customClass}">
            <span class='list_item' data-id='${data.id}' hidden></span>
            <div class="flight_header">
                <div class='flight_icon'>&#9992;</div>
                <div class='flight_information '>
                    <div class="flight_date">${scheduledDepartureDate}</div>
                    <div><h3>${iataCodeDeparture} to ${iataCodeArrival}</h3></div>
                    <div class="flight_airline">${carrierCode} ${flightNumber} ${airlineName}</div>
                </div>
            </div>
            <div class="flight_departure">  
                <div class="flight_dep_time">${getHoursMinutes(
                  timingDeparture
                )}</div>
                 <div class="flight_dep"> <h4>Depart</h4>${departureAirport}</div> 
            </div>
            <div class="flight_arrival">  
                <div class="flight_arr_time">${getHoursMinutes(
                  timingsArrival
                )}</div>
                <div class="flight_arr"> <h4>Arrive</h4>${arrivalAirport}</div>
            </div>
        </div>`;
    } else
      value = ` 
        <span class=${customClass}  hidden>
            ${JSON.stringify({ data: value })}
        </span>
        <span>${value}</span>`;

    const li = document.createElement('li');
    const spanEl = document.createElement('span');
    spanEl.innerHTML = value;
    spanEl.classList = 'list';
    li.appendChild(spanEl);
    const buttonDel = document.createElement('span');
    buttonDel.classList = 'button_small';
    buttonDel.innerHTML = '&times;';
    li.appendChild(buttonDel);
    ul.appendChild(li);
    if (customClass === 'flight_item') {
      const saveUserInput = document.querySelector(`[data-id="${data.id}"] `);
      saveUserInput.innerText = JSON.stringify({
        data,
      });
    }
  };

  const addExtendedFlightData = async () => {
    const userInput = [...document.querySelectorAll('.userinput')].map(
      (el) => el.value
    );
    const id = new Date().getTime().toString();
    try {
      document.getElementById('myModalSpinner').style.display = 'grid';
      const data = await retrieveData(
        `/schedule/${userInput[0]}&${userInput[1]}&${userInput[2]}`
      );

      if (data.status === 'success') {
        data.airlineName = await getAirlineData(
          data.data[0].flightDesignator.carrierCode
        );
        data.departureAirport = await getAirportName(
          data.data[0].flightPoints[0].iataCode
        );
        data.arrivalAirport = await getAirportName(
          data.data[0].flightPoints[1].iataCode
        );
        data.id = id;
        document.getElementById('myModalSpinner').style.display = 'none';
        createEntryElement(data, 'flight_item');
      } else {
        // errors.innerText = 'Attention: Code not found';
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  //Add event listeners to add items on "+" button press
  addButton.addEventListener('click', () => {
    const allData = [];
    if (inputLength() > 0) {
      if (type.parentName === 'flights') {
        addExtendedFlightData();
      } // eslint-disable-next-line no-restricted-syntax
      else {
        // eslint-disable-next-line no-restricted-syntax
        for (const el of input) {
          allData.push(el.value);
          el.value = '';
        }
        createEntryElement(allData);
      }
    }
  });

  //Add event listener to add items on Enter pressed
  // input.addEventListener('keypress', (e) => {
  //   if (inputLength() > 0 && e.keyCode === 13) {
  //     createEntryElement(input.value);
  //     input.value = '';
  //   }
  // });

  //Add event listener to mark as done items
  // ul.addEventListener('click', (e) => {
  //   if (e.target.classList.contains('list_item')) {
  //     e.target.classList.toggle('done');
  //   }
  // });

  //Add event listener to delete item when "x" pressed
  ul.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('button_small')) {
      return e.target.parentElement.remove();
    }
  });

  //Check if values were saved before then display them
  const savedValues = document.getElementById(saveToElem);
  const savedObjectValues = type.nameOfObjectField;
  const option = type.parentName === 'flights' ? 'flight_item' : 'list_item';
  if (type.type === 'current') {
    if (savedValues.value)
      JSON.parse(savedValues.value).forEach((el) => {
        createEntryElement(JSON.parse(el.data).data, option);
      });
  } else if (type.type === 'saved') {
    const trip = trips.filter((el) => el.id === type.id);
    const data = JSON.parse(
      trip[0][`${savedObjectValues}`][`${savedObjectValues}`] || '[]'
    );
    if (data) {
      data.forEach((el) =>
        createEntryElement(JSON.parse(el.data).data, option)
      );
    }
  }

  //Add event listener to handle Save button
  saveBtn.addEventListener('click', () => {
    const items = document.querySelectorAll('.list_item');
    const listValues = [];
    [...items].forEach((el) => {
      listValues.push({ data: el.innerText });
    });
    if (type.type === 'current') {
      if (listValues.length > 0) {
        document.getElementById(type.saveToInputWithClass).value =
          JSON.stringify(listValues);
        document.getElementById(
          type.parentClass
        ).innerText = `${listValues.length} item(s) in ${type.parentName}`;
      } else {
        document.getElementById(
          type.parentClass
        ).innerText = `Add ${type.parentName}`;
      }
    } else if (type.type === 'saved') {
      const newValues = JSON.stringify(listValues);
      if (listValues.length > 0) {
        document.getElementById(type.saveToInputWithClass).value =
          JSON.stringify(listValues);
        trips = trips.map((el) => {
          if (el.id !== type.id) return el;
          return {
            ...el,
            [type.nameOfObjectField]: { [type.nameOfObjectField]: newValues },
          };
        });
        document.querySelectorAll(
          `[data-id='${type.id}'][data-type='${type.dataType}']`
        )[0].innerText = `${listValues.length} item(s) in ${type.parentName}`;
      } else {
        trips = trips.map((el) => {
          if (el.id !== type.id) return el;
          return {
            ...el,
            [type.nameOfObjectField]: { [type.nameOfObjectField]: null },
          };
        });
        document.querySelectorAll(
          `[data-id='${type.id}'][data-type='${type.dataType}']`
        )[0].innerText = `Add ${type.parentName}`;
      }
      updateLocalStorage();
    }
    modal.style.display = 'none';
    if (type.parentName === 'flights') addFlightData(type.id, listValues);
  });

  //Add event listener to handle cancel button
  cancelBtn.addEventListener('click', () => {
    document.getElementsByClassName('packing-list')[0].remove();
    modal.style.display = 'none';
  });
};

export default createEntry;
