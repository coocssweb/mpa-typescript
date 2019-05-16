import { EMPTY_FUNCTION } from '../../constant';
interface Options {
    src: string,
    autoPlay: boolean,
    loop: boolean,
    onPlay?: Function,
    onPause?: Function,
    onEnded?: Function
};

export default class Audio {
    static readonly defaultOptions: Options = {
        src: '',
        autoPlay: false,
        loop: false,
        onPlay: EMPTY_FUNCTION,
        onPause: EMPTY_FUNCTION,
        onEnded: EMPTY_FUNCTION
    }

    public isPlaying: boolean = false;
    private element: HTMLAudioElement;

    constructor (options: Options) {
        options = {...Audio.defaultOptions,  ...options };
        this.element = this.createAudioElement(options);
    }

    private createAudioElement (options: Options): HTMLAudioElement {
        const wrapEvent = (userEvent = EMPTY_FUNCTION, proxyEvent = EMPTY_FUNCTION) => {
            return (event: Event) => {
                try {
                    proxyEvent(event);
                }
                finally 
                {
                    userEvent(event);
                }
            };
        };

        const onPlay = () => {
            this.isPlaying = true;
        };
        const onPause = () => {
            this.isPlaying = false;
        };
        const onEnded = () => {
            this.isPlaying = !options.loop;
        }

        let element = document.createElement('audio');
        element.autoplay = options.autoPlay;
        element.setAttribute('src', options.src);
        element.setAttribute('loop', options.loop ? 'loop' : '');

        // events for audio
        element.onplay = wrapEvent(options.onPlay, onPlay);
        element.onpause = wrapEvent(options.onPause, onPause);
        element.onended = wrapEvent(options.onEnded, onEnded);

        return element;
    }
    
    public play () {
        this.element.play();
    }

    public pause () {
        this.element.pause();
    }
}