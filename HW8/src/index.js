import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.scss';
import { CONFIG } from './js/config';
import { Ui } from './js/ui';
import { Router } from './js/router';

class App {
  constructor() {
    this.articles = [];
    this.router = new Router();
    this.ui = new Ui(this.router);
    this.ui = new Ui(this.router);
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
        this.initRouter();
        this.ui.generateArticles(data);
        this.router.render(decodeURI(window.location.pathname));
        this.ui.initArticle();
      });
  }

  initRouter() {
    this.router.addRoute('', this.ui.renderNewsline.bind(this.ui));
    this.router.addRoute('404', this.ui.renderErrorPage.bind(this.ui));
    this.router.addRoute('article', this.ui.renderArticle.bind(this.ui, this.articles));
  }
}

// eslint-disable-next-line no-unused-vars
const app = new App();
