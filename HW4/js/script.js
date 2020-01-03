function eventListener() {
  // eslint-disable-next-line no-undef
  const ui = new UI();

  window.setInterval(() => {
    ui.displayCurrentTime();
  }, 1000);

  ui.btnClear.addEventListener('click', (event) => {
    event.preventDefault();
    ui.clearForm();
  });

  ui.btnTask1.addEventListener('click', (event) => {
    event.preventDefault();
    ui.clearForm();
    ui.showText(ui.calcSeconds());
  });

  ui.btnTask2.addEventListener('click', (event) => {
    event.preventDefault();
    ui.clearForm();
    ui.task2Interface.classList.remove('hide');
  });

  ui.task2InterfaceBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const birthDay = ui.inputBirthday.value;
    const dd = ui.calcDaysToBirthday(birthDay);
    const txt2 = ' ' + ui.getNumWordBySwitch(dd, 'день', 'дня', 'дней');
    // eslint-disable-next-line max-len
    ui.showText(dd, 'До вашего дня рождения ', txt2);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  eventListener();
});
