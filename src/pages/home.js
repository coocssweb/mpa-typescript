/**
 * 首页模块
 * Created by 王佳欣 on 2018/3/19.
 */

export default {
    el: {
        $page: $('.home'),
    },
    data: {

    },
    bindEvent () {
        $('.js_transition').click(() => {
            this.$router.push('test', {params: 1});
        });
    }
};
