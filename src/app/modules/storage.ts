class Storage {
    static readonly prefix: string = '__';
    private readonly splitCode = '|_|';
    private readonly storage = localStorage || window.localStorage;
    static readonly defauleExpiredTime = 30 * 24 * 60 * 60 * 1000;

    constructor () {
    }

    private getStorageKey (key:string) {
        return `${Storage.prefix}${key}`;
    }

    public setItem (key: string, value: any, expired: number = Storage.defauleExpiredTime) {
        const itemKey = this.getStorageKey(key);
        const expiredTimestamp = +(new Date()) + expired;
        this.storage.setItem(itemKey, `${expiredTimestamp}${this.splitCode}${value}`);
    }

    public getItem (key: string) {
        const itemKey = this.getStorageKey(key);
        const localValue = this.storage.getItem(itemKey);

        if (localValue) {
            const localValueSplits = localValue.split(this.splitCode);
            if (+localValueSplits[0] > +(new Date())) {
                return localValueSplits[1];
            }
            // expired
            this.removeItem(key);
        }

        return null;
    }

    public removeItem (key: string) {
        const itemKey = this.getStorageKey(key);
        this.storage.removeItem(itemKey);
    }
}

export default new Storage();