/**
 * @file utils/loading.ts 加载动画
 * @author: 王佳欣
 * @email: 1974740999@qq.com
 */
import '@scss/base/globalLoading.scss';
import { loadImages } from '@utils/index';
import { getAnimationEvent } from '@utils/device';
import { EMPTY_FUNCTION } from '../../constant';

export default class Loading {
    static readonly prefix = 'globalLoading';

    private haveLoadedPercent: number = 0;
    private haveLoadedCount: number = 0;
    private haveLoaded: boolean = false;
    private haveLoadedHalf: boolean = false;
    private loadedCallback: Function;
    private images: Array<string>;

    // global loading's dom
    private $loadingContainer: HTMLElement;
    private $loadingProgress: HTMLElement;
    private $loadingValue: HTMLElement;
    private animationEvent: string;

    constructor (images: Array<string>, callback?: Function) {
        this.images = images;
        this.loadedCallback = callback || EMPTY_FUNCTION;

        // rebind
        this.handleDestory = this.handleDestory.bind(this);

        this.$loadingContainer = document.querySelector(`.${Loading.prefix}`);
        this.$loadingProgress = document.querySelector(`.${Loading.prefix}-progress`);
        this.$loadingValue = document.querySelector(`.${Loading.prefix}-value`);
        this.animationEvent = getAnimationEvent();

        this.bindEvents();
    }

    private bindEvents () {
        this.$loadingContainer.addEventListener(this.animationEvent, this.handleDestory);
    }

    private handleDestory (e: any) {
        if (e.target !== e.currentTarget) {
            return;
        }

        this.unbindEvents();
        // remove dom
        this.$loadingContainer.parentNode.removeChild(this.$loadingContainer);
    }

    private unbindEvents () {
        this.$loadingContainer.removeEventListener(this.animationEvent, this.handleDestory);
    }

    private handleLoadEnd (): void {
        this.$loadingContainer.classList.add('doOut');
    }

    private setLoadingStatus (): void {
        this.$loadingValue && (this.$loadingValue.innerHTML  = `${this.haveLoadedPercent}%`);
        this.$loadingProgress && (this.$loadingProgress.style.width = `${this.haveLoadedPercent}%`);
    }

    private countDown (timeout: number): void {
        setTimeout(() => {
            this.setLoadingStatus();
            
            if (this.haveLoadedPercent !== 50 
                && this.haveLoadedPercent !== 80
                && this.haveLoadedPercent < 100) {
                this.haveLoadedPercent += 1;
                this.countDown(timeout);
            } 
            else if (this.haveLoadedPercent === 50) {
                // 加载50% 做假暂停
                this.haveLoadedPercent += this.haveLoadedHalf ? 1 : 0;
                this.countDown(timeout);
            } 
            else if (this.haveLoadedPercent === 80) {
                // 加载80% 做假暂停
                this.haveLoadedPercent += this.haveLoaded ? 1 : 0;
                this.countDown(timeout);
            } 
            else if (this.haveLoadedPercent > 99) {
                this.loadedCallback();
                this.handleLoadEnd();
            }
        }, timeout);
    }

    public start (): void {
        this.countDown(50);
        loadImages(this.images, (loadedCount: number) => {
            this.haveLoadedCount = loadedCount;
            this.haveLoadedHalf = this.haveLoadedCount > this.images.length / 2; 
        }).then(() => {
            this.haveLoaded = true;
            this.haveLoadedPercent = this.haveLoadedPercent < 90 ? 90 : this.haveLoadedPercent;
        });
    }
};
