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
    if (hashIndex >= 0) {
        hash = path.slice(hashIndex + 1);
        path = path.slice(0, hashIndex);
    }

    const queryIndex = path.indexOf('?');
    if (queryIndex >= 0) {
        queryStr = path.slice(queryIndex + 1);
        path = path.slice(0, queryIndex);
    }

    if (queryStr) {
        queryStr.split('&').map((item) => {
            let values = item.split(':');
            if (values[0]) {
                query[values[0]] = values.length > 1 ? values[1] : '';
            }
        });
    }

    return { path, query, hash: hash || 'default' };
};

// 字符串化path
// return path?key1=value1&key2=value2
export const stringifyQuery = (path) => {
    const res = Object.keys(path.query).map((key) => {
        return `${key}=${path.query[key]}`;
    });

    return res.join('&');
};
