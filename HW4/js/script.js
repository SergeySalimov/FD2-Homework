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

  ui.task1Btn.addEventListener('click', (event) => {
    event.preventDefault();
    ui.clearForm();
    ui.showText(ui.calcSeconds());
  });

  ui.task2Btn.addEventListener('click', (event) => {
    event.preventDefault();
    ui.clearForm();
    ui.task2Interface.classList.remove('hide');
  });

  ui.task2InterfaceBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const birthDay = ui.task2InputBirthday.value;
    const daysToBirthday = ui.calcDaysToBirthday(birthDay);
    // eslint-disable-next-line max-len
    ui.showText(daysToBirthday.diffInDays, 'До вашего дня рождения ', daysToBirthday.txt2);
  });

  ui.task3Btn.addEventListener('click', (event) => {
    event.preventDefault();
    ui.clearForm();
    ui.task3Interface.classList.remove('hide');
  });

  ui.task3InterfaceBtnRem.addEventListener('click', (event) => {
    event.preventDefault();
    ui.clearFilter();
  });

  ui.task3InterfaceBtnAdd.addEventListener('click', (event) => {
    event.preventDefault();
    if (ui.task3InputFilter.value) {
      ui.addFilter(ui.task3InputFilter.value);
      ui.task3InputFilter.value = '';
    }
  });

  ui.task3InterfaceBtnFilter.addEventListener('click', (event) => {
    event.preventDefault();
    ui.filterField();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  eventListener();
});
