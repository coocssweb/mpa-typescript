/**
 * 登录回调
 * Created by 王佳欣 on 2018/4/4.
 */
import {API_URL} from '../const';
import Base from './base';

class Auth extends Base {
    /**
     * 大账号登录
     * @param data
     * @returns {*}
     */
    login (data) {
        let url = `${API_URL}oauth/meitu.json`;
        return this.request({url, data, type: 'post'});
    }

    /**
     * 美图系webview自动登录
     * @returns {*}
     */
    webview (data) {
        let url = `${API_URL}oauth/webview.json`;
        return this.request({url, data, type: 'post'});
    }
};

export default new Auth();
