/**
 * @file utils/router.ts 路由模块
 * @author: 王佳欣
 * @email: 1974740999@qq.com
 */

import IS from '@utils/is';
import URI from '@utils/uri';

export default class Router {
    
    private static formatURL (url: any): string {
        let urlResult = '';
        
        if (typeof url === 'string' && url.indexOf('http') === 0) {
            urlResult = url;
        } 
        else if (typeof url === 'string') {
            const uri = URI.parse(window.location.href);
            const port = uri.port === 80 ? '' : `:${uri.port}`;
            const path = url.indexOf('/') === 0 ? `${uri.path}/` : ''
            urlResult = `${document.location.protocol}//${uri.hostname}${port}${path}${url}`
        } 
        else {
            urlResult = URI.format(url);
        }

        return urlResult;
    }

    public static push (url: any): void {
        window.location.href = Router.formatURL(url);
    }

    public static replace (url: any) {
        window.location.replace(Router.formatURL(url));
    }

    public static goBack () {
        // 如果有referrer来路，需要强制重新加载
        if (IS.isIos() && document.referrer) {
            Router.replace(document.referrer);
        } 
        else {
            window.history.go(-1);
        }
    }

    public static reload () {
        window.location.reload();
    }
};
