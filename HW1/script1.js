// function getNumWord(num, word1, word2, word5) {
//   const dd = num % 100;
//
//   if ((dd >= 11) && (dd <= 19)) {
//     return word5;
//   }
//
//   const oneDigit = num % 10;
//
//   if (oneDigit === 1) {
//     return word1;
//   }
//
//   if (oneDigit >= 2 && oneDigit <= 4) {
//     return word2;
//   }
//
//   return word5;
// }

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

function makeTest() {
  const applesCount = parseInt(prompt('Сколько яблок?'), 10);
  if (applesCount) {
    alert(`У вас ${applesCount} ${getNumWordBySwitch(applesCount, 'яблоко', 'яблока', 'яблок')}.`);
  }
}

makeTest();
