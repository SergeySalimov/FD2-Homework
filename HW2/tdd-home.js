// eslint-disable-next-line no-unused-vars
function positiveSum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 0) {
      sum += arr[i];
    }
  }
  return sum;
}

// eslint-disable-next-line no-unused-vars
function evenOrOdd(num) {
  const currentNum = num;
  return currentNum % 2 === 0 ? 'Even' : 'Odd';
}

// eslint-disable-next-line no-unused-vars
function centuryFromYear(year) {
  const currentYear = year;
  return Math.ceil(currentYear / 100);
}

// eslint-disable-next-line no-unused-vars
function arrayDiff(arr1, arr2) {
  if (arr1 === [] || arr2 === []) {
    return arr1;
  }
  let result = [];
  let newArr1 = arr1;
  let iterration = arr2.length;
  while (iterration >= 0) {
    const valueToRemove = arr2[iterration];
    result = newArr1.filter((number) => number !== valueToRemove);
    newArr1 = result;
    iterration -= 1;
  }
  return result;
}
