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

export default ((): Is => {
    const USER_AGENT = navigator.userAgent.toLowerCase();
    return {
        isWeibo (): boolean {
            const isTest = /weibo/.test(USER_AGENT);
            this.isWeibo = () => isTest;
            return isTest;
        },
        isWechat (): boolean {
            const isTest = /micromessenger/.test(USER_AGENT) && !/wxwork/.test(USER_AGENT);
            this.isWechat = () => isTest;
            return isTest;
        },
        isQQ (): boolean {
            const isTest = /qq\//gi.test(USER_AGENT);
            this.isQQ = () => isTest;
            return isTest;
        },
        isQZone (): boolean {
            const isTest = /qzone\//gi.test(USER_AGENT);
            this.isQZone = () => isTest;
            return isTest;
        },
        isAndroid (): boolean {
            const isTest = /android/.test(USER_AGENT);
            this.isAndroid = () => isTest;
            return isTest;
        },
        isIos (): boolean {
            const isTest = /iphone|ipad|ipod/.test(USER_AGENT);
            this.isIos = () => isTest;
            return isTest;
        },
        isIphoneX (): boolean {
            const isTest = this.isIos() && window.screen.width === 375 && window.screen.height === 812;
            this.isIphoneX = () => isTest;
            return isTest;
        }
    };
})();
