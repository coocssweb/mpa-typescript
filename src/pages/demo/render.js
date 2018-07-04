/**
 * 渲染
 * Created by 王佳欣 on 2018/4/15.
 */
import Layout from 'layout';
import Home from './template/home.ejs';
import Test from './template/test.ejs';

export default Layout.render({
    title: '测试Title',
    keyword: '测试Keyword',
    description: '测试Description',
    templates: [Home, Test],
    siteId: 3300333
});
