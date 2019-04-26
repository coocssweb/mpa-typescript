import layout from '@layout';
import content from './index.ejs';
const title = '这是首页';
const keyword = '首页关键字';
const description = '首页描述';

export default layout.render({
    title,
    keyword,
    description,
    content,
    loading: false,
    location: []
});
