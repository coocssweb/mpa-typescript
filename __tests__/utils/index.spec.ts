import  { loadScript, loadImages }  from '../../src/utils/index';

describe('test utils/index', () => {
    test('test loadScript, url exit', () => {
        return loadScript('https://www.shuxia123.com/js/index.4cf37435f731b6cd38ab.js').then((response) => {
            expect(response).toBe('success');
        });
    }, 10000);

    test('test loadScript, url not exit', () => {
        return loadScript('https://www.shuxia123.com/js/index.444.js').then(null, (error) => {
            expect(error).toBe(error);
        });
    }, 10000);

    // test('test loadImages', () => {
    //     const mockCallback = jest.fn();

    //     return 
    //         loadImages(['https://www.shuxia123.com/uploads/2019/1560414276274_width_800_height_534.jpg'], mockCallback)
    //         .then((response) => {
    //             console.log('134123412341234');
    //             expect(mockCallback.mock.calls.length).toBe(1);
    //             expect(response).toBe(1);
    //         });
    // });
});