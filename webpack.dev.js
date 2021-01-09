const path = require("path");
const common = require("./webpack.common");
const {merge} = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].build.js",
    path: path.resolve(__dirname)
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./dev/index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
            "style-loader", //2. Extract css into files
            "css-loader" //1. Turns css into commonjs
        ]
      }
    ]
  }
});