const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist/assets')
  },
  devServer: {
    port: 3000,
    contentBase: './dist',
    publicPath: '/assets/',
    compress: true,
    historyApiFallback: true
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [{
      test: /\.(ts|tsx|js|jsx)$/,
      exclude: /node_modules/,
      loader: 'ts-loader'
    }]
  }
};
