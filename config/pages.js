const { resolve } = require('../build/utils');

console.log(resolve('src/pages', 'demo/index.ts'));

module.exports = [
    {
        name: 'home',
        path: resolve('src/pages', 'home/index.ts'),
        filename: 'index.html',
        template: resolve('src/pages', 'home/index-render.js')
    },
    {
        name: 'demo',
        path: resolve('src/pages', 'demo/index.ts'),
        filename: 'demo.html',
        template: resolve('src/pages', 'demo/index-render.js')
    }
];
