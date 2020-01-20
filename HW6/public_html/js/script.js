const API = 'http://localhost:3006';

const db = {
  products: [],
  createNewProducts() {
    db.products = [...this.newRequest.restResponse.data];
  },
  addNewProduct() {
    db.products.push(this.newRequest.restResponse.data);
  },

};

const ui = {
  btnNewProduct: document.getElementById('new-product'),
  btnLoadFromServer: document.getElementById('load-from-server'),
  infoPlace: document.getElementById('info-place'),
  newProductMenu: document.querySelector('.ui-new-product'),
  iconLoad: document.querySelector('.icon-spin5'),
  outputProduct: document.querySelector('.output'),
  btnSubmitNewProduct: document.getElementById('product-submit'),
  formSubmitNewProduct: document.getElementById('form-product-submit'),
  btnHideNewProduct: document.getElementById('btn-hide-new-product'),
  renderProductToHTML(product) {
    const div = document.createElement('div');
    div.className = 'product';
    const {id} = product;
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
  renderProducts() {
    if (!this.newRequest.restResponse.done) return false;
    ui.outputProduct.innerText = '';

    db.products.forEach((eachPrd) => ui.renderProductToHTML(eachPrd));
  },
  getNewProductFromForm: () => ({
    name: ui.formSubmitNewProduct[0].value,
    description: ui.formSubmitNewProduct[1].value,
    price: ui.formSubmitNewProduct[2].value,
  }),


};

const msgs = {
  save: {
    start: 'Start save data to server',
  },
  load: {
    start: 'Start load from server',
  },
  error: {
    onloadNoResponse: 'No response from server',
  },
  new: {
    enter: 'Enter new product',
    hide: 'Form closed',
  },
  msgTimeout: undefined,
  show(msg, delay = 5000) {
    if (msgs.msgTimeout) {
      clearTimeout(msgs.msgTimeout);
      msgs.msgTimeout = undefined;
    }
    ui.infoPlace.innerText = msg;
    if (delay > 0) {
      // eslint-disable-next-line no-return-assign
      msgs.msgTimeout = setTimeout(() => ui.infoPlace.innerText = '', delay);
    }
  },
};

function onEndRestWorking() {
  ui.iconLoad.classList.remove('animate-spin');
  msgs.show(this.newRequest.restResponse.message || msgs.error.onloadNoResponse, 3000);
}

const eventOnloadFromServer = new EventObserver();
eventOnloadFromServer.subscribe(onEndRestWorking);
eventOnloadFromServer.subscribe(db.createNewProducts);
eventOnloadFromServer.subscribe(ui.renderProducts);
const eventOnSaveToServer = new EventObserver();
eventOnSaveToServer.subscribe(onEndRestWorking);
eventOnSaveToServer.subscribe(db.addNewProduct);
eventOnSaveToServer.subscribe(ui.renderProducts);

function loadDataFromServer() {
  ui.iconLoad.classList.add('animate-spin');
  msgs.show(msgs.load.start, 0);
  this.newRequest = new Rest();
  this.newRequest.get(API, eventOnloadFromServer.broadcast);
}

function saveDataToServer(data) {
  ui.iconLoad.classList.add('animate-spin');
  msgs.show(msgs.save.start, 0);
  this.newRequest = new Rest();
  this.newRequest.post(data, API, eventOnSaveToServer.broadcast);
}

function eventListener() {
  ui.btnNewProduct.addEventListener('click', (event) => {
    event.preventDefault();
    ui.newProductMenu.classList.remove('hide');
    msgs.show(msgs.new.enter, 0);
  });
  ui.formSubmitNewProduct.addEventListener('submit', (event) => {
    event.preventDefault();
    const newProduct = ui.getNewProductFromForm();
    ui.formSubmitNewProduct.reset();
    saveDataToServer(newProduct);
  });
  ui.btnHideNewProduct.addEventListener('click', (event) => {
    event.preventDefault();
    ui.newProductMenu.classList.add('hide');
    msgs.show(msgs.new.hide, 3000);
  });
  ui.btnLoadFromServer.addEventListener('click', (event) => {
    event.preventDefault();
    loadDataFromServer();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  eventListener();
});
