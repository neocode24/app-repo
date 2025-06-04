// tests/unit/example.unit.test.js
const { add } = require('../../src/math');

describe('add 함수 유닛 테스트', () => {
  it('두 숫자의 합을 반환해야 한다', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('음수를 더할 수 있어야 한다', () => {
    expect(add(-1, 4)).toBe(3);
  });
});