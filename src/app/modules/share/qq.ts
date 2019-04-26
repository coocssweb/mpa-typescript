/**
 * @file utils/ajax.ts qq分享
 * @author: 王佳欣
 * @email: 1974740999@qq.com
 */
import { ShareInfo } from '../../../interface';
import { loadScript } from '@utils/index';
import Share from './share';

// window property
declare global {
    interface Window {
        __mqq__: any
    }
};

export default class QQ extends Share {
    private shareInfo: ShareInfo;
    private qq: any;
    constructor (appId: string, shareInfo: ShareInfo) {
        super();
        this.shareInfo = shareInfo;
        this.loadQQ(appId).then(() => {
            this.setShareInfo();
        });
    }

    private async loadQQ (appId: string) {
        await loadScript (`//open.mobile.qq.com/sdk/qqapi.js?_bid=${appId}`);
        this.qq = window.__mqq__;
    }

    public setShareInfo () {
        let {title, desc, link, imgUrl} = this.shareInfo;
        this.qq.data.setShareInfo({
            title,
            desc,
            share_url: link,
            image_url: imgUrl,
        });
    }

    public callShare () {
        this.qq.ui.showShareMenu();
    }
}
