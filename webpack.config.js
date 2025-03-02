const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: {
    facets: "./src/webcomponents/facets/facets.ts",
    "product-list": "./src/webcomponents/product-list.ts",
    "product-info": "./src/webcomponents/product-info.ts",
    app: "./src/react/app.tsx",
  },
  // devtool: 'inline-source-map',
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [new Dotenv()],
  output: {
    filename: 'custom-[name].js',
    path: path.resolve(__dirname, 'src/theme/assets'),
  },
};
