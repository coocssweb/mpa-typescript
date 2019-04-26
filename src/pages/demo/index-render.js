import layout from '@layout';
import content from './index.ejs';
const title = '这是另一个页面';
const keyword = '另一个页面关键字';
const description = '另一个页面描述';

export default layout.render({
    title,
    keyword,
    description,
    content,
    loading: true,
    location: []
});
