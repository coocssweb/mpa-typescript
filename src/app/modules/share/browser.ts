/**
 * @file app/modules/browser.ts browser
 * @author: 王佳欣
 * @email: 1974740999@qq.com
 */
import { ShareInfo } from '../../../interface';
import { getAnimationEvent } from '@utils/device';
import { isNodeFound } from '@utils/domHelper';
import Share from './share';

export default class Browser extends Share {
    static readonly prefix = 'globalShare';
    private $domShare: HTMLElement;
    private $domWeibo: Node;
    private $domQzone: Node;
    private animationEvent: string;
    private haveOpend: boolean = false;
    private weiboUrl: string;
    private qzoneUrl: string;

    constructor (shareInfo: ShareInfo) {
        super();
        this.setShareInfo(shareInfo);

        // rebind
        this.handleDestory = this.handleDestory.bind(this);
        this.handleOut = this.handleOut.bind(this);
        this.openShare = this.openShare.bind(this);

        this.animationEvent = getAnimationEvent();
    }

    public setShareInfo (shareInfo: ShareInfo) {
        this.weiboUrl = encodeURI(`http://v.t.sina.com.cn/share/share.php?` +
            `url=${shareInfo.link}&title=${shareInfo.title}/${shareInfo.desc}&` + 
            `charset=utf-8&pic=${shareInfo.imgUrl}&searchPic=true`);

        this.qzoneUrl = encodeURI(`http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey` + 
            `?url=${shareInfo.link}&title=${shareInfo.title}&desc=${shareInfo.desc}`+
            `&charset=utf-8&pics=${shareInfo.imgUrl}&site=${shareInfo.link}&otype=share`);
    }

    public callShare () {
        if (this.haveOpend) {
            return;
        }

        this.haveOpend = true;

        if (!this.$domShare) {
            this.createShareDom();
        } else {
            this.$domShare.classList.remove('doHide');
        }

        // bindEvents in events, to avoid call bind fn immediately.
        setTimeout(() => {
            this.bindEvents();
        }, 0);
    }

    private createShareDom () {
        this.$domShare = document.createElement('div');
        this.$domShare.classList.add(Browser.prefix);
        this.$domShare.classList.add(`${Browser.prefix}—browser`);
        this.$domShare.innerHTML = `<div class="${Browser.prefix}-inner">
            <h3 class="${Browser.prefix}-title">#分享价值#</h3>
            <ul class="${Browser.prefix}-list">
                <li class="${Browser.prefix}-item">
                    <div class="${Browser.prefix}-icon ${Browser.prefix}-icon--wx"><i></i>微信</div>
                    <div class="${Browser.prefix}-qrcode">
                        <img src="https://raw.githubusercontent.com/coocssweb/coocssweb.github.io/master/photos/qrcode.png">
                    </div>
                </li>
                <li class="${Browser.prefix}-item" >
                    <div class="${Browser.prefix}-icon ${Browser.prefix}-icon--wb"><i></i>微博</div>
                </li>
                <li class="${Browser.prefix}-item" >
                    <div class="${Browser.prefix}-icon ${Browser.prefix}-icon--qzone"><i></i>QQ空间</div>
                </li>
            </div>
        </div>`;
        
        document.body.appendChild(this.$domShare);
        this.$domWeibo = document.querySelector(`.${Browser.prefix}-icon--wb`);
        this.$domQzone = document.querySelector(`.${Browser.prefix}-icon--qzone`);
    }

    private openShare (e: any) {
        window.open(e.currentTarget === this.$domWeibo ? this.weiboUrl : this.qzoneUrl);
    }

    private bindEvents () {
        document.addEventListener('click', this.handleOut);
        this.$domShare.addEventListener(this.animationEvent, this.handleDestory);
        this.$domWeibo.addEventListener('click', this.openShare);
        this.$domQzone.addEventListener('click', this.openShare);
    }

    private unbindEvents () {
        document.removeEventListener('click', this.handleOut);
        this.$domShare.removeEventListener(this.animationEvent, this.handleDestory);
        this.$domWeibo.removeEventListener('click', this.openShare);
        this.$domQzone.removeEventListener('click', this.openShare);
    }

    private handleOut (e: any) {
        if (!isNodeFound(e.target, this.$domShare)) {
            this.$domShare.classList.add('doOut');
        }
    }

    private handleDestory () {
        if (this.$domShare.classList.contains('doOut')) {
            this.haveOpend = false;
            this.unbindEvents();
            
            // remove dom
            this.$domShare.classList.add('doHide');
            this.$domShare.classList.remove('doOut');
        }
    }
}