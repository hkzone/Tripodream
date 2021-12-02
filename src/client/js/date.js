// ********************************************************************************************** //
// **************** function that returns how many days left until date provided **************** //
// ********************************************************************************************** //
const daysUntil = (date) =>
  Math.ceil((new Date(date) - Date.now()) / (3600 * 1000 * 24));

// ********************************************************************************************** //
// **************** function that converts date to string with different options **************** //
// ********************************************************************************************** //
const dateToString = (date, showYear = false, showTime = false) => {
  let options = {
    month: 'short',
    day: 'numeric',
  };
  if (showYear) options = { ...options, year: 'numeric' };
  if (showTime) options = { ...options, hour: 'numeric', minute: 'numeric' };

  return new Date(date).toLocaleDateString('en-GB', options);
};

// ********************************************************************************************** //
// **************** function that returns hh:mm difference between 2 time objects *************** //
// ********************************************************************************************** //
const timeDiff = (date1, date2) => {
  const start = new Date(date1).getTime();
  const end = new Date(date2).getTime();

  const dateDiff = end - start;

  return `
    ${dateDiff.getHours()}H,${dateDiff.getMinutes()}M`;
};

// ********************************************************************************************** //
// ********************** function that returns hh:mm of the time provided ********************** //
// ********************************************************************************************** //
const getHoursMinutes = (date) => `
    ${new Date(date).getHours()}:${new Date(date).getMinutes()}`;

export { dateToString, daysUntil, getHoursMinutes, timeDiff };
