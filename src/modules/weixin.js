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

    setShare (option, trigger, success, fail, cancel) {
        const PLATS = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'];
        let {link, title, desc, imgUrl} = option || {
            link: '',
            title: '',
            desc: '',
            imageUrl: ''
        };

        /* eslint-disable */
        wx.ready(function () {
            PLATS.map((plat) => {
                wx.onMenuShareTimeline({
                    title,
                    desc,
                    link,
                    imgUrl,
                    trigger: function () {
                        trigger && trigger();
                    },
                    success: function () {
                        success && success();
                    },
                    fail: function () {
                        fail && fail();
                    },
                    cancel: function () {
                        cancel && cancel();
                    }
                });
            });
        });
    }

    callShare () {

    }

    previewImage (urls, currentIndex) {
        wx.previewImage({
            urls,
            current: urls[currentIndex]
        });
    }

    downLoadImage () {

    }

    closeWindow () {
        wx.closeWindow();
    }

    chooseWXPay ({timestamp, nonceStr, packageStr, signType, paySign}) {
        wx.chooseWXPay({
            timestamp,
            nonceStr,
            package: packageStr,
            signType,
            paySign
        });
    }

    config ({timestamp, nonceStr, signature}) {
        /* eslint-disable */
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
            console.log(wx);
            return $.ajax({
                url: this.tokenUrl,
                dataType: 'jsonp',
                type: 'get',
                data: {},
                responseType: 'json',
                async: true,
                xhrFields: {withCredentials: true},
            }).then(response => {
                let {timestamp, nonceStr, signature} = response;
                this.config({timestamp, nonceStr, signature});
                this.setShare(config);
            });
        });
    }
}

// install
function install (App, config) {
    if (install.installed) {
        return false;
    }

    install.installed = true;

    let weixin = new Weixin(config);


    Object.defineProperty(App.prototype, '$weixin', {
        get () {
            return weixin;
        }
    });

    Object.defineProperty(App.prototype, '_weixin', {
        get () {
            return weixin;
        }
    });
}

Weixin.install = install;

export default  Weixin;
