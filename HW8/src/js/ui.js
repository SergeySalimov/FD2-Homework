export class Ui {
  constructor() {
    console.log(1);
  }

  generateArticles(data) {
    console.log(data);
    const news = document.querySelector('.news');
    const templateScript = document.querySelector('#products-template').innerHTML;

    // compile with handlebar
    // eslint-disable-next-line no-undef
    const template = Handlebars.compile(templateScript);
    news.innerHTML = template(data);

    news.addEventListener('click', (event) => {
      event.preventDefault();
      if (event.target.classList.contains('btn-more')) {
        const articleId = event.target.dataset.more;
        window.history.pushState(null, null, `/article/${articleId}`);
      }
    });
  }
}
