/**
 * tip信息提示
 * Created by 王佳欣 on 2018/4/11.
 */
export default {
    el: {
        $tip: $('global_tip'),
    },
    showTip (message, timeout =  2000) {
        this.el.$tip.html(message).addClass('show');
        setTimeout(() => {
            $tip.removeClass('show');
        }, timeout);
    }
};
