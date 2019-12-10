// solution 1
// eslint-disable-next-line no-unused-vars
function isPolindrom1(str) {
  return str === str.split('').reverse().join('');
}
// solution 2
// eslint-disable-next-line no-unused-vars
function isPolindrom2(str) {
  let result = '';
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result === str;
}
// solution 3
// eslint-disable-next-line no-unused-vars
function isPolindrom3(str) {
  for (let i = 0; i < str.length / 2; i++) {
    const j = str.length - i - 1;
    if (str.charAt(i) !== str.charAt(j)) {
      return false;
    }
  }
  return true;
}
