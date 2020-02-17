export class Router {
  constructor() {
    this.routes = {};

    window.addEventListener('popstate', () => {
      console.log('popstate');
      this.render(decodeURI(window.location.pathname));
    });
  }

  addRoute(route, action) {
    this.routes[route] = action;
  }

  render(url) {
    const temp = url.split('/')[1];
    // eslint-disable-next-line no-unused-expressions
    this.routes[temp] ? this.routes[temp]() : this.routes['404']();
  }
}
