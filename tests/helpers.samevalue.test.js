const { SameValue } = require('../util/helpers/hbs/SameValue');

describe('SameValue helper', () => {
  it('returns true when values are equal', () => {
    const result = SameValue('a', 'a');
    expect(result).toBe(true);
  });

  it('returns false when values differ', () => {
    const result = SameValue('a', 'b');
    expect(result).toBe(false);
  });
});
