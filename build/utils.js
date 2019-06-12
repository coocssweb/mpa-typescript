const path = require('path');

console.log(path.join('/', 'coocss'));

exports.resolve = function resolve (...args) {
    return path.join(__dirname, '..', ...args);
};