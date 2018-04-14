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
            console.log(this);
        });
    },
    bindData () {

    },
    create () {
        console.log('home created');
        this.bindEvent();
        this.open();
    }
};
