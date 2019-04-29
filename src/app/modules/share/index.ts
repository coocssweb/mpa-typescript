/**
 * @file app/share/index.ts share
 * @author: 王佳欣
 * @email: 1974740999@qq.com
 */
import { ShareInfo } from '../../../interface';
import Wechat from './wechat';
import QQ from './qq';
import Browser from './browser';
import IS from '@utils/is';
import Share from './share';


export default class Index {
    private shareInfo: ShareInfo;
    private platform: Share;

    static defaultShareInfo: ShareInfo = {
        title: document.title,
        desc: '',
        link: window.location.href,
        imgUrl: ''
    };

    constructor (tokenUrl?: string, appId?: string, shareInfo?: ShareInfo) {
        shareInfo = { ...Index.defaultShareInfo, ...shareInfo };
        const is = IS();

        if (is.isWechat()) {
            this.platform = new Wechat(tokenUrl, shareInfo);
        } 
        else if (is.isQQ()) {
            this.platform = new QQ(appId, shareInfo);
        } 
        else {
            this.platform = new Browser(shareInfo);
        }
    }

    public setShareInfo (shareInfo: ShareInfo) {
        shareInfo = { ...Index.defaultShareInfo, ...shareInfo };
        this.platform.setShareInfo(shareInfo);
    }

    public callShare () {
        this.platform.callShare();
    }
}