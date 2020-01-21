const API = 'http://localhost:3006';

const db = {
  products: [],
  createNewProducts() {
    db.products = [...this.newRequest.restResponse.data];
  },
  createUniqueId() {
    const lastId = db.products[db.products.length - 1].id;
    return +lastId + 1;
  },
  addNewProduct() {
    const newProduct = this.newRequest.restResponse.data;
    db.products.push(newProduct);
  },
  // eslint-disable-next-line consistent-return
  editProductInDB() {
    const editedProduct = this.newRequest.restResponse.data;
    const editedId = this.idTochange;
    // ToDo find shorter way for obj1 = obj2
    // eslint-disable-next-line no-restricted-syntax
    for (const item of db.products) {
      if (item.id === editedId) {
        item.name = editedProduct.name;
        item.description = editedProduct.description;
        item.price = editedProduct.price;
        return true;
      }
    }
  },
  deleteProductInDB() {
    const deletedId = this.idTochange;
    // eslint-disable-next-line no-restricted-syntax
    for (const item of db.products) {
      if (item.id === deletedId) db.products.splice(db.products.indexOf(item), 1);
    }
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
    const { id } = product;
    div.innerHTML = `
    <p class="product-name" id="product${id}-name">${product.name}</p>
    <hr/>
    <p id="product${id}-description">${product.description}</p>
    <hr>
    <span>Price: </span><span id="product${id}-price">${product.price}</span><span> units</span>
    <hr>
    <button class="edit-btn" data-id="${id}">Edit</button>
    <button class="del-btn" data-id="${id}">Delete</button>
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
  putProductToForm: (prd) => {
    ui.formSubmitNewProduct[0].value = prd.name;
    ui.formSubmitNewProduct[1].value = prd.description;
    ui.formSubmitNewProduct[2].value = +prd.price;
  },
  hideAndClearForm() {
    ui.formSubmitNewProduct.reset();
    ui.newProductMenu.classList.add('hide');
  },
  openForm() {
    ui.formSubmitNewProduct.reset();
    ui.newProductMenu.classList.remove('hide');
  },
  positionY: undefined,
  goUP() {
    ui.positionY = window.scrollY;
    window.scrollTo(0, 0);
  },
  goBack() {
    window.scrollTo(0, ui.positionY);
    ui.positionY = undefined;
  },
  flagOfEditingProduct: false,
  // eslint-disable-next-line consistent-return
  checkForProduct(id) {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of db.products) {
      if (item.id === id) return item;
    }
  },
  putDataOfEditingProductToForm(id) {
    ui.putProductToForm(ui.checkForProduct(id));
    ui.goUP();
  },
  editProduct(id) {
    ui.flagOfEditingProduct = true;
    ui.openForm();
    ui.putDataOfEditingProductToForm(id);
  },
};

const msgs = {
  delete: {
    on: 'Deleting product',
  },
  edit: {
    start: 'Editing product',
    putOnServer: 'Save changes to server',
  },
  save: {
    start: 'Start save data to server',
  },
  load: {
    start: 'Start load from server',
  },
  error: {
    onloadNoResponse: 'No response from server',
    errorMethod: 'Unknown method',
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

// eslint-disable-next-line consistent-return
function eventSubscribe(method) {
  // eslint-disable-next-line no-undef
  this.eventObs = new EventObserver();
  const endRestWorking = () => {
    ui.iconLoad.classList.remove('animate-spin');
    msgs.show(this.newRequest.restResponse.message || msgs.error.onloadNoResponse);
  };
  this.eventObs.subscribe(endRestWorking);
  switch (method) {
    case 'get':
      this.eventObs.subscribe(db.createNewProducts);
      break;
    case 'post':
      this.eventObs.subscribe(db.addNewProduct);
      break;
    case 'put':
      this.eventObs.subscribe(db.editProductInDB);
      this.eventObs.subscribe(ui.goBack);
      break;
    case 'delete':
      this.eventObs.subscribe(db.deleteProductInDB);
      break;
    default:
      msgs.show(msgs.error.errorMethod);
      return false;
  }
  this.eventObs.subscribe(ui.renderProducts);
}

// eslint-disable-next-line consistent-return
function startWorkWithServer(method, data) {
  ui.iconLoad.classList.add('animate-spin');
  // eslint-disable-next-line no-undef
  this.newRequest = new Rest();
  eventSubscribe(method);
  const fnOn = this.eventObs.broadcast;
  switch (method) {
    case 'get':
      msgs.show(msgs.load.start, 0);
      this.newRequest.get(API, fnOn);
      break;
    case 'post':
      msgs.show(msgs.save.start, 0);
      this.newRequest.post(data, API, fnOn);
      break;
    case 'put':
      msgs.show(msgs.edit.putOnServer, 0);
      this.newRequest.put(this.idTochange, data, API, fnOn);
      break;
    case 'delete':
      msgs.show(msgs.delete.on, 9000);
      this.newRequest.delete(this.idTochange, API, fnOn);
      break;
    default:
      msgs.show(msgs.error.errorMethod);
      return false;
  }
}

function eventListener() {
  ui.btnNewProduct.addEventListener('click', (event) => {
    event.preventDefault();
    ui.openForm();
    ui.flagOfEditingProduct = false;
    msgs.show(msgs.new.enter, 0);
  });
  ui.formSubmitNewProduct.addEventListener('submit', (event) => {
    event.preventDefault();
    const newProduct = ui.getNewProductFromForm();
    ui.hideAndClearForm();
    if (!ui.flagOfEditingProduct) {
      newProduct.id = db.createUniqueId();
      startWorkWithServer('post', newProduct);
    } else {
      startWorkWithServer('put', newProduct);
    }
  });
  ui.btnHideNewProduct.addEventListener('click', (event) => {
    event.preventDefault();
    ui.hideAndClearForm();
    msgs.show(msgs.new.hide, 3000);
  });
  ui.btnLoadFromServer.addEventListener('click', (event) => {
    event.preventDefault();
    ui.hideAndClearForm();
    startWorkWithServer('get');
  });
  ui.outputProduct.addEventListener('click', (event) => {
    event.preventDefault();
    const idBtn = +event.target.dataset.id;
    if (idBtn) this.idTochange = idBtn;
    if (event.target.classList.contains('edit-btn')) {
      msgs.show(msgs.edit.start, 0);
      ui.editProduct(idBtn);
    } else if (event.target.classList.contains('del-btn')) {
      startWorkWithServer('delete');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  eventListener();
});
