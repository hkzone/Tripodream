const processSlider = (e, dir) => {
  e = e || window.event;
  e = e.target.parentElement || e.srcElement.parentElement;

  let currentItem;
  const list = e.getElementsByClassName('weather-item');
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].classList.contains('activeSlide')) {
      currentItem = i;
    }
  }
  list[currentItem].classList.remove('activeSlide');

  const nextItem = currentItem < list.length - 1 ? currentItem + 1 : 0;
  const nextNextItem = nextItem < list.length - 1 ? nextItem + 1 : 0;
  const prevItem = currentItem > 0 ? currentItem - 1 : list.length - 1;
  const prevPrevItem = prevItem > 0 ? prevItem - 1 : list.length - 1;
  const prevPrevPrevItem =
    prevPrevItem > 0 ? prevPrevItem - 1 : list.length - 1;

  if (dir === '-') {
    list[nextItem].classList.remove('activeNextSlide');
    list[nextItem].classList.add('nextSlide');

    list[currentItem].classList.add('activeNextSlide');

    list[prevItem].classList.remove('activeLastSlide');
    list[prevItem].classList.add('activeSlide');

    list[prevPrevItem].classList.remove('lastSlide');
    list[prevPrevItem].classList.add('activeLastSlide');

    list[prevPrevPrevItem].classList.add('lastSlide');
    list[prevPrevPrevItem].classList.remove('nextSlide');
  } else {
    list[currentItem].classList.add('activeLastSlide');

    list[nextItem].classList.remove('activeNextSlide');
    list[nextItem].classList.add('activeSlide');

    list[nextNextItem].classList.add('activeNextSlide');
    list[nextNextItem].classList.remove('nextSlide');

    list[prevItem].classList.remove('activeLastSlide');
    list[prevItem].classList.add('lastSlide');

    list[prevPrevItem].classList.remove('lastSlide');
    list[prevPrevItem].classList.add('nextSlide');
  }
};

export default processSlider;
