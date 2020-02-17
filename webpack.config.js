const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const DIR_FROM = 'HW9/src';
const DIR_TO = 'HW9/dist';

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

module.exports = {
  context: path.resolve(__dirname, DIR_FROM),
  mode: 'development',
  entry: {
    main: './index.js',
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js'],
  },
  output: {
    // [name], [contenthash]
    filename: '[hash].bundle.js',
    path: path.resolve(__dirname, DIR_TO),
  },
  devServer: {
    contentBase: path.resolve(__dirname, DIR_TO),
    port: 4200,
    open: 'chrome',
    historyApiFallback: {
      index: 'index.html',
    },
    // hot: isDev,
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
      // chunkFilename: '[id].css',
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, `${DIR_FROM}/favicon.ico`),
        to: path.resolve(__dirname, DIR_TO),
      },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
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
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|svg|gif|ico)$/,
        use: ['file-loader?name=images/[name].[ext]'],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader?name=font/[name].[ext]'],
      },
    ],
  },
};
