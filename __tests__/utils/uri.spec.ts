import Uri from '../../src/utils/uri';

describe('test utils/uri', () => {
    test('test uri.stringifyQuery func, url = "" ', () => {
        expect(Uri.parse('')).toEqual({
            hostname: '',
            port: 80,
            path: '',
            query: {}
        });
    });

    test('test uri.stringifyQuery func', () => {
        expect(Uri.parse('https://www.shuxia123.com:8080/user?id=30&name=kobe')).toEqual({
            hostname: 'www.shuxia123.com',
            port: 8080,
            path: '/user',
            query: {
                id: '30',
                name: 'kobe'
            }
        });
    });

    test('test uri.stringifyQuery func, with filename', () => {
        expect(Uri.parse('https://www.shuxia123.com:8080/index.html?id=30&name=kobe')).toEqual({
            hostname: 'www.shuxia123.com',
            port: 8080,
            path: '/index.html',
            query: {
                id: '30',
                name: 'kobe'
            }
        });
    });

    test('test uri.stringifyQuery func, with ?', () => {
        expect(Uri.parse('https://www.shuxia123.com:8080/user/index?id=30&name=kobe')).toEqual({
            hostname: 'www.shuxia123.com',
            port: 8080,
            path: '/user/index',
            query: {
                id: '30',
                name: 'kobe'
            }
        });
    });

    test('test uri.stringifyQuery func, with #', () => {
        expect(Uri.parse('https://www.shuxia123.com:8080/user#id=30&name=kobe')).toEqual({
            hostname: 'www.shuxia123.com',
            port: 8080,
            path: '/user',
            query: {
                id: '30',
                name: 'kobe'
            }
        });
    });

    test('test uri.format func', () => {
        expect(Uri.format(
            {
                hostname: 'www.shuxia123.com',
                port: 8080,
                path: '/user',
                query: {
                    id: '30',
                    name: 'kobe'
                }
            }
        )).toBe('http://www.shuxia123.com:8080/user?id=30&name=kobe');
    });
});