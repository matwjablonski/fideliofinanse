const CopyWebpackPlugin = require("copy-webpack-plugin");
const settings = {};

settings.paths = {
  src: "./src",
  dist: `${__dirname}/dist/`
};

const plugins = [
  new CopyWebpackPlugin([
    {
      from: `${settings.paths.src}`,
      to: `${settings.paths.dist}/`,
      ignore: ["*.js", "*.scss"]
    }
  ])
];

module.exports = env => ({
  entry: [
    `${settings.paths.src}/assets/js/app.js`,
    `${settings.paths.src}/assets/scss/app.scss`
  ],
  output: {
    path: `${settings.paths.dist}/assets`,
    filename: "js/app.bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "css/[name].bundle.css"
            }
          },
          {
            loader: "extract-loader"
          },
          {
            loader: "css-loader?-url"
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  mode: "development",
  devServer: {
    contentBase: settings.paths.dist,
    compress: true,
    port: 9000
  },
  plugins
});