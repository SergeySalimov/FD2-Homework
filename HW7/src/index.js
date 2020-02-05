import './css/style.scss';
import { UI } from './js/UI';
import { CONFIG } from './js/config';
import { Rest } from './js/Rest';

function eventListener() {
  UI.btnLoad.addEventListener('click', (event) => {
    event.preventDefault();
    if (CONFIG.restNotWorking) {
      const rest = new Rest(UI.latitude.value, UI.longitude.value);
    }
  });
  UI.btnClear.addEventListener('click', (event) => {
    event.preventDefault();
    UI.clearUI();
    CONFIG.restNotWorking = true;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  eventListener();
});
