/* eslint-disable no-restricted-globals */
/* eslint-disable no-global-assign */
import TagCloud from 'TagCloud';
import { state } from './userData';
import generateCard from './generateCard';
import { updateTrip, deleteTrip } from './tripModel';
import processSlider from './imageSlider';
import downloadTrip from './makePdf';
import destinations from './data/destinations';

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
    document.getElementById('all-trips').style.display = 'block';
    state.savedTrips.forEach((el) => generateCard(el));
  }
  // ****************************** Create tag cloud for destinations ***************************** //
  const container = '.cloud';
  const options = { radius: 190, initSpeed: 'slow', maxSpeed: 'slow' };
  TagCloud(container, destinations, options);
  document.querySelector('.tagcloud').addEventListener('click', (e) => {
    if (e.target.className === 'tagcloud--item') {
      document.querySelector('#city').value = e.target.textContent;
      // your code here
    }
  });
};

export default app;
