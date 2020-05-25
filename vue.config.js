const path = require('path');
const webpack = require('webpack');
function resolve(dir) {
	return path.join(__dirname, dir);
}
module.exports = {
	pluginOptions: {
		electronBuilder: {
			builderOptions: {
				appId: 'com.example.app',
				productName: '鲁丰冷食管存系统', //项目名，也是生成的安装文件名，即鲁丰冷食管存系统.exe
				copyright: 'Copyright © 2020', //版权信息
				win: {
					//win相关配置
					icon: './public/ico/favicon_256.ico' //图标，当前图标在根目录下，注意这里有两个坑
				}
			}
		}
	},
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
				'process.env': {
					NODE_ENV: JSON.stringify(process.env.NODE_ENV)
				}
			})
		]
	},
	devServer: {
		overlay: {
			warnings: false,
			errors: false
		}
	},
	lintOnSave: false
};
