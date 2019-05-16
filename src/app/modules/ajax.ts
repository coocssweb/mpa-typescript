/**
 * @file utils/ajax.ts ajax、jsonp 网络请求
 * @author: 王佳欣
 * @email: 1974740999@qq.com
 */
import { AjaxOptions, ContentType, XhrFields, JsonpOptions } from '../../interface';

/**
 * ajax
 */
function Ajax(options: AjaxOptions): Promise<any> {
    options = { ...Ajax.defaultOptions, ...options };
    const xmlHttp: XMLHttpRequest = new XMLHttpRequest();

    // define request data
    if (options.contentType = ContentType.Urlencoded) {
        const keysOfData = Object.keys(options.data);
        const strQuery = keysOfData.map(key => { 
            return `${key}=${options.data[key]}`
        }).join('&');
    
        if (options.method === 'get') {
            options.url = options.url.indexOf('?') > -1 
                            ? `${options.url}&${strQuery}`
                            : `${options.url}?${strQuery}`;
        }
        else if (options.method === 'post') {
            options.data = strQuery;
        }
    }
    
    // define request header
    xmlHttp.open(options.method, options.url, options.async);
    options.token !== '' && xmlHttp.setRequestHeader('Authorization', options.token);
    xmlHttp.setRequestHeader('Content-Type', options.contentType);
    xmlHttp.setRequestHeader('Accept', options.dataType);

    // when cross domain, set withCredentials to send cookies
    if (options.xhrFields.withCredentials) {
        xmlHttp.withCredentials = options.xhrFields.withCredentials;
    }

    return new Promise ((reslove, reject) => {
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState !== 4) {
                return;
            }

            if (xmlHttp.status >= 200 && xmlHttp.status <= 304) {
                reslove(JSON.parse(xmlHttp.responseText));
            } 
            else {
                reject(JSON.parse(xmlHttp.responseText));
            }
        };

        xmlHttp.send(options.data ? options.data : null);
    });
};

Ajax.defaultOptions = {
    url: '',
    method: 'get',
    data: {},
    dataType: 'json',
    contentType: ContentType.Urlencoded,
    xhrFields: {
        withCredentials: false
    },
    token: '',
    async: true
};

export const ajax = Ajax;

/**
 * jsonp
 */
function Jsonp (options: JsonpOptions): Promise<any> {
    options = { ...Jsonp.defaultOptions, ...options };
    if (!options.url) {
        return Promise.resolve(null);
    }

    const script = document.createElement('script');
    const jsonpCallback = `jsonp_${+new Date()}`;
    options.jsonpCallback = jsonpCallback;
    
    const allKeys = Object.keys(options.data);
    const strQuery = allKeys.map(key => { 
        if (key !== 'callback') {
            return `${key}=${options.data[key]}`;
        }
    }).join('&');

    const url = `${options.url}${options.url.indexOf('?')> -1 ? '&' : '?'}callback=${jsonpCallback}&${strQuery}`;
    script.setAttribute('src', url);
    
    return new Promise ((resolve, reject) => {
        window[jsonpCallback] = (data: any) => {
            delete window[jsonpCallback];
            document.head.removeChild(script);
            resolve(data);
        };
        document.head.appendChild(script);
    });
};

Jsonp.defaultOptions = {
    url: '',
    data: {}
};

export const jsonp = Jsonp;