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
        this.shareConfig = {
            link: '',
            title: '',
            desc: '',
            imgUrl: ''
        };
        this.trigger = null;
        this.success = null;
        this.fail = null;
        this.cancel = null;
    }

    setShare (option, trigger, success, fail, cancel) {
        this.shareConfig = option;

        if (!Is.isWechat() && !Is.isQQ() && !Is.isQZone()) {
            return false;
        }

        const PLATS = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'];
        let {link, title, desc, imgUrl} = option || {
            link: '',
            title: '',
            desc: '',
            imgUrl: ''
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
                        trigger && trigger();
                    },
                    success: function (e) {
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
        if (Is.isWeibo() || Is.isQZone() || Is.isWechat() || Is.isWeibo()) {
            $('body').append(`<div class="globalShare globalShare——social"></div>`);
            return false;
        }

        $('body').append(`<div class="globalShare globalShare——browser"></div><div class="globalShare-content">
                <div class="globalShare-title"># 分享到 #</div>
                <div class="globalShare-list">
                    <a class="globalShare-item" target="_share" href="${encodeURI(`http://v.t.sina.com.cn/share/share.php?url=${this.shareConfig.link}&title=${this.shareConfig.title}&description=${this.shareConfig.desc}&charset=utf-8&pic=${this.shareConfig.imageUrl}`)}&searchPic=true" class="globalShare-item globalShare-item">
                        <span class="globalShare-icon globalShare-icon——weibo"></span>
                        <span class="globalShare-name">微博</span>
                    </a>
                    <a class="globalShare-item" target="_share" href="${encodeURI(`http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${this.shareConfig.link}&title=${this.shareConfig.title}&desc=${this.shareConfig.desc}&charset=utf-8&pics=${this.shareConfig.imageUrl}&site=${this.shareConfig.link}&otype=share`)}" class="globalShare-item globalShare-item">
                        <span class="globalShare-icon globalShare-icon——qqzone"></span>
                        <span class="globalShare-name">QQ空间</span>
                    </a>
                    <a class="globalShare-item" target="_share" href="${encodeURI(`http://widget.renren.com/dialog/share?resourceUrl=${this.shareConfig.link}&title=${this.shareConfig.title}&description=${this.shareConfig.desc}&charset=utf-8&pic=${this.shareConfig.imageUrl}`)}" class="globalShare-item globalShare-item">
                        <span class="globalShare-icon globalShare-icon——renren"></span>
                        <span class="globalShare-name">人人网</span>
                    </a>
                </div>
                <a href="javascript:;" class="globalShare-cancel">取消</a>
            </div>`);
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
        $('body').on('click', '.globalShare, .globalShare-cancel', () => {
            $('.globalShare').remove();
            $('.globalShare-content').remove();

            if (Is.isWeibo()) {
                this.success && this.success();
            } else {
                this.cancel && this.cancel();
            }
        });

        $('body').on('click', '.globalShare-item', () => {
            $('.globalShare').remove();
            $('.globalShare-content').remove();
            this.success && this.success();
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
