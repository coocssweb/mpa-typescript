/**
 * 分享模块
 * Created by 王佳欣 on 2018/4/15.
 */
import {loadJs} from '../utils';

class Weixin {
    constructor ({appId, tokenUrl, jsSdk = '//res.wx.qq.com/open/js/jweixin-1.2.0.js'}) {
        this.appId = appId;
        this.tokenUrl = tokenUrl;
        this.jsSdk = jsSdk;
    }

    set ({link, title, desc, imgUrl}, trigger, success, fail, cancel) {
        const PLATS = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'];
        wx.ready(function () {
            PLATS.map((plat) => {
                /* eslint-disable */
                wx.onMenuShareTimeline({
                    title,
                    desc,
                    link,
                    imgUrl,
                    trigger: function () {
                        trigger();
                    },
                    success: function () {
                        success();
                    },
                    fail: function () {
                        fail();
                    },
                    cancel: function () {
                        cancel();
                    }
                });
            });
        });
    }

    config ({timestamp, nonceStr, signature}) {
        wx.config({
            debug: false,
            appId: this.appId,
            timestamp,
            nonceStr,
            signature,
            jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'getNetworkType',
                'openLocation',
                'getLocation',
                'closeWindow',
                'scanQRCode',
                'chooseWXPay'
            ]
        });
    }

    init (config) {
        loadJs (this.jsSdk).then(() => {
            return $.ajax({
                url: this.tokenUrl,
                'get',
                data: {},
                responseType: 'json',
                async: true,
                xhrFields: {withCredentials: true},
            }).then(response => {
                let {timestamp, nonceStr, signature} = response;
                this.config({timestamp, nonceStr, signature});
                this.set(config);
            });
        });
    }
}

// install
function install (App) {
    if (install.installed) {
        return false;
    }

    install.installed = true;

    App.mixin({
        beforeCreate () {
            this._weixin = this.$options.weixin;
        }
    });

    Object.defineProperty(App.prototype, '$weixin', {
        get () {
            return this._weixin;
        }
    });
}

Weixin.install = install;

export default  Weixin;
