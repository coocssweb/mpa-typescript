/**
 * 用户登录模块
 * Created by 王佳欣 on 2018/4/4.
 */
import {ACCOUNT_JS_SDK, MT_ACCOUNT} from '../const';
import {loadJs} from '../utils';
import AuthApi from '../api/auth';
import Is from '../utils/is';

class Auth {
    /**
     * webview登录
     */
    webviewLogin () {
        if (!Is.isMeituApp()) {
            return false;
        }

        // 动态加载大账号SDK
        loadJs(ACCOUNT_JS_SDK).then(() => {
            if (window.MTAccount) {
                let mtAccount = window.MTAccount({
                    env: MT_ACCOUNT
                });

                let accountToken = mtAccount.accessToken;
                if (!accountToken) {
                    return false;
                }
                AuthApi.webview({webview_token: accountToken, client_id: '1089867664'}).then((response) => {
                    if (!response.meta.code) {
                        this.data.logined = true;
                    }
                });
            }
        });
    }
    /**
     * 强制登录
     * @returns {boolean}
     */
    requireLogin () {
        if (!this.userInfo.uid) {
            window.App.$tip({message: '请先登录~'});
            setTimeout(() => {
                this.redirectLogin();
            }, 2000);
            return false;
        }
        return true;
    }
    /**
     * 登录跳转
     * @param link
     */
    redirectLogin (link) {
        // callback传递参数
        let client_params = encodeURIComponent(JSON.stringify({back_url: encodeURIComponent(`${link || (top || window).location.href}`)}));
        // 登录回调页面
        let client_callback = encodeURIComponent(`${process.env.ACCOUNT_CALLBACK}`);
        window.App.$router.push(`${process.env.ACCOUNT_LOGIN}&client_callback=${client_callback}&client_params=${client_params}`);
    }
    // 判断用户是否已登录
    hasLogined () {
        return !!this.userInfo.uid;
    }
};

// install
function install (App, config) {
    if (install.installed) {
        return false;
    }

    install.installed = true;

    let auth = new Auth(config);

    Object.defineProperty(App.prototype, '$auth', {
        get () {
            return auth;
        }
    });

    Object.defineProperty(App.prototype, '_auth', {
        get () {
            return auth;
        }
    });
}

Auth.install = install;

export default Auth;
