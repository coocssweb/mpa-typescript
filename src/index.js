import './scss/home.scss';
import App from './app';
import router from './router';

this._app = new App({router: router});
this._app._router.init();
