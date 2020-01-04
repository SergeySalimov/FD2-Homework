function UI() {
  this.task1Btn = document.getElementById('task1');
  this.task2Btn = document.getElementById('task2');
  this.task3Btn = document.getElementById('task3');
  this.task4Btn = document.getElementById('task4');
  this.btnClear = document.getElementById('clear');
  this.output = document.getElementById('output');
  this.dateAndTimeOutput = document.getElementById('current');
  this.task2Interface = document.getElementById('task2-interface');
  this.task2InterfaceBtn = document.getElementById('task2-btn');
  this.task2InputBirthday = document.getElementById('input-birthday');
  this.task3Interface = document.getElementById('task3-interface');
  this.task3InputFilter = document.getElementById('input-filter');
  this.task3InterfaceBtnAdd = document.getElementById('task3-btn-add');
  this.task3InterfaceBtnRem = document.getElementById('task3-btn-rem');
  this.task3InterfaceBtnFilter = document.getElementById('task3-btn-filter');
  this.task3FilterWordsOutput = document.getElementById('filter-words');
  this.task3FilterField = document.getElementById('field-to-filter');
  this.task3Filter = [];
  this.task3FilterReplacer = '***';
}

UI.prototype.clearForm = function () {
  this.output.innerText = '';
  this.task2Interface.classList.add('hide');
  this.task3Interface.classList.add('hide');
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

UI.prototype.clearFilter = function () {
  this.task3FilterWordsOutput.innerText = '';
  this.task3Filter = [];
};

UI.prototype.addFilter = function (wrd) {
  let wrdToDisplay = wrd;
  this.task3Filter.push(wrdToDisplay);
  wrdToDisplay += '/';
  this.task3FilterWordsOutput.innerText += wrdToDisplay;
};

UI.prototype.filterField = function () {
  let textToFilter = this.task3FilterField.innerText;
  if (this.task3Filter.length > 0) {
    this.task3Filter.forEach((filterWrd) => {
      const regex = new RegExp(filterWrd, 'gi');
      console.log(regex);
      textToFilter = textToFilter.replace(regex, this.task3FilterReplacer);
    });
    this.task3FilterField.innerText = textToFilter;
  }
};
