const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  mode: 'development',
  // entry: './src/index.js',
  entry: ['babel-polyfill', './src/App.js'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../lib'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader', 'babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.ts?$/,
        use: ['source-map-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.less'],
    alias: {
      '@': path.resolve(__dirname, '../src/'),
    },
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './public/index.html',
    }),
    new StyleLintPlugin({
      context: 'src',
      configFile: path.resolve(__dirname, '../.stylelintrc'),
      files: '**/*.less',
      failOnError: false,
      quiet: true,
      syntax: 'less',
    }),
  ],
  devServer: {
    contentBase: './src',
    port: 8000,
    // host: '0.0.0.0',
    overlay: {
      errors: true,
    },
    hot: false, // 只渲染一个组件
    historyApiFallback: true,
  },
};
