import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
	debug: true,
	devtool: 'source-map',
	noInfo: false,
	entry: {
		vendor: path.resolve(__dirname, 'src/vendor'),
		main: path.resolve(__dirname, 'src/index')
	},
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: '[name].[chunkhash].js'
	},
	plugins:[
		//generate an external css file with a hash in the filename
		new ExtractTextPlugin('[name].[contenthash].css'),
		//hash the files using md5 for cache busting
		new WebpackMd5Hash(),
		//use commons chunkplugin to create a separate bundle
		//of vendor libraries so they're cached separately.
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		//create HTML file that includes reference to bundled js
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: true
		}),
		//eliminate duplicate packages during bundling
		new webpack.optimize.DedupePlugin(),
		//Minification
		new webpack.optimize.UglifyJsPlugin()
	],
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
			{test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
			// {test: /\.css$/, loaders:['style','css']}
		]
	}
}
