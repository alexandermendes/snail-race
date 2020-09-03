const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const isDev = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Snails',
    }),
  ]
};
