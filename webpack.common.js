const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  entry: {
    app: ["./src/index.tsx"],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        loader: "babel-loader",
        exclude: path.join(__dirname, "node_modules"),
      },
       // 이미지
       {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
    // publicPath: "/dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
    }),
    new ReactRefreshWebpackPlugin(),
  ],
};
