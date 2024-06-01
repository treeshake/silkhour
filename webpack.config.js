const path = require('path');

module.exports = {
  entry: {
    index: './src/ts/index.ts',
    "product-list": './src/ts/product-list.ts',
  },
  devtool: 'inline-source-map',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'custom-[name].js',
    path: path.resolve(__dirname, 'assets'),
  },
};
