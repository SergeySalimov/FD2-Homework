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
    this.tsk2InputHeartBeat.classList.add('hide');
    this.tsk2HeartOutputTimer.innerText = '';
    this.flagForHeartbeat = false;
    this.tsk3FlagWorking = false;
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
  tsk2Heart: document.getElementById('heart'),
  tsk2BtnStartHeart: document.getElementById('start-heart'),
  tsk2HeartOutputTimer: document.getElementById('count-heart'),
  tsk2InputHeartBeat: document.getElementById('input-heartbeat'),
  tsk2InputHeartBeatCount: document.getElementById('input-heartbeat-count'),
  // eslint-disable-next-line max-len
  tsk2InputHeartBeatCountBtn: document.getElementById('input-heartbeat-count-btn'),
  flagForHeartbeat: false,
  tsk2StartTimer(time = 5) {
    const newTimer = new CustomTimer(ui.tsk2HeartOutputTimer, time);
    newTimer.start();
  },
  tsk2StartHeartBeatCount() {
    this.output.innerText = 'ИЗМЕРЕНИЕ ПУЛЬСА ....';
    this.tsk2HeartOutputTimer.innerText = '15';
    this.tsk2Heart.classList.add('heart-beat');
    this.tsk2StartTimer(14);
  },
  tsk2Measure() {
    this.tsk2InputHeartBeat.classList.remove('hide');
    this.tsk2HeartOutputTimer.innerText = 'все';
    this.output.innerText = 'Время закончилось, введите количество ударов';
    this.tsk2Heart.classList.remove('heart-beat');
  },
  tsk2StartWork() {
    this.output.innerText = 'Отсчет начнется через ....';
    this.tsk2StartTimer();
    window.setTimeout(() => {
      this.tsk2StartHeartBeatCount();
    }, 6000);
    window.setTimeout(() => {
      this.tsk2Measure();
    }, 21010);
  },
  tsk2Calculate() {
    const heartBeat = +this.tsk2InputHeartBeatCount.value * 4;
    this.tsk2InputHeartBeatCount.value = '';
    this.output.innerText = `Ваш пульс равен ${heartBeat} уд. в минуту`;
    this.tsk2HeartOutputTimer.innerText = heartBeat;
  },
  tsk3Start: document.getElementById('tsk3-btn'),
  tsk3FlagWorking: false,
};

function random100() {
  return Math.round(Math.random() * 100);
}

function ifEven(nmb) {
  return (nmb / 2) === Math.ceil(nmb / 2);
}

function MyError(message) {
  this.name = 'MY ERROR: even numbers is illegal today';
  this.message = message;
}

function line() {
  console.log('=======================================');
}

function task3Working() {
  let itr = 20;
  console.log(`
      Numbers checking: ${itr} attempt`);
  line();
  const intervalId = setInterval(() => {
    try {
      const nmb = random100();
      if (!ifEven(nmb)) {
        console.log(`--------- Number ${nmb} is odd. Success! --`);
      } else {
        throw new MyError(`--------- Number ${nmb} is even -----------`);
      }
    } catch (e) {
      console.log(e.name);
      console.log(e.message);
    }
    itr -= 1;
    if (itr === 0) {
      clearInterval(intervalId);
      line();
    }
  }, 1000);
}

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
  ui.tsk2BtnStartHeart.addEventListener('click', (event) => {
    event.preventDefault();
    if (!ui.flagForHeartbeat) {
      ui.tsk2StartWork();
      ui.flagForHeartbeat = true;
    }
  });
  ui.tsk2InputHeartBeatCountBtn.addEventListener('click', (event) => {
    event.preventDefault();
    ui.tsk2Calculate();
  });
  ui.tsk3Start.addEventListener('click', (event) => {
    event.preventDefault();
    if (!ui.tsk3FlagWorking) {
      task3Working();
      ui.tsk3FlagWorking = true;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  eventListener();
});
