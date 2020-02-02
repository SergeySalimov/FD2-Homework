const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const DIR_FROM = 'HW7/src';
const DIR_TO = 'HW7/dist';

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

module.exports = {
  context: path.resolve(__dirname, DIR_FROM),
  mode: 'development',
  entry: {
    main: './script.js',
  },
  output: {
    // [name], [contenthash]
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, DIR_TO),
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 4200,
    open: 'chrome',
    hot: isDev,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // filename: 'style.[hash].css',
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, `${DIR_FROM}/filename`),
        to: path.resolve(__dirname, DIR_TO),
      },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: isDev,
            reloadAll: true,
          },
        }, 'css-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif|ico)$/,
        use: ['file-loader?name=imgs/[name].[ext]'],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader?name=font/[name].[ext]'],
      },
    ],
  },
};
