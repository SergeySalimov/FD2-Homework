// eslint-disable-next-line no-unused-vars
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