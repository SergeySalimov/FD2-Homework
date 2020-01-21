function Rest() {
  this.xhr = new XMLHttpRequest();
}

Rest.prototype.get = function (url, fnOnLoad = () => this.restResponse, whatToGet = '/product') {
  this.xhr.open('GET', url + whatToGet);
  this.xhr.send();

  this.xhr.responseType = 'json';

  this.xhr.onload = () => {
    this.restResponse = {
      data: this.xhr.response,
      status: this.xhr.status,
    };
    if (this.xhr.status === 200) {
      this.restResponse = {
        done: true,
        message: 'Data loaded from server',
        ...this.restResponse,
      };
    } else {
      this.restResponse = {
        done: false,
        message: `Something is going wrong. Status ${this.xhr.status}`,
        ...this.restResponse,
      };
    }
    fnOnLoad();
  };
};

Rest.prototype.post = function (data, url, fnOnLoad, whatToPost = '/product') {
  this.xhr.open('POST', url + whatToPost);
  this.xhr.setRequestHeader('Content-Type', 'application/json');
  this.xhr.send(JSON.stringify(data));

  this.xhr.onload = () => {
    if (this.xhr.status === 201) {
      this.restResponse = {
        status: this.xhr.status,
        done: true,
        message: 'Data was successfuly save',
        data,
      };
    } else {
      this.restResponse = {
        status: this.xhr.status,
        done: false,
        message: `Something is going wrong. Status ${this.xhr.status}`,
        data,
      };
    }
    fnOnLoad();
  };
};

Rest.prototype.put = function (id, data, url, fnOnLoad, whatToPut = '/product') {
  this.xhr.open('PUT', `${url + whatToPut}/${id}`);
  this.xhr.setRequestHeader('Content-Type', 'application/json');
  this.xhr.send(JSON.stringify(data));

  this.xhr.onload = () => {
    if (this.xhr.status === 200) {
      this.restResponse = {
        status: this.xhr.status,
        done: true,
        message: 'Data was successfuly save',
        data,
      };
    } else {
      this.restResponse = {
        status: this.xhr.status,
        done: false,
        message: `Something is going wrong. Status ${this.xhr.status}`,
        data,
      };
    }
    fnOnLoad();
  };
};

Rest.prototype.delete = function (id, url, fnOnLoad, whatToDelete = '/product') {
  this.xhr.open('DELETE', `${url + whatToDelete}/${id}`);
  this.xhr.send();

  this.xhr.onload = () => {
    if (this.xhr.status === 200) {
      this.restResponse = {
        status: this.xhr.status,
        done: true,
        message: 'Data was successfuly delete',
      };
    } else {
      this.restResponse = {
        status: this.xhr.status,
        done: false,
        message: `Something is going wrong. Status ${this.xhr.status}`,
      };
    }
    fnOnLoad();
  };
};
