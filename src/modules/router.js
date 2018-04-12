/**
 * 路由管理
 * Created by 王佳欣 on 2018/4/11.
 */
import URI from 'urijs';

// 替换Hash
const replaceHash = (path) => {
    window.location.replace(`${_uri.origin()}/#${path}`);
};



export default class Router {
    constructor (routes) {
        this.routes = routes;
        this.current = {
            path: location.path || '/',
            hash: location.hash || '',
        };
    }
    // 解析组件
    resolveComponents () {

    }
    match () {

    }
    // 跳转
    transitionTo (hash, done) {
        done && done();
    }
    /**
     * 路由监听
     */
    setupListeners () {
        window.addEventListener('hashchange', () => {
            let uri = new URI();
            this.transitionTo(uri.hash(), route => {
                replaceHash(route.fullPath)
            })
        })
    }
    init () {
        this.setupListeners();
    }
};
