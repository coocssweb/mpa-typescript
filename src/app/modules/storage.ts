class Storage {
    // `prefix`: 缓存前缀, 实现namespace的功能, 防止重名
    static readonly prefix: string = '__';

    // `splitCode`: 过期时间 和 缓存值之间的切割符, 如: '60000|_|abc'
    static readonly splitCode: string = '|_|';

    // storage support
    static readonly storage = localStorage || window.localStorage;

    // `defaultExpiredTime`： 默认30天过期
    static readonly defaultExpiredTime = 30 * 24 * 60 * 60 * 1000;

    private prefix: string;
    
    private splitCode: string;

    constructor (prefix?: string, splitCode?: string) {
        this.prefix = prefix || Storage.prefix;
        this.splitCode = splitCode || Storage.splitCode;
    }

    /**
     * 获取缓存key
     * @param key 
     */
    private getStorageKey (key:string): string {
        return `${this.prefix}${key}`;
    }

    /**
     * 设置缓存值
     * @param key, storage 的 key
     * @param value, storage 的 value
     * @param expired, storage 的过期时间
     */
    public setItem (key: string, value: any, expired: number = Storage.defaultExpiredTime): void {
        const itemKey = this.getStorageKey(key);
        const date = new Date();
        const expiredTimestamp = date.getTime() + expired;
        Storage.storage.setItem(itemKey, `${expiredTimestamp}${this.splitCode}${value}`);
    }

    /**
     * 获取缓存值
     * @param key, 缓存的key 
     */
    public getItem (key: string): string {
        const itemKey = this.getStorageKey(key);
        const value = Storage.storage.getItem(itemKey);

        if (value) {
            const localValueSplits = value.split(this.splitCode);
            const currentTimestamp = (new Date()).getTime();
            if (+localValueSplits[0] > +(new Date())) {
                return localValueSplits[1];
            }
            // expired
            this.removeItem(key);
        }

        return null;
    }

    /**
     * 删除缓存
     * @param key, 缓存的key
     */
    public removeItem (key: string): void {
        const itemKey = this.getStorageKey(key);
        Storage.storage.removeItem(itemKey);
    }
}

export default Storage;