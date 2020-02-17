import { CONFIG } from './config';

export class Ui {
  constructor(router) {
    this.router = router;
    this.errorPage = document.querySelector(CONFIG.errorPage);
    this.allContent = document.querySelector(CONFIG.allContent);
    this.news = document.querySelector(CONFIG.news);
    this.singleNews = document.querySelector(CONFIG.singleNews);
    this.articleName = document.querySelector(CONFIG.articleName);
    this.articleBack = document.querySelector(CONFIG.articleBack);
    this.articleContent = document.querySelector(CONFIG.articleContent);
    this.articleContentImg = document.querySelector(CONFIG.articleContentImg);
  }

  hideNews() {
    this.news.classList.add(CONFIG.dNone);
    this.singleNews.classList.add(CONFIG.dNone);
  }

  generateArticles(data) {
    // hide all first
    this.hideNews();

    const templateScript = document.querySelector('#products-template').innerHTML;

    // compile with handlebar
    // eslint-disable-next-line no-undef
    const template = Handlebars.compile(templateScript);
    this.news.innerHTML = template(data);

    this.news.addEventListener('click', (event) => {
      event.preventDefault();
      if (event.target.classList.contains('btn-more')) {
        this.articleId = event.target.dataset.more;
        window.history.pushState(null, null, `/article/${this.articleId}`);
        this.router.render(decodeURI(window.location.pathname));
      }
    });
  }

  renderNewsline() {
    this.news.classList.remove(CONFIG.dNone);
    this.singleNews.classList.add(CONFIG.dNone);
  }

  renderArticle(data) {
    if (data.length) {
      const articleId = window.location.pathname.split('/article/')[1].trim();
      this.news.classList.add(CONFIG.dNone);
      const article = [...data].find((item) => String(item.id) === String(articleId));
      const isFind = !(Object.entries(article).length === 0 && article.constructor === Object);
      // eslint-disable-next-line no-unused-expressions
      isFind ? this.renderArticleHtml(article) : this.render404();
    }
  }

  renderArticleHtml(article) {
    this.articleName.innerText = article.name;
    // form img tag
    this.articleContentImg.src = article.content.img.url;
    this.articleContentImg.alt = article.content.img.name;
    // form article content
    this.articleContent.innerText = article.content.data;
    this.articleContent.prepend(this.articleContentImg);
    // go UP & show
    window.scrollTo(0, 0);
    this.singleNews.classList.remove(CONFIG.dNone);
  }

  render404() {
    window.history.pushState(null, null, '/404');
    this.router.render(decodeURI(window.location.pathname));
  }

  renderErrorPage() {
    this.allContent.classList.add(CONFIG.dNone);
    this.errorPage.classList.remove(CONFIG.dNone);
  }

  initArticle() {
    this.articleBack.addEventListener('click', (event) => {
      event.preventDefault();
      window.history.pushState(null, null, '/');
      this.router.render(decodeURI(window.location.pathname));
    });
  }
}
