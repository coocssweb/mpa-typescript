import { getAnimationEvent } from '@utils/device';

export default class Mask {
    private static $domMask: HTMLElement;
    private  static readonly prefix = 'globalMask';
    private static animationEvent = getAnimationEvent();

    static open () {
        if (!Mask.$domMask) {
            Mask.$domMask = document.createElement('div');
            Mask.$domMask.classList.add(Mask.prefix);
            Mask.$domMask.addEventListener(Mask.animationEvent, () => {
                if (Mask.$domMask.classList.contains('doOut')) {
                    Mask.$domMask.classList.remove('doIn');
                    Mask.$domMask.classList.remove('doOut');
                }
            });
            document.body.append(Mask.$domMask);
        }
        Mask.$domMask.classList.add('doIn');
    }

    static close () {
        Mask.$domMask.classList.add('doOut');
    }
}