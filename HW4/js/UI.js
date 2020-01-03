function UI() {
  this.btnTask1 = document.getElementById('task1');
  this.btnTask2 = document.getElementById('task2');
  this.btnTask3 = document.getElementById('task3');
  this.btnTask4 = document.getElementById('task4');
  this.btnClear = document.getElementById('clear');
  this.output = document.getElementById('output');
  this.dateAndTimeOutput = document.getElementById('current');
  this.task2Interface = document.getElementById('task2-interface');
  this.task2InterfaceBtn = document.getElementById('task2-btn');
  this.inputBirthday = document.getElementById('input-birthday');
}

UI.prototype.clearForm = function () {
  this.output.innerText = '';
  this.task2Interface.classList.add('hide');
};

UI.prototype.displayCurrentTime = function () {
  // eslint-disable-next-line no-undef
  moment.locale('ru');
  // время скорректировано на +1 час
  // eslint-disable-next-line no-undef
  const now = moment().add(1, 'hour');
  this.dateAndTimeOutput.innerText = now.format('LL LTS');
};

UI.prototype.calcSeconds = function () {
  // время скорректировано на +1 час
  // eslint-disable-next-line max-len,no-undef
  const timeNowArr = (moment().add(1, 'hour').format('HH.mm.ss')).split('.')
    .map((n) => parseInt(n, 10));
  // eslint-disable-next-line max-len
  return ((23 - timeNowArr[0]) * 60 + (59 - timeNowArr[1])) * 60 + (60 - timeNowArr[2]);
};

// eslint-disable-next-line max-len
UI.prototype.showText = function (number, txt1 = 'До конца дня осталось ', txt2 = ' секунд') {
  this.output.innerText = txt1 + number + txt2;
};

function getNumWordBySwitch(num, wrd1, wrd2, wrd3) {
  const dd = num % 100;
  const d = dd % 10;
  // eslint-disable-next-line default-case
  switch (dd) {
    case 11:
    case 12:
    case 13:
    case 14:
      return wrd3;
  }
  switch (d) {
    case 1:
      return wrd1;
    case 2:
    case 3:
    case 4:
      return wrd2;
    default:
      return wrd3;
  }
}

UI.prototype.calcDaysToBirthday = function (birthDay) {
  const d1 = new Date(birthDay);
  const d2 = new Date();
  // время скорректировано на +1 час
  d2.setHours(d2.getHours() + 1);
  // eslint-disable-next-line max-len
  d1.setHours(d2.getHours(), d2.getMinutes(), d2.getSeconds(), d2.getMilliseconds());
  // eslint-disable-next-line max-len
  if (d1.setFullYear(d2.getFullYear()) < d2) d1.setFullYear(d2.getFullYear() + 1);
  const diff = d1 - d2;
  const diffInDays = Math.ceil(diff / (1000 * 3600 * 24));
  const txt2 = ' ' + getNumWordBySwitch(diffInDays, 'день', 'дня', 'дней');
  return {
    diffInDays,
    txt2,
  };
  // return diffInDays;
};
