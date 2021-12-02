import cardComponent from './Components/card';

// ********************************************************************************************** //
// **************************** generate card element to display trip *************************** //
// ********************************************************************************************** //
const generateCard = (data) => {
  const fragment = document.createDocumentFragment();
  const card = document.createElement('div');
  card.classList = 'card panel';
  card.innerHTML = cardComponent(data);
  fragment.appendChild(card);
  document.getElementById('entryHolder').appendChild(fragment);
};

export default generateCard;
