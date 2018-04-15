import './scss/home.scss';
import App from './app';
import router from './router';
import Weixin from './modules/weixin';
import Loading from './modules/loading';

App.use(Weixin, {
    appId: '928616713878249', tokenUrl: `${location.protocol}//applet.meitu.com/public/index/wx_token`
});

this._app = new App({router});
this._app._router.init();
this._app._weixin.init();

Loading.init();
