/**
 * Created by tema on 22.11.16.
 */

// var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: "./js/app.js",
	output: {
		filename: "./js/result.js"
	},
	watch: true,
	// plugins: [
	// 	new HtmlWebpackPlugin({
	// 		title: 'My App',
	// 		filename: 'assets/index.html'
	// 	})
	// ]
};
