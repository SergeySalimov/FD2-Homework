import { CONFIG } from './config';
import { UI } from './UI';

export class Rest {
  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
    CONFIG.restNotWorking = false;
    UI.spinner.classList.add('animate-spin');
    this.getWheather();
  }

  // eslint-disable-next-line class-methods-use-this
  getWheather() {
    const url = CONFIG.corsProxy + CONFIG.api + CONFIG.secretKey + this.latitude + ','
        + this.longitude + '?' + CONFIG.units + '&' + CONFIG.language;
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
