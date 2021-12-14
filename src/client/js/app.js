/* eslint-disable no-restricted-globals */
/* eslint-disable no-global-assign */
import TagCloud from 'TagCloud';
import { state } from './userData';
import generateCard from './generateCard';
import { updateTrip, deleteTrip } from './tripModel';
import processSlider from './utils/imageSlider';
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
  // ************************* determine width of tagcloud to be rendered ************************* //
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  const radius = vw < 768 ? vw / 2.5 : vw / 5.5;

  // ********************** determine how many items to show and randomize ********************** //

  // Shuffle array
  const shuffled = destinations.sort(() => 0.5 - Math.random());

  const n = Math.floor(radius / 10);
  // Get sub-array of first n elements after shuffled
  const selected = shuffled.slice(0, n);

  // ******************************************* Render ****************************************** //
  const options = { radius, initSpeed: 'slow', maxSpeed: 'slow' };
  TagCloud(container, selected, options);

  document.querySelector('.tagcloud').addEventListener('click', (e) => {
    if (e.target.className === 'tagcloud--item') {
      document.querySelector('#city').value = e.target.textContent;
      TagCloud.pause();
    }
  });
};

export default app;
