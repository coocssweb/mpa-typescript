// curry a function
export const curry = (fn, ...args) => {
    if (args.length < fn.length) {
        return curry.bind(null, fn, ...args);
    } else {
        return fn(...args);
    }
};

// componse functions
export const compose = (...fns) => {
    return fns.reduce((fn, current) => (...args) => fn(current(...args)));
}
