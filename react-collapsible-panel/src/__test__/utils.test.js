import { mergeClassName } from '../utils';

describe('no given classes and props should be empty', () => {
  test('null', () => expect(mergeClassName(null, null)).toBe(''));
  test('undefined', () => expect(mergeClassName(undefined, undefined)).toBe(''));
  test('[]', () => expect(mergeClassName([], [])).toBe(''));
});

describe('join given classes', () => {
  [{
    props: null,
    description: 'props = null'
  }, {
    props: undefined,
    description: 'props = undefined'
  }, {
    props: { className: null },
    description: 'props.className = null'
  }, {
    props: { className: undefined },
    description: 'props.className = undefined'
  }].forEach(testCase => {
    describe(testCase.description, () => {
      test('1 class', () => expect(mergeClassName(testCase.props, 'a')).toBe('a'));
      test('2 classes', () => expect(mergeClassName(testCase.props, 'a', 'b')).toBe('a b'));
    });
  });

  test('join as string seperates by space', () => expect(mergeClassName({ className: 'c' }, 'a', 'b')).toBe('c a b'));
});