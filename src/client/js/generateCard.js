import cardComponent from './Components/card';

// ********************************************************************************************** //
// **************************** generate card element to display trip *************************** //
// ********************************************************************************************** //
const generateCard = (data) => {
  let parentEl;
  // check if trip is already expired with grace period + 1 day in ms
  if (data.endDate + 86400000 >= Date.now()) {
    parentEl = document.getElementById('entryHolder');
  } else {
    parentEl = document.getElementById('expired-trips');
  }
  const fragment = document.createDocumentFragment();
  const card = document.createElement('div');
  card.classList = 'card panel';
  card.innerHTML = cardComponent(data);
  fragment.appendChild(card);
  parentEl.insertBefore(fragment, parentEl.firstChild);
};

export default generateCard;
