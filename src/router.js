/**
 * 路由定义
 */
import Home from './pages/home';
import Test from './pages/test';
import Router from './modules/router';
import App from './app';

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
