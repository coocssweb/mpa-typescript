/**
 * http请求基础类
 * Created by 王佳欣 on 2018/4/2.
 */
export default class Base {
    request ({url, data, type = 'get', responseType = 'json', async = true}) {
        return $.ajax({
            url,
            type,
            data,
            responseType,
            async,
            xhrFields: {withCredentials: true},
        });
    };
};
