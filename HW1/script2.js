let name, surname, patronymic, age, sex;
const NO_DATA = 'Нет данных';
const MALE = 'Мужской';
const FEMALE = 'Женский';


function getUserDate(question = "Введите ваше Имя") {
  let answ = prompt(`${question}:`);
  if (answ) {
    return answ;
  }
  answ = prompt(`${question} корректно, пожалуйста:`);
  return answ || NO_DATA;
}

// function return true if number is convenient for condition
function checkAge(num) {
  num = parseInt(num);
  return num > 1 && num <= 150
}

function getNumAndWord(num, wrd1, wrd2, wrd3) {
  if (!parseInt(num)) {
    return NO_DATA;
  }
  let dd = num % 100;
  let d = dd % 10;
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

// Пенсионный возраст в 2022 году и последующие годы: мужчины - 63 лет, женщины - 58 лет
function checkOnRetire(age, sex = true) {
   return sex ? age >= 63 : age >= 58;
}

name = getUserDate();
surname = getUserDate('Введите вашу Фамилию');
patronymic = getUserDate('Введите ваше Отчество');
age = getUserDate('Сколько вам лет');
if (age !== NO_DATA && !checkAge(age)) {
  age = getUserDate('Введите числом и правильно сколько вам лет');
  if (!checkAge(age)) {
    age = NO_DATA;
  }
}
sex = confirm('Ваш пол мужской');

alert(`==========   А Н К Е Т А ===========
    Ваше ФИО: ${surname} ${name} ${patronymic}
    Ваш возраст в годах: ${getNumAndWord(parseInt(age), 'год', 'года', 'лет')} 
    Ваш возраст в днях: ${getNumAndWord(parseInt(age * (364 * 3 + 365) / 4), 'день', 'дня', 'дней')}
    Через 5 лет вам будет: ${getNumAndWord((parseInt(age) + 5), 'год', 'года', 'лет')}
    Ваш пол: ${getYesOrNoOrOtherAnswer(sex, MALE, FEMALE)}
    Вы на пенсии: ${getYesOrNoOrOtherAnswer(checkOnRetire(age, sex))}
 ==============================`);
