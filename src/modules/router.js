/**
 *
 * Created by 王佳欣 on 2018/4/11.
 */
import Transition from './transition';

const getPath = (path) => {
    let regHash = /^\/#?/;
    return path.replace(regHash, '') ? path.replace(regHash, '') : 'default';
};

// 组件解析
const resolveComponents = (routes) => {
    let matched = {};
    routes.map((route) => {
        matched[getPath(route.path)] = {
            path: route.path,
            component: Object.assign({}, Transition, route.component),
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
const stringifyQuery = (path) => {
    const res = Object.keys(path.query).map((key) => {
        return `${key}=${path.query[key]}`;
    });

    return res.join('&');
};

class Router {
    constructor (options) {
        let {path, query, hash} = parsePath(location.href);
        let routes = resolveComponents(options.routes);
        Object.assign(this, {path}, {query}, {hash}, {routes});
        this.init();
    }

    /**
     * 路由替换
     */
    replace (hash) {
        window.location.replace(`${this.path}$/#${this.hash}`);
    }

    /**
     * 路由push
     */
    push (hash) {
        window.location.hash = hash;
    }

    /**
     * 路由跳转
     */
    transitionTo (hash, onComplete) {
        this.from = this.route;
        this.route = this.routes[hash];
        if (this.from && this.from.component) {
            this.from.component.close();
        }

        if (this.route.created) {
            this.route.component.open();
        } else {
            this.route.component.created();
            this.route.created = true;
        }

        this.from && this.from.close && this.from.close();

        onComplete && onComplete();
    }

    /**
     * 路由监听
     */
    setupListeners () {
        window.addEventListener('hashchange', () => {
            let {hash} = parsePath(window.location.href);
            this.transitionTo(hash, () => {
                console.log('hash change complete');
            });
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


export default Router;
