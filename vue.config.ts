const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    publicPath: './',
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('src', resolve('src'))
            .set('common', resolve('src/common'))
            .set('components', resolve('src/components'));
    },
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                win: {
                    icon: './public/favicon.ico'
                },
                mac: {
                    icon: './public/favicon.ico'
                },
                productName: 'AppDemo'
            }
        }
    },
    devServer: {
        overlay: {
            warnings: false,
            errors: false
        },

    },
    lintOnSave: false
};
