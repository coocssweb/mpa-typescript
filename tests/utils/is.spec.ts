import Is from '../../src/utils/is';

describe('test utils/is', () => {
    test('test Is.isWeibo func', () => {
        expect(Is.isWeibo()).toBe(false);
    });

    test('test Is.isWechat func', () => {
        expect(Is.isWechat()).toBe(false);
    });

    test('test Is.isQQ func', () => {
        expect(Is.isQQ()).toBe(false);
    });

    test('test Is.isQZone func', () => {
        expect(Is.isQZone()).toBe(false);
    });

    test('test Is.isAndroid func', () => {
        expect(Is.isAndroid()).toBe(false);
    });

    test('test Is.isIos func', () => {
        expect(Is.isIos()).toBe(false);
    });

    test('test Is.isIphoneX func', () => {
        expect(Is.isIphoneX()).toBe(false);
    });
});