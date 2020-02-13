import './js/assets';
import { CONFIG } from './js/config';
import { Ui } from './js/ui';

class App {
  constructor() {
    this.articles = [];
    this.ui = new Ui();
    this.init();
  }

  init() {
    fetch(`${CONFIG.api}/articles`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.articles = data;
        this.ui.generateArticles(data);
      });
  }
}

// eslint-disable-next-line no-unused-vars
const app = new App();
