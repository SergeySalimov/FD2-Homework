// eslint-disable-next-line no-unused-vars
let age;
const NO_DATA = 'Нет данных';
// eslint-disable-next-line no-unused-vars
const MALE = 'Мужской';
// eslint-disable-next-line no-unused-vars
const FEMALE = 'Женский';
// eslint-disable-next-line no-unused-vars
function getUserDate(question = 'Введите ваше Имя') {
  let answ = prompt(`${question}:`);
  if (answ) {
    return answ;
  }
  answ = prompt(`${question} корректно, пожалуйста:`);
  return answ || NO_DATA;
}

// function return true if number is convenient for condition
// eslint-disable-next-line no-unused-vars
function checkAge(num) {
  const toNum = parseInt(num, 10);
  return toNum > 1 && toNum <= 150;
}

// eslint-disable-next-line no-unused-vars
function getNumAndWord(num, wrd1, wrd2, wrd3) {
  if (!parseInt(num, 10)) {
    return NO_DATA;
  }
  const dd = num % 100;
  const d = dd % 10;
  // eslint-disable-next-line default-case
  switch (dd) {
    case 11:
    case 12:
    case 13:
    case 14:
      return `${num} ${wrd3}`;
  }
  switch (d) {
    case 1:
      return `${num} ${wrd1}`;
    case 2:
    case 3:
    case 4:
      return `${num} ${wrd2}`;
    default:
      return `${num} ${wrd3}`;
  }
}

// eslint-disable-next-line no-unused-vars
function getYesOrNoOrOtherAnswer(value, trueWord = 'Да', falseWord = 'Нет') {
  return value ? trueWord : falseWord;
}

// Пенсионный возраст в 2022 году и последующие годы: мужчины - 63 лет,
// женщины - 58 лет
// eslint-disable-next-line no-unused-vars
function checkOnRetire(ageOfRetire, sexToCheck = true) {
  return sexToCheck ? ageOfRetire >= 63 : ageOfRetire >= 58;
}
