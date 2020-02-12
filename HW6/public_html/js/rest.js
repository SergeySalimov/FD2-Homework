function Rest() {
  this.xhr = new XMLHttpRequest();
}

Rest.prototype.get = function (url, fnOnLoad, route = '/product') {
  this.xhr.open('GET', url + route);
  this.xhr.send();

  this.xhr.responseType = 'json';

  this.xhr.onload = () => {
    fnOnLoad(this, 'get');
  };
};

Rest.prototype.post = function (data, url, fnOnLoad, route = '/product') {
  this.xhr.open('POST', url + route);
  this.xhr.setRequestHeader('Content-Type', 'application/json');
  this.xhr.send(JSON.stringify(data));

  this.xhr.onload = () => {
    fnOnLoad(this, 'post');
  };
};

Rest.prototype.put = function (id, data, url, fnOnLoad, route = '/product') {
  this.xhr.open('PUT', `${url + route}/${id}`);
  this.xhr.setRequestHeader('Content-Type', 'application/json');
  this.xhr.send(JSON.stringify(data));

  this.xhr.onload = () => {
    fnOnLoad(this, 'put');
  };
};

Rest.prototype.delete = function (id, url, fnOnLoad, route = '/product') {
  this.xhr.open('DELETE', `${url + route}/${id}`);
  this.xhr.send();

  this.xhr.onload = () => {
    fnOnLoad(this, 'delete');
  };
};
