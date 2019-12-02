const bodyhw3 = document.body;
const div = document.createElement('div');
divInner = '';
div.className = "card card-body ml-3 my-2 p-2 col-8";
div.style = 'font-size: 0.8rem;';
// solution 1
function isPolindrom1(str) {
  return str === str.split('').reverse().join('');
}
// solution 2
function isPolindrom2(str) {
  let result = '';
  for(let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result === str;
}
// solution 3
function isPolindrom3(str) {
  for (let i = 0; i < str.length / 2; i++) {
    let j = str.length - i - 1;
    if (str.charAt(i) !== str.charAt(j)) {
      return false;
    }
  }
  return true;
}

divInner += `SOLUTION 1:<br/>
function - isPolindrom1('1301'); - ${isPolindrom1('1301')}<br/>
function - isPolindrom1('abba'); - ${isPolindrom1('abba')}<br/><hr/>`;
divInner += `SOLUTION 2:<br/>
function - isPolindrom2('1301'); - ${isPolindrom2('1301')}<br/>
function - isPolindrom2('abba'); - ${isPolindrom2('abba')}<br/><hr/>`;
divInner += `SOLUTION 3:<br/>
function - isPolindrom3('1301'); - ${isPolindrom3('1301')}<br/>
function - isPolindrom3('12345678987654321'); - ${isPolindrom3('12345678987654321')}<br/><hr/>`;
divInner += "JS code below"

div.innerHTML = divInner;
bodyhw3.prepend(div);