const ui = {
  tsk2Interface: document.getElementById('hw7task1-interface'),
  output: document.getElementById('output7'),
  tsk2Heart: document.getElementById('heart7'),
  tsk2BtnStartHeart: document.getElementById('start-heart7'),
  tsk2HeartOutputTimer: document.getElementById('count-heart7'),
  tsk2InputHeartBeat: document.getElementById('input-heartbeat7'),
  tsk2InputHeartBeatCount: document.getElementById('input-heartbeat-count7'),
  // eslint-disable-next-line max-len
  tsk2InputHeartBeatCountBtn: document.getElementById('input-heartbeat-count-btn7'),
  flagForHeartbeat: false,
  tsk2StartTimer(time = 5) {
    const newTimer = new CustomTimer(ui.tsk2HeartOutputTimer, time);
    newTimer.start();
  },
  tsk2StartHeartBeatCount() {
    this.output.innerText = 'ИЗМЕРЕНИЕ ПУЛЬСА ....';
    this.tsk2HeartOutputTimer.innerText = '15';
    this.tsk2Heart.classList.add('heart-beat');
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
    // window.setTimeout(() => {
    //   this.tsk2StartHeartBeatCount();
    // }, 6000);
    // window.setTimeout(() => {
    //   this.tsk2Measure();
    // }, 21010);
  },
  tsk2Calculate() {
    const heartBeat = +this.tsk2InputHeartBeatCount.value * 4;
    this.tsk2InputHeartBeatCount.value = '';
    this.output.innerText = `Ваш пульс равен ${heartBeat} уд. в минуту`;
    this.tsk2HeartOutputTimer.innerText = heartBeat;
  },
};

function eventListener() {
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
}

document.addEventListener('DOMContentLoaded', () => {
  eventListener();
});
