import '@scss/base/common.scss';
import App from './app';

interface AppOptions {
    data?: object,
    watchs?: object,
    bindEvents?: Function,
    init?: Function,
    [propName: string]: any;
}

// a tool function for create app
export default class Instance {
    constructor (options: AppOptions) {
        const optionsExtend = {
            ... options
        };
        const { data, watchs, ...reset } = optionsExtend;
        
        return new (App.extends(reset))(options.data, options.watchs);
    }
}
