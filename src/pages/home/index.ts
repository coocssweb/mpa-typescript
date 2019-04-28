import '@scss/home.scss';
import App from '@app';
import Share from '@modules/share/index';
// you can create an other app
// other create a new app, it has independent data and watchs..., 
// if you need create a app just when you need
// you can create it in a function and return it, for example singleton mode.
import './other';

new App({
    data: {
        name: '王佳欣'
    },
    watchs: {
        sex: 'male'
    },
    sexHandler (value: any, oldValue: any) {
        console.log('changed sex from', oldValue, '=>', value);
        this.$confirm({
            title: '监听sex变化',
            okLabel: '',
            cancelLabel: '我知道了',
            closable: false,
            content: `修改 this.sex: <span class="value--old">"${oldValue}"</span>  =>  <span class="value--new">"${value}"</span>`
        });
    },

    bindEvents () {
        // demo for tip
        document.querySelector('.btn-tip').addEventListener('click', () => {
            this.$tip({
                message: '这是一个提示框',
                closable: true,
                duration: 0,
                callback: () => {
                    console.log('提示框关闭后');
                }
            });
        });

        // demo for confirm
        document.querySelector('.btn-confirm').addEventListener('click', () => {
            this.$confirm({
                title: '确认框标题',
                okLabel: '2s, 后关闭',
                content: '1.自定义标题、内容；<br />2.自定义Button;<br/>3.自定义回调；<br />...等等',
                okCallback: () => {
                    console.log(`click ok at:`, Date.now());
                    // support callback for async
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve();
                            console.log('close dialog at:', Date.now());
                        }, 2000);
                    });
                }
            });
        });

        // demo for route
        document.querySelector('.btn-log').addEventListener('click', () => {
            console.log('当前路由信息', this.$route);
            this.$confirm({
                title: '当前路由信息',
                okLabel: '',
                cancelLabel: '我知道了',
                closable: false,
                content: JSON.stringify(this.$route)
            });
        });

        // demo for proxy
        document.querySelector('.btn-proxy').addEventListener('click', () => {
            this.sex = this.sex === 'female' ? 'male' : 'female';
        });

        // call a share
        document.querySelector('.btn-share').addEventListener('click', () => {
            this.share.callShare(); 
        });

        // open a new page
        document.querySelector('.btn-open').addEventListener('click', () => {
            this.$router.push('/demo.html');
        });
    },

    init () {
        // 测试分享模块
        const shareInfo = {
            title: '测试分享标题',
            desc: '测试分享描述',
            link: 'http://www.shuxia123.com',
            imgUrl: 'http://assets.shuxia123.com/uploads/2019/1554004957941_width_748_height_500.jpg'
        };
        this.share = new Share('', null, shareInfo);
    }
});
