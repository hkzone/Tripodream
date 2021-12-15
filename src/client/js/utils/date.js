// ********************************************************************************************** //
// **************** function that returns how many days left until date provided **************** //
// ********************************************************************************************** //
const daysUntil = (date) =>
  Math.ceil((new Date(date) - Date.now()) / (3600 * 1000 * 24));

// ********************************************************************************************** //
// **************** function that converts date to string with different options **************** //
// ********************************************************************************************** //

const dateToString = (
  date,
  showYear = false,
  showTime = false,
  showWeekDay = false
) => {
  let options = {
    month: 'short',
    day: 'numeric',
  };
  if (showYear) options = { ...options, year: 'numeric' };
  if (showWeekDay) options = { ...options, weekday: 'short' };
  if (showTime) {
    const regex = /(.*T)+(([01]?[0-9]|2[0-3]):[0-5][0-9])/;
    const found = date.match(regex)[0];
    options = { ...options, hour: 'numeric', minute: 'numeric' };
    return new Date(found).toLocaleDateString('en-GB', options);
  }

  return new Date(date).toLocaleDateString('en-GB', options);
};

// ********************************************************************************************** //
// **************** function that returns hh:mm difference between 2 time objects *************** //
// ********************************************************************************************** //
const timeDiff = (date1, date2) => {
  const start = new Date(date1);
  const end = new Date(date2);

  let dateDiff = end - start;
  const hh = Math.floor(dateDiff / 1000 / 60 / 60);
  dateDiff -= hh * 1000 * 60 * 60;
  const mm = Math.floor(dateDiff / 1000 / 60);

  return `
    ${hh}h, ${mm}min`;
};

// ********************************************************************************************** //
// ********************** function that returns hh:mm of the time provided ********************** //
// ********************************************************************************************** //
const getHoursMinutes = (date) => {
  const regex = /(?:T)+(([01]?[0-9]|2[0-3]):[0-5][0-9])/;
  const found = date.match(regex)[1];
  return `
    ${found}`;
};

export { dateToString, daysUntil, getHoursMinutes, timeDiff };
