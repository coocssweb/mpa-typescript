/**
 * 路由模块
 * Created by 王佳欣 on 2018/4/11.
 */
import {getPath, parsePath, stringifyQuery} from '../utils/uri';
import App from '../app';

// 组件解析
const resolveComponents = (routes) => {
    let components = {};
    routes.map((route) => {
        let Component = App.extend(route.component);
        components[getPath(route.path)] = {
            path: route.path,
            _component: Component,
            beforeEnter: route.beforeEnter
        };
    });
    return components;
};

class Router {
    constructor (options) {
        let {path, query, hash} = parsePath(location.href);
        this.options = options;
        Object.assign(this, {path}, {query}, {hash});
    }

    /**
     * 路由替换
     */
    replace (hash, query = '') {
        let strQuery = stringifyQuery(query);
        window.location.replace(`${this.path}#${hash}${strQuery ? `?${strQuery}` : ''}`);
    }

    /**
     * 路由push
     */
    push (hash, query = '') {
        let strQuery = stringifyQuery(query);
        window.location.hash = `${hash}${strQuery ? `?${strQuery}` : ''}`;
    }

    /**
     * 路由跳转
     */
    transitionTo (hash, onComplete) {
        this.from = this.route;
        this.to = this.routes[hash];
        const next = function () {
            this.route = this.to;
            if (this.from && this.from.component) {
                this.from.component.close();
            }

            if (this.route.created) {
                this.route.component.open();
            } else {
                this.route.component = new this.route._component({router: this});
                this.route.created = true;
            }

            this.from && this.from.close && this.from.close();

            onComplete && onComplete();
        };

        if (this.routes[hash].beforeEnter) {
            this.routes[hash].beforeEnter(this.from, this.to, next.bind(this));
        } else {
            next.apply(this);
        }
    }

    /**
     * 路由监听
     */
    setupListeners () {
        window.addEventListener('hashchange', () => {
            let {path, hash, query} = parsePath(window.location.href);
            if (hash === this.path) {
                Object.assign(this, {path}, {query}, {hash});
                return false;
            }
            Object.assign(this, {path}, {query}, {hash});
            this.transitionTo(hash, () => {

            });
        });
    }

    /**
     * 初始化
     */
    init () {
        let routes = resolveComponents(this.options.routes);
        Object.assign(this, {routes});
        this.setupListeners();
        this.transitionTo(this.hash);
    }
};

// install
function install (App) {
    if (install.installed) {
        return false;
    }

    install.installed = true;

    App.mixin({
        beforeCreate () {
            this._router = this.$options.router;
        }
    });

    Object.defineProperty(App.prototype, '$router', {
        get () {
            return this._router;
        }
    });
};

Router.install = install;

export default Router;
