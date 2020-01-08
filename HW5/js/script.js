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
  },
  tsk1TimeInput: document.getElementById('input-time'),
  tsk1EnterBtn: document.getElementById('hw5tsk1-btn'),
  tsk1Form: document.getElementById('tsk1-form'),
  tsk1FormClearInput: document.getElementById('clear-input'),
};

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
    const timeToCount = ui.tsk1TimeInput.value;
    console.log(timeToCount);
  });
  ui.tsk1FormClearInput.addEventListener('click', (event) => {
    event.preventDefault();
    const nmb = ui.tsk1TimeInput.value;
    if (nmb < 0 || nmb > 60) ui.tsk1Form.reset();
    // const str = ui.tsk1TimeInput.oninvalid;
    // console.log(str);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  eventListener();
});
