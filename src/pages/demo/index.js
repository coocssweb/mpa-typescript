import 'resources_scss/home.scss';
import App from 'app';
import router from './router';
import ThirdPlat from 'resources_modules/ThirdPlat';
import Loading from 'resources_modules/loading';

App.use(ThirdPlat, {
    tokenUrl: `${location.protocol}//applet.meitu.com/public/index/wx_token`, // 须由服务端配合开发，格式如：{"appId":"x","nonceStr":"x","timestamp":123,"jsapi_ticket":"x-","signature":"xx"}
    qqAId: '', //  QQ id
    tokenType: 'jsonp' // jsonp / json 都行、具体看你们的信息
});

this.App = new App({router});
this.App.$router.init();
this.App.$thirdPlat.setShare({
    title: '默认分享标题',
    desc: '默认分享文案',
    link: 'http://h4.meitu.com',
    imgUrl: 'http://mtshop1.meitudata.com/5ad08f6044d2038412.png',
});

App.use(Loading, {
    images: ['https://mtshop1.meitudata.com/5a27dbac402a510658.jpg']
}, () => {
    console.log('loadOver');
});

this.App.$loading.init();
