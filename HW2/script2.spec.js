// TEST on script2.js Homework1 ANKETA function
describe('script2.js -> getUserDate', function () {
  let variant = 1;
  let case1 = ['Сергей'];
  let case2 = ['', 'Sergey'];
  let case3 = [NaN, ''];
  let case4 = [NaN, 'NaN'];
  let case5 = [undefined, '1945'];
  let expectedAnswers = ['Сергей', 'Sergey', NO_DATA, 'NaN', '1945'];

  beforeEach(function () {
    spyOn(window, 'prompt').and.callFake(function () {
      let result;
      switch (variant) {
        case 1:
          result = case1.shift();
          if (case1.length === 0) variant += 1;
          return result;
        case 2:
          result = case2.shift();
          if (case2.length === 0) variant += 1;
          return result;
        case 3:
          result = case3.shift();
          if (case3.length === 0) variant += 1;
          return result;
        case 4:
          result = case4.shift();
          if (case4.length === 0) variant += 1;
          return result;
        case 5:
          result = case5.shift();
          if (case5.length === 0) variant += 1;
          return result;
        default:
          variant = 1;
      }
    });
  });

  it('should ask smth & if answer is correct return answer, if answer not correct, Ask one more time & return answer' +
      ' if it is correct or const NO_DATA if it is not correct', function () {
    while (expectedAnswers.length !== 0) {
      let userDate = getUserDate();
      let answer = expectedAnswers.shift();
      expect(userDate).toBe(answer);
    }
  });
});

describe('script2.js -> checkAge', function () {
  it('should return true if it is a number which is bigger than 1 and less or equal 150', function () {
    expect(checkAge('1')).toBe(false);
    expect(checkAge(1)).toBe(false);
    expect(checkAge(NaN)).toBe(false);
    expect(checkAge(undefined)).toBe(false);
    expect(checkAge(null)).toBe(false);
    expect(checkAge(151)).toBe(false);
    expect(checkAge(45)).toBe(true);
    expect(checkAge('4545')).toBe(false);
    expect(checkAge('-5')).toBe(false);
    expect(checkAge('100')).toBe(true);
    expect(checkAge('150')).toBe(true);
  });
});

describe('script2.js -> getNumAndWord', function () {
  it('Shoud return number& correct word of specified quantity or if number is not correct return NO_DATA', function () {
    expect(getNumAndWord(1, 'яблоко', 'яблока', 'яблок')).toBe('1 яблоко');
    expect(getNumAndWord(4, 'яблоко', 'яблока', 'яблок')).toBe('4 яблока');
    expect(getNumAndWord('11', 'яблоко', 'яблока', 'яблок')).toBe('11 яблок');
    expect(getNumAndWord('N', 'яблоко', 'яблока', 'яблок')).toBe(NO_DATA);
    expect(getNumAndWord('', 'яблоко', 'яблока', 'яблок')).toBe(NO_DATA);
    expect(getNumAndWord(undefined, 'яблоко', 'яблока', 'яблок')).toBe(NO_DATA);
    expect(getNumAndWord(null, 'яблоко', 'яблока', 'яблок')).toBe(NO_DATA);
    expect(getNumAndWord(NaN, 'яблоко', 'яблока', 'яблок')).toBe(NO_DATA);
    expect(getNumAndWord('Два', 'яблоко', 'яблока', 'яблок')).toBe(NO_DATA);
  })
});

describe('script2.js -> getYesOrNoOrOtherAnswer', function () {
  it('should check value & return Да if true or Нет if false by default or other needed answers', function () {
    expect(getYesOrNoOrOtherAnswer(true)).toBe('Да');
    expect(getYesOrNoOrOtherAnswer(false)).toBe('Нет');
    expect(getYesOrNoOrOtherAnswer(true, 'Yes', 'No')).toBe('Yes');
    expect(getYesOrNoOrOtherAnswer(false, 'Yes', 'No')).toBe('No');
    expect(getYesOrNoOrOtherAnswer(true, 'подходит', '')).toBe('подходит');
    expect(getYesOrNoOrOtherAnswer(false, 'подходит', '')).toBe('');
  });
});

describe('script2.js -> checkOnRetire(age, true for man - default, false for woman)', function () {
  it('should return true is person is on retire, for men >= 63, for women >= 58', function () {
    expect(checkOnRetire(50)).toBe(false);
    expect(checkOnRetire(50, false)).toBe(false);
    expect(checkOnRetire(58, true)).toBe(false);
    expect(checkOnRetire(58, false)).toBe(true);
    expect(checkOnRetire(60, true)).toBe(false);
    expect(checkOnRetire(60, false)).toBe(true);
    expect(checkOnRetire(63, true)).toBe(true);
    expect(checkOnRetire(63, false)).toBe(true);
    expect(checkOnRetire(70)).toBe(true);
    expect(checkOnRetire(70, false)).toBe(true);
  });
});