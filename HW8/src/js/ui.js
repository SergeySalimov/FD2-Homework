import { CONFIG } from './config';

export class Ui {
  constructor(router) {
    this.router = router;
    this.errorPage = document.querySelector(CONFIG.errorPage);
    this.allContent = document.querySelector(CONFIG.allContent);
    this.about = document.querySelector(CONFIG.about);
    this.searchPage = document.querySelector(CONFIG.searchPage);
    this.searchPageResults = document.querySelector(CONFIG.searchPageResults);
    this.aboutBack = document.querySelector(CONFIG.aboutBack);
    this.navNewsline = document.querySelector(CONFIG.navNewsline);
    this.navAbout = document.querySelector(CONFIG.navAbout);
    this.navSearch = document.querySelector(CONFIG.navSearch);
    this.searchInput = document.querySelector(CONFIG.searchInput);
    this.news = document.querySelector(CONFIG.news);
    this.singleNews = document.querySelector(CONFIG.singleNews);
    this.articleName = document.querySelector(CONFIG.articleName);
    this.articleBack = document.querySelector(CONFIG.articleBack);
    this.articleContent = document.querySelector(CONFIG.articleContent);
    this.articleContentImg = document.querySelector(CONFIG.articleContentImg);
    this.templateScript = document.querySelector('#products-template');
  }

  hideAll() {
    this.searchInput.value = '';
    this.news.classList.add(CONFIG.dNone);
    this.singleNews.classList.add(CONFIG.dNone);
    this.about.classList.add(CONFIG.dNone);
    this.searchPage.classList.add(CONFIG.dNone);
  }

  handlebarCompile(data) {
    // eslint-disable-next-line no-undef
    return Handlebars.compile(this.templateScript.innerHTML)(data);
  }

  generateArticles(data) {
    // hide all first
    this.hideAll();
    // compile with handlebar
    this.news.innerHTML = this.handlebarCompile(data);

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
    this.allContent.classList.remove(CONFIG.dNone);
    this.hideAll();
    this.news.classList.remove(CONFIG.dNone);
  }

  renderAboutPage() {
    this.hideAll();
    this.about.classList.remove(CONFIG.dNone);
  }

  renderArticle(data) {
    if (data.length) {
      const articleId = window.location.pathname.split('/article/')[1].trim();
      this.news.classList.add(CONFIG.dNone);
      const article = [...data].find((item) => String(item.id) === String(articleId));
      const isFind = !(article === undefined);
      // const isFind = !(Object.entries(article).length === 0 && article.constructor === Object);
      // eslint-disable-next-line no-unused-expressions
      isFind ? this.renderArticleHtml(article) : this.render404();
    }
  }

  renderArticleHtml(article) {
    this.articleName.innerText = article.name;
    // form img tag
    this.articleContentImg.setAttribute('src', article.content.img.url);
    this.articleContentImg.setAttribute('alt', article.content.img.name);
    // form article content
    this.articleContent.innerText = article.content.data;
    this.articleContent.prepend(this.articleContentImg);
    // go UP & show
    window.scrollTo(0, 0);
    this.hideAll();
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

  renderSearchPage(articles) {
    const articlesCopy = articles;
    this.searchPageResults.innerHTML = '';
    this.hideAll();
    const searchValue = decodeURI(window.location.pathname.split('/search/')[1].trim());
    this.searchResult = articlesCopy.filter((item) => item.name.includes(searchValue));
    // render with handlebar
    if (this.searchResult.length !== undefined && this.searchResult.length !== 0) {
      this.searchPageResults.innerHTML = this.handlebarCompile(this.searchResult);
    } else {
      const p = document.createElement('p');
      p.innerHTML = CONFIG.searchNoResult;
      this.searchPageResults.append(p);
    }

    this.searchPage.children[0].children[0].innerText = searchValue;
    this.searchInput.value = searchValue;
    this.searchPage.classList.remove(CONFIG.dNone);
  }

  initBack() {
    this.articleBack.addEventListener('click', this.backToMain.bind(this));
    this.aboutBack.addEventListener('click', this.backToMain.bind(this));
  }

  backToMain(event) {
    event.preventDefault();
    window.history.pushState(null, null, '/');
    this.router.render(decodeURI(window.location.pathname));
  }

  initNavBtn() {
    this.navAbout.addEventListener('click', (event) => {
      event.preventDefault();
      window.history.pushState(null, null, '/about');
      this.router.render(decodeURI(window.location.pathname));
    });
    this.navNewsline.addEventListener('click', this.backToMain.bind(this));
    this.navSearch.addEventListener('submit', (event) => {
      event.preventDefault();
      window.history.pushState(null, null, `/search/${this.searchInput.value}`);
      this.router.render(decodeURI(window.location.pathname));
    });
  }
}
