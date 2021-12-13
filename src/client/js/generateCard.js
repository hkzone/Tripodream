import cardComponent from './Components/card';

// ********************************************************************************************** //
// **************************** generate card element to display trip *************************** //
// ********************************************************************************************** //
const generateCard = (data) => {
  const fragment = document.createDocumentFragment();
  const card = document.createElement('div');
  const parentEl = document.getElementById('entryHolder');
  // check if trip is already expired with grace period + 1 day in ms
  let position = null;
  if (data.endDate + 86400000 >= Date.now()) {
    card.classList = 'card panel';
    position = parentEl.firstChild;
  } else {
    card.classList = 'card panel expired-trip';
  }
  card.innerHTML = cardComponent(data);
  fragment.appendChild(card);
  parentEl.insertBefore(fragment, position);
};

export default generateCard;
