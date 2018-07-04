/**
 * 路由定义
 */
import Home from './home';
import Test from './test';
import Router from 'resources_modules/router';
import App from 'app';

App.use(Router);

/**
 * 路由模块定义
 */
const routes = [
    {
        path: '/',
        component: Home,
        beforeEnter: (from, to, next) => {
            next();
        }
    },
    {
        path: '/home',
        component: Home,
    },
    {
        path: '/test',
        component: Test,
    }
];

let router = new Router({routes});

export default router;
