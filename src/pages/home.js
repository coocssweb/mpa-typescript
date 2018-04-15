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

        $('.js_replace').click(() => {
            this.$router.replace('test', {params: 2});
        });
        $('.js_router').click(() => {
            console.log(this.$router.route);
        });

        $('.js_tip').click(() => {
            this.$tip({message: '测试提示信息'});
        });
    }
};
