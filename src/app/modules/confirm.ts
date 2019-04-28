/**
 * @file modules/toast.ts 确认模块
 * @author: 王佳欣
 * @email: 1974740999@qq.com
 */
import Mask from './mask';
import { getTransitionEvent } from '@utils/device';
import { EMPTY_FUNCTION } from '../../constant';
import { ConfirmOptions } from '../../interface';

export default class Confirm {
    static defaultOptions: ConfirmOptions = {
        title: '',
        closable: true,
        content: '',
        width: 500,
        okLabel: '确认',
        cancelLabel: '取消',
        okCallback: EMPTY_FUNCTION,
        cancelCallback: EMPTY_FUNCTION,
    };
    static prefix = 'globalConfirm';

    private options: ConfirmOptions;
    private transitionEvent: string;

    private $domContainer: HTMLElement;
    private $domClosable: HTMLElement;
    private $domOk: HTMLElement;
    private $domCancel: HTMLElement;

    constructor (options: ConfirmOptions) {
        this.options = { ...Confirm.defaultOptions, ...options };

        // rebind
        this.handleOkClick = this.handleOkClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
        this.transitionEvent = getTransitionEvent();

        this.createElement();
        this.bindEvents();
    }

    private createElement () {
        this.$domContainer = document.createElement('div');
        this.$domContainer.classList.add(Confirm.prefix);
        this.$domContainer.style.width = `${this.options.width}px`;
        this.$domContainer.style.marginLeft = `-${this.options.width / 2}px`;

        // create dialog's header and content and footer
        const domHeader = this.createHeaderElement();
        const domContent = document.createElement('div');
        domContent.classList.add(`${Confirm.prefix}-content`);
        domContent.innerHTML = this.options.content;
        const domFooter = this.createFooterElement();
        this.$domContainer.appendChild(domHeader);        
        this.$domContainer.appendChild(domContent);
        domFooter && this.$domContainer.appendChild(domFooter);

        Mask.open();

        document.body.append(this.$domContainer);
        this.$domContainer.style.marginTop = `-${this.$domContainer.clientHeight / 2}px`;
    }

    private createHeaderElement (): HTMLElement {
        const domHeader = document.createElement('div');
        domHeader.classList.add(`${Confirm.prefix}-header`);

        if (this.options.title) {
            const domTitle = document.createElement('div');
            domTitle.classList.add(`${Confirm.prefix}-title`);
            domTitle.innerHTML = this.options.title;
            domHeader.appendChild(domTitle);
        }

        if (this.options.closable) {
            this.$domClosable = document.createElement('i');
            this.$domClosable.classList.add(`${Confirm.prefix}-close`);
            this.$domContainer.append(this.$domClosable);
        }

        return domHeader;
    }

    private createFooterElement (): HTMLElement {
        let domFooter: HTMLElement;

        if (this.options.okLabel || this.options.cancelLabel) {
            domFooter = document.createElement('div');
            domFooter.classList.add(`${Confirm.prefix}-footer`);

            if (this.options.okLabel) {
                this.$domOk = document.createElement('button');
                this.$domOk.innerHTML = this.options.okLabel;
                this.$domOk.classList.add(`${Confirm.prefix}-btn`);
                this.$domOk.classList.add(`${Confirm.prefix}-btn--ok`);
                domFooter.appendChild(this.$domOk);
            }

            if (this.options.cancelLabel) {
                this.$domCancel = document.createElement('button');
                this.$domCancel.innerHTML = this.options.cancelLabel;
                this.$domCancel.classList.add(`${Confirm.prefix}-btn`);
                this.$domCancel.classList.add(`${Confirm.prefix}-btn--cancel`);
                domFooter.appendChild(this.$domCancel);
            }
        }

        return domFooter;
    }

    private bindEvents () {
        this.$domContainer.addEventListener(this.transitionEvent, this.handleTransitionEnd);

        if (this.$domClosable) {
            this.$domClosable.addEventListener('click', this.handleCloseClick);
        }

        if (this.$domCancel) {
            this.$domCancel.addEventListener('click', this.handleCancelClick);
        }

        if (this.$domOk) {
            this.$domOk.addEventListener('click', this.handleOkClick);
        }
    }

    private unbindEvents () {
        this.$domContainer.removeEventListener(this.transitionEvent, this.handleTransitionEnd);

        if (this.$domClosable) {
            this.$domClosable.removeEventListener('click', this.handleCloseClick);
        }

        if (this.$domCancel) {
            this.$domCancel.removeEventListener('click', this.handleCancelClick);
        }

        if (this.$domOk) {
            this.$domOk.removeEventListener('click', this.handleOkClick);
        }
    }

    private handleTransitionEnd () {
        if (this.$domContainer.classList.contains('doOut')) {
            this.destory();
        }
    }

    private destory() {
        this.unbindEvents();
        document.body.removeChild(this.$domContainer);
    }

    private async handleOkClick () {
        await this.options.okCallback();
        this.close();
    }

    private async handleCancelClick () {
        await this.options.cancelCallback();
        this.close();
    }

    private handleCloseClick () {
        this.close();
    }

    public close () {
        this.$domContainer.classList.add('doOut');
        Mask.close();
    }
}
