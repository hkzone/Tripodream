/* eslint-disable no-restricted-globals */
/* eslint-disable no-global-assign */
import { state } from './userData';
import generateCard from './generateCard';
import { updateTrip, deleteTrip } from './tripModel';
import processSlider from './imageSlider';
import downloadTrip from './makePdf';

// ********************************************************************************************** //
// ***** Wrapping functionalities in a app() function to be executed only after DOM is ready **** //
// ********************************************************************************************** //
const app = () => {
  // ************************** Event listener for clicks on saved trips ************************** //
  document.getElementById('entryHolder').addEventListener('click', (event) => {
    const { classList } = event.target;

    if (classList.contains('update_data')) updateTrip(event);
    else if (classList.contains('delete_data')) deleteTrip(event);
    else if (classList.contains('download_data')) downloadTrip(event);
    else if (classList.contains('prev')) processSlider(event, '-');
    else if (classList.contains('next')) processSlider(event, '+');
  });

  // ********************* Generate saved entries from Local Storage on start ********************* //
  if (Object.keys(state.savedTrips).length !== 0) {
    const sideContainer = document.getElementsByClassName('side_container')[0];
    const headingMytrips = document.createElement('h3');
    headingMytrips.classList = 'my_trips';
    headingMytrips.innerHTML = 'My Trips';
    sideContainer.prepend(headingMytrips);
    state.savedTrips.forEach((el) => generateCard(el));
  }
};

export default app;
