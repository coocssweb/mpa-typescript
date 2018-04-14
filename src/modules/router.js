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
        let Component = App.extend(...route.component);

        components[getPath(route.path)] = {
            path: route.path,
            component: new Component(),
            beforeEnter: route.beforeEnter
        };
    });
    return components;
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
        this.to = this.routes[hash];
        const next = function () {
            this.route = this.to;
            if (this.from && this.from.component) {
                this.from.component.close();
            }

            if (this.route.created) {
                this.route.component.open();
            } else {
                this.route.component.create();
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

// install
function install (App) {
    if (install.installed) {
        return false;
    }

    install.installed = true;

    App.mixin({
        create () {
            console.log('create route mixin create');
            this._routerRoot = this;
            this._router = this.$options.router;
            this._router.init(this);
        }
    });

    Object.defineProperty(App.prototype, '$router', {
        get () {
            return this._routerRoot._router;
        }
    });
};

Router.install = install;

export default Router;
