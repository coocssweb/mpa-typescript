import './scss/home.scss';
import App from './app';
import router from './router';
import ThirdPlat from './modules/ThirdPlat';
import Loading from './modules/loading';

App.use(ThirdPlat, {
    tokenUrl: `${location.protocol}//applet.meitu.com/public/index/wx_token`, tokenType: 'jsonp'
});

this._app = new App({router});
this._app._router.init();
this._app._thirdPlat.init({
    title: '默认分享标题',
    desc: '默认分享文案',
    link: 'http://f2er.meitu.com',
    imageUrl: 'https://mtshop1.meitudata.com/5ad08f6044d2038412.png'
});

Loading.init();
