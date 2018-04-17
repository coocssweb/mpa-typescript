/**
 * loading 模块
 * Created by 王佳欣 on 2018/4/3.
 */
import {loadImage} from '../utils';

export default {
    el: {
        $countDown: $('.loading_num'),
        $page: $('.loading'),
    },
    data: {
        percent: 0,
        hasLoad: false,
    },
    close () {
        this.el.$countDown.html(`100%`);
        this.el.$page.fadeOut();
    },
    /**
     * 主要图片加载完
     */
    loadOver () {
        $('.line-top, .line-bot, .loading-box').addClass('over');
        setTimeout(() => {
            this.el.$page.fadeOut(500);
        }, 1000);
    },
    /**
     * 倒计时
     */
    countdown (timeout) {
        setTimeout(() => {
            this.data.percent += this.data.percent > 80 ? (this.data.hasLoad ? 1 : 0) : 1;
            if (this.data.percent > 99) {
                this.close();
            } else {
                this.el.$countDown.html(`${this.data.percent}%`);
                this.countdown(this.data.percent < 80 && !this.data.hasLoad ? timeout : 30);
            }
        }, timeout);
    },
    init () {
        // this.countdown(100);
        let timestamp = new Date().getTime();
        loadImage([
            'https://mtshop1.meitudata.com/5acc1da926fa912246.jpg'
        ]).then(() => {
            let timestamp2 = (new Date().getTime() - timestamp);
            if (timestamp2 > 1000) {
                this.loadOver();
            } else {
                setTimeout(() => {
                    this.loadOver();
                }, 1000 - timestamp2);
            }
        });
    }
};
