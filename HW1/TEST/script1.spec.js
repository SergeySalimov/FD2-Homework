// Test on script1 Homework1
describe('script1.js -> getNumWordBySwitch', function () {
  it('Shoud return correct word`s conjugation of specified quantity', function () {
    expect(getNumWordBySwitch(1, 'яблоко', 'яблока', 'яблок')).toBe('яблоко');
    expect(getNumWordBySwitch(4, 'яблоко', 'яблока', 'яблок')).toBe('яблока');
    expect(getNumWordBySwitch(11, 'яблоко', 'яблока', 'яблок')).toBe('яблок');
    expect(getNumWordBySwitch(103, 'яблоко', 'яблока', 'яблок')).toBe('яблока');
    expect(getNumWordBySwitch(1001, 'яблоко', 'яблока', 'яблок')).toBe('яблоко');
    expect(getNumWordBySwitch(-15, 'яблоко', 'яблока', 'яблок')).toBe('яблок');
  })
});