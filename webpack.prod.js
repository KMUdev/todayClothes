const webpack = require("./webpack.common");
const { merge } = require("webpack-merge");
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = merge(webpack, {
  mode: "production",
  plugins: [
    new Dotenv({
      path: "./env/.prod.env",
    }),
  ],
});
