/**
 * 方向
 * Created by 王佳欣 on 2018/4/13.
 */
export default {
    open (direction) {
        this.el.$page.addClass('open');
        this.el.$page.addClass('animating');
        setTimeout(() => {
            this.el.$page.removeClass('open');
            this.el.$page.addClass('show');
            this.el.$page.removeClass('animating');
        }, 500);
    },
    close (direction) {
        this.el.$page.addClass('close');
        this.el.$page.addClass('animating');
        setTimeout(() => {
            this.el.$page.removeClass('close');
            this.el.$page.removeClass('show');
            this.el.$page.removeClass('animating');
        }, 500);
    }
};
