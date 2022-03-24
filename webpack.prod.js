const webpack = require('./webpack.common');
const { merge } = require('webpack-merge');
const path = require("path");

module.exports = merge(webpack,
  {
    mode: "production",
  }
)
