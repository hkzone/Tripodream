//Function to create li element and delete button

import listItemFlight from './_listItemFlight';
import pdfListItemFlight from './_pdfListItemFlight';

const listItem = (data, customClass, isPDF = false) => {
  let value = data;
  if (customClass === 'flight_item' && !isPDF) {
    value = listItemFlight(data);
  } else if (customClass === 'flight_item') {
    value = pdfListItemFlight(data, customClass);
  } else
    value = `
    <span class=${customClass} hidden>
      ${JSON.stringify({ data: value })}
    </span>
    <span>${value}</span>
    <span class="button_small">
  &times;
</span>`;
  return value;
};

export default listItem;
