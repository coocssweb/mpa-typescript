import layoutEjs from './layout.ejs';
// 渲染页面
export default {
    render: ({title, keyword, description, templates, siteId}) => {
        let contents = templates.map((template) => {
            return template();
        });

        return layoutEjs({
            title,
            keyword,
            description,
            contents,
            siteId,
            console: process.env.NODE_ENV !== 'production'
        });
    }
};
