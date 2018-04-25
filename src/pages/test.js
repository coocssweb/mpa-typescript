/**
 * 测试页面
 * Created by 王佳欣 on 2018/3/19.
 */

export default {
    el: {
        $page: $('.test'),
    },
    data: {

    },
    open () {
        console.log('open');
    },
    bindEvent () {

    },
    bindData () {

    },
    created () {
        console.log('home created');
        this.open();
    }
};
