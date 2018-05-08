/**
 * 登录回调
 * Created by 王佳欣 on 2018/4/4.
 */
import AuthApi from './api/auth';
import {ORIGIN_URL} from './const';
import Auth from './modules/auth';

// message 处理
let messageHandler = (e) => {
    let IE89 = /MSIE (8|9)\.0/.test(navigator.userAgent);
    let accountData = IE89 ? JSON.parse(e.data) : e.data;
    if (/account\.meitu\.com$/.test(e.origin) && typeof accountData.meta !== 'undefined') {
        accountData.response.client_id = 1089867664;
        let opType = accountData.response.op_type;
        let clientParams = accountData.meta.params;
        Auth.logout();
        if (opType !== 3) {
            AuthApi.login(accountData.response).then((data) => {
                if (data.meta.code === 0) {
                    window.top.location.href = `${ORIGIN_URL}/${clientParams.page ? `#${clientParams.page}` : ''}${clientParams.id ? `?id=${clientParams.id}` : ''}`;
                } else {
                    console.log('callback.json错误' + JSON.stringify(data));
                }
            });
        }
    }
};

/* eslint-disable */
if (typeof window.addEventListener != 'undefined') {
    window.addEventListener('message', messageHandler, false);
} else if (typeof window.attachEvent != 'undefined') {
    window.attachEvent('onmessage', messageHandler);
}
