const path = require('path');

module.exports = {
  entry: {
    facets: './src/ts/facets/facets.ts',
    'product-list': './src/ts/ProductList.ts',
    'product-info': './src/ts/ProductInfo.ts',
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
