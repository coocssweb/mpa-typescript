/**
 *
 * Created by 王佳欣 on 2018/4/11.
 */
const getPath = (path) => {
    return path ? path.replace(/^\//, '') : 'default'
};

// 组件解析
const resolveComponents = (routes) => {
    let matched = {};
    routes.map((route) => {
        matched[getPath(route.path)] = {
            path: route.path,
            component: route.component,
            beforeEnter: route.beforeEnter
        };
    });
    return matched;
};

// 解析URL地址
// return {path, query, hash}
const parsePath = (path) => {
    let hash = '';
    let queryStr = '';
    let query = {};
    const hashIndex = path.indexOf('#');
    if (hasIndex >= 0) {
        hash = path.slice(hashIndex);
        path = path.slice(0, hashIndex);
    }

    const queryIndex = path.indexOf('?');
    if (queryIndex >= 0) {
        queryStr = path.slice(queryIndex + 1);;
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
const stringifyPath = (path) => {
    const res = Object.keys(path.query).map((key) => {
        return `${key}=${path.query[key]}`;
    });

    return `${path.path}?${res.join('&')}`;
};

class Router {
    constructor(routes) {
        let {path, query, hash} = parsePath(location.href);
        let matched = resolveComponents(routes);
        Object.assign(this, path, query, hash, matched);
    }

    /**
     * 路由替换
     */
    replace (path) {

    }

    /**
     * 路由push
     */
    push (path) {

    }

    /**
     * 路由跳转
     */
    transitionTo (hash, onComplete) {
        let current = this.matched[hash];
        if (current.created) {
            current.component.open();
        } else {
            current.component.created();
            current.created = true;
        }

        onComplete && onComplete();
    }

    /**
     * 路由监听
     */
    setupListeners () {
        window.addEventListener('hashchange', () => {

        });
    }

    /**
     * 初始化
     */
    init () {
        this.setupListeners();
        this.transitionTo(this.hash);
    }
};
