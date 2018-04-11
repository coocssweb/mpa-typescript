// https://github.com/michael-ciniawsky/postcss-load-config
// const autoprefixer = require('autoprefixer');
// const px2rem = require('postcss-px2rem');
module.exports = {
    plugins: {
        'autoprefixer': true,
        'postcss-px2rem': {
            remUnit: 46.875,
        }
    }
}
