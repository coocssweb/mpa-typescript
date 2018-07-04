/**
 * 测试页面
 * Created by 王佳欣 on 2018/3/19.
 */
import FullPage from 'resources_modules/alloyTouch/fullPage';
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
    create () {
        /* eslint-disable no-new */
        new FullPage('#fullpage', {
            animationEnd () {
            },
            leavePage (index) {
                console.log('leave' + index);
            },
            beginToPage (index) {
                console.log('to' + index);
            }
        });
    }
};
