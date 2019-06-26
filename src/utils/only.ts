export default (obj = {}, keys: Array<string>|string) => {
    if ('string' === typeof keys) keys = keys.split(/\s+/);
    return keys.reduce((result: Object, key: string) => {
        result[key] = obj[key];
        return result;
    }, {});
};