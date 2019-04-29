/**
 * @file app/modules/wechat.ts wechat
 * @author: 王佳欣
 * @email: 1974740999@qq.com
 */

import { ShareInfo } from '../../../interface';
import { getAnimationEvent } from '@utils/device';
import { loadScript } from '@utils/index';
import { ajax, jsonp } from '../ajax';
import Share from './share';

// window property
declare global {
    interface Window {
        wx: any
    }
};
// declare let window: any;
export default class WeChat extends Share {
    static prefix = 'globalShare';
    private $domShare: HTMLElement;
    private wechat: any;
    private shareInfo: ShareInfo;
    private animationEvent: string;
    private created: boolean = false;

    constructor (tokenUrl: string, shareInfo: ShareInfo) {
        super();
        this.shareInfo = shareInfo;
        this.animationEvent = getAnimationEvent();

        // rebind
        this.handleDestory = this.handleDestory.bind(this);
        this.handleOut = this.handleOut.bind(this);

        this.handleLoadSignature(tokenUrl).then(({appId, timestamp, nonceStr, signature}) => {
            this.setConfig({appId, timestamp, nonceStr, signature});
            this.setShareInfo(this.shareInfo);
        });
    }

    private async handleLoadSignature (tokenUrl: string) {
        // load wechat sdk
        await loadScript ('//res.wx.qq.com/open/js/jweixin-1.2.0.js');
        this.wechat = window.wx;

        // request wechat token
        const result =  await jsonp({
            url: tokenUrl,
            dataType: 'json',
            data: {
                url: location.href,
                t: new Date().getTime()
            },
            xhrFields: {withCredentials: true},
        });

        return result;
    }

    private setConfig ({appId, timestamp, nonceStr, signature}): void {
        this.wechat.config({
            debug: false,
            appId,
            timestamp,
            nonceStr,
            signature,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ',
            'onMenuShareWeibo','onMenuShareQZone','closeWindow','getLocation',
            'openLocation', 'getLocation', 'chooseImage', 'previewImage', 'downloadImage']
        });
    }

    public setShareInfo (shareInfo: ShareInfo): void {
        this.wechat.error(function (error: any) {
            console.log(error);
        });

        this.wechat.ready(() => {
            ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ',
            'onMenuShareWeibo', 'onMenuShareQZone'].map((platItem) => {
                this.wechat[platItem]({
                    ... shareInfo,
                    trigger (e) {
                    },
                    success(e) {
                    },
                    fail() {
                    },
                    cancel() {
                    }
                });
            });
        });
    }

    public previewImage (images: Array<string>, currentIndex: number): void {
        this.wechat.previewImage({
            images,
            current: images[currentIndex]
        });
    }

    public closeWindow (): void {
        this.wechat.closeWindow();
    }

    public callShare () {
        if (this.created) {
            return;
        }
        this.created = true;
        // create dom
        this.$domShare = document.createElement('div');
        this.$domShare.classList.add(WeChat.prefix);
        this.$domShare.classList.add(`${WeChat.prefix}—wechat`);
        this.bindEvents();
        document.body.appendChild(this.$domShare);
    }

    private bindEvents () {
        this.$domShare.addEventListener('click', this.handleOut);
        this.$domShare.addEventListener(this.animationEvent, this.handleDestory);
    }

    private unbindEvents () {
        this.$domShare.removeEventListener('click', this.handleOut);
        this.$domShare.removeEventListener(this.animationEvent, this.handleDestory);
    }

    private handleOut () {
        this.$domShare.classList.add('doOut');
    }

    private handleDestory () {
        if (this.$domShare.classList.contains('doOut')) {
            this.created = false;
            this.unbindEvents();
            
            // remove dom
            document.body.removeChild(this.$domShare);
        }
    }
};
