// ********************************************************************************************** //
// ***************** return name of the icon based on api weather code provided ***************** //
// ********************************************************************************************** //
const weatherIcon = (code) => {
  let icon = '';
  switch (true) {
    case code < 300:
      icon = 'thunder';
      break;
    case code < 400:
      icon = 'drizzle';
      break;
    case code < 600:
      icon = 'rain';
      break;
    case code < 700:
      icon = 'snow';
      break;
    case code < 800:
      icon = 'fog';
      break;
    case code === 800:
      icon = 'clear';
      break;
    case code <= 900:
      icon = 'clouds';
      break;
    default:
      icon = 'unknown';
  }
  return icon;
};
export default weatherIcon;
