/**
 * 用户登录模块
 * Created by 王佳欣 on 2018/4/4.
 */
import {ACCOUNT_URL, ACCOUNT_JS_SDK, MT_ACCOUNT} from '../const';
import {loadJs, tip} from '../utils';
import AuthApi from '../api/auth';
import Is from '../utils/is';

export default {
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
};
