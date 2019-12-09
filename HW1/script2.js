let age;
const NO_DATA = 'Нет данных';
const MALE = 'Мужской';
const FEMALE = 'Женский';


function getUserDate(question = 'Введите ваше Имя') {
  let answ = prompt(`${question}:`);
  if (answ) {
    return answ;
  }
  answ = prompt(`${question} корректно, пожалуйста:`);
  return answ || NO_DATA;
}

// function return true if number is convenient for condition
function checkAge(num) {
  const toNum = parseInt(num, 10);
  return toNum > 1 && toNum <= 150;
}

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

function getYesOrNoOrOtherAnswer(value, trueWord = 'Да', falseWord = 'Нет') {
  return value ? trueWord : falseWord;
}

// Пенсионный возраст в 2022 году и последующие годы: мужчины - 63 лет,
// женщины - 58 лет
function checkOnRetire(ageOfRetire, sexToCheck = true) {
  return sexToCheck ? ageOfRetire >= 63 : ageOfRetire >= 58;
}

const NAME = getUserDate();
const SURNAME = getUserDate('Введите вашу Фамилию');
const PATRONYMIC = getUserDate('Введите ваше Отчество');
age = getUserDate('Сколько вам лет');
if (age !== NO_DATA && !checkAge(age)) {
  age = getUserDate('Введите числом и правильно сколько вам лет');
  if (!checkAge(age)) {
    age = NO_DATA;
  }
}
// eslint-disable-next-line no-restricted-globals
const SEX = confirm('Ваш пол мужской');

// eslint-disable-next-line no-alert
alert(`==========   А Н К Е Т А ===========
    Ваше ФИО: ${SURNAME} ${NAME} ${PATRONYMIC}
    Ваш возраст в годах: ${getNumAndWord(age, 'год', 'года', 'лет')}
    Ваш возраст в днях: ${getNumAndWord((age * 365), 'день', 'дня', 'дней')}
    Через 5 лет вам будет: ${getNumAndWord((age + 5), 'год', 'года', 'лет')}
    Ваш пол: ${getYesOrNoOrOtherAnswer(SEX, MALE, FEMALE)}
    Вы на пенсии: ${getYesOrNoOrOtherAnswer(checkOnRetire(age, SEX))}
 ==============================`);
