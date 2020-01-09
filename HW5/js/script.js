const ui = {
  btnTask1: document.getElementById('hw5task1'),
  btnTask2: document.getElementById('hw5task2'),
  btnTask3: document.getElementById('hw5task3'),
  btnClear: document.getElementById('hw5clear'),
  tsk1Interface: document.getElementById('hw5task1-interface'),
  tsk2Interface: document.getElementById('hw5task2-interface'),
  tsk3Interface: document.getElementById('hw5task3-interface'),
  output: document.getElementById('output'),
  clearAll() {
    this.tsk1Interface.classList.add('hide');
    this.tsk2Interface.classList.add('hide');
    this.tsk3Interface.classList.add('hide');
    this.output.innerHTML = '';
    this.timers = [];
    this.timerID = 1;
  },
  tsk1TimeInput: document.getElementById('input-time'),
  tsk1EnterBtn: document.getElementById('hw5tsk1-btn'),
  tsk1Form: document.getElementById('tsk1-form'),
  tsk1FormClearInput: document.getElementById('clear-input'),
  tsk1NmbCheck() {
    const nmb = ui.tsk1TimeInput.value;
    return nmb < 1 || nmb > 60;
  },
  timerID: 1,
  timers: [],
  toCurrentTimer(id) {
    return document.getElementById(`timer-output${id}`);
  },
};


function createHtmlForTimer(timerObj, placeToShow = ui.output) {
  const nmbOfTimer = timerObj.id;
  const timerCount = timerObj.time;
  const div = document.createElement('div');
  div.classList.add('timer-div');
  div.innerHTML = `    
    <span data-timerNmb="${nmbOfTimer}" class="timer-count">${nmbOfTimer} - ${timerCount}</span>
    <span data-timerId="${nmbOfTimer}" id="timer-output${nmbOfTimer}" class="timer-nmb">${timerCount}</span>
    <button class="stop-start" data-btnId="${nmbOfTimer}">Stop<br>Start</button>
  `;
  placeToShow.append(div);
}

function reStartTimer(id) {
  ui.toCurrentTimer(id).innerText = ui.timers[id - 1].time;
  // eslint-disable-next-line max-len
  const newTimer = new CustomTimer(ui.toCurrentTimer(id), ui.timers[id - 1].time);
  newTimer.start();
  ui.timers[id - 1].pauseStart = newTimer;
}

function createTimer() {
  const timer = {
    id: ui.timerID,
    time: +ui.tsk1TimeInput.value,
  };
  createHtmlForTimer(timer);
  const newTimer = new CustomTimer(ui.toCurrentTimer(timer.id), timer.time);
  newTimer.start();
  timer.pauseStart = newTimer;

  ui.timers.push(timer);
  ui.timerID += 1;
}

function eventListener() {
  ui.btnClear.addEventListener('click', (event) => {
    event.preventDefault();
    ui.clearAll();
  });
  ui.btnTask1.addEventListener('click', (event) => {
    event.preventDefault();
    ui.clearAll();
    ui.tsk1Interface.classList.remove('hide');
  });
  ui.btnTask2.addEventListener('click', (event) => {
    event.preventDefault();
    ui.clearAll();
    ui.tsk2Interface.classList.remove('hide');
  });
  ui.btnTask3.addEventListener('click', (event) => {
    event.preventDefault();
    ui.clearAll();
    ui.tsk3Interface.classList.remove('hide');
  });
  ui.tsk1Form.addEventListener('submit', (event) => {
    event.preventDefault();
    createTimer();
    ui.tsk1Form.reset();
  });
  ui.tsk1FormClearInput.addEventListener('click', (event) => {
    event.preventDefault();
    if (ui.tsk1NmbCheck()) ui.tsk1Form.reset();
  });
  ui.output.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.classList.contains('stop-start')) {
      const timerId = +event.target.dataset.btnid;
      if (+ui.toCurrentTimer(timerId).innerText === 0) {
        reStartTimer(timerId);
      } else {
        ui.timers[timerId - 1].pauseStart.pause();
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  eventListener();
});
