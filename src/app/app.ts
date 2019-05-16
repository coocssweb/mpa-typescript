import { Tip, Confirm, Router, Statistic, proxy, ajax, jsonp, Storage } from './modules/index';
import URI from '@utils/uri';
import { EMPTY_FUNCTION } from '../constant';
import { AjaxOptions, JsonpOptions, TipOptions, ConfirmOptions } from '../interface';

// extend destination's key to source
const extend = (destination: any, source: any) => {
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            destination[key] = source[key];
        }
    }
    return destination;
};

function App (data: object, watchs: object) {
    this.data = data;
    this.watchs = watchs;
    this.$router = Router;
    this.$route = URI.parse(window.location.href);
    this.$statistic = Statistic;
    this.$storage = Storage;
}

App.prototype = {
    bindEvents: EMPTY_FUNCTION,

    init: EMPTY_FUNCTION,

    $tip: function (options: TipOptions) {
        new Tip(options);
    },

    $ajax: function (options: AjaxOptions): Promise<any> {
        return ajax(options);
    },

    $jsonp: function (options: JsonpOptions): Promise<any> {
        return jsonp(options);
    },

    $confirm: function (options: ConfirmOptions) {
        return new Confirm(options);
    },

    _init: function () {
        this.bindEvents();
        // get or set a property on this, relate to data[propertyName]
        if (this.data) {
            for (let key in this.data) {
                Object.defineProperty(this, key, {
                    get () {
                        return this.data[key];
                    },
                    set (value) {
                        this.data[key] = value;
                    }
                });
            }
        }
        // watch a property, would trigger a property name Handler
        if (this.watchs) {
            for (let key in this.watchs) {
                Object.defineProperty(this, key, {
                    get () {
                        return this.watchs[key];
                    },
                    set (value) {
                        this.watchs[key] = value;
                    }
                });
                proxy({
                    data: this.watchs,
                    key: key,
                    callback: this[`${key}Handler`].bind(this)
                });
            }
        }

        this.init();
    }
};

// extends app, return sub
App.extends = (...args: any) => {
    const Super = App;

    const Sub = function (data: object, watchs: object) {
        App.call(this, data, watchs);
        this._init();
    };

    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;

    [...args].map((item) => {
        extend(
            Sub.prototype,
            item
        );
    });

    return Sub;
};

export default App;
