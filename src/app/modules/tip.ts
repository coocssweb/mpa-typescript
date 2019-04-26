/**
 * @file modules/tip.ts 提示模块
 * @author: 王佳欣
 * @email: 1974740999@qq.com
 */

import { EMPTY_FUNCTION } from '../../constant';
import { getTransitionEvent } from '@utils/device';
import { TipOptions } from 'interface';

export default class Tip {
    static defaultOptions: TipOptions = {
        message: '',
        duration: 3000,
        theme: 'default',
        closable: false,
        callback: EMPTY_FUNCTION
    };
    static prefix = 'globalTip';

    private $dom: HTMLElement;
    private $domClosable: HTMLElement;
    private transitionEvent: string;
    private timeId: any;
    
    constructor (options: TipOptions) {
        options = { ...Tip.defaultOptions, ...options };
        this.createElement(options);

        // rebind 
        this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.transitionEvent = getTransitionEvent();
        this.bindEvents();

        if (options.duration) {
            this.timeId = setTimeout(() => {
                this.close();
            }, options.duration);
        }
    }

    private createElement (options: TipOptions) {
        this.$dom = document.createElement('div');
        this.$dom.classList.add(Tip.prefix);
        this.$dom.classList.add(`${Tip.prefix}--${options.theme}`);

        // create content dom
        const $domContent = document.createElement('div');
        $domContent.classList.add(`${Tip.prefix}-content`);
        $domContent.innerHTML = options.message;
        this.$dom.append($domContent);

        // create close dom
        if (options.closable) {
            this.$dom.classList.add(`${Tip.prefix}--closable`);
            this.$domClosable = document.createElement('i');
            this.$domClosable.classList.add(`${Tip.prefix}-close`);
            $domContent.append(this.$domClosable);
        }
        
        document.body.appendChild(this.$dom);
    }

    private bindEvents () {
        this.$dom.addEventListener(this.transitionEvent, this.handleTransitionEnd);
        if (this.$domClosable) {
            this.$domClosable.addEventListener('click', this.handleCloseClick);
        }
    }

    private unbindEvents () {
        this.$dom.removeEventListener(this.transitionEvent, this.handleTransitionEnd);
        if (this.$domClosable) {
            this.$domClosable.removeEventListener('click', this.handleCloseClick);
        }
    }

    private destory () {
        // clear timer
        if (this.timeId) {
            clearTimeout(this.timeId);
            this.timeId = null;
        }

        this.unbindEvents();
        document.body.removeChild(this.$dom);
    }

    private handleTransitionEnd (e: any) {
        if (e.target === e.currentTarget && this.$dom.classList.contains('doOut')) {
            this.destory();
        }
    }

    private handleCloseClick () {
        this.close();
    }

    public close () {
        this.$dom.classList.add('doOut');
    }
}
