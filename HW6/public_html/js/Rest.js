function Rest() {
  this.xhr = new XMLHttpRequest();
}

Rest.prototype.get = function (url, fnOnLoad = () => this.getResponse, whatToGet = '/product') {
  console.log((url + whatToGet));
  this.xhr.open('GET', url + whatToGet);
  this.xhr.send();

  this.xhr.responseType = 'json';

  this.xhr.onload = () => {
    this.getResponse = {
      data: this.xhr.response,
      status: this.xhr.status,
    };
    if (this.xhr.status === 200) {
      this.getResponse = {
        done: true,
        message: 'Data loaded from server',
        ...this.getResponse,
      };
    } else {
      this.getResponse = {
        done: false,
        message: 'Something is going wrong',
        ...this.getResponse,
      };
    }
    fnOnLoad();
  };
};
