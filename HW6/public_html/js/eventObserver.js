function EventObserver() {
  this.observers = [];

  this.subscribe = (fn) => {
    this.observers.push(fn);
  };

  this.broadcast = () => {
    this.observers.forEach((item) => {
      item();
    });
  };
}
