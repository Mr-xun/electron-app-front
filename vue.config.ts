const path = require('path');
const webpack = require('webpack')
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
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
                }
            })
        ]
    },
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                win: {
                    icon: './public/fav.ico'
                },
                mac: {
                    icon: './public/fav.ico'
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
