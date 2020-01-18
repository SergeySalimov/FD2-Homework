const API = 'http://localhost:3006';

const ui = {
  btnNewProduct: document.getElementById('new-product'),
  btnLoadFromServer: document.getElementById('load-from-server'),
  infoPlace: document.getElementById('info-place'),
  newProductMenu: document.querySelector('.ui-new-product'),
  iconLoad: document.querySelector('.icon-spin5'),


};

const messages = {
  load: {
    start: 'Start load from server',
    onloadNoResponse: 'No response from server',
  },
  new: {
    enter: 'Enter new product',
  },
  show(msg, delay = 5000) {
    ui.infoPlace.innerText = msg;
    if (delay > 0) setTimeout(() => ui.infoPlace.innerText = '', delay);
  },
};

function onloadDataFromServer() {
  ui.iconLoad.classList.remove('animate-spin');
  const response = this.newRequest.getResponse;
  messages.show(response.message || messages.load.onloadNoResponse, 3000);
  return response;
}

function loadDataFromServer() {
  ui.iconLoad.classList.add('animate-spin');
  messages.show(messages.load.start, 0);
  this.newRequest = new Rest();
  this.newRequest.get(API, onloadDataFromServer);
}

function eventListener() {
  ui.btnNewProduct.addEventListener('click', (event) => {
    event.preventDefault();
    ui.newProductMenu.classList.remove('hide');
    messages.show(messages.new.enter, 0);
  });
  ui.btnLoadFromServer.addEventListener('click', (event) => {
    event.preventDefault();
    loadDataFromServer();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  eventListener();
});
