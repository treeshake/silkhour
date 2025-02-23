const path = require("path");

module.exports = {
  entry: {
    facets: "./src/ts/facets/facets.ts",
    "product-list": "./src/ts/product-list.ts",
    "product-info": "./src/ts/product-info.ts",
    app: "./src/react/App.tsx",
  },
  // devtool: 'inline-source-map',
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, "src/ts"),
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(js|ts|jsx|tsx)$/,
        include: path.resolve(__dirname, "src/react"),
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  output: {
    filename: "custom-[name].js",
    path: path.resolve(__dirname, "src/theme/assets"),
  },
};
