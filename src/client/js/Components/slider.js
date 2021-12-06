import weatherIcon from '../weatherIcon';
import { dateToString } from '../date';

//Slider to display weather forecast
const slider = ({ weatherData }) => {
  const index = 0;
  return weatherData.data
    .map((el, elIndex) => {
      let position = 'nextSlide';
      if (elIndex === index + 1) {
        position = 'activeSlide';
      } else if (elIndex === index) {
        position = 'activeLastSlide';
      } else if (elIndex === index + 2) {
        position = 'activeNextSlide';
      } else if (elIndex === weatherData.data.length - 1) {
        position = 'lastSlide';
      }
      const icon = weatherIcon(el.weather.code);
      const date = dateToString(el.ts * 1000);

      return `
      <div class='${position} weather-item' data-key=${elIndex}>
        <span class='weather-date'>${date}</span>
        <img src='./images/${icon}.svg' alt="${icon}" class='slider_img' /img>
        <p class='weather-description'>${el.weather.description}</p>
        <div>${Math.round(el.high_temp)}°/${Math.round(el.low_temp)}°<br />${
        el.rh
      }%</div>
      </div>
      `;
    })
    .join('');
};

export default slider;
