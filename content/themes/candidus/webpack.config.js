const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
	return {
		entry: {
			shared: path.resolve(__dirname, 'src/shared.ts'),
			index: path.resolve(__dirname, 'src/bundles/index.ts'),
			page: path.resolve(__dirname, 'src/bundles/page.ts'),
			tableOfContents: path.resolve(__dirname, 'src/bundles/tableOfContents.ts'),
			slider: path.resolve(__dirname, 'src/bundles/slider.ts'),
			bookmarks: path.resolve(__dirname, 'src/bundles/bookmarks.ts'),
			tag: path.resolve(__dirname, 'src/bundles/tag.ts'),
		},
		output: {
			filename: '[name].bundle.js',
			path: path.resolve(__dirname, 'assets/built'),
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
				{
					test: /\.(jpe?g|png|gif|svg)$/i,
					type: 'asset', // <-- Assets module - asset

					generator: {
						filename: 'images/[name][ext]',
					},
				},
				{
					test: /\.((s[ac]ss)|(css))$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
						},
						{
							loader: 'css-loader',
						},
						{
							loader: 'postcss-loader',
						},
						{
							loader: 'sass-loader',
						},
					],
				},
				{
					test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
					type: 'asset/resource', // <-- Assets module - asset
					generator: {
						filename: 'fonts/[hash][ext][query]',
					},
				},
			],
		},
		resolve: {
			modules: ['node_modules'],
			extensions: ['.tsx', '.ts', '.js'],
		},
		optimization: {
			usedExports: true,
			minimizer: [
				// For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
				`...`,
				new CssMinimizerPlugin(),
				new TerserPlugin(),
				new CopyWebpackPlugin({
					patterns: [{
						from: path.resolve(__dirname, 'src/thirdparty'),
						to: path.resolve(__dirname, 'assets/built/thirdparty')
					}]
				})
			],
			// activate this before building
			minimize: true,
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: '[name].css',
				chunkFilename: '[id].css',
			}),
			new Dotenv(),
		],
		devServer: {
			compress: false,
			host: '0.0.0.0',
			port: 3000,
		},
		watchOptions: {
			poll: 1000,
		},
	};
};
