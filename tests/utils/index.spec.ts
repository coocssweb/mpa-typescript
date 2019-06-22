import { loadScript, loadImages } from '../../src/utils/index';
jest.mock('loadScript');
jest.mock('loadImages');

describe('test utils/index', () => {
    // test('test loadScript, url exit', () => {
    //     loadScript.mockResolvedValue('success');
    //     return loadScript('https://www.shuxia123.com/js/index.4cf37435f731b6cd38ab.js').then((response) => {
    //         expect(response).toBe('success');
    //     });
    // });

    // test('test loadScript, url not exit', () => {
    //     loadScript.mockRejectValue('error');
    //     return loadScript('https://www.shuxia123.com/js/index.444.js').then(null, (error) => {
    //         expect(error).toBe(error);
    //     });
    // });

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