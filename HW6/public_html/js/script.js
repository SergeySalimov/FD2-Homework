'use strict';

const API = 'http://localhost:3006';

const db = {
  products: [],
  createNewProducts(data) {
    db.products = [...data];
  },
  addNewProduct(newProduct) {
    db.products.push(newProduct);
  },
  // eslint-disable-next-line consistent-return
  editProductInDB(editedProduct) {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of db.products) {
      if (item.id === editedProduct.id) {
        item.name = editedProduct.name;
        item.description = editedProduct.description;
        item.price = editedProduct.price;
        return true;
      }
    }
  },
  deleteProductInDB(deletedId) {
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
    ui.formSubmitNewProduct[2].value = Number(prd.price);
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
  idBtn: undefined,
  editProduct(id) {
    ui.flagOfEditingProduct = true;
    ui.openForm();
    ui.putDataOfEditingProductToForm(id);
  },
};

const msgs = {
  delete: {
    on: 'Deleting product',
    success: 'Data was successfuly delete',
    error: 'Something is going wrong. Error 404',
  },
  put: {
    start: 'Editing product',
    putOnServer: 'Save changes to server',
    success: 'Data was successfuly edited',
    error: 'Something is going wrong. Error 404',
  },
  post: {
    start: 'Start save data to server',
    success: 'Data was successfuly save',
    error: 'Something is going wrong. Error 404',
  },
  get: {
    start: 'Start load from server',
    success: 'Data loaded from server',
    error: 'Something is going wrong. Error 404',
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
function checkStatusReturnAnswer(val, method) {
  // eslint-disable-next-line max-len
  if (method !== 'get' && method !== 'post' && method !== 'put' && method !== 'delete') return msgs.error.errorMethod;
  if (val === 200 || val === 201) {
    // eslint-disable-next-line default-case
    switch (method) {
      case 'get':
        return msgs.get.success;
      case 'post':
        return msgs.post.success;
      case 'put':
        return msgs.put.success;
      case 'delete':
        return msgs.delete.success;
    }
  } else if (val === 404) {
    // eslint-disable-next-line default-case
    switch (method) {
      case 'get':
        return msgs.get.error;
      case 'post':
        return msgs.post.error;
      case 'put':
        return msgs.put.error;
      case 'delete':
        return msgs.delete.error;
    }
  }
}

function onResponse(restResp, method) {
  ui.iconLoad.classList.remove('animate-spin');
  msgs.show(checkStatusReturnAnswer(restResp.xhr.status, method));
  // eslint-disable-next-line default-case
  switch (method) {
    case 'get':
      db.createNewProducts(restResp.xhr.response);
      break;
    case 'post':
      db.addNewProduct(JSON.parse(restResp.xhr.response));
      break;
    case 'put':
      db.editProductInDB(JSON.parse(restResp.xhr.response));
      ui.goBack();
      break;
    case 'delete':
      db.deleteProductInDB(ui.idBtn);
      break;
  }
  ui.renderProducts();
  return true;
}

// eslint-disable-next-line consistent-return
function startWorkWithServer(method, data) {
  ui.iconLoad.classList.add('animate-spin');
  // eslint-disable-next-line no-undef
  const newRequest = new Rest();

  switch (method) {
    case 'get':
      msgs.show(msgs.get.start, 0);
      newRequest.get(API, onResponse);
      break;
    case 'post':
      msgs.show(msgs.post.start, 0);
      newRequest.post(data, API, onResponse);
      break;
    case 'put':
      newRequest.put(ui.idBtn, data, API, onResponse);
      break;
    case 'delete':
      msgs.show(msgs.delete.on, 9000);
      newRequest.delete(ui.idBtn, API, onResponse);
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
    ui.idBtn = Number(event.target.dataset.id);
    if (event.target.classList.contains('edit-btn')) {
      msgs.show(msgs.put.start, 0);
      ui.editProduct(ui.idBtn);
    } else if (event.target.classList.contains('del-btn')) {
      startWorkWithServer('delete');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  eventListener();
});
