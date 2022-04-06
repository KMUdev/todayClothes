const webpack = require("./webpack.common");
const { merge } = require("webpack-merge");
const Dotenv = require("dotenv-webpack");

module.exports = merge(webpack, {
  mode: "development",
  plugins: [
    new Dotenv({
      path: "./env/.dev.env",
    }),
  ],
  devServer: {
    hot: true,
    proxy: {
      // origin/api/* 인 요청이 들어오면
      "/api": {
        target: "http://apis.data.go.kr", // target/api/* 으로 바꿔서 요청한다.
        changeOrigin: true,
        pathRewrite: { "^/api": "" }, // target/api/*를 target/*로 바꿔준다.
      },
    },
  },
});
