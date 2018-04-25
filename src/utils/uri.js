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
    let query = {};
    const hashIndex = path.indexOf('#');
    const queryIndex = path.indexOf('?');
    if (hashIndex >= 0) {
        hash = path.slice(hashIndex + 1, queryIndex >= 0 ? queryIndex : path.length);
    }

    if (queryIndex >= 0) {
        queryStr = path.slice(queryIndex + 1);
    }

    if (queryStr) {
        queryStr.split('&').map((item) => {
            let values = item.split('=');
            if (values[0]) {
                query[values[0]] = values.length > 1 ? values[1] : '';
            }
        });
    }

    path = hashIndex >= 0 ? (path.slice(0, hashIndex)) : (queryIndex >= 0 ? path.slice(0, queryIndex) : path);

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
