import only from '../../src/utils/only';

describe('test utils/only', () => {
    const object = {
        name: 'wangjiaxin',
        age: 22,
        sexy: 'male'
    };

    test('test only pick func', () => {
        expect(only(object, 'name age')).toEqual({
            name: 'wangjiaxin',
            age: 22
        });

        expect(only(object, ['name', 'age'])).toEqual({
            name: 'wangjiaxin',
            age: 22
        });
    });
});