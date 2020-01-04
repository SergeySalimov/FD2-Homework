const Vania = {
  id: '1',
  name: 'Vania',
  dob: '1999-01-01',
};
const Vasia = {
  id: '2',
  name: 'Vasia',
  dob: '1985-05-06',
};
const Alex = {
  id: '3',
  name: 'Alex',
  dob: '1980-12-21',
};
const Igor = {
  id: '4',
  name: 'Igor',
  dob: '2001-09-11',
};
const Masha = {
  id: '11',
  name: 'Masha',
  dob: '1993-11-01',
};
const users = [Vania, Alex, Vasia, Masha, Igor];

console.log(users);

function usersSort(param1, param2 = 'id', param3 = 'asc') {
  const sortedUsers = [...param1];
  let flag = 1;
  if (param3 === 'desc') flag = -1;
  const compareNumbers = (a, b) => (a[param2] - b[param2]) * flag;
  const compareStrings = (a, b) => {
    const fieldA = a[param2];
    const fieldB = b[param2];
    if (fieldA < fieldB) return -(flag);
    if (fieldA > fieldB) return flag;
    return 0;
  };
  if (param2 === 'id') {
    sortedUsers.sort(compareNumbers);
  } else {
    sortedUsers.sort(compareStrings);
  }
  return sortedUsers;
}

console.log(usersSort(users));


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
    ui.task3InputFilter.value = '';
  });

  ui.task3InterfaceBtnAdd.addEventListener('click', (event) => {
    event.preventDefault();
    // eslint-disable-next-line max-len
    if (ui.task3InputFilter.value && !ui.task3Filter.includes(ui.task3InputFilter.value)) {
      ui.addFilter(ui.task3InputFilter.value);
      ui.task3InputFilter.value = '';
    }
  });

  ui.task3InterfaceBtnFilter.addEventListener('click', (event) => {
    event.preventDefault();
    ui.filterField();
  });

  ui.task4Btn.addEventListener('click', (event) => {
    event.preventDefault();
    ui.clearForm();
    ui.output.innerText = usersSort;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  eventListener();
});
