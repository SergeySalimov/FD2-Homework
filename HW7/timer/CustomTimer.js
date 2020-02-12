function CustomTimer(renderEl, time = 30) {
  let timeToCount = parseInt(time, 10);
  let intervalId = null;
  const el = renderEl;

  this.startPromise = () => new Promise((resolve) => {
    intervalId = setInterval(() => {
      if (timeToCount === 0) {
        resolve();
        clearInterval(intervalId);
      }
      el.innerText = timeToCount;
      timeToCount -= 1;
    }, 1000);
  });
}
