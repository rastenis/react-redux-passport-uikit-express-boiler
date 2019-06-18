const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src", "client"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader"
      },
      {
        test: /\.css?/,
        loader: "css-loader"
      },
      {
        test: /\.less?/,
        issuer: /\.less$/,
        include: [path.resolve(__dirname, "node_modules", "uikit")],
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "less-loader" }
        ]
      }
    ]
  }
};
