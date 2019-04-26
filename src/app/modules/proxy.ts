/**
 * @file app/modules/proxy.ts 双向绑定
 * @author: 王佳欣
 * @email: 1974740999@qq.com
 */

import { EMPTY_FUNCTION } from '../../constant';

interface Target {
    data: Object, 
    key: string, 
    callback?: Function
}

export default (target: Target): void => {
    const { data, key, callback = EMPTY_FUNCTION } = target;
    let value = data[key];
    Object.defineProperty(data, key, {
        get () {
            return value;
        },
        set (newValue) {
            if (value === newValue) {
                return;
            }
            
            callback(newValue, value);
            value = newValue;
        }
    });
};
