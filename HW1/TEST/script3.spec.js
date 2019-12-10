// TEST on script3.js Homework1
// isPolindrom3
describe('script3.js -> isPolindrom3', function () {
  it('should return true if it is polindrom or false if not', function () {
    expect(isPolindrom3('12345')).toBeFalse();
    expect(isPolindrom3('123454321')).toBeTrue();
    expect(isPolindrom3('abba')).toBe(true);
    expect(isPolindrom3('defhgregre')).toBe(false);
    expect(isPolindrom3('123df!fd321')).toBe(true);
  });
});

// isPolindrom1
describe('script3.js -> isPolindrom1', function () {
  it('should return true if it is polindrom or false if not', function () {
    expect(isPolindrom1('12345')).toBeFalse();
    expect(isPolindrom1('123454321')).toBeTrue();
    expect(isPolindrom1('abba')).toBe(true);
    expect(isPolindrom1('defhgregre')).toBe(false);
    expect(isPolindrom1('123df!fd321')).toBe(true);
  });
});

// isPolindrom2
describe('script3.js -> isPolindrom1', function () {
  it('should return true if it is polindrom or false if not', function () {
    expect(isPolindrom2('12345')).toBeFalse();
    expect(isPolindrom2('123454321')).toBeTrue();
    expect(isPolindrom2('abba')).toBe(true);
    expect(isPolindrom2('defhgregre')).toBe(false);
    expect(isPolindrom2('123df!fd321')).toBe(true);
  });
});