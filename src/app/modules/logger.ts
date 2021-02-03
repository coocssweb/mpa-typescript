const Logger = class {
    // 
    static readonly reportUrl: 'http://www.shuxia123.com';

    static readonly supportMethods = ['log', 'info', 'warn', 'debug', 'error'];

    private reportUrl: string;
    private store: Array<any> = [];

    constructor (reportUrl: string) {
        this.reportUrl = reportUrl;

        Logger.supportMethods.forEach((methodName) => {
            this[methodName] = (...params) => {
                const method = console[methodName];
                method.apply(console, ...params);
            };
        })

        this.addErrorListener();
    }

    /**
     * 添加错误日志上报
     */
    addErrorListener () :void {
        window.onerror = (msg, url, line, col, error) => {

        };
    }

};

export default Logger;
