/**
 * @file utils/device.ts 终端相关
 * @author: 王佳欣
 * @email: 1974740999@qq.com
 */

export let getTransitionEvent = () => {
    let el = document.createElement('fake_a_element');
    
    let transitions = {
        'transition':'transitionend',
        'OTransition':'oTransitionEnd',
        'MozTransition':'transitionend',
        'WebkitTransition':'webkitTransitionEnd'
    };

    for (let transition in transitions) {
        if (el.style[transition] !== undefined) {
            getTransitionEvent = () => {
                return transitions[transition];    
            };
            return transitions[transition];
        }
    }
};

export let getAnimationEvent = () => {
    let el = document.createElement('fake_a_element');
    
    let animations = {
        'animation':'animationend',
        'OAnimation':'oAnimationEnd',
        'MozAnimation':'animationend',
        'WebkitAnimation':'webkitAnimationEnd'
    };

    for (let animation in animations) {
        if (el.style[animation] !== undefined) {
            getAnimationEvent = () => {
                return animations[animation];    
            }
            return animations[animation];
        }
    }
};
