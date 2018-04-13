/**
 * 路由定义
 */
import Home from './pages/home';
import Test from './pages/test';
import Router from './modules/router';

/**
 * 路由模块定义
 */
const routes = [
    {
        path: '/',
        component: Home,
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

export default new Router({routes});
