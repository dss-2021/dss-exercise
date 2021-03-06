import DisFocusable from './index';

it('should have a focus attribute after focus', () => {
  const focusable = new DisFocusable();
  focusable.focus();
  expect(focusable.hasAttribute('focus')).toBe(true);
});

it('should lose its focus attribute with focus', () => {
  const focus1 = new DisFocusable();
  focus1.focus();
  expect(focus1.hasAttribute('focus')).toBe(true);

  const focus2 = new DisFocusable();
  focus2.focus();
  expect(focus1.hasAttribute('focus')).toBe(false);
});
