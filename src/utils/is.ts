/**
 * @file utils/is.ts 平台判断
 * @author: 王佳欣
 * @email: 1974740999@qq.com
 */
interface Is {
    isWeibo: Function,
    isWechat: Function,
    isQQ: Function,
    isQZone: Function,
    isAndroid: Function,
    isIos: Function,
    isIphoneX: Function
}

export default (): Is => {
    let instance: Is;
    return (() => {
        if (instance) {
            return instance;
        }
    
        const USER_AGENT = navigator.userAgent.toLowerCase();
        
        instance = {
            isWeibo (): boolean {
                return /weibo/.test(USER_AGENT);
            },
            isWechat (): boolean {
                return /micromessenger/.test(USER_AGENT) && !/wxwork/.test(USER_AGENT);
            },
            isQQ (): boolean {
                return /qq\//gi.test(USER_AGENT);
            },
            isQZone (): boolean {
                return /qzone\//gi.test(USER_AGENT);
            },
            isAndroid (): boolean {
                return /android/.test(USER_AGENT);
            },
            isIos (): boolean {
                return /iphone|ipad|ipod/.test(USER_AGENT);
            },
            isIphoneX (): boolean {
                return this.isIos() && window.screen.width === 375 
                && window.screen.height === 812
            }
        };
    
        return instance; 
    })();
};
