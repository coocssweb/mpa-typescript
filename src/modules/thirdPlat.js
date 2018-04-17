/**
 * 分享模块
 * Created by 王佳欣 on 2018/4/15.
 */
import {loadJs} from '../utils';
import Is from '../utils/is';

class ThirdPlat {
    constructor ({tokenUrl, tokenType = 'json', jsSdk = '//res.wx.qq.com/open/js/jweixin-1.2.0.js'}) {
        this.tokenUrl = tokenUrl;
        this.jsSdk = jsSdk;
        this.tokenType = tokenType;
    }

    setShare (option, trigger, success, fail, cancel) {
        if (!Is.isWechat() && !Is.isQQ() && !Is.isQZone()) {
            return false;
        }

        const PLATS = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'];
        let {link, title, desc, imgUrl} = option || {
            link: '',
            title: '',
            desc: '',
            imageUrl: ''
        };
        /* eslint-disable */
        wx.error(function (error) {
            console.log(error);
        });
        wx.ready(function () {
            PLATS.map((plat) => {
                wx[plat]({
                    title,
                    desc,
                    link,
                    imgUrl,
                    trigger: function (e) {
                        console.log(e);
                        trigger && trigger();
                    },
                    success: function (e) {
                        console.log(e);
                        success && success();
                    },
                    fail: function () {
                        console.log(e);
                        fail && fail();
                    },
                    cancel: function () {
                        console.log(e);
                        cancel && cancel();
                    }
                });
            });
        });
    }

    callShare () {
        $('body').append(`<div class="global-share"></div>`);
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

    config ({appId, timestamp, nonceStr, signature}) {
        /* eslint-disable */
        wx.config({
            debug: false,
            appId,
            timestamp,
            nonceStr,
            signature,
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                'closeWindow',
                'getLocation',
                'openLocation',
                'getLocation',
                'chooseImage',
                'previewImage',
                'downloadImage',
            ]
        });
    }

    bindEvent () {
        $('body').on('click', '.global-share', () => {
            $('.global-share').remove();
        });
    }

    init (config) {
        this.bindEvent();
        
        if (!Is.isWechat() && !Is.isQQ() && !Is.isQZone()) {
            return false;
        }

        loadJs (this.jsSdk).then(() => {
            window.wx = wx;
            return $.ajax({
                url: this.tokenUrl,
                dataType: this.tokenType,
                type: 'get',
                data: {
                    url: location.href.split('#')[0],
                    t: new Date().getTime()
                },
                responseType: 'json',
                async: true,
                xhrFields: {withCredentials: true},
            }).then(response => {
                let {appId, timestamp, nonceStr, signature} = response;
                this.config({appId, timestamp, nonceStr, signature});
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

    let thirdPlat = new ThirdPlat(config);


    Object.defineProperty(App.prototype, '$thirdPlat', {
        get () {
            return thirdPlat;
        }
    });

    Object.defineProperty(App.prototype, '_thirdPlat', {
        get () {
            return thirdPlat;
        }
    });
}

ThirdPlat.install = install;

export default  ThirdPlat;
