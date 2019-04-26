/**
 * @file src/layout/index.ts 模板渲染
 * @author: 王佳欣
 * @email: 1974740999@qq.com
 */
import layoutEjs from './layout.ejs';
import headerEjs from './header.ejs';
import footerEjs from './footer.ejs';
import loadingEjs from './loading.ejs';
import locationEjs from './location.ejs';

export default {
    render: ({ title, keyword, description, content, location, loading = false }) => {
        const renderData = {
            title,
            keyword,
            description,
            header: headerEjs({ STATIC_PATH: process.env.STATIC_PATH }),
            footer: footerEjs({ STATIC_PATH: process.env.STATIC_PATH }),
            loading: loading ? loadingEjs() : null,
            content: typeof content === 'string' ? content : content(),
            console: process.env.NODE_ENV !== 'production',
            location: location && location.length ? locationEjs({ location }) : null
        };
        return layoutEjs(renderData);
    }
};
