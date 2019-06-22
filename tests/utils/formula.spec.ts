import { compose, curry } from '../../src/utils/formula';

describe('test utils/formula', () => {
    const sum = (a, b) => {
        return a + b;
    }

    const replaceSharpToSpace = (str) => {
        return str.replace(/\#/, ' ');
    }

    const wrapperWordName = (str) => {
        return str.replace(/(name)/, (word) => `(${word})`);
    }

    test('test curry func', () => {
        expect(curry(sum)(1, 2)).toBe(3);
    });

    test('test compose func', () => {
        expect(compose(replaceSharpToSpace, wrapperWordName)('my name is wangxin#wang')).toBe('my (name) is wangxin wang')
    });
});