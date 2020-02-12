function CustomTimer(renderEl, time = 30, fn) {
  let timeToCount = parseInt(time, 10);
  let pauseFlag = false;
  let intervalId = null;
  const el = renderEl;

  this.start = function () {
    intervalId = setInterval(() => {
      if (timeToCount === 0) {
        clearInterval(intervalId);
        if (fn) {
          fn();
          return false;
        }
      }
      el.innerText = timeToCount;
      timeToCount -= 1;
    }, 1000);
  };

  this.pause = function () {
    if (!pauseFlag) {
      clearInterval(intervalId);
      pauseFlag = true;
      return timeToCount;
    }
    this.start();
    pauseFlag = false;
    return true;
  };
}
