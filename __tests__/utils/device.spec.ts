import { getTransitionEvent, getAnimationEvent } from '../../src/utils/device';

describe('test utils/device', () => {
    test('test getTransitionEvent', () => {
        expect(getTransitionEvent()).toBe('transitionend');
        // test the remember
        expect(getTransitionEvent()).toBe('transitionend');
    });

    test('test getAnimationEvent', () => {
        expect(getAnimationEvent()).toBe('animationend');
        // test the remember
        expect(getAnimationEvent()).toBe('animationend');
    });
});