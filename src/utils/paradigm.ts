export const memonry = (fn: Function) => {
    let cache = {};

    return function() {
        let argStr = JSON.stringify(arguments);
        cache[argStr] = cache[argStr] || fn.apply(fn, arguments);
        return cache[argStr];
    };
};
