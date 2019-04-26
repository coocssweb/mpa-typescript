/**
 * @file utils/index.ts 工具类主文件
 * @author: 王佳欣
 * @email: 1974740999@qq.com
 */
import { EMPTY_FUNCTION } from '../constant';

// load javascript
export const loadScript = (src: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
};

// load photos
export const loadImages = (images: Array<string>, callback: Function = EMPTY_FUNCTION): Promise<number> => {
    let haveLoadedCount = 0;
    return new Promise((resolve, reject) => {
        const loadedOne = () => {
            haveLoadedCount++;
            callback(haveLoadedCount);
            if (haveLoadedCount === images.length) {
                resolve(haveLoadedCount);
            }
        };

        const load = (src: string): void => {
            const image = new Image();
            image.onload = loadedOne;
            image.onerror = loadedOne;
            image.src = src;
        };

        images.map(load);
        images.length === 0 && resolve();
    });
};
