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
    open () {
        this.el.$home.addClass('animating');
        this.el.$home.addClass('show');
        setTimeout(() => {
            this.el.$home.removeClass('animating');
        }, 500);
    },
    close () {
        this.el.$home.addClass('animating');
        this.el.$home.addClass('out');
        setTimeout(() => {
            this.el.$home.removeClass('animating');
            this.el.$home.removeClass('show');
            this.el.$home.removeClass('out');
        }, 500);
    },
    bindEvent () {

    },
    bindData () {

    },
    init () {
        // 静默登录
        Auth.webviewLogin();
        this.bindEvent();
    }
};
