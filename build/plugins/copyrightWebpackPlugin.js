function CopyrightWebpackPlugin (options) {
    this.options = options;
}

CopyrightWebpackPlugin.prototype.apply = function (compiler) {
    const options = this.options;
    compiler.plugin('emit', function (compilation, callback) {
        for (let filename in compilation.assets) {
            compilation.assets[filename]._value = `${compilation.assets[filename]._value}\n${options}`;
        }
        callback();
    });
};

module.exports = CopyrightWebpackPlugin;