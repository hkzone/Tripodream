import app from './js/app';
import { handleSubmit } from './js/formHandler';
import { init } from './js/userData';

import './styles/main.scss';

//Call app function on DOMContentLoaded event
window.addEventListener('DOMContentLoaded', () => {
  init();
  app();
});

export { app, handleSubmit };
