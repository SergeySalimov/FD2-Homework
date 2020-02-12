import './css/style.scss';
import { UI } from './js/UI';
import { Rest } from './js/Rest';

function eventListener() {
  UI.btnLoad.addEventListener('click', (event) => {
    event.preventDefault();
    if (UI.restNotWorking) {
      UI.restNotWorking = false;
      const rest = new Rest(UI.latitude.value, UI.longitude.value);
    }
  });
  UI.btnClear.addEventListener('click', (event) => {
    event.preventDefault();
    UI.clearUI();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  eventListener();
});
