import  { loadScript, loadImages }  from '../../src/utils/index';
const LOAD_SUCCESS_SRC = 'LOAD_SUCCESS_SRC';
const LOAD_FAILURE_SRC = 'LOAD_FAILURE_SRC';

describe('test utils/index function loadScript', () => {
    beforeAll(() => {
        Object.defineProperty(document.head, 'appendChild', {
            value: function (element) {
                if (element.src === `http://localhost/${LOAD_SUCCESS_SRC}`) {
                    element.onload();
                } else {
                    element.onerror();
                }
            }
        });
    });

    test('test loadScript, success', () => {
        return loadScript(LOAD_SUCCESS_SRC).then((response) => {
            expect(response).toBe('success');
        });
    });

    test('test loadScript, error', () => {
        return loadScript(LOAD_FAILURE_SRC).then(null, (response) => {
            expect(response).toBe('error');
        });
    });
});

describe('test utils/index loadImages', () => {
    beforeAll(() => {
        Object.defineProperty(Image.prototype, 'src', {
            set(src) {
                if (src === LOAD_FAILURE_SRC) {
                    setTimeout(() => this.onerror(new Error('mocked error')), 0);
                } else if (src === LOAD_SUCCESS_SRC) {
                    setTimeout(() => this.onload(), 0);
                }
            },
        });
    });

    test('test loadImages', () => {
        const mockCallback = jest.fn();
        return loadImages([LOAD_FAILURE_SRC, LOAD_FAILURE_SRC], mockCallback)
            .then((response) => {
                expect(mockCallback.mock.calls.length).toBe(2);
                expect(response).toBe(2);
            });
    });
});
