const API = 'http://localhost:3006';

const db = {
  products: [],
  createNewProducts(newDB) {
    db.products = [...newDB];
  },

};

const ui = {
  btnNewProduct: document.getElementById('new-product'),
  btnLoadFromServer: document.getElementById('load-from-server'),
  infoPlace: document.getElementById('info-place'),
  newProductMenu: document.querySelector('.ui-new-product'),
  iconLoad: document.querySelector('.icon-spin5'),
  outputProduct: document.querySelector('.output'),
  renderProductToHTML(product) {
    const div = document.createElement('div');
    div.className = 'product';
    const id = product.id;
    div.innerHTML = `
    <p class="product-name" id="product${id}-name">${product.name}</p>
    <hr/>
    <p id="product${id}-description">${product.description}</p>
    <hr>
    <span>Price: </span><span id="product${id}-price">${product.price}</span><span> units</span>
    <hr>
    <button class="edit-btn" id="product${id}-edit-btn">Edit</button>
    <button class="del-btn" id="product${id}-del-btn">Delete</button>
    `;
    ui.outputProduct.append(div);
  },
  // eslint-disable-next-line consistent-return
  renderProduct() {
    if (!this.newRequest.getResponse.done) return false;
    ui.outputProduct.innerText = '';
    db.createNewProducts(this.newRequest.getResponse.data);
    db.products.forEach((eachPrd) => ui.renderProductToHTML(eachPrd));

  },


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
  // eslint-disable-next-line max-len
  messages.show(this.newRequest.getResponse.message || messages.load.onloadNoResponse, 3000);
}

const eventOnloadFromServer = new EventObserver();
eventOnloadFromServer.subscribe(onloadDataFromServer);
eventOnloadFromServer.subscribe(ui.renderProduct);

function loadDataFromServer() {
  ui.iconLoad.classList.add('animate-spin');
  messages.show(messages.load.start, 0);
  this.newRequest = new Rest();
  this.newRequest.get(API, eventOnloadFromServer.broadcast);
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
