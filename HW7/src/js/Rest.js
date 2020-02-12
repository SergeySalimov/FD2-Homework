import { CONFIG } from './config';
import { UI } from './UI';

export class Rest {
  constructor(latitude = 53.666664, longitude = 23.83333) {
    this.latitude = latitude;
    this.longitude = longitude;
    UI.spinner.classList.add('animate-spin');
    this.getWheather();
  }

  // eslint-disable-next-line class-methods-use-this
  getWheather() {
    const url = CONFIG.getUrl(this.latitude, this.longitude);
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        UI.spinner.classList.remove('animate-spin');
        UI.renderUI(data);
        console.log(data);
        CONFIG.restNotWorking = true;
      });
  }
}
