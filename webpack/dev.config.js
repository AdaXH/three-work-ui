const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  mode: 'development',
  // entry: './src/index.js',
  entry: ['babel-polyfill', './public/index.js'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../lib'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'source-map-loader', 
          'babel-loader', 
          {
            loader: 'eslint-loader',
            options: {
              fix: true
            }
          }
        ],
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
      inject: true,
      minify: {
        minifyCSS: true,
        removeComments: true,
        crashWhitespace: true
      }
    }),
    new StyleLintPlugin({
      context: 'src',
      configFile: path.resolve(__dirname, '../.stylelintrc.js'),
      files: '**/*.less',
      failOnError: false,
      quiet: true,
      syntax: 'less',
    }),
  ],
  devServer: {
    contentBase: './src',
    port: 8000,
    overlay: {
      errors: true,
    },
    open: true,
    hot: true
  },
};
