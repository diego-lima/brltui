const path = require('path');

module.exports = {
  entry: './main.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public/"),
    },
    // contentBase: path.join(__dirname, 'public'),
    // publicPath: '/build',
    compress: true,
    port: 9001,
    hot: false,
  },
  module: {
    rules: [
      {
        test: /.svelte$/,
        loader: 'svelte-loader',
        options: { hotReload: false },
      }
    ],
  },
};