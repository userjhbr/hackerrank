const express = require("express");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.js");
const path = require("path");
const app = express();
const compiler = webpack(webpackConfig);

app.use(
  webpackDevMiddleware(compiler, {
    stats: {
      colors: true,
    },

    publicPath: "/",
  })
);

app.use(
  webpackHotMiddleware(compiler, {
    log: console.log,
    path: "/__webpack_hmr",
    heartbeat: 10 * 1000,
  })
);

app.use(express.static(path.join(__dirname, "src")));
app.listen(8000, "0.0.0.0", function () {});
module.exports = app;
