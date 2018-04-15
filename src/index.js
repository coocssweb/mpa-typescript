import './scss/home.scss';
import App from './app';
import router from './router';
import Weixin from './modules/weixin';
import Loading from './modules/loading';

App.use(Weixin);

let weixin = new Weixin({
    appId: '928616713878249', tokenUrl: `${location.protocol}//applet.meitu.com/public/index/wx_token`
});

this._app = new App({router: router, weixin});
this._app._router.init();

Loading.init();
