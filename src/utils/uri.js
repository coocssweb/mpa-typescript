// 获取path
// return string
export const getPath = (path) => {
    let regHash = /^\/#?/;
    return path.replace(regHash, '') ? path.replace(regHash, '') : 'default';
};

// 解析URL地址
// return {path, query, hash}
export const parsePath = (path) => {
    let hash = '';
    let queryStr = '';
    let queryArr = [];
    let query = {};

    const pathStr = document.location.origin + document.location.pathname;

    hash = location.hash ? location.hash.split(/&|\?|#/)[1] : '';

    location.href.split(/&|\?|#/).map((item) => {
        if (item.indexOf('=') > -1) {
            let values = item.split('=');
            query[values[0]] = values[1];
            queryArr.push(item);
        }
    });
    queryStr = queryArr.join('&');
    path = hash ? (queryStr ? (`${pathStr}#${hash}?${queryStr}`) : (`${pathStr}#${hash}`)) : pathStr;

    return { path, query, hash: hash || 'default' };
};

// 字符串化
// return key1=value1&key2=value2
export const stringifyQuery = (query) => {
    const res = Object.keys(query).map((key) => {
        return `${key}=${query[key]}`;
    });

    return res.join('&');
};

// 格式化分享Url
export const formatShareUrl = (url) => {
    let [origin, tHash] = url.split('#');
    let [hash, queryStr] = (tHash || '').split('?');

    // #hash?id=1 ==> ?id=1#hash
    return `${origin}${queryStr ? `?${queryStr}` : ''}${hash ? `#${hash}` : ''}`;
};
